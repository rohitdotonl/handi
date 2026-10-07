/* ---------- week: prep ---------- */
const SUN=[
  [0,'<b>Put the eggs on.</b> Lay <b>12 eggs</b> in the cooker pot, no lid. Cover with cold water by 2 cm. Boil hard on high flame, then turn to medium and boil for 9 minutes.',[[9,'Eggs boiling']]],
  [5,'<b>Wash both bunches of greens while the eggs boil.</b> Fill a big bowl with water, swish the leaves around and lift them out. Change the water and repeat until you have done <b>3 changes</b> and no sand is left at the bottom. Shake the leaves and spread them on a clean towel to dry.'],
  [15,'<b>Stop the eggs.</b> When the timer rings, pour the hot water away and fill the pot with cold water for 5 minutes. Dry the eggs and put them in a box in the fridge, shells on.'],
  [20,'<b>Grind the flaxseed.</b> Put <b>100 g flaxseed</b> in the <b>dry</b> mixer-grinder jar. Run it in <b>short bursts of a few seconds</b> until it looks like coarse powder; running it for long makes the jar hot. Pour it into a clean, dry glass jar and keep it in the fridge. You will use 1 to 2 tbsp a day.'],
  [25,'<b>Roast the cumin.</b> Spread <b>3 tbsp cumin seeds</b> on a microwave-safe plate. Microwave for <b>60 to 90 seconds</b>, until they smell toasty and look a shade darker; do not let them turn black. Let them cool for a minute, then grind them to a powder and store them in a small jar.',[[1.5,'Cumin in microwave']]],
  [30,'<b>Make the chutney.</b> Follow the recipe at Cook, then Snacks and pickle, then Mint-coriander chutney. Grind in short bursts, and keep it in a clean glass jar in the fridge.'],
  [40,'<b>Peel the garlic and ginger.</b> For <b>2 bulbs of garlic</b>, press each clove with the flat side of a knife to loosen the skin, then peel. Scrape the skin off the ginger with a spoon. Keep both in a small box in the fridge.'],
  [50,'<b>Pack the greens.</b> By now the leaves should feel dry. Trim off any thick, woody stems and put the leaves loosely in a box lined with a clean cloth. Do not chop them yet; cut greens spoil faster.'],
  [60,'<b>Top up the jars.</b> Check the five-lentil jar, <button class="jl" data-jar="jar-a">spice jar A</button> and <button class="jl" data-jar="jar-b">jar B</button>, the peanuts and the roasted gram flour. Refill any jar that is running low from your monthly shopping. Check the pickle jar: no mould, and no wet spoon left inside.'],
  [75,'<b>All done.</b> Next, cook the White Pot. Nothing to soak tonight.']];
const THU=[
  [0,'<b>Boil 9 eggs</b> the same way as on Sunday: cold water 2 cm above the eggs, boil hard, then medium for 9 minutes.',[[9,'Eggs boiling']]],
  [5,'<b>Look at the greens in the fridge.</b> If the first lot is nearly gone or looks tired, wash a fresh bunch the same way as on Sunday: 3 changes of water, shake dry, spread on a towel.'],
  [15,'<b>Check the fridge.</b> Look at the curd, lemons, tomatoes and cucumbers and note what is running out. If the chutney has gone dark, make half a batch (Cook, then Mint-coriander chutney).'],
  [25,'<b>Plan Saturday’s fish.</b> Either buy it fresh on the day, or check that there is a tin of sardines in the cupboard.']];
function renderPrep(){
  if(!mem.prep||mem.prep.wk!==monday){if(mem.prep&&mem.prep.wk)mem.prevPrep=mem.prep;mem.prep={wk:monday,sun:{},thu:{},t0:{}}}
  const defs={sun:['Sunday prep','About 75 minutes, after the weekly shop. Sets up Monday to Thursday.',SUN,600,0],thu:['Thursday top-up','About 25 minutes. Sets up Friday to Sunday.',THU,19*60+30,4]};
  const order=dow===4||dow===5?['thu','sun']:['sun','thu'];
  $('#prep-wrap').innerHTML=order.map(k=>{
    const [title,lede,L,base,d]=defs[k], dn=mem.prep[k], t0=mem.prep.t0[k], st=t0==null?base:t0;
    const c=L.filter((_,i)=>dn[i]).length, first=L.findIndex((_,i)=>!dn[i]);
    return `<section class="prepbox"><h2>${title}${dow===d?'<span class="tg">Today</span>':''}</h2><p class="lede">${lede}</p>
     <div class="prephd"><span class="count">${c===L.length?'All done':c+' of '+L.length+' done'}</span><span class="acts">${c?`<button class="btn ghost small" data-preset="${k}">Start over</button>`:''}</span></div>
     <div class="bar"><i style="width:${c/L.length*100}%"></i></div>
     <ol class="pr">${L.map((r,i)=>`<li class="${dn[i]?'done':''}${i===first?' next':''}"><span class="t">${i+1}</span><span class="w">${r[1]}${r[2]?`<span class="tms">${r[2].map(t=>`<button class="tm" data-tm="${t[0]}" data-label="${t[1]}">${clockSvg}<span>${t[1]}, <span class="tt">${t[0]} min</span></span></button>`).join('')}</span>`:''}</span><button class="tick" data-pp="${k}:${i}" aria-pressed="${dn[i]?'true':'false'}" aria-label="Done: step ${i+1}"><i></i></button></li>`).join('')}</ol></section>`;
  }).join('');
  $$('tr[data-dow]').forEach(r=>r.classList.toggle('tonight',+r.dataset.dow===dow));
  $('#rota').innerHTML=[1,2,3,4,5,6,0].map(d=>`<button data-rec="pot:${ROTA[d]}" class="${d===dow?'now':''}" aria-label="${DAYS[d]}: ${POTS[ROTA[d]].name}">${DAYS[d].slice(0,3)}${potIcon(ROTA[d])}<small>${POTS[ROTA[d]].name.split(' ')[0]}</small></button>`).join('');
  drawDock();
}

/* ---------- week: plants ---------- */
/* ---------- week: plan ---------- */
const cleanOpt=x=>x.replace(/\s*\(.*?\)/g,'').trim();
const optsOf=str=>str.split(',').map(cleanOpt).filter(Boolean).map(x=>x[0].toUpperCase()+x.slice(1));
const PLAN_G=[
 {k:'greens',t:'Leafy greens',h:'pick 2 different kinds',max:2,opts:()=>optsOf(SEASON[mon].g)},
 {k:'cab',t:'Cabbage family',h:'pick 2',max:2,opts:()=>optsOf(SEASON[mon].c)},
 {k:'root',t:'Salad root',h:'pick 1',max:1,opts:()=>['Carrot','Beetroot','Radish']},
 {k:'extra',t:'Extra vegetable',h:'pick 1, it goes in the pot with the greens',max:1,opts:()=>optsOf(SEASON[mon].v)},
 {k:'fruit',t:'Seasonal fruit',h:'pick 1',max:1,opts:()=>optsOf(SEASON[mon].f)}];
const planNeed=PLAN_G.reduce((a,g)=>a+g.max,0);
const planPick=()=>(mem.plan&&mem.plan.pick)||{};
const planAge=()=>mem.plan&&mem.plan.at?(Date.now()-mem.plan.at)/864e5:99;
const planCount=()=>PLAN_G.reduce((a,g)=>a+(planPick()[g.k]||[]).length,0);
const PLAN_SLOT={greens1:['greens',0],greens2:['greens',1],cabbage:['cab',0],radish:['cab',1],root:['root',0],other:['extra',0],fruit:['fruit',0]};
const planName=id=>{const sl=PLAN_SLOT[id];return sl&&mem.plan?(planPick()[sl[0]]||[])[sl[1]]:undefined};
function planLine(){
  const p=planPick(), bit=(k,l)=>(p[k]||[]).length?l+' '+p[k].join(' and '):'';
  const parts=[bit('greens','greens'),bit('cab','cabbage family'),bit('root','salad root'),bit('extra','extra vegetable')].filter(Boolean);
  return parts.length?'This week’s picks: '+parts.join(', ')+'.':'';
}
function setPlan(fn){
  mem.plan=mem.plan||{pick:{}};mem.plan.pick=mem.plan.pick||{};fn(mem.plan.pick);mem.plan.at=Date.now();save();
  renderPlan();renderShop();renderToday();
}
function renderPlan(){
  const pick=planPick(), n=planCount(), stale=mem.plan&&planAge()>=6;
  $('#plan-wrap').innerHTML=`<div class="sum"><div class="row"><span class="count">${n} of ${planNeed} chosen</span><button class="btn small" data-planfill>Use suggestions</button></div><div class="bar"><i style="width:${n/planNeed*100}%"></i></div>
   <p class="sm" style="margin:0">${n===planNeed?'Done. Your shopping list and recipe notes now use these.':'Choose what you will buy and eat this week. This fills in your shopping list and recipe notes. “Use suggestions” picks the first ones in season; you can change any.'}</p></div>
   ${stale?'<p class="note" style="margin-top:12px">This plan is from last week. Choose again, or clear it to start fresh.</p>':''}
   <p class="sm" style="margin:12px 2px 0">${SEASON[mon].n}</p>
   ${PLAN_G.map(g=>`<h3 class="grp2">${g.t}<small class="ghs">${g.h}</small></h3><div class="chips">${g.opts().map((x,i)=>`<button class="chip" data-pl="${g.k}:${i}" aria-pressed="${(pick[g.k]||[]).includes(x)?'true':'false'}">${x}</button>`).join('')}</div>`).join('')}
   <p style="margin-top:22px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn small" data-go="shop/w">Open the shopping list</button><button class="btn ghost small" data-planclear>Clear plan</button></p>`;
}
function renderPlants(){
  $('#plants-list').innerHTML=PLANTS.map(g=>`<h3 class="grp2">${kiOf(g.g)}${g.g}</h3><div class="chips">${g.items.map(i=>`<button class="chip${i[3]?' fixed':''}" data-p="${i[0]}" aria-pressed="${mem.p[i[0]]?'true':'false'}">${sticker(i[0])}${i[1]}</button>`).join('')}</div>`).join('');
  score();
}
function score(){
  let n=0;PLANTS.forEach(g=>g.items.forEach(i=>{if(mem.p[i[0]])n+=i[2]}));
  const f=x=>Number.isInteger(x)?x:x.toFixed(2).replace(/0$/,'');
  $('#score').innerHTML=`${f(n)}<small> of 30</small>`;
  const C=2*Math.PI*27.5, pr=$('#ring-pr');pr.style.strokeDasharray=C;pr.style.strokeDashoffset=C*(1-Math.min(1,n/30));
  const stale=n>0&&mem.pw&&mem.pw!==monday;
  $('#score-msg').classList.toggle('hit',!stale&&n>=30);
  $('#score-msg').textContent=stale?'These ticks are from an earlier week. Start a new week when you are ready.':n>=30?'Thirty reached. Anything more is a bonus.':n===0?'Tap each plant the first time you eat it this week.':`${f(30-n)} to go.`;
}

