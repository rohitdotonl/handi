/* ---------- cook list ---------- */
const helpOf=(k,id)=>(mem.help&&mem.help[k+':'+id])||mem.helpDef||'full';
const rawRec=(k,id)=>k==='pot'?POTS[id]:k==='bored'?BORED.find(x=>x.id===id):k==='extra'?EXTRAS.find(x=>x.id===id):SIDES.find(x=>x.id===id);
/* after a hot soak, the day's pot reads: hot soak first, 10 minutes longer on low flame */
function recOf(k,id){
  let r=rawRec(k,id);
  if(r&&r.q&&helpOf(k,id)==='quick')r={...r,steps:r.q,quick:true};
  const f=mem.day.fix;
  if(!r||k!=='pot'||!f||f.kind!=='quick'||id!==f.pot)return r;
  const night=/Night before/.test(r.steps[0].s);
  const first=id==='white'?S('<b>Hot soak instead of overnight:</b> cover the pearl millet with boiling water, lid on, for 2 hours. Meanwhile rinse the lentil mix and soak it 30 minutes.',[120,'Hot soak'],[30,'Lentil soak'])
    :S('<b>Hot soak instead of overnight:</b> rinse, then cover with boiling water, lid on, for <b>2 hours</b>. Drain and rinse before cooking.',[120,'Hot soak']);
  const steps=r.steps.map((st,i)=>i===0&&night?first:{s:st.s,t:st.t.map(t=>t[1]==='Low flame'?[t[0]+10,t[1]]:t)});
  return {...r,total:r.total+10,steps,setnote:(r.setnote||'')+' Hot-soaked today: 10 minutes longer on the low flame.'};
}
function recRow(kind,id,r){
  const meta=kind==='pot'?`${r.days}. ${r.line}`:(r.days?r.days+'. ':'')+r.line;
  return `<li><button class="rlb" data-rec="${kind}:${id}">${kind==='pot'?`<span class="ptile" style="--t:var(--pot-${id})">${potIcon(id)}</span>`:''}<span><span class="rname">${r.name}${r.q&&helpOf(kind,id)==='quick'?'<span class="tg tgq">Short steps</span>':''}${kind==='pot'&&id===potId()&&!(mem.day.fix&&mem.day.fix.rec)?'<span class="tg">Today</span>':''}</span>${r.dish?`<span class="rdish">${r.dish}</span>`:''}<span class="rline">${meta}</span></span><span class="rt">${r.total?r.total+' min':''}</span></button></li>`;
}
function renderCook(){
  $('#pots').innerHTML=['yellow','black','blue','red','white'].map(id=>recRow('pot',id,POTS[id])).join('');
  $('#bored').innerHTML=BORED.map(r=>recRow('bored',r.id,r)).join('');
  $('#sides').innerHTML=SIDES.map(r=>recRow('side',r.id,r)).join('');
  $('#extras').innerHTML=EXTRAS.map(r=>recRow('extra',r.id,r)).join('');
  const c=mem.cook,r=c&&recOf(c.kind,c.id);
  $('#resume').innerHTML=r&&c.i>0?`<div class="sum" style="margin-top:14px"><div class="row" style="margin:0"><span><b>${r.name}</b><br><span class="sm">Step ${c.i} of ${r.steps.length}</span></span><button class="btn small" data-rec="${c.kind}:${c.id}">Resume</button></div></div>`:'';
}

/* ---------- cook mode ---------- */
let shR=null, shList=false;
const stagesOf=r=>[{t:'ready'},...r.steps.map((s,k)=>({t:'step',k,s})),{t:'serve'}];
const jarLink=h=>h.replace(/((?:[Ss]pice )?jars? [AB](?: and B)?)/g,(m)=>`<button class="jl" data-jar="${/B$/.test(m)&&!/and/.test(m)?'jar-b':'jar-a'}">${m}</button>`);
function openSheet(spec){
  const [kind,id]=spec.split(':'), r=recOf(kind,id);if(!r)return;
  const same=mem.cook&&mem.cook.kind===kind&&mem.cook.id===id;
  mem.cook=same?mem.cook:{d:today,kind,id,i:0,ing:{}};save();
  shR=r;shList=false;
  const wasOpen=!$('#sheet').hidden;
  $('#sheet').hidden=false;document.body.classList.add('sheet-open');document.body.style.overflow='hidden';
  if(!wasOpen)history.pushState({sheet:1},'');
  renderSheet();$('#sh-body').scrollTop=0;$('#sheet .x').focus();
  wake();
}
function closeSheet(){if(history.state&&history.state.sheet)history.back();else doClose()}
function doClose(){
  if($('#sheet').hidden)return;
  $('#sheet').hidden=true;document.body.classList.remove('sheet-open');document.body.style.overflow='';
  shR=null;renderCook();renderToday();wake();
}
function renderSheet(keepScroll){
  const r=shR,c=mem.cook;if(!r||!c)return;
  const stg=stagesOf(r), last=stg.length-1, i=Math.min(c.i,last), body=$('#sh-body'), sc=body.scrollTop;
  $('#sh-name').textContent=r.name;
  const pc=c.kind==='pot'&&POTS[c.id]?c.id:null;
  $('#sh-ic').innerHTML=pc?potIcon(pc):'';$('#sheet').style.setProperty('--pc',pc?`var(--pot-${pc})`:'var(--accent)');
  $('#sh-sub').textContent=(r.dish?r.dish+' · ':'')+(shList?'All steps':i===0?'Before you start':i===last?'Serve and store':`Step ${i} of ${r.steps.length}`);
  $('#sh-prog').innerHTML=stg.map((_,k)=>`<i class="${k<i?'d':k===i?'c':''}"></i>`).join('');
  $('#sh-list').textContent=shList?'Back to step':'All steps';
  $('#sh-prev').disabled=i===0&&!shList;
  $('#sh-next').textContent=shList?'Continue cooking':i===0?'Start step 1':i===last?'Finish':i===last-1?'Serve and store':'Next step';
  const isSide=c.kind==='side'||c.kind==='extra', S0=mem.start, Ls=S0+240;
  const ready=()=>`<h2 class="sh-h">Before you start</h2>
    ${r.q?`<div class="lvl" role="group" aria-label="How much help do you want in the steps?"><span>Step help</span><button data-help="full" aria-pressed="${r.quick?'false':'true'}">Full guide</button><button data-help="quick" aria-pressed="${r.quick?'true':'false'}">Short steps</button></div><p class="sm lvlnote">${r.quick?'Short steps: just the actions. Switch back any time.':'Full guide: every step explained, with what to look for. Once you know this recipe well, switch to short steps.'}</p>`:''}
    
    ${r.set?`<div class="set">${r.set.map(s=>`<div><small>${s[0]}</small><b>${s[1]}</b></div>`).join('')}</div>${r.setnote?`<p class="sm">${r.setnote}</p>`:''}`:''}
    ${c.kind==='pot'&&planLine()?`<p class="note">${planLine()}</p>`:''}
    <h3>${isSide?'You need':'For two bowls'}</h3>
    <ul class="ingl">${r.ing.map((g,k)=>`<li><button data-sing="${k}" aria-pressed="${c.ing[k]?'true':'false'}"><span class="box"></span><span class="nm">${g[0]}${g[2]?`<small>${g[2]}</small>`:''}</span><span class="num">${g[1]}</span></button></li>`).join('')}</ul>
    ${r.ing.some(g=>/jars? [AB]/.test(g[0]))?`<p class="sm jarhint">The spice jars are mixed once a month. <button class="jl" data-jar="jar-a">What is in jar A</button> · <button class="jl" data-jar="jar-b">What is in jar B</button></p>`:''}
    ${r.set&&!r.quick&&r.set.some(x=>x[0]==='Whistles')?`<details class="words"><summary>New to pressure cooking? Words used here</summary><div><dl>
      <dt>Tadka (tempering)</dt><dd>Spices fried in hot oil at the start. It releases their flavour into the whole dish.</dd>
      <dt>First whistle</dt><dd>The first loud hiss when the cooker’s weight lifts. It means pressure has built up and it is time to turn the flame down.</dd>
      <dt>Lowest flame</dt><dd>The smallest flame your burner can make, a quiet blue flicker. Trust the minutes more than the whistle count.</dd>
      <dt>Pressure drop</dt><dd>After you switch off, wait. The pressure falls by itself and the weight settles flat. Never force the lid open.</dd>
      <dt>Crush test</dt><dd>Press one cooked bean or chickpea between two fingers. It should squash easily with no hard centre.</dd>
      <dt>Simmer</dt><dd>Small, lazy bubbles at the edges, not a rolling boil.</dd>
    </dl></div></details>`:''}`;
  const nutl=r.k?`<p class="sm">Two bowls with toppings: about ${rs(r.k[0])} kcal, ${r.k[1]} g protein.</p>`:(r.nut?`<p class="sm">${r.nut}</p>`:'');
  const serve=()=>`<h2 class="sh-h">${isSide?'Done':'Serve and store'}</h2>
    ${c.kind==='pot'?(r.quick?TOPQ:TOP):''}
    ${r.keeps?`<h3>Keeps</h3><p>${r.keeps}</p>`:''}${nutl}
    <details><summary>If something is missing</summary><div><ul class="tight">${r.swaps.map(s=>`<li>${s}</li>`).join('')}</ul></div></details>
    <div class="warn"><b>What can go wrong</b>${r.wrong}</div>`;
  let h;
  if(shList){
    h=`<h2 class="sh-h">All steps</h2><ol class="allst"><li><button data-jump="0" data-n="0" class="${i===0?'c':''}"><span>Before you start: quantities and ingredients</span></button></li>${r.steps.map((s,k)=>`<li><button data-jump="${k+1}" data-n="${k+1}" class="${i===k+1?'c':''}"><span>${s.s}</span></button></li>`).join('')}<li><button data-jump="${last}" data-n="✓" class="${i===last?'c':''}"><span>Serve and store</span></button></li></ol>`;
  }else{
    const st=stg[i];
    h=st.t==='ready'?ready():st.t==='serve'?serve():
      `<p class="sh-n">Step ${i} of ${r.steps.length}${r.q?` · <button class="jl" data-help="toggle">${r.quick?'Show full help':'Switch to short steps'}</button>`:''}</p><p class="sh-step">${jarLink(st.s.s)}</p>${st.s.t.map(t=>`<button class="tmb" data-tm="${t[0]}" data-label="${t[1]}">${clockSvg}<span><b>${t[1]}</b><small>Tap to start the timer</small></span><span class="tt">${t[0]} min</span></button>`).join('')}`;
  }
  body.innerHTML=h;
  if(keepScroll)body.scrollTop=sc;
  drawDock();
}
function sheetGo(d){
  const c=mem.cook,r=shR;if(!c||!r)return;
  const last=stagesOf(r).length-1;
  if(shList){shList=false;renderSheet();$('#sh-body').scrollTop=0;return}
  if(d>0&&c.i>=last){finishRec();return}
  c.i=Math.max(0,Math.min(last,c.i+d));save();renderSheet();$('#sh-body').scrollTop=0;
}
