(function(){
  const cfg=window.HL_CLOUD_CONFIG||{};
  const configured=cfg.url&&cfg.anonKey&&cfg.adminEmail &&
    !cfg.url.includes("PASTE_")&&!cfg.anonKey.includes("PASTE_")&&!cfg.adminEmail.includes("PASTE_");
  const client=(configured&&window.supabase)?window.supabase.createClient(cfg.url,cfg.anonKey):null;

  const mapBooking=r=>({
    id:r.id,name:r.customer_name,phone:r.phone,email:r.email||"",notes:r.notes||"",
    serviceId:r.service_id,serviceName:r.service_name,date:r.appointment_date,
    time:String(r.appointment_time||"").slice(0,5),duration:Number(r.duration),
    price:Number(r.price),basePrice:Number(r.base_price),deposit:Number(r.deposit),
    pinCurls:!!r.pin_curls,status:r.status||"confirmed"
  });

  async function createBooking(b){
    if(!client)return {localOnly:true,booking:b};
    const payload={
      customer_name:b.name,phone:b.phone,email:b.email||null,notes:b.notes||null,
      service_id:b.serviceId,service_name:b.serviceName,appointment_date:b.date,
      appointment_time:b.time,duration:b.duration,price:b.price,base_price:b.basePrice,
      deposit:b.deposit,pin_curls:!!b.pinCurls,status:b.status||"confirmed"
    };
    const {data,error}=await client.from("bookings").insert(payload).select().single();
    if(error)throw error;
    return {booking:mapBooking(data)};
  }

  async function busySlots(date){
    if(!client)return [];
    const {data,error}=await client.rpc("get_busy_slots",{p_date:date});
    if(error)throw error;
    return (data||[]).map(x=>({time:String(x.appointment_time||"").slice(0,5),duration:Number(x.duration)}));
  }

  async function adminLogin(pin){
    if(!client)return {localOnly:true};
    const {data,error}=await client.auth.signInWithPassword({email:cfg.adminEmail,password:String(pin)});
    if(error)throw error;
    return data;
  }

  async function fetchBookings(){
    if(!client)return null;
    const {data,error}=await client.from("bookings").select("*")
      .order("appointment_date",{ascending:true}).order("appointment_time",{ascending:true});
    if(error)throw error;
    return (data||[]).map(mapBooking);
  }

  async function cancelBooking(id){
    if(!client)return {localOnly:true};
    const {error}=await client.from("bookings").update({status:"cancelled"}).eq("id",id);
    if(error)throw error;
    return true;
  }

  window.CloudDB={
    enabled:()=>!!client,
    createBooking,
    createAdminBooking:createBooking,
    busySlots,
    adminLogin,
    fetchBookings,
    cancelBooking
  };
})();
