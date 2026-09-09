const PORTFOLIO=[{"id":"g1","src":"assets/hair_up_01.jpeg","label":"Hair Up"},{"id":"g2","src":"assets/hair_up_02.jpeg","label":"Hair Up"},{"id":"g3","src":"assets/hair_up_03.jpeg","label":"Hair Up"},{"id":"g4","src":"assets/waves_01.jpg","label":"Hollywood Waves"},{"id":"g5","src":"assets/curls_01.jpg","label":"Curls"},{"id":"g6","src":"assets/long_hair_01.jpg","label":"Long Hair"},{"id":"g7","src":"assets/blowdry_01.jpg","label":"Blow Dry"},{"id":"g8","src":"assets/hair_up_04.jpg","label":"Occasion Hair"}];
const DEF={"settings":{"name":"Hair Studio","tag":"Look good. Feel amazing.","pin":"1234"},"services":[{"id":"feat_hairup","category":"Featured","name":"Hair Up","duration":45,"price":30,"deposit":10,"note":""},{"id":"feat_blow_noext","category":"Featured","name":"Blow Dry (No Extensions)","duration":45,"price":30,"deposit":10,"note":""},{"id":"feat_weave1","category":"Featured","name":"Weave Fitting \u2014 1 Row","duration":45,"price":20,"deposit":10,"note":""},{"id":"feat_weave2","category":"Featured","name":"Weave Fitting \u2014 2 Rows","duration":90,"price":40,"deposit":10,"note":""},{"id":"feat_weave3","category":"Featured","name":"Weave Fitting \u2014 3 Rows","duration":120,"price":60,"deposit":10,"note":""},{"id":"feat_blow_ext","category":"Featured","name":"Blow Dry (Extensions)","duration":60,"price":35,"deposit":10,"note":""},{"id":"dry_hairup_noext","category":"Dry Styling","name":"Hair Up (No Extensions)","duration":45,"price":30,"deposit":10,"note":""},{"id":"dry_hairup_ext","category":"Dry Styling","name":"Hair Up (Extensions)","duration":60,"price":35,"deposit":10,"note":""},{"id":"ext_consult","category":"Extensions","name":"Extension Consultation","duration":20,"price":0,"deposit":0,"note":"Free consultation."},{"id":"ext_remove","category":"Extensions","name":"Extension Removal","duration":20,"price":10,"deposit":0,"note":""},{"id":"tape1","category":"Extensions","name":"Tape Application \u2014 1 Pack","duration":40,"price":25,"deposit":10,"note":""},{"id":"tape2","category":"Extensions","name":"Tape Application \u2014 2 Packs","duration":75,"price":50,"deposit":10,"note":""},{"id":"tape3","category":"Extensions","name":"Tape Application \u2014 3 Packs","duration":120,"price":75,"deposit":10,"note":""},{"id":"nano1","category":"Extensions","name":"Nano Extension Fitting \u2014 1 Pack","duration":60,"price":45,"deposit":10,"note":""},{"id":"nano2","category":"Extensions","name":"Nano Extension Fitting \u2014 2 Packs","duration":120,"price":90,"deposit":10,"note":""},{"id":"nano3","category":"Extensions","name":"Nano Extension Fitting \u2014 3 Packs","duration":180,"price":135,"deposit":10,"note":""},{"id":"weave1","category":"Extensions","name":"Weave Fitting \u2014 1 Row","duration":45,"price":20,"deposit":10,"note":""},{"id":"weave2","category":"Extensions","name":"Weave Fitting \u2014 2 Rows","duration":75,"price":40,"deposit":10,"note":""},{"id":"weave3","category":"Extensions","name":"Weave Fitting \u2014 3 Rows","duration":120,"price":60,"deposit":10,"note":""},{"id":"skin","category":"Colour","name":"Skin Test","duration":5,"price":0,"deposit":0,"note":"Must be booked a minimum of 48 hours before your colour service. Failure to do so may result in cancellation."},{"id":"colour_consult","category":"Colour","name":"Colour Consultation","duration":20,"price":0,"deposit":0,"note":"Please book your colour consultation 1 week before your colour appointment."},{"id":"full_colour","category":"Colour","name":"Full Head Colour","duration":150,"price":85,"deposit":10,"note":"Includes cut and blow dry."},{"id":"toner","category":"Colour","name":"Toner","duration":90,"price":50,"deposit":10,"note":"Includes cut and blow dry."},{"id":"face_foils","category":"Colour","name":"Face Frame Foils","duration":180,"price":60,"deposit":10,"note":"Includes cut and blow dry."},{"id":"full_high","category":"Colour","name":"Full Head Highlights","duration":300,"price":115,"deposit":10,"note":"Includes cut and blow dry."},{"id":"half_high","category":"Colour","name":"Half Head Highlights","duration":240,"price":90,"deposit":10,"note":"Includes cut and blow dry."},{"id":"balayage","category":"Colour","name":"Balayage","duration":300,"price":115,"deposit":10,"note":"Includes cut and blow dry."},{"id":"style_blow_noext","category":"Hair & Styling","name":"Blow Dry (No Extensions)","duration":45,"price":30,"deposit":10,"note":""},{"id":"style_blow_ext","category":"Hair & Styling","name":"Blow Dry (Extensions)","duration":60,"price":35,"deposit":10,"note":""},{"id":"curly_noext","category":"Hair & Styling","name":"Curly Blow Dry (No Extensions)","duration":60,"price":33,"deposit":10,"note":""},{"id":"curly_ext","category":"Hair & Styling","name":"Curly Blow Dry (Extensions)","duration":90,"price":37,"deposit":10,"note":""},{"id":"cut_blow","category":"Hair & Styling","name":"Cut & Blow Dry","duration":75,"price":35,"deposit":10,"note":"Medium/long hair."},{"id":"dry_cut","category":"Hair & Styling","name":"Dry Cut","duration":30,"price":25,"deposit":10,"note":"Medium/long hair."}],"hours":{"0":{"open":false,"start":"09:00","end":"17:00"},"1":{"open":true,"start":"09:00","end":"18:00"},"2":{"open":true,"start":"09:00","end":"18:00"},"3":{"open":true,"start":"09:00","end":"18:00"},"4":{"open":true,"start":"09:00","end":"19:00"},"5":{"open":true,"start":"09:00","end":"19:00"},"6":{"open":true,"start":"09:00","end":"17:00"}},"bookings":[],"blocks":[]};
let S=JSON.parse(localStorage.getItem("studioV3")||"null")||structuredClone(DEF),W={step:1},photo=0,authed=false;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],save=()=>localStorage.setItem("studioV3",JSON.stringify(S));

if(!localStorage.getItem("studioV4Categories")){
 S.services=structuredClone(DEF.services);
 localStorage.setItem("studioV4Categories","1");
}
if(!Array.isArray(S.gallery)) S.gallery=structuredClone(PORTFOLIO);
S.gallery=S.gallery.map((g,i)=>({id:g.id||("g"+Date.now()+i),src:g.src,label:g.label||"Hair style"}));
save();

const esc=x=>String(x??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const today=()=>{let d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}, mins=t=>{let a=t.split(":").map(Number);return a[0]*60+a[1]}, ts=m=>String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0"), uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function nice(d){return new Date(d+"T12:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})} function toast(x){let t=$("#toast");t.textContent=x;t.style.display="block";setTimeout(()=>t.style.display="none",1800)}

const CATEGORY_ORDER=["Featured","Dry Styling","Extensions","Colour","Hair & Styling"];
function durationText(m){m=Number(m);if(m<60)return m+" mins";let h=Math.floor(m/60),r=m%60;return h+" hr"+(h!==1?"s":"")+(r?" "+r+" mins":"")}
function categoryMarkup(clickFn="startService"){
 return CATEGORY_ORDER.map(cat=>{
   let items=S.services.filter(s=>s.category===cat);
   if(!items.length)return "";
   return `<section class="service-category"><div class="category-title"><h3>${esc(cat)}</h3><span>${items.length} service${items.length===1?"":"s"}</span></div><div class="category-items">${items.map(x=>`<div class="service" onclick="${clickFn}('${x.id}')"><div><b>${esc(x.name)}</b><small>${durationText(x.duration)}${x.note?` · ${esc(x.note)}`:""}</small></div><b>${x.price===0?"Free":"£"+x.price}</b></div>`).join("")}</div></section>`;
 }).join("");
}

function render(){
 const brand=$("#brand"),title=$("#title"),tag=$("#tag"),services=$("#services"),preview=$("#preview"),photos=$("#photos");
 if(brand)brand.textContent=S.settings.name;if(title)title.textContent=S.settings.name;if(tag)tag.textContent=S.settings.tag;
 if(services)services.innerHTML=categoryMarkup();
 if(preview)preview.innerHTML=S.gallery.slice(0,4).map((p,i)=>`<button onclick="openPhoto(${i})"><img src="${p.src}" alt="${esc(p.label)}"></button>`).join("");
 if(photos)photos.innerHTML=S.gallery.length?S.gallery.map((p,i)=>`<button onclick="openPhoto(${i})"><img src="${p.src}" alt="${esc(p.label)}"><em>${esc(p.label)}</em></button>`).join(""):`<div class="empty-gallery">Gallery photos will appear here.</div>`;
 let gc=$("#galleryCount");if(gc)gc.textContent="View all "+S.gallery.length;
}
function hideCustomer(){["home","gallery","booking","mine"].forEach(x=>{const el=$("#"+x);if(el)el.classList.add("hide")})}
function home(){hideCustomer();const el=$("#home");if(el)el.classList.remove("hide")}
function showGallery(){hideCustomer();const el=$("#gallery");if(el)el.classList.remove("hide");scrollTo(0,0)}
function showMine(){hideCustomer();const el=$("#mine");if(el)el.classList.remove("hide");const list=$("#mineList");if(list)list.innerHTML=""}
function openPhoto(i){if(!S.gallery.length)return;photo=i;photoUpdate();$("#lightbox").classList.remove("hide")}
function photoUpdate(){let p=S.gallery[photo];if(!p)return;$("#bigphoto").src=p.src;$("#counter").textContent=`${photo+1} / ${S.gallery.length}`;$("#caption").textContent=p.label}
function movePhoto(n){if(!S.gallery.length)return;photo=(photo+n+S.gallery.length)%S.gallery.length;photoUpdate()}
function closePhoto(){$("#lightbox").classList.add("hide")}
function depositFor(service){
  if(!service || Number(service.price||0)===0) return 0;
  const configured=Number(service.deposit);
  if(Number.isFinite(configured))return Math.max(0,configured);
  return service.category==="Colour" ? 20 : 10;
}
function supportsPinCurls(service){return !!service && (service.name||"").toLowerCase().includes("blow dry")}
function bookingStart(){
  W={step:1,category:null,pinCurls:false};
  home();
  const h=$("#home");if(h)h.scrollIntoView({behavior:"smooth",block:"start"});
}
async function startService(id){
  await syncCloudAvailability(false);
  hideCustomer();
  $("#booking").classList.remove("hide");
  W={step:1,category:null,pinCurls:false};
  W.service=S.services.find(x=>x.id===id);
  W.category=W.service?.category;
  W.step=supportsPinCurls(W.service)?3:4;
  bookRender();
  scrollTo(0,0);
}
function back(){
  if(!W.service)return bookingBack();
  if(W.step===3||W.step===4)return bookingBack();
  if(W.step===5){W.step=4;W.time=null;bookRender();return}
  if(W.step===6){W.step=5;bookRender();return}
  return bookingBack();
}

function bookingBack(){
  W={step:1,category:null,pinCurls:false};
  home();
  const h=$("#home");if(h)h.scrollIntoView({behavior:"smooth",block:"start"});
}

function bookRender(){
 const blow=supportsPinCurls(W.service),total=blow?6:5;
 let shown=(!blow&&W.step>=4)?W.step-1:W.step;
 $("#step").textContent=shown+" / "+total;$("#progress").style.width=(shown/total*100)+"%";
 if(W.step===1){bookingBack();return}
 if(false)$("#bookbody").innerHTML=`<div class="bookcard"><h2>Choose a category</h2><p class="category-help">What would you like to book?</p><div class="book-category-grid">${CATEGORY_ORDER.map(cat=>`<button class="book-category-card" onclick="pickCategory('${cat.replace(/'/g,"\\'")}')"><span>${esc(cat)}</span><b>›</b></button>`).join("")}</div></div>`;
 if(W.step===2){bookingBack();return}
 if(false){let items=S.services.filter(s=>s.category===W.category);$("#bookbody").innerHTML=`<div class="bookcard"><span class="eyebrow-small">${esc(W.category)}</span><h2>Choose a service</h2><div class="choices">${items.map(x=>`<button class="choice service-choice" onclick="pickService('${x.id}')"><span><b>${esc(x.name)}</b><small>${durationText(x.duration)}${x.note?` · ${esc(x.note)}`:""}${supportsPinCurls(x)?" · Pin curls +£2 optional":""}</small></span><strong>${x.price===0?"Free":"£"+x.price}</strong></button>`).join("")}</div></div>`}
 if(W.step===3)pinCurlStep();if(W.step===4)dateStep();if(W.step===5)timeStep();if(W.step===6)details()
}
function pickCategory(cat){W.category=cat;W.step=2;bookRender()}
function pinCurlStep(){let x=W.service;$("#bookbody").innerHTML=`<div class="bookcard addon-step"><span class="eyebrow-small">${esc(x.name)}</span><h2>Would you like to add pin curls?</h2><p class="category-help">Choose an option before selecting your appointment date.</p><div class="pin-options"><button class="pin-option" onclick="choosePinCurls(false)"><div><b>No thanks</b><small>Continue with ${esc(x.name)}</small></div><strong>£${x.price}</strong></button><button class="pin-option featured-addon" onclick="choosePinCurls(true)"><div><b>Add Pin Curls</b><small>Add pin curls to your blow dry</small></div><strong>+£2</strong></button></div></div>`}
function choosePinCurls(v){W.pinCurls=!!v;W.step=4;bookRender()}
function pickService(id){W.service=S.services.find(x=>x.id===id);W.category=W.service.category;W.pinCurls=false;W.step=supportsPinCurls(W.service)?3:4;bookRender()} function dateStep(){let out=[],d=new Date();for(let i=0;i<42;i++){let x=new Date(d);x.setDate(d.getDate()+i);if(!S.hours[x.getDay()].open)continue;let iso=x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");out.push(`<button class="choice" onclick="pickDate('${iso}')">${x.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</button>`)}$("#bookbody").innerHTML=`<div class="bookcard"><h2>Choose a date</h2><p>${esc(W.service.name)}</p><div class="dates">${out.join("")}</div></div>`} async function pickDate(d){W.date=d;W.cloudBusy=[];if(window.CloudDB?.enabled()){try{await syncCloudAvailability(false);W.cloudBusy=await CloudDB.busySlots(d)}catch(e){console.error(e);return toast("Could not check online availability")}}W.step=5;bookRender()}
function overlap(t,d,b,bd){return mins(t)<mins(b)+bd&&mins(b)<mins(t)+d} function bookingBlocksTime(b){return !["cancelled","no_show"].includes(b.status||"confirmed")} function slots(){let h=S.hours[new Date(W.date+"T12:00").getDay()],o=[];for(let m=mins(h.start);m+W.service.duration<=mins(h.end);m+=30){let t=ts(m),busy=S.bookings.some(b=>bookingBlocksTime(b)&&b.date===W.date&&overlap(t,W.service.duration,b.time,b.duration)),cloud=(W.cloudBusy||[]).some(b=>overlap(t,W.service.duration,b.time,b.duration)),block=S.blocks.some(b=>b.date===W.date&&overlap(t,W.service.duration,b.start,mins(b.end)-mins(b.start)));if(!busy&&!cloud&&!block)o.push(t)}return o} function timeStep(){$("#bookbody").innerHTML=`<div class="bookcard"><h2>Choose a time</h2><p>${nice(W.date)}</p><div class="times">${slots().map(t=>`<button class="choice" onclick="pickTime('${t}')">${t}</button>`).join("")||"No times available"}</div></div>`} function pickTime(t){W.time=t;W.step=6;bookRender()}
function details(){
 let x=W.service,total=x.price+(W.pinCurls?2:0),dep=depositFor(x),remaining=Math.max(0,total-dep);
 $("#bookbody").innerHTML=`<div class="bookcard"><h2>Your details</h2>
 <div class="form"><input id="bn" placeholder="Full name"><input id="bp" placeholder="Mobile number"><input id="be" type="email" placeholder="Email address" autocomplete="email"><textarea id="bnotes" placeholder="Notes — you can mention a gallery style you like"></textarea></div>
 <div class="summary"><b>${esc(x.name)}</b><br>${nice(W.date)} at ${W.time}<br><small class="booking-location">Cobella &amp; Co · 215 London Road, Hazel Grove, Stockport · SK7 4HS</small><br>${x.price===0?"Free":"£"+x.price}${W.pinCurls?"<br><b>Pin Curls +£2</b>":""}</div>
 ${dep?`<div class="deposit-notice"><span class="deposit-badge">DEPOSIT REQUIRED</span><h3>£${dep} deposit</h3><p>A £${dep} deposit is required to secure this appointment. Payment details will be sent to you after your booking request.</p><small>Remaining balance after deposit: £${remaining}</small></div>`:`<div class="deposit-notice free-booking"><h3>No deposit required</h3><p>This is a free appointment/service.</p></div>`}
 <div class="booking-total"><span>Service total</span><b>${total===0?"Free":"£"+total}</b></div>
 <button class="primary full" onclick="confirmBook()">Request booking</button></div>`;
}
async function confirmBook(){let n=$("#bn").value.trim(),p=$("#bp").value.trim(),e=$("#be").value.trim();if(!n||!p||!e)return toast("Add your name, mobile and email");if(!/^\S+@\S+\.\S+$/.test(e))return toast("Add a valid email address");let x=W.service,booking={id:uid(),name:n,phone:p,email:e,notes:$("#bnotes").value,serviceId:x.id,serviceName:x.name,date:W.date,time:W.time,duration:x.duration,price:x.price+(W.pinCurls?2:0),basePrice:x.price,deposit:depositFor(x),depositPaid:false,pinCurls:!!W.pinCurls,status:"confirmed",bookingRef:bookingRef()};let btn=$("#bookbody .primary.full");if(btn){btn.disabled=true;btn.textContent="Saving booking…"}try{if(window.CloudDB?.enabled()){let r=await CloudDB.createBooking(booking);if(r?.booking)booking=r.booking}}catch(err){console.error(err);if(btn){btn.disabled=false;btn.textContent="Request booking"}return toast((err?.message||"").includes("appointment time")?"That time has just been taken. Please choose another time.":"Could not save booking online. Please try again.")}S.bookings.push(booking);save();$("#bookbody").innerHTML=`<div class="bookcard" style="text-align:center"><h2>✓ You're booked</h2><p>${nice(W.date)} at ${W.time}${W.pinCurls?"<br>Pin Curls +£2":""}</p>${depositFor(x)?`<div class="deposit-confirm"><b>£${depositFor(x)} deposit required</b><br><span>Your payment details will be sent to you separately to secure the appointment.</span></div>`:""}<div class="deposit-notice"><b>Manage your booking online</b><br><span>Use the email address and mobile number you booked with. You can reschedule up to 48 hours before your appointment.</span></div><p class="confirm-address">Cobella &amp; Co<br>215 London Road, Hazel Grove, Stockport, SK7 4HS</p><button class="primary" onclick="home()">Done</button></div>`;if(authed)adminRender()}
let MY={bookings:[],booking:null,email:"",phone:"",busy:[],date:""};
function customerCutoffOk(b){
  const at=new Date(`${b.date}T${b.time}:00`);
  return at.getTime()-Date.now()>=48*60*60*1000;
}
async function lookup(){
  const email=(document.querySelector("#lookupEmail")?.value||"").trim().toLowerCase();
  const phone=(document.querySelector("#lookup")?.value||"").trim();
  const list=document.querySelector("#mineList");
  if(!email||!phone){if(list)list.innerHTML="<div class='card'>Enter your email address and mobile number.</div>";return}
  try{
    if(!window.CloudDB?.enabled()||typeof CloudDB.customerGetBookings!=="function")throw new Error("Online booking management is unavailable");
    const rows=await CloudDB.customerGetBookings(email,phone);
    if(!rows?.length){list.innerHTML="<div class='card'>We couldn't find any bookings with those details. Check the email address and mobile number.</div>";return}
    MY={bookings:rows,booking:null,email,phone,busy:[],date:""};
    renderMyBookings();
  }catch(err){console.error(err);list.innerHTML="<div class='card'>Could not load your bookings. Please try again.</div>"}
}
function renderMyBookings(){
  const list=document.querySelector("#mineList");if(!list)return;
  const rows=(MY.bookings||[]).slice().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
  const upcoming=rows.filter(b=>b.status!=="cancelled"&&new Date(`${b.date}T${b.time}:00`).getTime()>=Date.now());
  const past=rows.filter(b=>!upcoming.includes(b));
  const card=b=>{
    const manageable=b.status==="confirmed"&&customerCutoffOk(b);
    const status={confirmed:"Booked",arrived:"Arrived",completed:"Completed",no_show:"No-show",cancelled:"Cancelled"}[b.status]||"Booked";
    return `<div class="card my-booking-card"><div class="my-booking-head"><div><small>${esc(status.toUpperCase())}</small><h3>${esc(b.serviceName)}</h3></div><span class="status-pill">${status}</span></div><p><b>${nice(b.date)} at ${b.time}</b><br>${b.duration} minutes${b.pinCurls?" · Pin Curls +£2":""}</p><p>${b.price===0?"Free":"£"+b.price}${b.deposit?` · £${b.deposit} deposit`:""}</p>${manageable?`<div class="my-booking-actions"><button onclick="startCustomerReschedule('${b.id}')">Reschedule</button></div><small class="cutoff-note">You can reschedule online up to 48 hours before your appointment.</small>`:`${b.status==="confirmed"?`<div class="cutoff-locked">This appointment is within 48 hours and can no longer be rescheduled online.</div>`:""}`}<div class="cutoff-note"><b>Need to cancel?</b> Please contact me directly. Cancellations must be made at least 48 hours before your appointment.</div></div>`;
  };
  list.innerHTML=`${upcoming.length?`<h3 class="manage-section-title">Upcoming appointments</h3>${upcoming.map(card).join("")}`:"<div class='card'>No upcoming appointments.</div>"}${past.length?`<h3 class="manage-section-title">Previous appointments</h3>${past.map(card).join("")}`:""}`;
}
function renderMyBooking(){renderMyBookings()}
function startCustomerReschedule(id){
  const b=(MY.bookings||[]).find(x=>x.id===id);if(!b)return toast("Booking not found");MY.booking=b;
  if(!customerCutoffOk(b))return toast("This booking is inside the 48-hour rescheduling window");
  let out=[],d=new Date();for(let i=0;i<42;i++){let x=new Date(d);x.setDate(d.getDate()+i);if(!S.hours[x.getDay()]?.open)continue;let iso=x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");out.push(`<button class="choice" onclick="customerRescheduleDate('${iso}')">${x.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</button>`)}
  document.querySelector("#mineList").innerHTML=`<div class="card"><button class="text-back" onclick="renderMyBookings()">← Back</button><h3>Choose a new date</h3><p>${esc(b.serviceName)}</p><div class="dates">${out.join("")}</div><div class="cutoff-note"><b>Need to cancel?</b> Please contact me directly. Cancellations must be made at least 48 hours before your appointment.</div></div>`;
}
async function customerRescheduleDate(date){
  const b=MY.booking;if(!b)return;MY.date=date;try{await syncCloudAvailability(false);MY.busy=await CloudDB.customerRescheduleBusySlots(date,b.id,MY.email,MY.phone)}catch(err){console.error(err);return toast("Could not check availability")}
  const h=S.hours[new Date(date+"T12:00").getDay()],o=[];for(let m=mins(h.start);m+b.duration<=mins(h.end);m+=30){let t=ts(m),busy=(MY.busy||[]).some(x=>overlap(t,b.duration,x.time,x.duration)),block=S.blocks.some(x=>x.date===date&&overlap(t,b.duration,x.start,mins(x.end)-mins(x.start)));if(!busy&&!block)o.push(t)}
  document.querySelector("#mineList").innerHTML=`<div class="card"><button class="text-back" onclick="startCustomerReschedule('${b.id}')">← Back</button><h3>Choose a new time</h3><p>${nice(date)}</p><div class="times">${o.map(t=>`<button class="choice" onclick="customerRescheduleSave('${t}')">${t}</button>`).join("")||"No times available"}</div></div>`;
}
async function customerRescheduleSave(time){
  const b=MY.booking;if(!b)return;if(!confirm(`Move your appointment to ${nice(MY.date)} at ${time}?`))return;
  try{const updated=await CloudDB.customerRescheduleBooking(b.id,MY.email,MY.phone,MY.date,time);if(updated){MY.booking=updated;MY.bookings=MY.bookings.map(x=>x.id===updated.id?updated:x)}renderMyBookings();toast("Booking rescheduled")}catch(err){console.error(err);const m=err?.message||"";toast(m.includes("48")?"This booking is inside the 48-hour rescheduling window":m.includes("taken")?"That time has just been taken":"Could not reschedule booking")}
}
async function syncAdminBookings(){if(!window.CloudDB?.enabled())return;try{let rows=await CloudDB.fetchBookings();if(Array.isArray(rows)){S.bookings=rows;save()}}catch(e){console.error(e);toast("Could not refresh online bookings")}}
function cloudHoursToLocal(row){
  if(!row)return null;
  const names=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  let out={},found=false;
  names.forEach((name,i)=>{
    const ok=name+"_open",sk=name+"_start",ek=name+"_end";
    if(Object.prototype.hasOwnProperty.call(row,ok)){
      found=true;
      out[i]={
        open:!!row[ok],
        start:String(row[sk]||S.hours[i]?.start||"09:00").slice(0,5),
        end:String(row[ek]||S.hours[i]?.end||"17:00").slice(0,5)
      };
    }
  });
  return found?out:null;
}
function normaliseCloudBlock(b){
  return {
    id:b.id,
    date:b.date||b.block_date,
    start:String(b.start||b.start_time||"").slice(0,5),
    end:String(b.end||b.end_time||"").slice(0,5),
    reason:b.reason||b.note||"Unavailable"
  };
}
async function syncCloudAvailability(showError=false){
  if(!window.CloudDB?.enabled())return;
  let gotBlocks=false;

  try{
    if(typeof CloudDB.fetchAvailability==="function"){
      const data=await CloudDB.fetchAvailability();
      const mapped=cloudHoursToLocal(data?.hours);
      if(mapped)S.hours=mapped;
      if(Array.isArray(data?.blocks)){
        S.blocks=data.blocks.map(normaliseCloudBlock);
        gotBlocks=true;
      }
    }
  }catch(e){
    console.error("Availability sync failed:",e);
  }

  try{
    if(typeof CloudDB.fetchBlockedTimes==="function"){
      const rows=await CloudDB.fetchBlockedTimes();
      if(Array.isArray(rows)){
        S.blocks=rows.map(normaliseCloudBlock);
        gotBlocks=true;
      }
    }
  }catch(e){
    console.error("Blocked-time sync failed:",e);
    if(showError)toast("Could not refresh blocked times");
  }

  if(gotBlocks)save();
}

async function syncCloudGallery(showError=false){
  if(!window.CloudDB?.enabled()||typeof CloudDB.fetchGallery!=="function")return;
  try{
    const rows=await CloudDB.fetchGallery();
    if(Array.isArray(rows)&&rows.length){
      S.gallery=rows;
      save();
      render();
      if(authed)renderGalleryAdmin();
    }
  }catch(e){
    console.error("Gallery sync failed:",e);
    if(showError)toast("Could not refresh gallery");
  }
}
async function syncCloudContent(showError=false){
  if(!window.CloudDB?.enabled()||typeof CloudDB.fetchSiteConfig!=="function")return;
  try{
    const cfg=await CloudDB.fetchSiteConfig();
    if(cfg){
      if(Array.isArray(cfg.services)&&cfg.services.length)S.services=cfg.services;
      if(cfg.settings){
        S.settings.name=cfg.settings.name||S.settings.name;
        S.settings.tag=cfg.settings.tag??S.settings.tag;
      }
      save();
      render();
      if(authed)renderServiceAdmin();
    }
  }catch(e){
    console.error("Site content sync failed:",e);
    if(showError)toast("Could not refresh services/settings");
  }
}

function normaliseLegacyDepositsForCloud(){
  if(localStorage.getItem("studioV30DepositMigration"))return;
  const byId=Object.fromEntries(DEF.services.map(x=>[x.id,x]));
  S.services.forEach(s=>{
    const d=byId[s.id];
    if(!d)return;
    if(Number(s.deposit)===Number(d.deposit)){
      s.deposit=Number(s.price||0)===0?0:(s.category==="Colour"?20:10);
    }
  });
  localStorage.setItem("studioV30DepositMigration","1");
  save();
}

async function sourceToGalleryFile(src,id){
  let url=String(src||"");
  if(!url)throw new Error("Missing image source");
  if(!url.startsWith("data:"))url=new URL(url,location.origin+"/").href;
  const r=await fetch(url,{cache:"no-store"});
  if(!r.ok)throw new Error("Could not read gallery image");
  const blob=await r.blob();
  const type=blob.type||"image/jpeg";
  const ext=type.includes("png")?"png":"jpg";
  return new File([blob],`gallery-${id}.${ext}`,{type});
}

async function bootstrapCloudFromThisDevice(){
  if(!window.CloudDB?.enabled())return;
  normaliseLegacyDepositsForCloud();

  if(typeof CloudDB.fetchSiteConfig==="function"&&typeof CloudDB.saveSiteConfig==="function"){
    const cfg=await CloudDB.fetchSiteConfig();
    if(!cfg){
      await CloudDB.saveSiteConfig({services:S.services,settings:{name:S.settings.name,tag:S.settings.tag}});
    }else{
      if(Array.isArray(cfg.services)&&cfg.services.length)S.services=cfg.services;
      if(cfg.settings){S.settings.name=cfg.settings.name||S.settings.name;S.settings.tag=cfg.settings.tag??S.settings.tag;}
    }
  }

  if(typeof CloudDB.fetchGallery==="function"&&typeof CloudDB.addGalleryItem==="function"){
    const cloudGallery=await CloudDB.fetchGallery();
    if(Array.isArray(cloudGallery)&&cloudGallery.length){
      S.gallery=cloudGallery;
    }else if(Array.isArray(S.gallery)&&S.gallery.length){
      const migrated=[];
      for(let i=0;i<S.gallery.length;i++){
        const g=S.gallery[i];
        try{
          const file=await sourceToGalleryFile(g.src,g.id||(`g${i+1}`));
          const saved=await CloudDB.addGalleryItem({id:g.id||(`g${i+1}`),label:g.label||"Hair style",sortOrder:(i+1)*10},file);
          migrated.push(saved);
        }catch(e){console.error("Gallery migration item failed:",g,e);}
      }
      if(migrated.length)S.gallery=migrated;
    }
  }
  save();render();
}

function adminOpen(){const customer=$("#customer"),header=$("header"),admin=$("#admin");if(customer)customer.classList.add("hide");if(header)header.classList.add("hide");if(admin)admin.classList.remove("hide")}
function adminClose(){if(document.body?.dataset.page==="admin"){location.href="/";return}const admin=$("#admin"),customer=$("#customer"),header=$("header");if(admin)admin.classList.add("hide");if(customer)customer.classList.remove("hide");if(header)header.classList.remove("hide");home()}
async function login(){let pin=$("#pin").value;if(window.CloudDB?.enabled()){try{await CloudDB.adminLogin(pin);S.settings.pin=String(pin);save();await bootstrapCloudFromThisDevice()}catch(e){console.error(e);return toast("Could not sign in or sync this device")}}else if(pin!==S.settings.pin){return toast("Incorrect PIN")}authed=true;$("#login").classList.add("hide");$("#dash").classList.remove("hide");await syncAdminBookings();await syncCloudAvailability(true);await syncCloudContent(true);await syncCloudGallery(true);adminRender()}
async function tab(id){$$(".tab").forEach(x=>x.classList.add("hide"));$("#"+id).classList.remove("hide");await syncAdminBookings();await syncCloudAvailability(false);await syncCloudContent(false);await syncCloudGallery(false);adminRender()}
function adminRender(){if(!authed)return;let active=S.bookings.filter(b=>bookingBlocksTime(b)),d=today();const tc=$("#todayCount"),uc=$("#upcomingCount"),rev=$("#revenue"),dd=$("#diaryDate");if(tc)tc.textContent=active.filter(b=>b.date===d).length;if(uc)uc.textContent=active.filter(b=>b.date>=d).length;if(rev)rev.textContent="£"+active.filter(b=>b.date>=d).reduce((a,b)=>a+b.price,0);if(dd&&!dd.value)dd.value=d;renderDiary();renderCustomers();renderServiceAdmin();renderGalleryAdmin();renderHours();renderBlocks();const bn=$("#businessName"),tg=$("#tagline"),ap=$("#adminPin");if(bn)bn.value=S.settings.name;if(tg)tg.value=S.settings.tag;if(ap)ap.value=S.settings.pin}
function diaryIso(d){
 return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function renderDiary(){
 const el=$("#diaryList");if(!el)return;
 const dateInput=$("#diaryDate");
 let date=(dateInput?.value||window.diaryDate||today());
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))date=today();
 window.diaryDate=date;if(dateInput&&dateInput.value!==date)dateInput.value=date;
 const bookings=S.bookings.filter(b=>b.date===date&&b.status!=="cancelled").sort((a,b)=>a.time.localeCompare(b.time));
 const start=8*60,end=20*60,ppm=.64,height=(end-start)*ppm;

 let hours="";
 for(let h=8;h<=20;h++){
   const label=h===12?"12 pm":h>12?`${h-12} pm`:`${h} am`;
   hours+=`<div class="diary-hour" style="top:${(h*60-start)*ppm}px"><span>${label}</span></div>`;
 }

 const laid=[];
 bookings.forEach(x=>{
   let [h,m]=x.time.split(":").map(Number),st=h*60+m,d=Number(x.duration||60),en=st+d,col=0;
   while(laid.some(y=>y.col===col && st<y.end && y.start<en))col++;
   laid.push({booking:x,start:st,end:en,col});
 });
 const maxCols=Math.max(1,...laid.map(x=>x.col+1));
 const colWidth=220,gap=8;
 const cards=laid.map((item,i)=>{
   const x=item.booking,st=item.start,d=Number(x.duration||60),en=item.end;
   const eh=Math.floor(en/60),em=en%60,left=8+item.col*(colWidth+gap);
   const depositClass=!Number(x.deposit)?"deposit-none":(x.depositPaid?"deposit-paid":"deposit-due");
   const depositLabel=!Number(x.deposit)?"No deposit":(x.depositPaid?`✓ £${x.deposit} deposit paid`:`£${x.deposit} deposit due`);
   const statusLabel={confirmed:"Booked",arrived:"Arrived",completed:"Completed",no_show:"No-show",cancelled:"Cancelled"}[x.status||"confirmed"]||"Booked";
   return `<button class="diary-appt ${depositClass}" style="top:${Math.max(0,(st-start)*ppm)}px;height:${Math.max(38,d*ppm)}px;left:${left}px;width:${colWidth}px" onclick="openDiaryBooking('${x.id}')">
      <b>${x.time} – ${eh}:${String(em).padStart(2,"0")} · ${esc(x.name)}</b>
      <span>${esc(x.serviceName||x.service||"Appointment")}${x.pinCurls?" · Pin Curls":""}</span>
      <em class="appt-status status-${x.status||"confirmed"}">${statusLabel}</em>
      ${d>=45?`<small>${depositLabel}</small>`:""}
   </button>`;
 }).join("");
 const laneWidth=Math.max(660,maxCols*(colWidth+gap)+24);

 el.innerHTML=`<div class="visual-diary">
   <div class="diary-toolbar">
     <button aria-label="Previous day" onclick="diaryMove(-1)">‹</button>
     <div><small>APPOINTMENTS</small><h3>${nice(date)}</h3></div>
     <button aria-label="Next day" onclick="diaryMove(1)">›</button>
   </div>
   <div class="diary-actions"><button class="today-btn" onclick="diaryToday()">Today</button><span>${bookings.length} appointment${bookings.length===1?"":"s"}</span></div>
   <div class="diary-scroll">
     <div class="timeline-wrap" style="height:${height}px;min-width:${laneWidth+58}px">
       <div class="time-axis">${hours}</div>
       <div class="appointment-lane" style="width:${laneWidth}px">${cards||'<div class="no-day-bookings">No appointments booked for this day.</div>'}</div>
     </div>
   </div>
 </div>`;
}
function diaryMove(n){
 let d=new Date(window.diaryDate+"T12:00:00");
 if(Number.isNaN(d.getTime())) d=new Date();
 d.setDate(d.getDate()+n);
 window.diaryDate=diaryIso(d);const input=$("#diaryDate");if(input)input.value=window.diaryDate;
 renderDiary();
}
function diaryToday(){window.diaryDate=today();const input=$("#diaryDate");if(input)input.value=window.diaryDate;renderDiary()}
function openDiaryBooking(id){
 let b=S.bookings.find(x=>x.id===id);if(!b)return;
 const depositHtml=Number(b.deposit)>0
   ? `<label class="deposit-paid-control ${b.depositPaid?"is-paid":"is-due"}"><input type="checkbox" ${b.depositPaid?"checked":""} onchange="setDepositPaid('${b.id}',this.checked)"><span><b>${b.depositPaid?"Deposit paid":"Deposit still due"}</b><small>£${b.deposit} deposit</small></span></label>`
   : `<div class="deposit-no-payment">No deposit required</div>`;
 const status=b.status||"confirmed";
 const statusHtml=`<div class="appointment-status-control"><label>Appointment status<select onchange="setAppointmentStatus('${b.id}',this.value)"><option value="confirmed" ${status==="confirmed"?"selected":""}>Booked</option><option value="arrived" ${status==="arrived"?"selected":""}>Arrived</option><option value="completed" ${status==="completed"?"selected":""}>Completed</option><option value="no_show" ${status==="no_show"?"selected":""}>No-show</option><option value="cancelled" ${status==="cancelled"?"selected":""}>Cancelled</option></select></label></div>`;
 modal(`<h2>${esc(b.name)}</h2><div class="summary"><b>${esc(b.serviceName||b.service||"Appointment")}</b>${b.pinCurls?"<br>+ Pin Curls":""}<br>${nice(b.date)} at ${b.time}<br>${esc(b.phone||"")}${b.email?`<br>${esc(b.email)}`:""}${b.notes?`<br><br>Notes: ${esc(b.notes)}`:""}</div>${statusHtml}${depositHtml}`);
}

async function setAppointmentStatus(id,status){
 const b=S.bookings.find(x=>x.id===id);if(!b)return;
 const allowed=["confirmed","arrived","completed","no_show","cancelled"];
 if(!allowed.includes(status))return;
 const previous=b.status||"confirmed";
 b.status=status;save();renderDiary();
 try{
   if(window.CloudDB?.enabled())await CloudDB.updateBookingStatus(id,status);
   toast({confirmed:"Marked as booked",arrived:"Marked as arrived",completed:"Marked as completed",no_show:"Marked as no-show",cancelled:"Appointment cancelled"}[status]||"Status updated");
   if(status==="cancelled")closeModal();else openDiaryBooking(id);
   adminRender();
 }catch(e){
   console.error(e);b.status=previous;save();adminRender();openDiaryBooking(id);toast("Could not update appointment status online");
 }
}
async function setDepositPaid(id,paid){
 const b=S.bookings.find(x=>x.id===id);if(!b)return;
 const previous=!!b.depositPaid;
 b.depositPaid=!!paid;
 save();
 renderDiary();
 try{
   if(window.CloudDB?.enabled())await CloudDB.updateDepositPaid(id,paid);
   toast(paid?"Deposit marked as paid":"Deposit marked as due");
   openDiaryBooking(id);
 }catch(e){
   console.error(e);
   b.depositPaid=previous;save();renderDiary();openDiaryBooking(id);
   toast("Could not update deposit online");
 }
}
async function adminCancel(id){let b=S.bookings.find(x=>x.id===id);if(!b||!confirm("Cancel appointment?"))return;try{if(window.CloudDB?.enabled())await CloudDB.cancelBooking(id)}catch(e){console.error(e);return toast("Could not cancel online")}b.status="cancelled";save();adminRender()}
function modal(html){$("#modalbody").innerHTML=html;$("#modal").classList.remove("hide")} function closeModal(){$("#modal").classList.add("hide")}
function manual(){modal(`<h2>Add booking</h2><div class="form"><select id="ms">${S.services.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`)}</select><input id="mn" placeholder="Customer name"><input id="mp" placeholder="Mobile"><input id="md" type="date" value="${$("#diaryDate").value}"><input id="mt" type="time" value="09:00"><textarea id="mnotes" placeholder="Notes"></textarea><button class="primary" onclick="manualSave()">Save</button></div>`)}
async function manualSave(){
  let x=S.services.find(s=>s.id===$("#ms").value),booking={id:uid(),name:$("#mn").value||"Customer",phone:$("#mp").value,notes:$("#mnotes").value,email:"",serviceId:x.id,serviceName:x.name,date:$("#md").value,time:$("#mt").value,duration:x.duration,price:x.price,basePrice:x.price,deposit:depositFor(x),depositPaid:false,pinCurls:false,status:"confirmed",bookingRef:bookingRef()};
  if(!booking.date||!booking.time)return toast("Choose a date and time");

  const clashes=S.bookings.filter(b=>bookingBlocksTime(b)&&b.date===booking.date&&overlap(booking.time,booking.duration,b.time,Number(b.duration||60)));
  const blocked=S.blocks.filter(b=>b.date===booking.date&&overlap(booking.time,booking.duration,b.start,mins(b.end)-mins(b.start)));
  const dow=new Date(booking.date+"T12:00").getDay(),h=S.hours[dow];
  const outsideHours=!h?.open||mins(booking.time)<mins(h.start)||mins(booking.time)+booking.duration>mins(h.end);

  if(clashes.length||blocked.length||outsideHours){
    let warning="This admin booking needs an override:\n\n";
    if(clashes.length)warning+=`• Overlaps ${clashes.length} existing appointment${clashes.length===1?"":"s"}.\n`;
    if(blocked.length)warning+=`• Overlaps blocked time.\n`;
    if(outsideHours)warning+=`• Falls outside normal working hours.\n`;
    warning+="\nBook it anyway?";
    if(!confirm(warning))return;
  }

  try{if(window.CloudDB?.enabled()){let r=await CloudDB.createAdminBooking(booking);if(r?.booking)booking=r.booking}}catch(e){console.error(e);return toast("Could not save booking online")}
  S.bookings.push(booking);save();closeModal();await syncAdminBookings();adminRender();toast("Booking saved");
}
function renderCustomers(){let m={};S.bookings.forEach(b=>{let k=b.phone||b.email||b.name;m[k]=m[k]||{name:b.name,phone:b.phone,email:b.email||"",count:0};m[k].count++});$("#customerList").innerHTML=Object.values(m).map(c=>`<div class="adminrow customer-row" onclick="openCustomer('${encodeURIComponent(c.phone)}')"><div><b>${esc(c.name)}</b><br>${esc(c.phone)}</div><small>${c.count} booking(s) · View →</small></div>`).join("")||"No customers yet."}
function openCustomer(encodedPhone){const phone=decodeURIComponent(encodedPhone),rows=S.bookings.filter(b=>b.phone===phone).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time));if(!rows.length)return;const c=rows[0],up=rows.filter(b=>b.status!=="cancelled"&&b.date>=today()),past=rows.filter(b=>b.date<today()||["cancelled","no_show","completed"].includes(b.status));const card=b=>`<div class="customer-booking-detail"><div><b>${esc(b.serviceName)}</b><br><span>${nice(b.date)} at ${b.time}</span><br><small>${b.status==="cancelled"?"Cancelled":b.status==="completed"?"Completed":b.status==="no_show"?"No-show":"Booked"}${b.bookingRef?` · Ref ${esc(b.bookingRef)}`:""}</small></div><div><b>${b.price===0?"Free":"£"+b.price}</b>${b.deposit?`<br><small>Deposit ${b.depositPaid?"paid":"due"}</small>`:""}</div></div>`;modal(`<div class="customer-profile"><span class="admin-kicker">CUSTOMER</span><h2>${esc(c.name)}</h2><div class="customer-contact"><b>Mobile</b><span>${esc(c.phone||"—")}</span><b>Email</b><span>${esc(c.email||"—")}</span></div><h3>Upcoming appointments</h3>${up.length?up.map(card).join(""):"<p>No upcoming appointments.</p>"}<h3>Booking history</h3>${past.length?past.map(card).join(""):"<p>No previous appointments.</p>"}</div>`) }

function renderGalleryAdmin(){
 const el=$("#galleryAdminList");if(!el)return;
 el.innerHTML=S.gallery.length?S.gallery.map(g=>`<div class="gallery-admin-row">
   <img src="${g.src}" alt="${esc(g.label)}">
   <div class="gallery-admin-info"><b>${esc(g.label)}</b><small>Shown on your website</small></div>
   <div class="gallery-admin-actions"><button onclick="galleryEdit('${g.id}')">Edit</button><button class="danger-btn" onclick="galleryDelete('${g.id}')">Delete</button></div>
 </div>`).join(""):`<div class="empty-admin">No gallery photos yet. Use “Add photo” to upload one.</div>`;
}
function galleryEdit(id){
 const g=S.gallery.find(x=>x.id===id);if(!g)return;
 modal(`<h2>Edit gallery photo</h2><div class="form">
   <img class="gallery-edit-preview" src="${g.src}" alt="${esc(g.label)}">
   <label>Photo name<input id="galleryEditName" value="${esc(g.label)}"></label>
   <label>Change photo <small>(leave blank to keep the current one)</small><input id="galleryEditFile" type="file" accept="image/*"></label>
   <button class="primary" onclick="galleryEditSave('${g.id}')">Save changes</button>
 </div>`);
}
async function galleryEditSave(id){
 const g=S.gallery.find(x=>x.id===id);if(!g)return;
 const name=String($("#galleryEditName")?.value||"").trim(),file=$("#galleryEditFile")?.files?.[0];
 if(!name)return toast("Photo name cannot be blank");
 if(file&&!file.type.startsWith("image/"))return toast("Please choose an image");
 try{
   let updated;
   if(window.CloudDB?.enabled()&&typeof CloudDB.updateGalleryItem==="function"){
     let uploadFile=null;
     if(file){const src=await resizeGalleryImage(file,1200,.82);uploadFile=dataUrlToFile(src,`gallery-${id}.jpg`);}
     updated=await CloudDB.updateGalleryItem(id,{label:name,file:uploadFile,oldStoragePath:g.storagePath||"",sortOrder:g.sortOrder||0});
   }else{
     updated={...g,label:name};
     if(file)updated.src=await resizeGalleryImage(file,1200,.82);
   }
   Object.assign(g,updated||{label:name});save();closeModal();render();renderGalleryAdmin();toast("Photo updated");
 }catch(e){console.error(e);toast("Could not update photo online");}
}
async function galleryDelete(id){
 let g=S.gallery.find(x=>x.id===id);if(!g)return;
 if(!confirm(`Delete "${g.label}" from your gallery?`))return;
 try{
   if(window.CloudDB?.enabled()&&typeof CloudDB.deleteGalleryItem==="function")await CloudDB.deleteGalleryItem(g);
   S.gallery=S.gallery.filter(x=>x.id!==id);save();render();renderGalleryAdmin();toast("Photo deleted");
 }catch(e){console.error(e);toast("Could not delete photo online");}
}
function galleryAdd(){
 modal(`<h2>Add gallery photo</h2><div class="form">
   <label>Photo name<input id="galleryNewName" placeholder="e.g. Curly Blow Dry"></label>
   <label>Choose photo<input id="galleryNewFile" type="file" accept="image/*"></label>
   <small class="upload-help">The photo will be resized automatically and synced to every device.</small>
   <button class="primary" onclick="galleryAddSave()">Add photo</button>
 </div>`);
}
async function galleryAddSave(){
 const file=$("#galleryNewFile")?.files?.[0],name=$("#galleryNewName").value.trim();
 if(!file)return toast("Choose a photo");
 if(!name)return toast("Add a photo name");
 if(!file.type.startsWith("image/"))return toast("Please choose an image");
 try{
   const src=await resizeGalleryImage(file,1200,.82),id=uid();
   let item={id,src,label:name,sortOrder:0,storagePath:""};
   if(window.CloudDB?.enabled()&&typeof CloudDB.addGalleryItem==="function"){
     const uploadFile=dataUrlToFile(src,`gallery-${id}.jpg`);
     item=await CloudDB.addGalleryItem(item,uploadFile);
   }
   S.gallery.unshift(item);save();closeModal();render();renderGalleryAdmin();toast("Photo added and synced");
 }catch(e){console.error(e);toast("Could not add photo online");}
}
function dataUrlToFile(dataUrl,name){
 const [head,data]=dataUrl.split(","),mime=(head.match(/data:([^;]+)/)||[])[1]||"image/jpeg";
 const bytes=atob(data),arr=new Uint8Array(bytes.length);
 for(let i=0;i<bytes.length;i++)arr[i]=bytes.charCodeAt(i);
 return new File([arr],name,{type:mime});
}

function resizeGalleryImage(file,maxSize=1200,quality=.82){
 return new Promise((resolve,reject)=>{
   const reader=new FileReader();
   reader.onerror=reject;
   reader.onload=()=>{
     const img=new Image();
     img.onerror=reject;
     img.onload=()=>{
       const scale=Math.min(1,maxSize/Math.max(img.width,img.height));
       const w=Math.max(1,Math.round(img.width*scale)),h=Math.max(1,Math.round(img.height*scale));
       const c=document.createElement("canvas");c.width=w;c.height=h;
       c.getContext("2d").drawImage(img,0,0,w,h);
       resolve(c.toDataURL("image/jpeg",quality));
     };
     img.src=reader.result;
   };
   reader.readAsDataURL(file);
 });
}

function renderServiceAdmin(){$("#serviceList").innerHTML=S.services.map(x=>`<div class="adminrow"><div><b>${esc(x.name)}</b><br>${x.duration} min · ${x.price===0?"Free":"£"+x.price}${Number(x.deposit)>0?` · £${x.deposit} deposit`:" · No deposit"}</div><button onclick="serviceForm('${x.id}')">Edit</button></div>`).join("")} function serviceForm(id=""){let x=S.services.find(s=>s.id===id);modal(`<h2>${x?"Edit":"Add"} service</h2><div class="form"><select id="scat">${CATEGORY_ORDER.map(c=>`<option value="${c}" ${x?.category===c?"selected":""}>${c}</option>`).join("")}</select><input id="sn" placeholder="Name" value="${esc(x?.name||"")}"><input id="sd" type="number" value="${x?.duration||60}"><input id="sp" type="number" value="${x?.price??30}"><input id="sdep" type="number" min="0" value="${x?.deposit??10}"><textarea id="snote" placeholder="Service information">${esc(x?.note||"")}</textarea><button class="primary" onclick="serviceSave('${id}')">Save</button></div>`)} async function serviceSave(id){let o={category:$("#scat").value,name:$("#sn").value,duration:+$("#sd").value,price:+$("#sp").value,deposit:Math.max(0,+$("#sdep").value||0),note:$("#snote").value};if(!o.name.trim())return toast("Add a service name");const previous=structuredClone(S.services);if(id)Object.assign(S.services.find(x=>x.id===id),o);else S.services.push({id:uid(),...o});try{if(window.CloudDB?.enabled()&&typeof CloudDB.saveSiteConfig==="function")await CloudDB.saveSiteConfig({services:S.services,settings:{name:S.settings.name,tag:S.settings.tag}});save();closeModal();render();adminRender();toast("Service saved and synced")}catch(e){console.error(e);S.services=previous;save();toast("Could not save service online")}}
const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function renderHours(){
  $("#hours").innerHTML=DAYS.map((x,i)=>`<div class="hoursrow"><b>${x}</b><select id="ho${i}"><option value="1">Open</option><option value="0">Closed</option></select><input id="hs${i}" type="time" value="${S.hours[i].start}"><input id="he${i}" type="time" value="${S.hours[i].end}"></div>`).join("");
  DAYS.forEach((x,i)=>$("#ho"+i).value=S.hours[i].open?"1":"0");
}

async function saveHours(){
  DAYS.forEach((x,i)=>{
    S.hours[i]={
      open:$("#ho"+i).value==="1",
      start:$("#hs"+i).value,
      end:$("#he"+i).value
    };
  });

  save();

  try{
    if(window.CloudDB?.enabled()){
      await CloudDB.saveAvailability(S.hours);
    }
    toast("Working hours saved");
  }catch(e){
    console.error(e);
    toast("Could not save hours online");
  }

  adminRender();
}

function blockForm(){
  modal(`<h2>Block time</h2><div class="form"><input id="bd" type="date" value="${today()}"><input id="bs" type="time" value="12:00"><input id="be2" type="time" value="13:00"><input id="br" placeholder="Reason"><button class="primary" onclick="blockSave()">Block</button></div>`);
}

async function blockSave(){
  const block={
    id:uid(),
    date:$("#bd").value,
    start:$("#bs").value,
    end:$("#be2").value,
    reason:$("#br").value||"Unavailable"
  };

  if(!block.date)return toast("Choose a date");
  if(!block.start||!block.end)return toast("Choose a start and end time");
  if(mins(block.end)<=mins(block.start))return toast("End time must be after start time");

  try{
    if(window.CloudDB?.enabled()){
      const saved=await CloudDB.addBlockedTime(block);
      if(saved?.id)block.id=saved.id;
      else if(saved?.block?.id)block.id=saved.block.id;

      if(typeof CloudDB.fetchBlockedTimes==="function"){
        const rows=await CloudDB.fetchBlockedTimes();
        S.blocks=Array.isArray(rows)?rows.map(normaliseCloudBlock):[block];
      }else{
        S.blocks.push(block);
      }
    }else{
      S.blocks.push(block);
    }

    save();
    closeModal();
    adminRender();
    toast("Time blocked");
  }catch(e){
    console.error(e);
    toast("Could not block time online");
  }
}

function renderBlocks(){
  $("#blocks").innerHTML=S.blocks.map(b=>`<div class="adminrow"><div><b>${esc(b.reason)}</b><br>${nice(b.date)} · ${b.start}–${b.end}</div><button onclick="blockDelete('${b.id}')">Remove</button></div>`).join("")||"No blocked time.";
}

async function blockDelete(id){
  const block=S.blocks.find(x=>x.id===id);
  if(!block)return toast("Blocked time not found");

  try{
    if(window.CloudDB?.enabled()){
      await CloudDB.deleteBlockedTime(block);
      if(typeof CloudDB.fetchBlockedTimes==="function"){
        const rows=await CloudDB.fetchBlockedTimes();
        S.blocks=Array.isArray(rows)?rows.map(normaliseCloudBlock):S.blocks.filter(x=>x.id!==id);
      }else{
        S.blocks=S.blocks.filter(x=>x.id!==id);
      }
    }else{
      S.blocks=S.blocks.filter(x=>x.id!==id);
    }

    save();
    adminRender();
    toast("Blocked time removed");
  }catch(e){
    console.error(e);
    toast("Could not remove blocked time online");
  }
}

async function saveSettings(){
  const newPin=String($("#adminPin").value||"").trim();
  if(!newPin)return toast("Add an admin PIN");
  const nextSettings={name:$("#businessName").value||"Hair Studio",tag:$("#tagline").value,pin:newPin};

  try{
    if(window.CloudDB?.enabled()&&typeof CloudDB.saveSiteConfig==="function"){
      await CloudDB.saveSiteConfig({services:S.services,settings:{name:nextSettings.name,tag:nextSettings.tag}});
    }
    if(window.CloudDB?.enabled() && newPin!==String(S.settings.pin||"")){
      if(typeof CloudDB.changeAdminPin!=="function")return toast("PIN update is not available");
      await CloudDB.changeAdminPin(newPin);
    }
    S.settings=nextSettings;
    save();
    render();
    adminRender();
    toast("Settings saved and synced");
  }catch(e){
    console.error(e);
    toast("Could not save settings online");
  }
}
const IS_ADMIN_PAGE=document.body?.dataset.page==="admin";
if(IS_ADMIN_PAGE){
  Promise.all([syncCloudAvailability(false),syncCloudContent(false),syncCloudGallery(false)]).catch(console.error);
}else{
  render();home();Promise.all([syncCloudAvailability(false),syncCloudContent(false),syncCloudGallery(false)]).then(()=>render()).catch(console.error);
}