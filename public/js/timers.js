/* ---------- timers ---------- */
let ac=null, timers=Array.isArray(mem.tm)?mem.tm.filter(t=>t&&t.end>Date.now()-600000):[];
function audioOn(){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume()}catch(e){}}
function beep(){
  try{if(ac)[0,.28,.56].forEach(o=>{const t=ac.currentTime+o,os=ac.createOscillator(),g=ac.createGain();os.frequency.value=880;os.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.4,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.22);os.start(t);os.stop(t+.24)})}catch(e){}
  try{if(navigator.vibrate)navigator.vibrate([250,120,250,120,250])}catch(e){}
}
function startTimer(min,label){
  audioOn();
  if(timers.some(t=>t.label===label&&!t.rang))return;
  timers.push({id:String(Date.now())+Math.round(Math.random()*999),label,end:Date.now()+min*60000,rang:0,beeps:0});
  mem.tm=timers;save();drawDock();wake();
}
function plusTimer(id){const t=timers.find(x=>x.id===id);if(!t)return;t.end+=60000;mem.tm=timers;save();drawDock()}
function stopTimer(id){timers=timers.filter(t=>t.id!==id);mem.tm=timers;save();drawDock();wake()}
const mmss=s=>Math.floor(s/60)+':'+pad(s%60);
function drawDock(){
  const n=Date.now();
  $('#dock').innerHTML=timers.map(t=>{
    const left=Math.max(0,Math.ceil((t.end-n)/1000));
    return left>0?`<div><span class="nm">${t.label}</span><span class="left" role="timer">${mmss(left)}</span><button class="plus" data-plus="${t.id}" aria-label="Add one minute to ${t.label}">+1 min</button><button data-stop="${t.id}">Stop</button></div>`
                 :`<div class="rang"><span class="nm">${t.label}</span><span class="left">Done</span><button data-stop="${t.id}">OK</button></div>`}).join('');
  $$('.tm,.tmb').forEach(b=>{
    const t=timers.find(t=>t.label===b.dataset.label&&t.end>n);
    b.classList.toggle('on',!!t);
    const tt=$('.tt',b);if(tt)tt.textContent=t?mmss(Math.ceil((t.end-n)/1000)):b.dataset.tm+' min';
    const sm=$('small',b);if(sm)sm.textContent=t?'Running':'Tap to start the timer';
  });
  document.body.style.setProperty('--dock',(timers.length*60)+'px');
  drawStatus();
}
setInterval(()=>{
  if(!timers.length)return;
  const n=Date.now();let ch=false;
  timers.forEach(t=>{if(t.end<=n&&t.beeps<6&&(!t.last||n-t.last>3500)){t.rang=1;t.beeps++;t.last=n;beep();ch=true}});
  if(ch){mem.tm=timers;save()}
  drawDock();
},500);
let wl=null;
async function wake(){
  const need=timers.length>0||!$('#sheet').hidden;
  try{
    if(need&&!wl&&'wakeLock' in navigator&&document.visibilityState==='visible'){wl=await navigator.wakeLock.request('screen');wl.addEventListener('release',()=>{wl=null})}
    else if(!need&&wl){await wl.release();wl=null}
  }catch(e){wl=null}
}
document.addEventListener('visibilitychange',wake);

