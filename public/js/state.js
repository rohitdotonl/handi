/* ---------- storage (falls back to memory when the browser blocks it) ---------- */
const KEY='graytee.v2';
let mem={};
try{mem=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){mem={}}
['w','m','p','sub','hist','help'].forEach(k=>{if(!mem[k]||typeof mem[k]!=='object')mem[k]={}});
let canSave=true;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(mem))}catch(e){canSave=false}};

const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const rs=n=>n.toLocaleString('en-IN');
const pad=n=>String(n).padStart(2,'0');
const clock=m=>{m=((m%1440)+1440)%1440;let h=Math.floor(m/60);const mm=m%60,ap=h<12?'AM':'PM';h=h%12||12;return `${h}:${pad(mm)} ${ap}`};
const relT=d=>d<60?d+' min':Math.floor(d/60)+' h'+(d%60?' '+d%60+' min':'');
const nowMin=()=>{const t=new Date();return t.getHours()*60+t.getMinutes()};
const dayKey=d=>d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
const now=new Date(); let dow=now.getDay(); const realDow=dow, mon=now.getMonth();
const today=dayKey(now), tomKey=dayKey(new Date(now.getTime()+864e5));
const winter=[10,11,0,1].includes(mon), fermentOn=[0,1,2].includes(mon), gooseOn=[10,11,0,1].includes(mon);
const REST={k:940,p:47.5};
const SOAK_AT=21*60+30, SOAK_FROM=18*60;
const monday=(()=>{const d=new Date(now);d.setDate(d.getDate()-((dow+6)%7));return dayKey(d)})();
if(!mem.day||mem.day.d!==today){
  /* keep what last night's you did, so this morning can say thank you */
  if(mem.day&&mem.day.d===dayKey(new Date(now.getTime()-864e5)))mem.last={d:today,bed:mem.day.bed||{},soak:!!(mem.day.done&&mem.day.done.soak)};
  mem.day={d:today,done:{},sub:{},water:0};
}
mem.day.done=mem.day.done||{};mem.day.sub=mem.day.sub||{};mem.day.water=mem.day.water||0;
if(mem.cook&&mem.cook.d!==today)mem.cook=null;
if(typeof mem.start!=='number')mem.start=540;
if(!mem.fish||mem.fish.wk!==monday)mem.fish={wk:monday,n:0};
save();

