/* ---------- feel: an ingredient drops into each tick; a tadka when a pot is done ---------- */
const still=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const FOOD=[['#e8c43a','50%',8],['#e5763a','50% 50% 50% 0',7],['#3f9a45','0 70% 0 70%',9],['#5a3d22','50%',6],['#d9412f','40%',7]];
function plop(el){
  if(!el||still())return;
  el.classList.remove('pop');void el.getBoundingClientRect();el.classList.add('pop');
  const host=el instanceof SVGElement?el.parentNode:el;
  for(let k=0;k<3;k++){const [c,r,sz]=FOOD[Math.floor(Math.random()*FOOD.length)],d=document.createElement('span');
    d.className='drop';d.style.cssText=`--dc:${c};--dr:${r};--ds:${sz}px;--dx:${Math.round(Math.random()*24-12)}px;--rot:${Math.round(Math.random()*300+60)}deg;--dd:${k*.08}s`;
    host.appendChild(d);setTimeout(()=>d.remove(),900)}
}
const TICKS=['data-done','data-line','data-bed','data-p','data-pp','data-wset','data-fset'];
document.addEventListener('click',e=>{
  const b=e.target.closest(TICKS.map(a=>`[${a}]`).join(','));if(!b)return;
  const a=TICKS.find(n=>b.hasAttribute(n)),sel=`[${a}="${CSS.escape(b.getAttribute(a))}"][aria-pressed="true"]`;
  setTimeout(()=>$$(sel).forEach(t=>plop(t.querySelector('.box,i,.stk,svg')||t)),0);
},true);
document.addEventListener('change',e=>{const i=e.target;if(i.dataset&&i.dataset.k&&i.checked)plop(i.nextElementSibling)});
function tadka(from){
  if(still())return;
  const r=from&&from.getBoundingClientRect(),x=r?r.left+r.width/2:innerWidth/2,y=r?r.top:innerHeight/2;
  const L=document.createElement('div');L.className='tadka';L.style.left=x+'px';L.style.top=y+'px';
  const C=['#ffd27a','#f2a81d','#e8562a','#fff2c4','#3f9a45'];
  L.innerHTML=Array.from({length:30},(_,k)=>`<i style="--c:${C[k%C.length]};--a:${Math.round(-180+Math.random()*180)}deg;--d:${Math.round(50+Math.random()*90)}px;--dl:${(Math.random()*.12).toFixed(2)}s"></i>`).join('')
    +[-26,-4,18].map((o,k)=>`<b style="--x:${o}px;--dl:${.15+k*.18}s"></b>`).join('');
  document.body.appendChild(L);setTimeout(()=>L.remove(),2000);
  sizzle();
}
/* a quiet sizzle: filtered noise, under a second */
function sizzle(){
  try{audioOn();if(!ac)return;const n=Math.floor(ac.sampleRate*.9),buf=ac.createBuffer(1,n,ac.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(Math.random()<.04?1:.35);
    const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain(),t=ac.currentTime;
    f.type='highpass';f.frequency.value=2600;s.buffer=buf;s.connect(f);f.connect(g);g.connect(ac.destination);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.07,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+.85);s.start(t);s.stop(t+.9)}catch(e){}
}

function finishRec(){
  const c=mem.cook;tadka($('#sh-next'));
  if(c){const key=c.kind+':'+c.id;mem.cooked=mem.cooked||{};mem.cooked[key]=(mem.cooked[key]||0)+1;
    if(mem.cooked[key]>=2&&helpOf(c.kind,c.id)==='full'&&rawRec(c.kind,c.id).q)setTimeout(()=>toast('You have cooked this '+mem.cooked[key]+' times. Ready for short steps?',()=>{mem.help[key]='quick';save();renderCook()},'Use short steps'),400)}
  if(c&&c.kind+':'+c.id===todayRec().rec)setDone('cook',1);
  mem.cook=null;save();closeSheet();
}

