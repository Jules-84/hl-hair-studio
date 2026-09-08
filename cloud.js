(function(){
  const cfg=window.HL_CLOUD_CONFIG||{};
  const configured=cfg.url&&cfg.anonKey&&cfg.adminEmail &&
    !cfg.url.includes("PASTE_")&&!cfg.anonKey.includes("PASTE_")&&!cfg.adminEmail.includes("PASTE_");

  const client=(configured&&window.supabase)
    ? window.supabase.createClient(cfg.url,cfg.anonKey)
    : null;

  const mapBooking=r=>({
    id:r.id,
    name:r.customer_name,
    phone:r.phone,
    email:r.email||"",
    notes:r.notes||"",
    serviceId:r.service_id,
    serviceName:r.service_name,
    date:r.appointment_date,
    time:String(r.appointment_time||"").slice(0,5),
    duration:Number(r.duration),
    price:Number(r.price),
    basePrice:Number(r.base_price),
    deposit:Number(r.deposit),
    pinCurls:!!r.pin_curls,
    status:r.status||"confirmed"
  });

  const mapBlock=r=>({
    id:r.id,
    date:r.block_date,
    start:String(r.start_time||"").slice(0,5),
    end:String(r.end_time||"").slice(0,5),
    reason:r.reason||"Unavailable"
  });

  async function createBooking(b){
    if(!client)return {localOnly:true,booking:b};

    const payload={
      customer_name:b.name,
      phone:b.phone,
      email:b.email||null,
      notes:b.notes||null,
      service_id:b.serviceId,
      service_name:b.serviceName,
      appointment_date:b.date,
      appointment_time:b.time,
      duration:b.duration,
      price:b.price,
      base_price:b.basePrice,
      deposit:b.deposit,
      pin_curls:!!b.pinCurls,
      status:b.status||"confirmed"
    };

    const {error}=await client.from("bookings").insert(payload);
    if(error)throw error;

    return {booking:b};
  }

  async function busySlots(date){
    if(!client)return [];

    const {data,error}=await client.rpc("get_busy_slots",{p_date:date});
    if(error)throw error;

    return (data||[]).map(x=>({
      time:String(x.appointment_time||"").slice(0,5),
      duration:Number(x.duration)
    }));
  }

  async function adminLogin(pin){
    if(!client)return {localOnly:true};

    const {data,error}=await client.auth.signInWithPassword({
      email:cfg.adminEmail,
      password:String(pin)
    });

    if(error)throw error;
    return data;
  }

  async function changeAdminPin(pin){
    if(!client)return {localOnly:true};

    const value=String(pin||"").trim();
    if(!value)throw new Error("PIN cannot be empty");

    const {data,error}=await client.auth.updateUser({password:value});
    if(error)throw error;
    return data;
  }

  async function fetchBookings(){
    if(!client)return null;

    const {data,error}=await client
      .from("bookings")
      .select("*")
      .order("appointment_date",{ascending:true})
      .order("appointment_time",{ascending:true});

    if(error)throw error;
    return (data||[]).map(mapBooking);
  }

  async function cancelBooking(id){
    if(!client)return {localOnly:true};

    const {error}=await client
      .from("bookings")
      .update({status:"cancelled"})
      .eq("id",id);

    if(error)throw error;
    return true;
  }

  async function fetchAvailability(){
    if(!client)return null;

    const {data:hours,error:hoursError}=await client
      .from("availability")
      .select("*")
      .eq("id",1)
      .single();

    if(hoursError)throw hoursError;

    const {data:blocks,error:blocksError}=await client
      .from("blocked_times")
      .select("*")
      .order("block_date",{ascending:true})
      .order("start_time",{ascending:true});

    if(blocksError)throw blocksError;

    return {
      hours,
      blocks:(blocks||[]).map(mapBlock)
    };
  }

  async function saveAvailability(hours){
    if(!client)return {localOnly:true};

    const payload={
      id:1,
      sunday_open:hours[0].open,
      sunday_start:hours[0].start,
      sunday_end:hours[0].end,
      monday_open:hours[1].open,
      monday_start:hours[1].start,
      monday_end:hours[1].end,
      tuesday_open:hours[2].open,
      tuesday_start:hours[2].start,
      tuesday_end:hours[2].end,
      wednesday_open:hours[3].open,
      wednesday_start:hours[3].start,
      wednesday_end:hours[3].end,
      thursday_open:hours[4].open,
      thursday_start:hours[4].start,
      thursday_end:hours[4].end,
      friday_open:hours[5].open,
      friday_start:hours[5].start,
      friday_end:hours[5].end,
      saturday_open:hours[6].open,
      saturday_start:hours[6].start,
      saturday_end:hours[6].end
    };

    const {error}=await client
      .from("availability")
      .update(payload)
      .eq("id",1);

    if(error)throw error;
    return true;
  }

  async function fetchBlockedTimes(){
    if(!client)return [];

    const {data,error}=await client
      .from("blocked_times")
      .select("*")
      .order("block_date",{ascending:true})
      .order("start_time",{ascending:true});

    if(error)throw error;
    return (data||[]).map(mapBlock);
  }

  async function addBlockedTime(block){
    if(!client)return {localOnly:true,...block};

    const {data,error}=await client
      .from("blocked_times")
      .insert({
        block_date:block.date,
        start_time:block.start,
        end_time:block.end,
        reason:block.reason||block.note||"Unavailable"
      })
      .select("id,block_date,start_time,end_time,reason")
      .single();

    if(error)throw error;

    return mapBlock(data);
  }

  async function deleteBlockedTime(blockOrId){
    if(!client)return {localOnly:true};

    const block=(blockOrId && typeof blockOrId==="object") ? blockOrId : null;
    const id=block ? block.id : blockOrId;
    let deleted=[];

    const isUuid=typeof id==="string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

    if(isUuid){
      const {data,error}=await client
        .from("blocked_times")
        .delete()
        .eq("id",id)
        .select("id");

      if(error)throw error;
      deleted=data||[];
    }

    // Older locally-created blocks may not contain the real Supabase UUID.
    if(!deleted.length && block?.date && block?.start && block?.end){
      const {data,error}=await client
        .from("blocked_times")
        .delete()
        .eq("block_date",block.date)
        .eq("start_time",block.start)
        .eq("end_time",block.end)
        .select("id");

      if(error)throw error;
      deleted=data||[];
    }

    if(!deleted.length)throw new Error("Blocked time could not be found in Supabase");
    return {deleted:deleted.length};
  }

  window.CloudDB={
    enabled:()=>!!client,
    createBooking,
    createAdminBooking:createBooking,
    busySlots,
    adminLogin,
    changeAdminPin,
    fetchBookings,
    cancelBooking,
    fetchAvailability,
    saveAvailability,
    fetchBlockedTimes,
    addBlockedTime,
    deleteBlockedTime
  };
})();
