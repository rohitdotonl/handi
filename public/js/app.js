/* ---------- navigation ---------- */
const TABS=['today','cook','shop','week','guide','cast'];
const ALIAS={pots:['cast'],help:['guide','start'],rules:['guide'],prep:['week','prep'],plan:['week','plan'],plants:['week','plants']};
function show(tab){
  if(ALIAS[tab]){const a=ALIAS[tab];tab=a[0];if(a[1])mem.sub[tab]=a[1]}
  if(!TABS.includes(tab))tab='today';
  $$('.page').forEach(p=>p.hidden=p.id!==tab);
  $$('.tabs button').forEach(b=>b.removeAttribute('aria-current'));
  $(`.tabs button[data-tab="${tab}"]`).setAttribute('aria-current','page');
  if(mem.tab!==tab)untoast();
  if(mem.tab!==tab)tabWiggle(tab);
  if(tab==='cast')renderPots();
  mem.tab=tab;save();introSeen();segFit();return tab;
}
/* the first-run card on Today goes away once the tour has been opened */
function introSeen(){if(!mem.intro&&!$('#guide').hidden&&mem.sub.guide==='start'){mem.intro=1;save();drawIntro()}}
const wideQ=matchMedia('(min-width:1181px)');
function placeTrack(){const t=$('#track');if(wideQ.matches)$('.tcol.a').append(t);else $('.tcol.b').insertBefore(t,$('#tomorrow'))}
function drawIntro(){
  $('#intro').innerHTML=!mem.intro&&!view.off?`<p class="intro"><span>New here?</span> <button class="linkbtn" data-go="guide/start">Take the two-minute tour</button><button class="tx" data-introoff>Not now</button></p>`:'';
}
function showSub(page,sub){
  if(page==='guide'&&sub==='c')sub='r';
  const pg=$('#'+page);if(!pg||!$(`.sub[data-sub="${sub}"]`,pg))return;
  $$('.sub',pg).forEach(s=>s.hidden=s.dataset.sub!==sub);
  $$('.seg button',pg).forEach(b=>{const on=b.dataset.sub===sub;b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1;
    const sg=b.parentNode;if(on&&sg.scrollWidth>sg.clientWidth)sg.scrollLeft=b.offsetLeft-(sg.clientWidth-b.offsetWidth)/2});
  mem.sub[page]=sub;save();if(!pg.hidden)introSeen();segFit();
}
/* fade the edge of a tab row that scrolls, so the hidden tabs are discoverable */
function segFit(){$$('.seg').forEach(g=>{g.classList.toggle('over',g.scrollWidth>g.clientWidth+1);g.classList.toggle('end',g.scrollLeft+g.clientWidth>=g.scrollWidth-2)})}
function go(spec,push){
  const [t,s]=spec.split('/'), tab=show(t);
  if(s)showSub(tab,s);
  const h='#'+tab+(mem.sub[tab]?'/'+mem.sub[tab]:'');
  if(push&&h!==location.hash)history.pushState(null,'',h);
  window.scrollTo(0,0);
  const hd=$('h1',$('#'+tab));if(hd){hd.setAttribute('tabindex','-1');hd.focus({preventScroll:true})}
}
/* one strip that stays until it is replaced or dismissed; nothing times out under you */
function toast(msg,undo,label){
  const el=$('#toast');el.hidden=false;document.body.classList.add('has-toast');
  el.innerHTML=`<span>${msg}</span>${undo?`<button data-toastundo>${label||'Undo'}</button>`:''}<button class="tx" data-toastx>Dismiss</button>`;
  el._undo=undo||null;
}
const untoast=()=>{const el=$('#toast');el.hidden=true;el._undo=null;document.body.classList.remove('has-toast')};
/* themes: auto follows the system. Shown as Light and Dark; stored as lupine/catppuccin so saved choices keep working */
const THEMES=['auto','lupine','catppuccin'];
function applyTheme(t){
  if(!THEMES.includes(t))t='auto';
  const r=document.documentElement;
  if(t==='auto')delete r.dataset.theme;else r.dataset.theme=t;
  $$('[data-theme-set]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.themeSet===t?'true':'false'));
  const bg=getComputedStyle(r).getPropertyValue('--t-bg').trim();
  $$('meta[name="theme-color"]').forEach(m=>m.setAttribute('content',t==='auto'?m.dataset.auto:bg));
}
function setTheme(t){mem.theme=t;save();applyTheme(t)}
function cycleTheme(){
  const cur=mem.theme&&mem.theme!=='auto'?mem.theme:(matchMedia('(prefers-color-scheme: dark)').matches?'catppuccin':'lupine');
  setTheme(cur==='lupine'?'catppuccin':'lupine');
}
function resetSoak(){
  if(mem.soakFor===today)mem.soakFor=null;
  mem.day.soakOk=0;view.nosoak=false;
  if(mem.day.fix)applyFix('undo');else{save();renderToday()}
}
function resetDay(){
  timers=[];mem.tm=[];
  if(mem.soakFor===today||mem.soakFor===tomKey)mem.soakFor=null;
  if(mem.next&&mem.next.d===tomKey)mem.next=null;
  mem.day={d:today,done:{},sub:{},water:0};mem.cook=null;delete mem.hist[today];
  tomId=ROTA[(realDow+1)%7];view={pin:null,nosoak:false,off:0};
  save();drawDock();renderToday();renderCook();renderPrep();wake();
}
function resetAll(){try{localStorage.removeItem(KEY)}catch(e){}location.replace(location.pathname)}
let menuFrom=null;
function openMenu(on,keepFocus){
  if(on&&$('#menu').hidden)menuFrom=document.activeElement;
  $$('[data-helpdef]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.helpdef===(mem.helpDef||'full')));
  applyTheme(mem.theme);
  $('#menu').hidden=!on;document.body.style.overflow=on?'hidden':'';
  $$('#menu .mrow').forEach(b=>{b.classList.remove('armed');const q=$('.q',b);if(q)q.remove()});
  if(on)$('#menu .mrow').focus();
  else{if(!keepFocus&&menuFrom&&menuFrom.isConnected)menuFrom.focus({preventScroll:true});menuFrom=null}
}
function confirmTap(b,fn){
  if(b.classList.contains('armed')){fn();return}
  b.classList.add('armed');const q=document.createElement('small');q.className='q';q.textContent='Tap again to confirm';b.appendChild(q);
  setTimeout(()=>{b.classList.remove('armed');q.remove()},3500);
}
function armed(btn,fn){
  if(btn.classList.contains('armed')){btn.classList.remove('armed');btn.textContent=btn.dataset.lbl;fn();return}
  btn.dataset.lbl=btn.textContent;btn.classList.add('armed');btn.textContent='Tap again to clear';
  setTimeout(()=>{if(btn.classList.contains('armed')){btn.classList.remove('armed');btn.textContent=btn.dataset.lbl}},3500);
}
const buzz=()=>{try{if(navigator.vibrate)navigator.vibrate(8)}catch(e){}};
const refresh=()=>{renderToday();renderPrep()};

document.addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;
  const d=t.dataset;
  if(view.off&&(d.done||d.line||d.soak||d.wd||d.fd||d.wset||d.fset||d.fix||d.bed))return;
  if(d.fix){if(d.fix!=='undo')tadka(t);applyFix(d.fix);return}
  if('ynx' in d){mem.day.ynx=1;save();const el=$('.ynote');if(el&&!still()){el.classList.add('bye');setTimeout(()=>renderToday(),260)}else renderToday();return}
  if('surprise' in d){openSurprise(t);return}
  if(d.jar){
    const back=mem.cook&&!$('#sheet').hidden?mem.cook.kind+':'+mem.cook.id:null;
    if(!$('#sheet').hidden){if(history.state&&history.state.sheet)history.replaceState(null,'');doClose()}
    go('guide/k',true);
    const el=document.getElementById(d.jar);
    if(el){el.scrollIntoView({block:'center'});el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),2400)}
    if(back)toast('Spice jars',()=>openSheet(back),'Back to recipe');
    return;
  }
  if(d.pl){
    const [k,i]=d.pl.split(':'), g=PLAN_G.find(x=>x.k===k), v=g.opts()[+i];
    setPlan(p=>{p[k]=p[k]||[];const at=p[k].indexOf(v);if(at>=0)p[k].splice(at,1);else{p[k].push(v);while(p[k].length>g.max)p[k].shift()}});
    buzz();return;
  }
  if('planfill' in d){setPlan(p=>{PLAN_G.forEach(g=>{p[g.k]=g.opts().slice(0,g.max)})});return}
  if('planclear' in d){armed(t,()=>{mem.plan=null;save();renderPlan();renderShop();renderToday()});return}
  if(d.bed){
    if(d.bed==='soak'){const was=isDone('soak');setDone('soak',!was)}
    else{mem.day.bed=mem.day.bed||{};mem.day.bed[d.bed]=!mem.day.bed[d.bed]}
    buzz();save();refresh();return;
  }
  if(d.help){
    const c=mem.cook;if(c){const key=c.kind+':'+c.id,cur=helpOf(c.kind,c.id);
      mem.help[key]=d.help==='toggle'?(cur==='quick'?'full':'quick'):d.help;save();shR=recOf(c.kind,c.id);renderSheet(true)}
    return;
  }
  if(d.helpdef){mem.helpDef=d.helpdef;save();$$('[data-helpdef]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.helpdef===d.helpdef));renderCook();return}
  if('introoff' in d){mem.intro=1;save();drawIntro();toast('The tour is always under Guide, then How to use.');return}
  if('menu' in d){openMenu(true);return}
  if('menuclose' in d){openMenu(false);return}
  if(d.reset){confirmTap(t,()=>{openMenu(false);if(d.reset==='all')resetAll();else if(d.reset==='day'){resetDay();toast('Today was reset')}else{resetSoak();toast('Soak answer cleared')}});return}
  if('toastx' in d){untoast();return}
  if(d.themeSet){setTheme(d.themeSet);return}
  if('toastundo' in d){const u=$('#toast')._undo;untoast();if(u)u();return}
  if(d.vday!==undefined){view.off=+d.vday;view.pin=null;renderToday();window.scrollTo({top:0,behavior:'smooth'})}
  else if(d.tab){go(d.tab,true)}
  else if(d.go){if(!$('#menu').hidden)openMenu(false,true);go(d.go,true)}
  else if(d.sub){const pg=t.closest('.page').id;showSub(pg,d.sub);window.scrollTo(0,0);history.pushState(null,'','#'+pg+'/'+d.sub)}
  else if(d.rec){openSheet(d.rec)}
  else if('close' in d){closeSheet()}
  else if('slist' in d){shList=!shList;renderSheet();$('#sh-body').scrollTop=0}
  else if('sprev' in d){sheetGo(-1)}
  else if('snext' in d){sheetGo(1)}
  else if(d.jump){mem.cook.i=+d.jump;shList=false;save();renderSheet();$('#sh-body').scrollTop=0}
  else if(d.sing){const c=mem.cook;c.ing[d.sing]=c.ing[d.sing]?0:1;buzz();save();renderSheet(true)}
  else if(d.tm){startTimer(+d.tm,d.label)}
  else if(d.stop){stopTimer(d.stop)}
  else if(d.plus){plusTimer(d.plus)}
  else if(d.done){const was=isDone(d.done),id=d.done,r=rows.find(x=>x.id===id);setDone(id,!was);buzz();save();refresh();
    toast(was?'Marked not done':'Done: '+(r?r.b:''),()=>{setDone(id,was);save();refresh()})}
  else if(d.line){const [id,i]=d.line.split(':');toggleLine(id,+i);buzz();save();refresh()}
  else if('pin' in d){view.pin=d.pin||null;save();renderToday();if(d.pin)window.scrollTo({top:0})}
  else if(d.soak){
    if(d.soak==='yes'){mem.soakFor=today;toast('Marked as soaked',()=>{mem.soakFor=null;save();renderToday()})}
    else if(d.soak==='no'){view.nosoak=true}
    buzz();save();renderToday();
  }
  else if(d.wd){mem.day.water=Math.max(0,Math.min(20,mem.day.water+ +d.wd));buzz();save();renderToday()}
  else if(d.wset){const k=+d.wset, up=mem.day.water<k;mem.day.water=up?k:k-1;if(up){pourAt=k;glug()}buzz();save();renderToday()}
  else if(d.fset){const k=+d.fset;mem.fish.n=mem.fish.n>=k?k-1:k;buzz();save();renderToday()}
  else if(d.fd){mem.fish.n=Math.max(0,Math.min(7,mem.fish.n+ +d.fd));buzz();save();renderToday()}
  else if(d.pp){const [k,i]=d.pp.split(':');mem.prep[k][i]=mem.prep[k][i]?0:1;buzz();save();refresh()}
  else if(d.pstart){mem.prep.t0[d.pstart]=nowMin();save();renderPrep()}
  else if(d.preset){const k=d.preset;armed(t,()=>{mem.prep[k]={};delete mem.prep.t0[k];save();refresh()})}
  else if('more' in d){const it=t.closest('.item');t.setAttribute('aria-expanded',it.classList.toggle('open'))}
  else if('hide' in d){setHide(!$('#shop').classList.contains('hide-done'))}
  else if('findclear' in d){const i=t.parentNode.querySelector('input');i.value='';i.dispatchEvent(new Event('input'));i.focus()}
  else if(d.p){const on=t.getAttribute('aria-pressed')!=='true';t.setAttribute('aria-pressed',on);mem.p[d.p]=on?1:0;const c=Object.values(mem.p).filter(Boolean).length;if(!mem.pw||(on&&c===1))mem.pw=monday;buzz();save();score()}
  else if(d.clear){const k=d.clear;armed(t,()=>{mem[k]={};if(k==='p')mem.pw=monday;save();if(k==='p')renderPlants();else{$$(`input[data-k="${k}"]`).forEach(i=>{i.checked=false;i.closest('.item').classList.remove('ticked')});count(k)}})}
});
document.addEventListener('click',e=>{
  const f=e.target.closest&&e.target.closest('svg.pf.poke');if(f){poke(f);return}
  const c=e.target.closest&&e.target.closest('[data-crew]');if(c){go('cast',true);const h=$('#crew');if(h)h.scrollIntoView({block:'start'})}
});
document.addEventListener('change',e=>{
  const i=e.target;if(!i.dataset||!i.dataset.k)return;
  buzz();mem[i.dataset.k][i.dataset.id]=i.checked?1:0;save();i.closest('.item').classList.toggle('ticked',i.checked);count(i.dataset.k);
});
document.addEventListener('input',e=>{
  const i=e.target;if(!i.matches('[data-find]'))return;
  const q=i.value.trim().toLowerCase(), box=i.closest('.sub');
  i.parentNode.classList.toggle('has',!!q);
  $$('.item',box).forEach(it=>it.classList.toggle('nomatch',!!q&&!it.textContent.toLowerCase().includes(q)));
  $$('.gwrap',box).forEach(g=>g.classList.toggle('nomatch',!!q&&!$('.item:not(.nomatch)',g)));
  $('[data-empty]',box).hidden=!q||!!$('.gwrap:not(.nomatch)',box);
});
document.addEventListener('keydown',e=>{
  if(!$('#menu').hidden){
    if(e.key==='Escape'){openMenu(false);return}
    if(e.key==='Tab'){const f=$$('#menu button'),a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
      else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
    return;
  }
  const tb=e.target.closest&&e.target.closest('.seg [role="tab"]');
  if(tb&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
    const all=$$('[role="tab"]',tb.parentNode),i=all.indexOf(tb);
    const n=e.key==='Home'?all[0]:e.key==='End'?all[all.length-1]:all[(i+(e.key==='ArrowRight'?1:-1)+all.length)%all.length];
    e.preventDefault();n.click();n.focus();return;
  }
  const typing=e.target.closest&&e.target.closest('input,select,textarea');
  if($('#sheet').hidden&&!typing&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
    const k=e.key;
    if(/^[1-6]$/.test(k)){e.preventDefault();go(TABS[+k-1],true);return}
    if(k==='/'){e.preventDefault();if($('#shop').hidden)go('shop',true);if(!$('#shop [data-sub="s"]').hidden)showSub('shop','w');const f=$('#shop .sub:not([hidden]) [data-find]');if(f)f.focus();return}
    if(k===','){e.preventDefault();openMenu(true);return}
    if(k==='t'||k==='T'){e.preventDefault();cycleTheme();return}
    if((k==='d'||k==='D')&&!$('#today').hidden&&!view.off){const b=$('#focus [data-done]');if(b){e.preventDefault();b.click()}return}
  }
  if(e.key==='Escape'&&!$('#toast').hidden&&$('#sheet').hidden){untoast();return}
  if($('#sheet').hidden)return;
  if(e.key==='Escape')closeSheet();
  else if(e.key==='ArrowRight'&&!typing)sheetGo(1);
  else if(e.key==='ArrowLeft'&&!typing)sheetGo(-1);
});
addEventListener('popstate',()=>{
  if(!$('#sheet').hidden){doClose();return}
  const h=location.hash.slice(1);if(h){const [t,s]=h.split('/');const tab=show(t);if(s)showSub(tab,s);window.scrollTo(0,0)}
});

