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
    depositPaid:!!r.deposit_paid,
    pinCurls:!!r.pin_curls,
    status:r.status||"confirmed",
    bookingRef:r.booking_ref||"",
    customerHidden:!!r.customer_hidden
  });

  const mapBlock=r=>({
    id:r.id,
    date:r.block_date,
    start:String(r.start_time||"").slice(0,5),
    end:String(r.end_time||"").slice(0,5),
    reason:r.reason||"Unavailable"
  });



  const mapGallery=r=>({
    id:String(r.id),
    src:r.image_url,
    label:r.label||"Hair style",
    storagePath:r.storage_path||"",
    sortOrder:Number(r.sort_order||0)
  });

  async function fetchSiteConfig(){
    if(!client)return null;
    const {data,error}=await client
      .from("site_config")
      .select("id,business_name,tagline,services")
      .eq("id",1)
      .maybeSingle();
    if(error)throw error;
    if(!data)return null;
    return {
      settings:{name:data.business_name||"Hair Studio",tag:data.tagline||""},
      services:Array.isArray(data.services)?data.services:[]
    };
  }

  async function saveSiteConfig({services,settings}){
    if(!client)return {localOnly:true};
    const payload={
      id:1,
      business_name:settings?.name||"Hair Studio",
      tagline:settings?.tag||"",
      services:Array.isArray(services)?services:[],
      updated_at:new Date().toISOString()
    };
    const {error}=await client.from("site_config").upsert(payload,{onConflict:"id"});
    if(error)throw error;
    return true;
  }

  async function fetchGallery(){
    if(!client)return null;
    const {data,error}=await client
      .from("gallery_items")
      .select("id,label,image_url,storage_path,sort_order")
      .order("sort_order",{ascending:true})
      .order("created_at",{ascending:true});
    if(error)throw error;
    return (data||[]).map(mapGallery);
  }

  async function uploadGalleryImage(id,file){
    if(!client)return null;
    const ext=(file.type||"image/jpeg").includes("png")?"png":"jpg";
    const path=`${String(id).replace(/[^a-zA-Z0-9_-]/g,"_")}/${Date.now()}.${ext}`;
    const {error}=await client.storage.from("gallery").upload(path,file,{
      cacheControl:"3600",
      upsert:false,
      contentType:file.type||"image/jpeg"
    });
    if(error)throw error;
    const {data}=client.storage.from("gallery").getPublicUrl(path);
    return {path,url:data.publicUrl};
  }

  async function addGalleryItem(item,file){
    if(!client)return {localOnly:true,item};
    const uploaded=await uploadGalleryImage(item.id,file);
    try{
      const {data,error}=await client.from("gallery_items").insert({
        id:String(item.id),
        label:item.label,
        image_url:uploaded.url,
        storage_path:uploaded.path,
        sort_order:Number(item.sortOrder||0)
      }).select("id,label,image_url,storage_path,sort_order").single();
      if(error)throw error;
      return mapGallery(data);
    }catch(e){
      await client.storage.from("gallery").remove([uploaded.path]).catch(()=>{});
      throw e;
    }
  }

  async function updateGalleryItem(id,{label,file,oldStoragePath,sortOrder}){
    if(!client)return {localOnly:true};
    let uploaded=null;
    if(file)uploaded=await uploadGalleryImage(id,file);
    const payload={};
    if(label!==undefined)payload.label=label;
    if(sortOrder!==undefined)payload.sort_order=Number(sortOrder||0);
    if(uploaded){payload.image_url=uploaded.url;payload.storage_path=uploaded.path;}
    try{
      const {data,error}=await client.from("gallery_items")
        .update(payload).eq("id",String(id))
        .select("id,label,image_url,storage_path,sort_order").single();
      if(error)throw error;
      if(uploaded&&oldStoragePath&&oldStoragePath!==uploaded.path){
        await client.storage.from("gallery").remove([oldStoragePath]).catch(()=>{});
      }
      return mapGallery(data);
    }catch(e){
      if(uploaded)await client.storage.from("gallery").remove([uploaded.path]).catch(()=>{});
      throw e;
    }
  }

  async function deleteGalleryItem(item){
    if(!client)return {localOnly:true};
    const {error}=await client.from("gallery_items").delete().eq("id",String(item.id));
    if(error)throw error;
    if(item.storagePath)await client.storage.from("gallery").remove([item.storagePath]).catch(()=>{});
    return true;
  }

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
      deposit_paid:!!b.depositPaid,
      pin_curls:!!b.pinCurls,
      status:b.status||"confirmed",
      booking_ref:b.bookingRef||null
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

  async function customerGetBookings(email,phone){
    if(!client)return [];
    const {data,error}=await client.rpc("customer_get_bookings",{p_email:String(email||"").trim().toLowerCase(),p_phone:String(phone||"")});
    if(error)throw error;
    return (data||[]).map(mapBooking);
  }

  async function customerRescheduleBusySlots(date,bookingId,email,phone){
    if(!client)return [];
    const {data,error}=await client.rpc("customer_reschedule_busy_slots",{p_date:date,p_booking_id:bookingId,p_email:String(email||"").trim().toLowerCase(),p_phone:String(phone||"")});
    if(error)throw error;
    return (data||[]).map(x=>({time:String(x.appointment_time||"").slice(0,5),duration:Number(x.duration)}));
  }

  async function customerRescheduleBooking(bookingId,email,phone,date,time){
    if(!client)throw new Error("Online booking management is unavailable");
    const {data,error}=await client.rpc("customer_reschedule_booking",{
      p_booking_id:bookingId,
      p_email:String(email||"").trim().toLowerCase(),
      p_phone:String(phone||""),
      p_date:date,
      p_time:time
    });
    if(error)throw error;
    const row=Array.isArray(data)?data[0]:data;
    return row?mapBooking(row):null;
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

  async function adminLogout(){
    if(!client)return {localOnly:true};
    const {error}=await client.auth.signOut();
    if(error)throw error;
    return {ok:true};
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



  async function hideCustomer(phone){
    if(!client)return {localOnly:true};
    const value=String(phone||"").trim();
    if(!value)throw new Error("Customer mobile number is missing");
    const {error}=await client
      .from("bookings")
      .update({customer_hidden:true})
      .eq("phone",value);
    if(error)throw error;
    return true;
  }

  async function updateBookingStatus(id,status){
    if(!client)return {localOnly:true};
    const allowed=["confirmed","arrived","completed","no_show","cancelled"];
    if(!allowed.includes(status))throw new Error("Invalid appointment status");
    const {data,error}=await client
      .from("bookings")
      .update({status})
      .eq("id",id)
      .select("id,status")
      .single();
    if(error)throw error;
    return {id:data.id,status:data.status};
  }

  async function updateDepositPaid(id,paid){
    if(!client)return {localOnly:true};

    const {data,error}=await client
      .from("bookings")
      .update({deposit_paid:!!paid})
      .eq("id",id)
      .select("id,deposit_paid")
      .single();

    if(error)throw error;
    return {id:data.id,depositPaid:!!data.deposit_paid};
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

  async function sendAdminPinReset(){
    if(!client)throw new Error("Online PIN reset is unavailable");
    if(!cfg.adminEmail)throw new Error("Admin email is not configured");

    const {data,error}=await client.auth.resetPasswordForEmail(cfg.adminEmail,{
      redirectTo:`${window.location.origin}/`
    });
    if(error)throw error;
    return data;
  }

  function onAuthStateChange(callback){
    if(!client||typeof callback!=="function")return {data:{subscription:null}};
    return client.auth.onAuthStateChange((event,session)=>callback(event,session));
  }

  async function getAuthSession(){
    if(!client)return null;
    const {data,error}=await client.auth.getSession();
    if(error)throw error;
    return data?.session||null;
  }

  async function finishPasswordRecovery(pin){
    if(!client)throw new Error("Online password reset is unavailable");
    const value=String(pin||"").trim();
    if(!value)throw new Error("PIN cannot be empty");
    const {data,error}=await client.auth.updateUser({password:value});
    if(error)throw error;
    return data;
  }

  window.CloudDB={
    enabled:()=>!!client,
    createBooking,
    createAdminBooking:createBooking,
    customerGetBookings,
    customerRescheduleBusySlots,
    customerRescheduleBooking,
    busySlots,
    adminLogin,
    adminLogout,
    changeAdminPin,
    sendAdminPinReset,
    onAuthStateChange,
    getAuthSession,
    finishPasswordRecovery,
    fetchBookings,
    hideCustomer,
    updateDepositPaid,
    updateBookingStatus,
    cancelBooking,
    fetchAvailability,
    saveAvailability,
    fetchBlockedTimes,
    addBlockedTime,
    deleteBlockedTime,
    fetchSiteConfig,
    saveSiteConfig,
    fetchGallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
  };
})();
