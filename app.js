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
   return `<section class="service-category"><div class="category-title"><h3>${esc(cat)}</h3><span>${items.length} service${items.length===1?"":"s"}</span></div><div class="category-items">${items.map(x=>`<div class="service" onclick="${clickFn}('${x.id}')"><div><b>${esc(x.name)}</b><small>${durationText(x.duration)}${x.note?` Ã‚Â· ${esc(x.note)}`:""}</small></div><b>${x.price===0?"Free":"Ã‚Â£"+x.price}</b></div>`).join("")}</div></section>`;
 }).join("");
}

function render(){
 $("#brand").textContent=$("#title").textContent=S.settings.name;
 $("#tag").textContent=S.settings.tag;
 $("#services").innerHTML=categoryMarkup();
 $("#preview").innerHTML=S.gallery.slice(0,4).map((p,i)=>`<button onclick="openPhoto(${i})"><img src="${p.src}" alt="${esc(p.label)}"></button>`).join("");
 $("#photos").innerHTML=S.gallery.length?S.gallery.map((p,i)=>`<button onclick="openPhoto(${i})"><img src="${p.src}" alt="${esc(p.label)}"><em>${esc(p.label)}</em></button>`).join(""):`<div class="empty-gallery">Gallery photos will appear here.</div>`;
 let gc=$("#galleryCount");if(gc)gc.textContent="View all "+S.gallery.length;
}
function hideCustomer(){["home","gallery","booking","mine"].forEach(x=>$("#"+x).classList.add("hide"))} function home(){hideCustomer();$("#home").classList.remove("hide")} function showGallery(){hideCustomer();$("#gallery").classList.remove("hide");scrollTo(0,0)} function showMine(){hideCustomer();$("#mine").classList.remove("hide");$("#mineList").innerHTML=""}
function openPhoto(i){if(!S.gallery.length)return;photo=i;photoUpdate();$("#lightbox").classList.remove("hide")}
function photoUpdate(){let p=S.gallery[photo];if(!p)return;$("#bigphoto").src=p.src;$("#counter").textContent=`${photo+1} / ${S.gallery.length}`;$("#caption").textContent=p.label}
function movePhoto(n){if(!S.gallery.length)return;photo=(photo+n+S.gallery.length)%S.gallery.length;photoUpdate()}
function closePhoto(){$("#lightbox").classList.add("hide")}
function depositFor(service){
  if(!service || Number(service.price||0)===0) return 0;
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
 if(false)$("#bookbody").innerHTML=`<div class="bookcard"><h2>Choose a category</h2><p class="category-help">What would you like to book?</p><div class="book-category-grid">${CATEGORY_ORDER.map(cat=>`<button class="book-category-card" onclick="pickCategory('${cat.replace(/'/g,"\\'")}')"><span>${esc(cat)}</span><b>Ã¢â‚¬Âº</b></button>`).join("")}</div></div>`;
 if(W.step===2){bookingBack();return}
 if(false){let items=S.services.filter(s=>s.category===W.category);$("#bookbody").innerHTML=`<div class="bookcard"><span class="eyebrow-small">${esc(W.category)}</span><h2>Choose a service</h2><div class="choices">${items.map(x=>`<button class="choice service-choice" onclick="pickService('${x.id}')"><span><b>${esc(x.name)}</b><small>${durationText(x.duration)}${x.note?` Ã‚Â· ${esc(x.note)}`:""}${supportsPinCurls(x)?" Ã‚Â· Pin curls +Ã‚Â£2 optional":""}</small></span><strong>${x.price===0?"Free":"Ã‚Â£"+x.price}</strong></button>`).join("")}</div></div>`}
 if(W.step===3)pinCurlStep();if(W.step===4)dateStep();if(W.step===5)timeStep();if(W.step===6)details()
}
function pickCategory(cat){W.category=cat;W.step=2;bookRender()}
function pinCurlStep(){let x=W.service;$("#bookbody").innerHTML=`<div class="bookcard addon-step"><span class="eyebrow-small">${esc(x.name)}</span><h2>Would you like to add pin curls?</h2><p class="category-help">Choose an option before selecting your appointment date.</p><div class="pin-options"><button class="pin-option" onclick="choosePinCurls(false)"><div><b>No thanks</b><small>Continue with ${esc(x.name)}</small></div><strong>Ã‚Â£${x.price}</strong></button><button class="pin-option featured-addon" onclick="choosePinCurls(true)"><div><b>Add Pin Curls</b><small>Add pin curls to your blow dry</small></div><strong>+Ã‚Â£2</strong></button></div></div>`}
function choosePinCurls(v){W.pinCurls=!!v;W.step=4;bookRender()}
function pickService(id){W.service=S.services.find(x=>x.id===id);W.category=W.service.category;W.pinCurls=false;W.step=supportsPinCurls(W.service)?3:4;bookRender()} function dateStep(){let out=[],d=new Date();for(let i=0;i<42;i++){let x=new Date(d);x.setDate(d.getDate()+i);if(!S.hours[x.getDay()].open)continue;let iso=x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");out.push(`<button class="choice" onclick="pickDate('${iso}')">${x.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}</button>`)}$("#bookbody").innerHTML=`<div class="bookcard"><h2>Choose a date</h2><p>${esc(W.service.name)}</p><div class="dates">${out.join("")}</div></div>`} async function pickDate(d){W.date=d;W.cloudBusy=[];if(window.CloudDB?.enabled()){try{await syncCloudAvailability(false);W.cloudBusy=await CloudDB.busySlots(d)}catch(e){console.error(e);return toast("Could not check online availability")}}W.step=5;bookRender()}
function overlap(t,d,b,bd){return mins(t)<mins(b)+bd&&mins(b)<mins(t)+d} function slots(){let h=S.hours[new Date(W.date+"T12:00").getDay()],o=[];for(let m=mins(h.start);m+W.service.duration<=mins(h.end);m+=30){let t=ts(m),busy=S.bookings.some(b=>b.status!=="cancelled"&&b.date===W.date&&overlap(t,W.service.duration,b.time,b.duration)),cloud=(W.cloudBusy||[]).some(b=>overlap(t,W.service.duration,b.time,b.duration)),block=S.blocks.some(b=>b.date===W.date&&overlap(t,W.service.duration,b.start,mins(b.end)-mins(b.start)));if(!busy&&!cloud&&!block)o.push(t)}return o} function timeStep(){$("#bookbody").innerHTML=`<div class="bookcard"><h2>Choose a time</h2><p>${nice(W.date)}</p><div class="times">${slots().map(t=>`<button class="choice" onclick="pickTime('${t}')">${t}</button>`).join("")||"No times available"}</div></div>`} function pickTime(t){W.time=t;W.step=6;bookRender()}
function details(){
 let x=W.service,total=x.price+(W.pinCurls?2:0),dep=depositFor(x),remaining=Math.max(0,total-dep);
 $("#bookbody").innerHTML=`<div class="bookcard"><h2>Your details</h2>
 <div class="form"><input id="bn" placeholder="Full name"><input id="bp" placeholder="Mobile number"><input id="be" placeholder="Email (optional)"><textarea id="bnotes" placeholder="Notes Ã¢â‚¬â€ you can mention a gallery style you like"></textarea></div>
 <div class="summary"><b>${esc(x.name)}</b><br>${nice(W.date)} at ${W.time}<br><small class="booking-location">Cobella &amp; Co Ã‚Â· 215 London Road, Hazel Grove, Stockport Ã‚Â· SK7 4HS</small><br>${x.price===0?"Free":"Ã‚Â£"+x.price}${W.pinCurls?"<br><b>Pin Curls +Ã‚Â£2</b>":""}</div>
 ${dep?`<div class="deposit-notice"><span class="deposit-badge">DEPOSIT REQUIRED</span><h3>Ã‚Â£${dep} deposit</h3><p>A Ã‚Â£${dep} deposit is required to secure this appointment. Payment details will be sent to you after your booking request.</p><small>Remaining balance after deposit: Ã‚Â£${remaining}</small></div>`:`<div class="deposit-notice free-booking"><h3>No deposit required</h3><p>This is a free appointment/service.</p></div>`}
 <div class="booking-total"><span>Service total</span><b>${total===0?"Free":"Ã‚Â£"+total}</b></div>
 <button class="primary full" onclick="confirmBook()">Request booking</button></div>`;
}
async function confirmBook(){let n=$("#bn").value.trim(),p=$("#bp").value.trim();if(!n||!p)return toast("Add your name and mobile");let x=W.service,booking={id:uid(),name:n,phone:p,email:$("#be").value,notes:$("#bnotes").value,serviceId:x.id,serviceName:x.name,date:W.date,time:W.time,duration:x.duration,price:x.price+(W.pinCurls?2:0),basePrice:x.price,deposit:depositFor(x),pinCurls:!!W.pinCurls,status:"confirmed"};let btn=$("#bookbody .primary.full");if(btn){btn.disabled=true;btn.textContent="Saving bookingÃ¢â‚¬Â¦"}try{if(window.CloudDB?.enabled()){let r=await CloudDB.createBooking(booking);if(r?.booking)booking=r.booking}}catch(e){console.error(e);if(btn){btn.disabled=false;btn.textContent="Request booking"}return toast((e?.message||"").includes("appointment time")?"That time has just been taken. Please choose another time.":"Could not save booking online. Please try again.")}S.bookings.push(booking);save();$("#bookbody").innerHTML=`<div class="bookcard" style="text-align:center"><h2>Ã¢Å“â€œ You're booked</h2><p>${nice(W.date)} at ${W.time}${W.pinCurls?"<br>Pin Curls +Ã‚Â£2":""}</p>${depositFor(x)?`<div class="deposit-confirm"><b>Ã‚Â£${depositFor(x)} deposit required</b><br><span>Your payment details will be sent to you separately to secure the appointment.</span></div>`:""}<p class="confirm-address">Cobella &amp; Co<br>215 London Road, Hazel Grove, Stockport, SK7 4HS</p><button class="primary" onclick="home()">Done</button></div>`;if(authed)adminRender()}
function lookup(){let p=$("#lookup").value.replace(/\D/g,"");let a=S.bookings.filter(b=>b.phone.replace(/\D/g,"")===p&&b.status!=="cancelled");$("#mineList").innerHTML=a.length?a.map(b=>`<div class="bookingrow"><div><b>${esc(b.serviceName)}</b><br>${nice(b.date)} at ${b.time}${b.pinCurls?" Ã‚Â· Pin Curls +Ã‚Â£2":""}</div><button onclick="cancel('${b.id}')">Cancel</button></div>`).join(""):"<div class='card'>No bookings found.</div>"} function cancel(id){let b=S.bookings.find(x=>x.id===id);if(b&&confirm("Cancel this booking?")){b.status="cancelled";save();lookup();adminRender()}}
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

function adminOpen(){$("#customer").classList.add("hide");$("header").classList.add("hide");$("#admin").classList.remove("hide")}
function adminClose(){$("#admin").classList.add("hide");$("#customer").classList.remove("hide");$("header").classList.remove("hide");home()}
async function login(){let pin=$("#pin").value;if(window.CloudDB?.enabled()){try{await CloudDB.adminLogin(pin);S.settings.pin=String(pin);save()}catch(e){console.error(e);return toast("Incorrect admin PIN")}}else if(pin!==S.settings.pin){return toast("Incorrect PIN")}authed=true;$("#login").classList.add("hide");$("#dash").classList.remove("hide");await syncAdminBookings();await syncCloudAvailability(true);adminRender()}
async function tab(id){$$(".tab").forEach(x=>x.classList.add("hide"));$("#"+id).classList.remove("hide");await syncAdminBookings();await syncCloudAvailability(false);adminRender()}
function adminRender(){if(!authed)return;let active=S.bookings.filter(b=>b.status!=="cancelled"),d=today();$("#todayCount").textContent=active.filter(b=>b.date===d).length;$("#upcomingCount").textContent=active.filter(b=>b.date>=d).length;$("#revenue").textContent="Ã‚Â£"+active.filter(b=>b.date>=d).reduce((a,b)=>a+b.price,0);if(!$("#diaryDate").value)$("#diaryDate").value=d;renderDiary();renderCustomers();renderServiceAdmin();renderGalleryAdmin();renderHours();renderBlocks();$("#businessName").value=S.settings.name;$("#tagline").value=S.settings.tag;$("#adminPin").value=S.settings.pin}
function diaryIso(d){
 return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function renderDiary(){
 const el=$("#diary");if(!el)return;
 if(!window.diaryDate || !/^\d{4}-\d{2}-\d{2}$/.test(window.diaryDate)) window.diaryDate=today();
 const date=window.diaryDate;
 const bookings=S.bookings.filter(b=>b.date===date&&b.status!=="cancelled").sort((a,b)=>a.time.localeCompare(b.time));
 const start=8*60,end=20*60,ppm=1.05,height=(end-start)*ppm;

 let hours="";
 for(let h=8;h<=20;h++){
   hours+=`<div class="diary-hour" style="top:${(h*60-start)*ppm}px"><span>${h>12?h-12:h}:00<small>${h>=12?"pm":"am"}</small></span></div>`;
 }

 // Put overlapping appointments into separate columns so they can sit side-by-side.
 const laid=[];
 bookings.forEach(x=>{
   let [h,m]=x.time.split(":").map(Number),s=h*60+m,d=Number(x.duration||60),e=s+d,col=0;
   while(laid.some(y=>y.col===col && s<y.end && y.start<e)) col++;
   laid.push({booking:x,start:s,end:e,col});
 });
 const maxCols=Math.max(1,...laid.map(x=>x.col+1));

 const cards=laid.map((item,i)=>{
   const x=item.booking,s=item.start,d=Number(x.duration||60),e=item.end;
   const eh=Math.floor(e/60),em=e%60, colWidth=280, gap=10;
   const left=8+item.col*(colWidth+gap);
   return `<button class="diary-appt diary-tone-${i%4}" style="top:${Math.max(0,(s-start)*ppm)}px;height:${Math.max(58,d*ppm)}px;left:${left}px;width:${colWidth}px" onclick="openDiaryBooking('${x.id}')">
      <b>${x.time} Ã¢â‚¬â€œ ${eh}:${String(em).padStart(2,"0")} ${esc(x.name)}</b>
      <span>${esc(x.serviceName||x.service||"Appointment")}${x.pinCurls?"<br>+ Pin Curls":""}</span>
      <small>${x.deposit?`Ã‚Â£${x.deposit} deposit required`:"No deposit"}</small>
   </button>`;
 }).join("");

 const laneWidth=Math.max(920, maxCols*290+40);

 el.innerHTML=`<div class="visual-diary">
   <div class="diary-toolbar">
     <button onclick="diaryMove(-1)">Ã¢â‚¬Â¹</button>
     <div><small>APPOINTMENTS</small><h3>${nice(date)}</h3></div>
     <button onclick="diaryMove(1)">Ã¢â‚¬Âº</button>
   </div>
   <div class="diary-actions"><button class="today-btn" onclick="diaryToday()">Today</button><span>Swipe / scroll sideways to view the diary Ã¢â€ â€™</span></div>
   <div class="diary-scroll">
     <div class="timeline-wrap" style="height:${height}px;min-width:${laneWidth+78}px">
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
 window.diaryDate=diaryIso(d);
 renderDiary();
}
function diaryToday(){window.diaryDate=today();renderDiary()}
function openDiaryBooking(id){
 let b=S.bookings.find(x=>x.id===id);if(!b)return;
 modal(`<h2>${esc(b.name)}</h2><div class="summary"><b>${esc(b.serviceName||b.service||"Appointment")}</b>${b.pinCurls?"<br>+ Pin Curls":""}<br>${nice(b.date)} at ${b.time}<br>${esc(b.phone||"")}${b.email?`<br>${esc(b.email)}`:""}<br><br>${b.deposit?`Deposit required: Ã‚Â£${b.deposit}`:"No deposit required"}${b.notes?`<br><br>Notes: ${esc(b.notes)}`:""}</div></div>`);
}
async function adminCancel(id){let b=S.bookings.find(x=>x.id===id);if(!b||!confirm("Cancel appointment?"))return;try{if(window.CloudDB?.enabled())await CloudDB.cancelBooking(id)}catch(e){console.error(e);return toast("Could not cancel online")}b.status="cancelled";save();adminRender()}
function modal(html){$("#modalbody").innerHTML=html;$("#modal").classList.remove("hide")} function closeModal(){$("#modal").classList.add("hide")}
function manual(){modal(`<h2>Add booking</h2><div class="form"><select id="ms">${S.services.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`)}</select><input id="mn" placeholder="Customer name"><input id="mp" placeholder="Mobile"><input id="md" type="date" value="${$("#diaryDate").value}"><input id="mt" type="time" value="09:00"><textarea id="mnotes" placeholder="Notes"></textarea><button class="primary" onclick="manualSave()">Save</button></div>`)}
async function manualSave(){let x=S.services.find(s=>s.id===$("#ms").value),booking={id:uid(),name:$("#mn").value||"Customer",phone:$("#mp").value,notes:$("#mnotes").value,email:"",serviceId:x.id,serviceName:x.name,date:$("#md").value,time:$("#mt").value,duration:x.duration,price:x.price,basePrice:x.price,deposit:depositFor(x),pinCurls:false,status:"confirmed"};try{if(window.CloudDB?.enabled()){let r=await CloudDB.createAdminBooking(booking);if(r?.booking)booking=r.booking}}catch(e){console.error(e);return toast("Could not save booking online")}S.bookings.push(booking);save();closeModal();await syncAdminBookings();adminRender()}
function renderCustomers(){let m={};S.bookings.filter(b=>b.status!=="cancelled").forEach(b=>{let k=b.phone;m[k]=m[k]||{name:b.name,phone:b.phone,count:0};m[k].count++});$("#customerList").innerHTML=Object.values(m).map(c=>`<div class="adminrow"><div><b>${esc(c.name)}</b><br>${esc(c.phone)}</div><small>${c.count} booking(s)</small></div>`).join("")||"No customers yet."}

function renderGalleryAdmin(){
 const el=$("#galleryAdminList");if(!el)return;
 el.innerHTML=S.gallery.length?S.gallery.map(g=>`<div class="gallery-admin-row">
   <img src="${g.src}" alt="${esc(g.label)}">
   <div class="gallery-admin-info">
     <label>Photo name<input value="${esc(g.label)}" onchange="galleryRename('${g.id}',this.value)"></label>
   </div>
   <button class="danger-btn" onclick="galleryDelete('${g.id}')">Delete</button>
 </div>`).join(""):`<div class="empty-admin">No gallery photos yet. Use Ã¢â‚¬Å“Add photoÃ¢â‚¬Â to upload one.</div>`;
}
function galleryRename(id,name){
 let g=S.gallery.find(x=>x.id===id);if(!g)return;
 name=String(name||"").trim();if(!name)return toast("Photo name cannot be blank");
 if(g.label===name)return;
 g.label=name;save();render();toast("Photo name updated");
}
function galleryDelete(id){
 let g=S.gallery.find(x=>x.id===id);if(!g)return;
 if(!confirm(`Delete "${g.label}" from your gallery?`))return;
 S.gallery=S.gallery.filter(x=>x.id!==id);
 save();render();renderGalleryAdmin();toast("Photo deleted");
}
function galleryAdd(){
 modal(`<h2>Add gallery photo</h2><div class="form">
   <label>Photo name<input id="galleryNewName" placeholder="e.g. Curly Blow Dry"></label>
   <label>Choose photo<input id="galleryNewFile" type="file" accept="image/*"></label>
   <small class="upload-help">The photo will be resized automatically so it works well in the app.</small>
   <button class="primary" onclick="galleryAddSave()">Add photo</button>
 </div>`);
}
function galleryAddSave(){
 const file=$("#galleryNewFile")?.files?.[0],name=$("#galleryNewName").value.trim();
 if(!file)return toast("Choose a photo");
 if(!name)return toast("Add a photo name");
 if(!file.type.startsWith("image/"))return toast("Please choose an image");
 resizeGalleryImage(file,1200,.82).then(src=>{
   const item={id:uid(),src,label:name};
   S.gallery.unshift(item);
   try{save()}catch(e){S.gallery.shift();return toast("Storage is full Ã¢â‚¬â€ delete an uploaded photo first")}
   closeModal();render();renderGalleryAdmin();toast("Photo added");
 }).catch(()=>toast("Could not add that photo"));
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

function renderServiceAdmin(){$("#serviceList").innerHTML=S.services.map(x=>`<div class="adminrow"><div><b>${esc(x.name)}</b><br>${x.duration} min Ã‚Â· ${x.price===0?"Free":"Ã‚Â£"+x.price}${x.deposit?` Ã‚Â· Ã‚Â£${x.deposit} deposit`:""}</div><button onclick="serviceForm('${x.id}')">Edit</button></div>`).join("")} function serviceForm(id=""){let x=S.services.find(s=>s.id===id);modal(`<h2>${x?"Edit":"Add"} service</h2><div class="form"><select id="scat">${CATEGORY_ORDER.map(c=>`<option value="${c}" ${x?.category===c?"selected":""}>${c}</option>`).join("")}</select><input id="sn" placeholder="Name" value="${esc(x?.name||"")}"><input id="sd" type="number" value="${x?.duration||60}"><input id="sp" type="number" value="${x?.price??30}"><input id="sdep" type="number" value="${x?.deposit??10}"><textarea id="snote" placeholder="Service information">${esc(x?.note||"")}</textarea><button class="primary" onclick="serviceSave('${id}')">Save</button></div>`)} function serviceSave(id){let o={category:$("#scat").value,name:$("#sn").value,duration:+$("#sd").value,price:+$("#sp").value,deposit:+$("#sdep").value,note:$("#snote").value};if(id)Object.assign(S.services.find(x=>x.id===id),o);else S.services.push({id:uid(),...o});save();closeModal();render();adminRender()}
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
  $("#blocks").innerHTML=S.blocks.map(b=>`<div class="adminrow"><div><b>${esc(b.reason)}</b><br>${nice(b.date)} Ã‚Â· ${b.start}Ã¢â‚¬â€œ${b.end}</div><button onclick="blockDelete('${b.id}')">Remove</button></div>`).join("")||"No blocked time.";
}

async function blockDelete(id){
  try{
    if(window.CloudDB?.enabled()){
      await CloudDB.deleteBlockedTime(id);
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

  try{
    if(window.CloudDB?.enabled() && newPin!==String(S.settings.pin||"")){
      if(typeof CloudDB.changeAdminPin!=="function")return toast("PIN update is not available");
      await CloudDB.changeAdminPin(newPin);
    }

    S.settings.name=$("#businessName").value||"Hair Studio";
    S.settings.tag=$("#tagline").value;
    S.settings.pin=newPin;
    save();
    render();
    adminRender();
    toast("Settings saved");
  }catch(e){
    console.error(e);
    toast("Could not update admin PIN");
  }
}
render();home();syncCloudAvailability(false).then(()=>render()).catch(console.error);
