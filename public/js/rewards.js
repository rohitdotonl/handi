/* ---------- rewards: notes from earlier you, rescues, the thali, a surprise ---------- */
const andJoin=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const SUN_DID=['boiled 12 eggs','washed the greens','','ground the flaxseed','roasted the cumin','made the chutney','peeled the garlic and ginger','packed the greens','topped up the jars',''];
const THU_DID=['boiled 9 eggs','checked the greens','checked the fridge','planned Saturday’s fish'];
const SOAK_DID={black:'soaked the chickpeas and barley',red:'soaked the kidney beans',white:'soaked the pearl millet'};
const prevMonday=(()=>{const d=new Date(now);d.setDate(d.getDate()-((realDow+6)%7)-7);return dayKey(d)})();
/* the prep that is feeding today: Sunday's for Monday to Thursday, Thursday's for Friday and Saturday */
function prepFrom(){
  if(view.off)return null;
  if(realDow>=1&&realDow<=4){const P=mem.prevPrep;return P&&P.wk===prevMonday?{k:'sun',who:'Sunday',d:P.sun||{},names:SUN_DID}:null}
  if(realDow===5||realDow===6){const P=mem.prep;return P&&P.wk===monday?{k:'thu',who:'Thursday',d:P.thu||{},names:THU_DID}:null}
  return null;
}
const PREP_FOR={breakfast:{sun:[0],thu:[0]},cook:{sun:[1,6,7,8],thu:[1]},lunch:{sun:[3,5],thu:[2]},dinner:{sun:[3,5],thu:[2]}};
function prepped(id){
  const f=prepFrom(), m=f&&PREP_FOR[id]&&PREP_FOR[id][f.k];if(!m)return '';
  const did=[...new Set(m.filter(i=>f.d[i]).map(i=>f.names[i]).filter(Boolean))];
  return did.length?`On ${f.who} you ${andJoin(did)}.`:'';
}
const CHECK='<svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';
function noteHTML(nowM){
  if(view.off||mem.day.ynx||nowM>=mem.start+300)return '';
  const out=[], l=mem.last;
  if(l&&l.d===today){const b=l.bed||{},did=[];
    if(l.soak)did.push(SOAK_DID[potId()]||'did the soak');
    if(b.pot)did.push('set out the cooker and spice jars');
    if(b.eggs)did.push('checked the eggs');
    if(did.length)out.push('Last night you '+andJoin(did))}
  const f=prepFrom();
  if(f&&(realDow===1||realDow===5)){const did=Object.keys(f.d).filter(i=>f.d[i]).map(i=>f.names[+i]).filter(Boolean);
    if(did.length)out.push(`On ${f.who} you `+andJoin(did.length>4?did.slice(0,3).concat([(did.length-3)+' more things']):did))}
  if(!out.length)return '';
  return `<aside class="ynote" aria-label="A note from earlier you"><p class="yh">A note from earlier you</p>${out.map(t=>`<p class="yl">${CHECK}<span>${t}.</span></p>`).join('')}<p class="ysub">${f&&(realDow===1||realDow===5)?'Look for the <b>Prepped</b> badges below. Today is lighter because of it.':'This morning is easier because of it.'}</p><button class="yx" data-ynx>Thanks, me</button></aside>`;
}

/* rescues: a slip you recovered from is a win, and the thali remembers it */
const RESCUE_SVG='<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="16" cy="16" r="12.5" fill="none" stroke="var(--rs-band)" stroke-width="5" stroke-dasharray="9.8 9.8" transform="rotate(-23 16 16)"/></svg>';
const weekKeys=()=>{const m=new Date(now);m.setDate(m.getDate()-((realDow+6)%7));return Array.from({length:7},(_,k)=>{const d=new Date(m);d.setDate(m.getDate()+k);return d})};
const rescuesThisWeek=()=>weekKeys().filter(d=>(mem.rescued||{})[dayKey(d)]).length;

/* the weekly thali: seven spots on a steel plate, Monday to Saturday round the rim, Sunday in the middle */
const TK_DOT={yellow:'#b86a10',black:'#d8c08f',blue:'#f3e2d3',red:'#5a1010',white:'#c9a46e'};
let thaliLand=null;
function thaliArt(days){
  const P=days.map((_,k)=>k<6?[100+54*Math.cos((-90+60*k)*Math.PI/180),100+54*Math.sin((-90+60*k)*Math.PI/180)]:[100,100]);
  const spot=(d,[x,y])=>{const L=DAYS[d.w][0];
    if(d.pot)return `<g class="tk${d.key===thaliLand?' land':''}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><g class="tki"><circle r="22" class="tk-rim"/><circle r="22" fill="color-mix(in oklab,var(--pot-${d.pot}) 26%,var(--surface-1))"/><g clip-path="url(#tk-clip)">${potFace(d.pot,{box:'x="-24" y="-23" width="48" height="48"',mood:6})}</g><circle r="22" class="tk-ring"/></g><g class="tk-lab" transform="translate(15 15)"><circle r="7.5"/><text dy="3.2">${L}</text></g>${d.rescued?'<g class="tk-star" transform="translate(16 -16)"><circle r="7.5"/><path d="M0-4.6l1.35 2.75 3.05.45-2.2 2.15.52 3.03L0 2.95-2.72 4.38l.52-3.03-2.2-2.15 3.05-.45z"/></g>':''}</g>`;
    return `<g class="tsp${d.today?' now':''}${d.future?' fut':''}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="19"/><text dy="4.5">${L}</text></g>`};
  return `<svg class="thali-art" viewBox="0 0 200 200" role="img" aria-label="${days.filter(d=>d.pot).length} of 7 days finished this week"><defs><clipPath id="tk-clip"><circle r="21.2"/></clipPath></defs><circle cx="100" cy="100" r="97" class="th-rim"/><circle cx="100" cy="100" r="97" class="th-dots"/><circle cx="100" cy="100" r="86" class="th-well"/><circle cx="100" cy="100" r="97" fill="none" stroke="var(--k)" stroke-width="1.8" filter="url(#pf-wob)"/>${days.map((d,k)=>spot(d,P[k])).join('')}</svg>`;
}
function drawThali(){
  const el=$('#thali');if(!el)return;
  if(view.off){el.innerHTML='';return}
  const th=mem.thali||{}, rs0=mem.rescued||{};
  const days=weekKeys().map(d=>{const key=dayKey(d),w=d.getDay();
    return {key,w,today:key===today,future:d>now&&key!==today,rescued:!!rs0[key],pot:th[key]||((mem.hist[key]||0)>=1?ROTA[w]:null)}});
  const n=days.filter(d=>d.pot).length, sun=realDow===0, r=rescuesThisWeek();
  const byPot={};days.forEach(d=>{if(d.pot)byPot[d.pot]=(byPot[d.pot]||0)+1});
  const ate=Object.entries(byPot).map(([p,c])=>`${c} ${POTS[p].name.split(' ')[0]}`);
  const msg=sun?(n?`You ate ${andJoin(ate)} this week. Empty spots are days off; nothing is lost.`:'A quiet week. Empty spots are just days off; next week starts with a clean plate.')
    :n?'Each finished day, that pot takes its seat. A missed day just leaves a space.':'Finish today and the day’s pot takes its seat here.';
  const got=mem.stk||[], total=PLANTS.reduce((a,g)=>a+g.items.length,0);
  el.innerHTML=`<section class="thali${sun?' sunday':''}"><div class="thhead"><h2>${sun?'The meal you ate this week':'This week’s thali'}</h2><span class="thn"><b>${n}</b>/7</span></div>
   <div class="thbody">${thaliArt(days)}<div class="thside"><p>${msg}</p>${r?`<p class="thres"><span class="rsi">${RESCUE_SVG}</span>${r} rescue${r>1?'s':''} this week. Each one kept the plan going.</p>`:''}</div></div>
   ${got.length?`<div class="tin"><p class="tinh"><b>Your sticker tin</b><button class="linkbtn" data-crew>See the whole crew · ${got.length} of ${total}</button></p><div class="tinrow">${got.slice(-16).reverse().map(id=>`<span title="${plantName(id)}">${sticker(id)}</span>`).join('')}</div></div>`:''}</section>`;
  thaliLand=null;
  // Sunday: the week's meal is the point, so it sits up top
  const a=$('.tcol.a'), b=$('.tcol.b');
  if(sun&&el.parentNode!==a)$('#focus').after(el);else if(!sun&&el.parentNode!==b)b.append(el);
}

/* a surprise for finishing the day: a chef's tip, a plant fact or a new sticker */
const plantName=id=>{for(const g of PLANTS)for(const i of g.items)if(i[0]===id)return i[1];return id};
const TIPS=[
 'Heat mustard oil until a thin wisp of smoke rises, then lower the flame. That one moment takes away its raw, sharp bite.',
 'Let the cumin seeds crackle before anything else goes in. If they do not sizzle, the oil is not hot enough yet.',
 'Asafoetida burns in seconds. Add it just after the cumin crackles, then the next ingredient straight away.',
 'Squeeze the lemon on at the table, not in the pot. Heat dulls both its brightness and its vitamin C.',
 'Taste for salt after the lemon goes on. Acid makes food taste saltier, so you often need less.',
 'Chop the greens just before cooking. Cut leaves lose water and go limp within a day in the fridge.',
 'Fold the coriander in at the very end. Its smell fades within minutes of heat.',
 'Use three times as much water as beans when you soak. They double in size, and a dry top layer stays hard.',
 'For lentils, let the cooker cool down on its own. Forcing the steam out can spit starchy water through the vent.',
 'Rinse lentils until the water runs nearly clear. It washes off dust and cuts down the foam in the cooker.',
 'Old beans soften slowly. If yours stay firm, give them one more whistle rather than adding soda.',
 'Grind flaxseed in short bursts. Whole seeds pass straight through you; ground ones give you their goodness.',
 'Roast cumin until it smells nutty and turns one shade darker, then take it off. It keeps darkening as it cools.',
 'A spoon of curd on the side cools a hot bowl faster than water does.'];
const FACTS=[
 ['moringa','Moringa leaves grow on a tree, not a bush. It is called the drumstick tree after its long, thin pods.'],
 ['gooseberry','One Indian gooseberry (amla) can hold more vitamin C than a whole orange.'],
 ['turmeric','Turmeric is a root in the ginger family. A pinch of black pepper helps your body absorb it.'],
 ['blackgram','Black gram is urad dal. Split and skinned it turns white, so the same lentil sells as black and as white.'],
 ['pmillet','Pearl millet (bajra) grows in heat and drought where little else will, which is why it warms winter kitchens in Rajasthan.'],
 ['fmillet','Finger millet (ragi) is named for its seed heads, which spread like fingers. It is one of the richest grains in calcium.'],
 ['kidney','Raw kidney beans hold a toxin that only proper boiling destroys. Soaking and pressure-cooking makes them perfectly safe.'],
 ['fenugreek','Fenugreek leaves and fenugreek seeds come from the same plant. Dried, the leaves are sold as kasuri methi.'],
 ['coriander','Coriander leaves, stems and seeds all come from one plant, and the stems carry more flavour than the leaves.'],
 ['guava','A guava has around four times the vitamin C of an orange, weight for weight.'],
 ['lemon','The vitamin C in lemon helps your body take up the iron in lentils and greens. That is why it goes on every bowl.'],
 ['mung','Mung beans sprout in about a day. Sprouting softens them and makes them quicker to cook.'],
 ['barley','Barley is one of the oldest farmed grains. It was grown in the Indus Valley more than 4,000 years ago.'],
 ['chickpea','Black chickpeas (kala chana) are the smaller, older cousin of the white chickpea, with a tougher, fibre-rich skin.'],
 ['amaranth','Amaranth leaves come in green and red. The red ones bleed pink into the pot as they cook.'],
 ['flax','Flaxseed is one of the richest plant sources of omega-3 fat, but only once it is ground.']];
function surprise(){
  if(mem.surprise&&mem.surprise.d===today)return mem.surprise;
  const got=mem.stk||[], pool=PLANTS.flatMap(g=>g.items.map(i=>i[0])).filter(id=>STK[id]&&!got.includes(id));
  const seen=mem.seen=mem.seen&&typeof mem.seen==='object'?mem.seen:{tip:[],fact:[]};
  let r=Math.random(), kind=r<.36?'tip':r<.68?'fact':'sticker', i;
  if(kind==='sticker'&&!pool.length)kind='tip';
  if(kind==='sticker')i=pool[Math.floor(Math.random()*pool.length)];
  else{const L=kind==='tip'?TIPS:FACTS;seen[kind]=seen[kind]||[];let idx=L.map((_,k)=>k).filter(k=>!seen[kind].includes(k));if(!idx.length){seen[kind]=[];idx=L.map((_,k)=>k)}i=idx[Math.floor(Math.random()*idx.length)]}
  mem.surprise={d:today,kind,i,open:0};save();return mem.surprise;
}
const DABBA='<svg class="dabba" viewBox="0 0 80 72" aria-hidden="true"><ellipse cx="40" cy="66" rx="28" ry="4" fill="rgba(0,0,0,.14)"/><path d="M14 30h52v24c0 6-6 10-12 10H26c-6 0-12-4-12-10z" class="db-body"/><path d="M14 36h52" stroke="var(--steel-edge)" stroke-width="1.2" opacity=".6"/><path d="M20 34v22" stroke="var(--shine)" stroke-width="3" stroke-linecap="round"/><g class="db-lid"><path d="M10 24c0-4 4-7 8-7h44c4 0 8 3 8 7v6H10z" class="db-body"/><path d="M16 21h20" stroke="var(--shine)" stroke-width="2.4" stroke-linecap="round"/><rect x="33" y="10" width="14" height="8" rx="4" class="db-knob"/></g></svg>';
let justOpened=false;
function surpriseHTML(){
  const s0=surprise();
  if(!s0.open)return `<button class="reveal shut" data-surprise>${potFace(potId(),{cls:'dabba',mood:6})}<span><b>Something is under the lid</b><small>Your reward for finishing the day. Tap to open.</small></span></button>`;
  let eb,body,art;
  if(s0.kind==='tip'){const pid=potId();eb=(POTS[pid]?POTS[pid].name:'The pot')+'’s tip';art=potFace(pid,{mood:6});body=TIPS[s0.i]}
  else if(s0.kind==='fact'){const [id,t]=FACTS[s0.i];eb='About '+plantName(id).toLowerCase();art=sticker(id);body=t}
  else{const n=(mem.stk||[]).length, total=PLANTS.reduce((a,g)=>a+g.items.length,0);eb='New sticker';art=sticker(s0.i);body=`<b>${plantName(s0.i)}</b> joins your sticker tin. That is ${n} of ${total}.`}
  const h=`<div class="reveal open${justOpened?' fresh':''}"><span class="rv-art">${art}</span><span class="rv-t"><small>${eb}</small><span>${body}</span></span></div>`;
  justOpened=false;return h;
}
function openSurprise(btn){
  const s0=surprise();if(s0.open)return;
  s0.open=1;
  if(s0.kind==='sticker'){mem.stk=mem.stk||[];if(!mem.stk.includes(s0.i))mem.stk.push(s0.i)}
  else{mem.seen[s0.kind].push(s0.i)}
  save();
  if(still()){renderToday();return}
  btn.classList.add('opening');
  setTimeout(()=>{justOpened=true;tadka(btn);renderToday()},520);
}

/* a small food picture for each row, so the list reads at a glance */
const ROWICON={coffee:'coffee',breakfast:'eggs',ferment:'veg',hotsoak:'lentils',tea:'coffee',snack:'nuts',soak:'lentils'};
const rowIcon=(r,T)=>`<span class="rico">${ROWICON[r.id]?katori(KI[ROWICON[r.id]]):r.id==='lunch'||r.id==='dinner'||r.id==='cook'?katori(`<circle class="f" cx="20" cy="20" r="12.4" fill="var(--pot-${T.color})"/>`+(r.id==='cook'?'':'<circle cx="25" cy="23" r="3.6" fill="#f6e27f" stroke="#caa418" stroke-width=".9"/><circle cx="15" cy="17" r="2.2" fill="#3f9a45"/>')):''}</span>`;

/* the bowl: n of six layers showing; a new layer drops in with a ripple */
function drawBowl(bw,T,n){
  const svg=$('svg.bowl',bw);if(!svg)return;const ha=$('.hero-art',bw);if(ha)ha.dataset.n=n;
  const first=bw._n<0;
  if(first){void svg.getBoundingClientRect();svg.classList.add('intro');setTimeout(()=>svg.classList.remove('intro'),1400)}
  svg.dataset.n=n;
  $$('.ly',svg).forEach(g=>g.classList.toggle('on',+g.dataset.l<=n));
  if(!first&&n>bw._n&&!still()){svg.classList.remove('splash');void svg.getBoundingClientRect();svg.classList.add('splash');
    if(n===6)setTimeout(()=>tadka($('.bowl')),350)}
  bw._n=n;
}
function bowlLine(T,n){
  const L=LAYERS(T);
  if(!n)return 'Your bowl is empty. Each thing you finish adds to it.';
  if(n>=6)return `A full bowl. Well eaten.<q>${PF_SAYS[T.color]||PF_SAYS.yellow}</q>`;
  return `Next in the bowl: <b>${L[n]}</b>`;
}
function renderTodayCore(){
  const off=view.off||0;
  const T=todayRec(), id=T.color, nowM=off?mem.start-120:nowMin();
  rows=buildRows();
  const counted=rows.filter(r=>!r.shut&&!r.nocount), dn=counted.filter(r=>isDone(r.id)).length, ratio=dn/counted.length;
  if(!off)mem.hist[today]=+ratio.toFixed(2);const hk=Object.keys(mem.hist);if(hk.length>30)delete mem.hist[hk[0]];save();
  
  document.documentElement.dataset.pot=id;
  const bw=$('#bowl');if(bw.dataset.k!==id){bw.dataset.k=id;bw.innerHTML=bowlArt(id)+'<i class="steam" aria-hidden="true"><b></b><b></b><b></b></i>';bw._n=-1}
  $('#dayh').textContent=T.name;
  $('#dayp').innerHTML=`<b class="dishname">${T.dish}</b>`+(T.k?` About ${rs(Math.round((T.k[0]+REST.k)/50)*50)} kcal and ${Math.round(T.k[1]+REST.p)} g protein today.`:' '+T.nut.split('. ')[0]+' today.');
  const dots=[6,5,4,3,2,1,0].map(i=>{const d=new Date(now.getTime()-i*864e5),v=i===0?ratio:mem.hist[dayKey(d)]||0;
    return `<span class="${i===0?'now':''}"><i class="${v>=.9?'f':v>=.5?'m':v>0?'l':''}"></i>${DAYS[d.getDay()][0]}</span>`}).join('');
  $('#prog').innerHTML='';
  const dh=$('.dayhead'), all=dn===counted.length;dh.classList.toggle('nodone',!dn);dh.classList.toggle('alldone',all&&!off);
  drawBowl(bw,T,off?6:all?6:dn?Math.min(5,Math.ceil(dn*6/counted.length)):0);
  $('#dayp').insertAdjacentHTML('beforeend',`<span class="dprog${dn?' some':''}${all?' all':''}" aria-label="${dn} of ${counted.length} done"><b>${dn}</b><i>/${counted.length}</i> done</span>`);
  if(!off)$('#dayp').insertAdjacentHTML('beforeend',`<span class="bnext">${bowlLine(T,bw._n)}</span>`);
  if(!off){mem.thali=mem.thali||{};
    if(all){if(mem.thali[today]!==T.color){mem.thali[today]=T.color;thaliLand=today}}else delete mem.thali[today];
    const tk=Object.keys(mem.thali);if(tk.length>21)delete mem.thali[tk[0]];save()}
  $('#ynote').innerHTML=noteHTML(nowM);
  let open=rows.filter(r=>!r.shut&&!isDone(r.id));
  if(!open.some(r=>!r.nocount))open=[]; // only optional things left: the day is done
  const nx=null;
  const f=focusHTML(nowM,nx,open);
  $('#focus').innerHTML=f.html;
  $('#askpot').innerHTML=askHTML(f.cur);
  const tt=$('.tabs [data-tab="today"]');if(tt)tt.style.setProperty('--tday',`var(--pot-${id})`);
  heroMood();
  $('#strip').innerHTML='';
  const soakDue=!!soakLine(tomId)&&!isDone('soak')&&nowM>=SOAK_FROM;
  $('#tl').innerHTML=rows.map(r=>r.shut?`<li class="shut">${r.b} at ${clock(r.m)}</li>`:
   `<li class="${isDone(r.id)?'done':''}${r.id===f.cur?' cur':''}${r.id==='soak'&&soakDue?' due':''}"><button class="tick" data-done="${r.id}" aria-pressed="${isDone(r.id)?'true':'false'}" aria-label="Done: ${r.b}"><i></i></button><button class="trow" data-pin="${r.id}"><span class="tline"><b>${r.b}${r.id==='tea'?'<span class="tag">Optional</span>':''}${!isDone(r.id)&&prepped(r.id)?`<span class="pbadge" title="${prepped(r.id)}">${CHECK}Prepped</span>`:''}</b>${rowIcon(r,T)}</span><small>${subLine(r)}</small></button></li>`).join('');
  const w=mem.day.water, fh=mem.fish.n;
  const cups=(n,max,art,key,unit)=>Array.from({length:max},(_,k)=>`<button data-${key}="${k+1}" aria-pressed="${k<n}" aria-label="${unit} ${k+1}${k<n?', done':''}">${art(k<n)}</button>`).join('');
  $('#track').innerHTML=`<div class="stp${w>=WATER?' full':''}"><span class="sth"><b>Water</b><small>${w>=WATER?'Done. '+w+' glasses today.':w+' of '+WATER+' glasses. A glass is 250 ml.'}</small>${w>=WATER&&!off?`<span class="wsays">${potFace(id,{alive:1,cls:'poke',mood:6})}<q>“Hydrated, apparently.”</q></span>`:''}</span><span class="cups glass" role="group" aria-label="Glasses of water today">${cups(Math.min(w,WATER),WATER,glassArt,'wset','Glass')}</span></div>
   <div class="stp${fh>=2?' full':''}"><span class="sth"><b>Fish this week</b><small>${fh>=2?'Done. '+fh+' fish meals this week.':fh+' of 2. Steamed in the pot.'}</small></span><span class="cups plate" role="group" aria-label="Fish meals this week">${cups(Math.min(fh,2),2,plateArt,'fset','Fish meal')}</span></div>`;
  if(pourAt){const g=$(`[data-wset="${pourAt}"] svg`);if(g&&!still())g.classList.add('pour');pourAt=0}
  $('#tomorrow').textContent=tomText();
  const pp=(!off&&(dow===0||dow===4))?prepCount(dow===0?'sun':'thu'):null;
  $('.tabs [data-tab="today"]').classList.toggle('alert',!!f.ask||soakDue);
  $('.tabs [data-tab="week"]').classList.toggle('alert',!!pp&&pp[0]<pp[1]);
}
const WATER=10;
function fillStart(){
  const sel=$('#start');let o='';
  for(let m=420;m<=660;m+=30)o+=`<option value="${m}"${m===mem.start?' selected':''}>${clock(m)}</option>`;
  sel.innerHTML=o;
  sel.addEventListener('change',()=>{mem.start=+sel.value;save();renderToday();renderCook()});
}

