/* ---------- today ---------- */
function soakLine(id){
  if(id==='black')return 'Put 120 g black chickpeas and 60 g whole barley in 3 glasses of water.';
  if(id==='red')return 'Put 120 g kidney beans in 3 glasses of water.';
  if(id==='white'&&winter)return 'Put 60 g pearl millet in 2 glasses of water.';
  return '';
}
const cookStart=(pot,lunch)=>lunch-Math.ceil(pot.total/15)*15;
let tomId=(mem.day.fix&&mem.day.fix.orig)||ROTA[(dow+1)%7];
function tomText(){
  let t=`Tomorrow is the ${POTS[tomId].name}.`;
  if(tomId==='blue')t+=' Buy fish tomorrow, or keep a tin of sardines ready.';
  if(tomId==='white')t+=' Buy 200 g chicken.';
  return t;
}
let rows=[], view={pin:null,nosoak:false,off:0};
/* today's recipe can differ from the rota after a forgotten soak */
const potId=()=>{if(view.off)return ROTA[dow];const f=mem.day.fix;if(f&&f.pot)return f.pot;if(mem.next&&mem.next.d===today)return mem.next.pot;return ROTA[dow]};
function todayRec(){
  const f=!view.off&&mem.day.fix;
  if(f&&f.rec){const r=BORED.find(x=>x.id===f.rec.split(':')[1]);return {id:'mince',name:r.name,dish:r.name,total:r.total,line:r.line,rec:f.rec,color:'yellow',fg:POTS.yellow.fg,nut:r.nut}}
  const id=potId(), p=POTS[id];
  return {id,name:p.name,dish:p.dish,total:p.total+(f&&f.kind==='quick'?10:0),line:p.line,rec:'pot:'+id,color:id,fg:p.fg,k:p.k};
}
const hotLine=id=>id==='black'?'Put 120 g black chickpeas and 60 g whole barley in a bowl. Cover with boiling water, lid on, for 2 hours.'
  :id==='red'?'Put 120 g kidney beans in a bowl. Cover with boiling water, lid on, for 2 hours. Throw the water away afterwards.'
  :'Put 60 g pearl millet in a bowl. Cover with boiling water, lid on, for 2 hours.';
function applyFix(k){
  const nm=nowMin(), orig=potId();
  if(k==='undo'){
    const f=mem.day.fix;
    if(f&&f.kind==='quick'){timers=timers.filter(t=>t.label!=='Hot soak');mem.tm=timers}
    mem.next=null;tomId=ROTA[(realDow+1)%7];mem.day.fix=null;mem.day.soakOk=0;mem.day.done.hotsoak=0;
    if(mem.rescued)delete mem.rescued[today];
  }else if(k==='quick'){
    mem.day.fix={kind:'quick',pot:orig,t0:nm,end:nm+120};startTimer(120,'Hot soak');
  }else{
    mem.day.fix={kind:k,pot:k==='swap'?'yellow':null,rec:k==='mince'?'bored:mince':null,orig};
    mem.next={d:tomKey,pot:orig};tomId=orig;
  }
  if(k!=='undo'){mem.rescued=mem.rescued||{};mem.rescued[today]=k;const r=rescuesThisWeek();toast(`Day rescued. ${r>1?r+' rescues this week, each one a win.':'That counts as a win.'}`)}
  view.nosoak=false;save();drawDock();renderToday();renderCook();wake();
}
function buildRows(){
  const T=todayRec(), f=!view.off&&mem.day.fix, S0=mem.start;
  let L=S0+240, cookM=cookStart(T,L);
  if(f&&f.kind==='quick'){cookM=Math.max(cookM,f.end);L=Math.max(L,cookM+T.total)}
  const fruit=SEASON[mon].f.split(', ').slice(0,3).join(', ').replace(/\s*\(.*?\)/g,'').toLowerCase(), pf=(planPick().fruit||[])[0];
  const guavaLow=[2,3,4,5].includes(mon);
  const soak=soakLine(tomId);
  return [
   {id:'coffee',m:S0-60,b:'Coffee or tea',items:['One cup of black tea or coffee, with no sugar and no milk','Have it about an hour before you eat, not with a meal']},
   {id:'breakfast',m:S0,b:'Breakfast',items:['3 boiled eggs from your box in the fridge. Peel them just before eating',guavaLow?'A bowl of cut papaya, or an orange, washed and peeled':'1 guava, washed and cut into pieces','20 g roasted peanuts (a small handful) and 3 to 4 walnut halves','Your daily creatine, 3 to 5 g, stirred into a glass of water and drunk']},
   fermentOn&&{id:'ferment',m:S0+120,b:'Fermented black-carrot drink',items:['1 glass (200 ml), between meals','Eat a few of the carrots from the jar too']},
   f&&f.kind==='quick'&&{id:'hotsoak',m:f.t0,b:'Hot soak',items:[hotLine(f.pot),'Ready after 2 hours. A timer is running.']},
   {id:'cook',m:cookM,b:`Cook the ${T.name}`,items:[...(T.id==='mince'?[]:[T.dish]),`${T.total} minutes in all, about 15 of them hands-on. This one pot makes lunch and dinner. Tap Start cooking for step-by-step help.`,T.line],rec:T.rec},
   {id:'lunch',m:L,b:'Lunch',items:['Half the pot, in a bowl','On top: 1 tsp olive oil, ¾ tbsp ground flaxseed and ½ lemon'+(gooseOn?', plus 1 chopped gooseberry':''),'A chopped salad on the side (Cook, then Chopped salad)','100 g plain curd']},
   {id:'tea',m:L+120,b:'Tea or coffee',items:['Black tea or coffee, no sugar','Keep it an hour away from a meal, and never have it with the lentil bowl'],nocount:1},
   {id:'snack',m:S0+420,b:'Snack',items:['A glass of roasted-gram drink, or a fistful (40 g) of roasted chickpeas',pf?`1 fruit: ${pf.toLowerCase()}, your pick this week`:`1 fruit. In season now: ${fruit}`]},
   {id:'dinner',m:S0+570,b:'Dinner',items:['The other half of the pot, from the fridge. Reheat it until it is steaming all the way through','The same toppings as lunch','A chopped salad on the side','100 g plain curd']},
   {id:'soak',m:SOAK_AT,b:soak?'Soak for tomorrow':'Nothing to soak tonight',items:soak?[soak]:[],note:tomText(),nocount:soak?0:1,soak:!!soak}
  ].filter(Boolean).sort((a,b)=>a.m-b.m);
}
const isDone=id=>!view.off&&!!mem.day.done[id];
function setDone(id,on){
  mem.day.done[id]=on?1:0;
  const r=rows.find(x=>x.id===id), sub=mem.day.sub[id]={};
  if(on&&r)r.items.forEach((_,k)=>sub[k]=1);
  if(id==='soak')mem.soakFor=on?tomKey:null;
}
function toggleLine(id,i){
  const r=rows.find(x=>x.id===id);if(!r)return;
  const sub=mem.day.sub[id]=mem.day.sub[id]||{};
  if(isDone(id)){mem.day.done[id]=0;if(id==='soak')mem.soakFor=null;r.items.forEach((_,k)=>sub[k]=k===i?0:1);return}
  sub[i]=sub[i]?0:1;
  if(r.items.every((_,k)=>sub[k]))setDone(id,1);
}
function prepCount(k){const L=k==='sun'?SUN:THU;const d=(mem.prep&&mem.prep.wk===monday?mem.prep[k]:{})||{};return [Object.values(d).filter(Boolean).length,L.length]}

function focusHTML(nowM,nx,open){
  const id=potId(), pot=POTS[id], L=mem.start+240, line=soakLine(tomId);
  const soakRow=rows.find(r=>r.id==='soak');
  const soakPending=!!line&&!isDone('soak');
  // 1. this morning: was today's pot soaked?
  if(!view.off&&!mem.day.fix&&soakLine(id)&&mem.soakFor!==today&&!isDone('cook')&&!mem.day.soakOk&&nowM<mem.start+570){
    const what=id==='white'?'soaked pearl millet':id==='red'?'soaked kidney beans':'soaked chickpeas and barley';
    if(view.nosoak){
      const q=POTS[id].total+10, quickFits=nowM+120+q<=L+15, lunchAt=Math.max(L,nowM+120+q);
      const opt=(k,t,d)=>`<button class="opt" data-fix="${k}"><b>${t}</b><small>${d}</small></button>`;
      const quick=opt('quick','Hot soak for 2 hours','Cover with boiling water for 2 hours, then cook. It takes 10 minutes longer.');
      const swap=opt('swap','Cook the Yellow Pot today','No soak needed. The '+pot.name+' moves to tomorrow; soak it tonight.');
      const mince=opt('mince','Soya Mince and Peas','35 minutes, nothing to soak. The '+pot.name+' moves to tomorrow.');
      const ord=quickFits?[quick,swap,mince]:[swap,quick,mince];
      return {ask:1,html:`<section class="focus ask rescue-ask"><p class="lab">Rescue</p><h2>Forgot to soak? Let’s rescue the day.</h2><p>Pick one. Any of them keeps the week on track, and a rescue counts as a win.</p><div class="opts">${ord.join('')}</div><button class="fback" data-soak="yes">I did soak it after all</button></section>`};
    }
    return {ask:1,html:`<section class="focus ask"><p class="lab">This morning</p><h2>Did you soak last night?</h2><p>The ${pot.name} needs ${what}.</p><div class="acts"><button class="btn" data-soak="yes">Yes, I soaked</button><button class="btn ghost" data-soak="no">No, rescue it</button></div></section>`};
  }
  let n=view.pin&&rows.find(r=>r.id===view.pin&&!r.shut), natural=nx||open[0];
  if(!n){
    if(natural&&natural.id==='soak'&&nowM>=SOAK_FROM&&!view.off)natural=open.find(r=>r.id!=='soak');
    n=natural;
  }
  if(!n)return {html:`<section class="focus fin"><p class="lab">All done</p><h2>That is the day.</h2>${view.off?'':surpriseHTML()}<p>${tomText()}</p></section>`};
  const pinned=!!view.pin&&n.id!==(natural&&natural.id);
  const soakCard=n.id==='soak'&&soakPending;
  const kind=soakCard?'soak':'';
  const diff=n.m-nowM, late=!pinned&&n===natural&&n.m<nowM-20;
  const lab=view.off?(pinned?'Looking ahead':'First thing'):soakCard?'Tonight':pinned?'Looking ahead':'Next';
  const done=isDone(n.id), sub=mem.day.sub[n.id]||{};
  const lines=n.items.map((t,k)=>n.rec?`<li><span class="plain">${t}</span></li>`:`<li><button class="ln" data-line="${n.id}:${k}" aria-pressed="${done||sub[k]?'true':'false'}"><i></i><span>${t}</span></button></li>`).join('');
  const resume=mem.cook&&n.rec&&mem.cook.kind+':'+mem.cook.id===n.rec&&mem.cook.i>0;
  const acts=done?`<button class="btn ghost" data-done="${n.id}">Undo</button>`
    :n.rec?`<button class="btn" data-rec="${n.rec}">${resume?'Resume cooking':'Start cooking'}</button><button class="btn ghost" data-done="${n.id}">Mark done</button>`
    :`<button class="btn" data-done="${n.id}">${soakCard?'Soaked it':'Done'}</button>`;
  return {cur:n.id,html:`<section class="focus ${kind}">${pinned?'<button class="fback" data-pin="">Back to next</button>':''}<p class="lab">${lab}</p><h2>${n.b}</h2>${prepped(n.id)?`<p class="pnote">${CHECK}<span><b>Prepped.</b> ${prepped(n.id)}</span></p>`:''}${lines?`<ul class="fl">${lines}</ul>`:''}${n.note?`<p class="fnote">${n.note}</p>`:''}<div class="acts">${acts}</div></section>`,
    strip:!pinned&&soakPending&&nowM>=SOAK_FROM&&n.id!=='soak'};
}
const WK=[1,2,3,4,5,6,0];
/* one-line summary made of whole phrases; the rest is counted, never cut mid-sentence */
function subLine(r){
  const all=r.items.concat(r.note?[r.note]:[]).map(t=>t.replace(/[.!?]+$/,''));
  const out=[];let len=0;
  for(const t of all){if(out.length&&len+t.length>56)break;out.push(t);len+=t.length}
  const more=all.length-out.length;
  return out.join(' · ')+(more?` <em class="more-n">+${more} more</em>`:'');
}
function drawBed(){
  const el=$('#bed'), nowM=nowMin();
  if(view.off||nowM<SOAK_FROM){el.innerHTML='';return}
  const line=soakLine(tomId), b=mem.day.bed=mem.day.bed||{}, tom=POTS[tomId];
  const left=SOAK_AT-nowM;
  const items=[];
  if(line)items.push({k:'soak',t:'Soak for tomorrow',d:line+(isDone('soak')?'':' Do it before you go to sleep.'),done:isDone('soak')});
  items.push({k:'pot',t:'Set out tomorrow’s things',d:'Put the cooker, the two spice jars and the ingredients for the '+tom.name+' where you can reach them.',done:!!b.pot});
  items.push({k:'eggs',t:'Check the eggs',d:'You need 3 boiled eggs for breakfast. If the box is nearly empty, boil more now: 9 minutes.',done:!!b.eggs});
  const n=items.filter(x=>x.done).length, all=n===items.length;
  const urgent=false;
  const tc=castOf(tomId), said=all?'“Sleep well. See you at breakfast.”':line?(isDone('soak')?THANKS[tomId]:ASK[tomId]):BED_SAY[tomId];
  el.innerHTML=`<section class="bed${all?' ok':''}${urgent?' urgent':''}"><div class="bhead"><h2>${all?'Tomorrow is ready':'Before bed'}</h2><span>${n} of ${items.length}</span></div>
   <div class="bedsay">${potFace(tomId,{alive:1,cls:'poke',mood:all||isDone('soak')?6:0})}<p><b>${tc.name}, tomorrow’s ${tom.name}</b><q>${said||'“See you tomorrow.”'}</q></p></div>
   <ul>${items.map(x=>`<li><button class="bi" data-bed="${x.k}" aria-pressed="${x.done}"><i class="box"></i><span><b>${x.t}</b><small>${x.d}</small></span></button></li>`).join('')}</ul></section>`;
}
/* the status line: context appears only while it is relevant */
let lastStatus='';
function drawStatus(){
  const o=view.off;view.off=0;
  let T,soakDue;
  try{T=todayRec();soakDue=!!soakLine(tomId)&&!isDone('soak')&&nowMin()>=SOAK_FROM}finally{view.off=o}
  const n=Date.now(), run=timers.filter(t=>t.end>n).length, rang=timers.filter(t=>t.end<=n).length;
  const seg=[`<span class="sg">${DAYS[realDow].slice(0,3)} ${now.getDate()} ${MONTHS[mon].slice(0,3)}</span>`,`<span class="sg seg-on">${T.name}</span>`];
  if(soakDue)seg.push(`<span class="sg seg-warn">Soak tonight</span>`);
  if(rang)seg.push(`<span class="sg seg-warn">${rang===1?'Timer':rang+' timers'} done</span>`);
  if(run)seg.push(`<span class="sg">${run} timer${run>1?'s':''} running</span>`);
  seg[seg.length-1]=seg[seg.length-1].slice(0,-7)+'<span class="cursor" aria-hidden="true"></span></span>';
  const h=seg.join('<span class="dot"> · </span>');
  if(h!==lastStatus){$('#date').innerHTML=h;lastStatus=h}
}
function renderToday(){
  const off=view.off||0;
  document.body.classList.toggle('previewing',!!off);
  if(off){
    const keep=[dow,tomId];
    dow=(realDow+off+7)%7;tomId=ROTA[(dow+1)%7];
    try{renderTodayCore()}finally{dow=keep[0];tomId=keep[1]}
    $('#dayp').innerHTML=$('#dayp').innerHTML.replace(' today',' that day');
  }else renderTodayCore();
  drawDaySwitch();
  drawBed();
  drawIntro();
  drawStatus();
  $('#plancard').innerHTML=(!off&&[6,0,1].includes(realDow)&&(!mem.plan||planAge()>=6||planCount()<planNeed))?`<div class="plancard"><div><b>Plan the week</b><span>${planCount()&&planAge()<6?'Finish choosing: '+planCount()+' of '+planNeed+' done.':'Choose your greens and fruit in a minute. It fills in your shopping list.'}</span></div><button class="btn small ghost" data-go="week/plan">Open plan</button></div>`:'';
  const f=!off&&mem.day.fix;
  $('#fixnote').innerHTML=f?`<div class="fixnote rescued"><span class="rsi">${potFace(f.orig||f.pot||potId(),{buoy:1})}</span><span><b>Day rescued</b>${f.kind==='quick'?'Hot soak running for 2 hours. Then cook the '+POTS[f.pot].name+'.':f.kind==='swap'?'Plan changed to the Yellow Pot. The '+POTS[f.orig].name+' moves to tomorrow: soak it tonight.':'Plan changed to Soya Mince and Peas. The '+POTS[f.orig].name+' moves to tomorrow: soak it tonight.'}</span><button class="btn small ghost" data-fix="undo">Undo</button></div>`:'';
  drawThali();
}
function drawDaySwitch(){
  const off=view.off||0, ti=(realDow+6)%7, sel=ti+off;
  const d=new Date(now.getTime()+off*864e5);
  $('#dayswitch').innerHTML=`<div class="dsw" role="group" aria-label="Look at another day">${WK.map((w,k)=>{const o=k-ti;
    return `<button data-vday="${o}" class="${o===0?'is-today':''}${k===sel?' on':''}" aria-pressed="${k===sel}" aria-label="${DAYS[w]}: ${POTS[ROTA[w]].name}${o===0?', today':''}"><span>${DAYS[w].slice(0,2)}</span><small style="--c:var(--pot-${ROTA[w]})">${POTS[ROTA[w]].name.split(' ')[0]}</small></button>`}).join('')}</div>`;
  $('#daynote').innerHTML=off?`<div class="dsw-note"><span>Viewing <b>${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}</b>. Plan only; nothing here is saved.</span><button class="btn small ghost" data-vday="0">Back to today</button></div>`:'';
  $('#laterh').textContent=off?DAYS[d.getDay()]+'’s plan':'The rest of today';
}
