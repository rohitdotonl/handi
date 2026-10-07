/* ---------- the family, at home ----------
   Tab icons drawn by the same hand: a colour plate (offset, like riso) under a key line.
   Each one moves a little when its tab opens. */
const TI={
  today:{c:'<path d="M6.4 9.6C4.2 11 3.4 13.8 3.7 16.6 4 19.2 5 21 6 22H18C19 21 20 19.2 20.3 16.6 20.6 13.8 19.8 11 17.6 9.6Z" fill="var(--tday,var(--ink-y))"/><path d="M7.6 8.7C8 6.6 9.8 5.6 12 5.6S16 6.6 16.4 8.7Z" fill="var(--pf-steel)"/>',
    k:'<path d="M6.4 9.6C4.2 11 3.4 13.8 3.7 16.6 4 19.2 5 21 6 22M17.6 9.6C19.8 11 20.6 13.8 20.3 16.6 20 19.2 19 21 18 22"/><path d="M7.6 8.7C8 6.6 9.8 5.6 12 5.6S16 6.6 16.4 8.7ZM11 5.5C10.9 4.4 11.4 3.7 12 3.7S13.1 4.4 13 5.5M5.4 9.4H18.6"/>',
    x:'<g class="ti-eyes" fill="currentColor" stroke="none"><circle cx="9.5" cy="14.4" r="1.05"/><circle cx="14.5" cy="14.4" r="1.05"/></g><path d="M10.9 18H13.1"/>'},
  cook:{c:'<path d="M4 11.6H18V18.4A2.6 2.6 0 0 1 15.4 21H6.6A2.6 2.6 0 0 1 4 18.4Z" fill="var(--pf-steel)"/><path d="M18.4 12.6H22.4V14.4H18.4Z" fill="var(--ink-r)"/>',
    k:'<path d="M4 11.6V18.4A2.6 2.6 0 0 0 6.6 21H15.4A2.6 2.6 0 0 0 18 18.4V11.6M3.2 11.6C3.6 9.8 6.8 8.8 11 8.8S18.4 9.8 18.8 11.6ZM9.9 8.8V6.6H12.1V8.8M18.4 12.6H22.4"/>',
    x:'<g class="ti-steam" fill="none"><path d="M10.4 5.2C9.6 4.2 11.4 3.4 10.6 2.2"/><path d="M12.6 5C11.8 4 13.6 3.2 12.8 2"/></g>'},
  shop:{c:'<path d="M4.8 10H19.2L18 21.4H6Z" fill="var(--ink-g)"/><path d="M14.6 10C15 7.6 16.8 6.6 18.6 7" fill="none" stroke="var(--ink-r)" stroke-width="2"/>',
    k:'<g class="ti-swing"><path d="M4.8 10H19.2L18 21.4H6ZM8.2 10C8.2 5.4 10 4 12 4S15.8 5.4 15.8 10M8 14.6H16"/></g>'},
  week:{c:'<path d="M6 10.4H18V13.8H6Z" fill="var(--ink-y)"/><path d="M6 13.8H18V17.2H6Z" fill="var(--ink-r)"/><path d="M6 17.2H18V20.2A1.4 1.4 0 0 1 16.6 21.6H7.4A1.4 1.4 0 0 1 6 20.2Z" fill="var(--ink-b)"/>',
    k:'<path d="M6 10.4V20.2A1.4 1.4 0 0 0 7.4 21.6H16.6A1.4 1.4 0 0 0 18 20.2V10.4M6 13.8H18M6 17.2H18M4.6 11.6V5.4H19.4V11.6"/>',
    x:'<g class="ti-lid"><path d="M6.2 10.4C6.6 8.6 9 7.8 12 7.8S17.4 8.6 17.8 10.4Z" fill="var(--pf-steel)"/><path d="M11 7.8V6.6H13V7.8"/></g>'},
  guide:{c:'<path d="M5.4 3.6H17.4A1.6 1.6 0 0 1 19 5.2V20.6H7A1.6 1.6 0 0 1 5.4 19Z" fill="var(--ink-b)"/><path d="M13.2 9.2A1.7 1.7 0 0 0 16.6 9.2Z" fill="var(--ink-y)"/>',
    k:'<path d="M5.4 19V5.2A1.6 1.6 0 0 1 7 3.6H17.4A1.6 1.6 0 0 1 19 5.2V20.6H7A1.6 1.6 0 0 1 5.4 19ZM5.4 19A1.6 1.6 0 0 1 7 17.4H19M14.9 1.6V9.2M13.2 9.2A1.7 1.7 0 0 0 16.6 9.2Z"/>',
    x:'<path class="ti-page" d="M7.4 6.4H12.4M7.4 9.4H11.6M7.4 12.4H12.4" stroke-width="1.4"/>'},
  cast:{c:'<path d="M2.8 13.2C1.8 14.4 1.6 16.6 2 18.4 2.3 20 3 21 3.6 21.6H11C11.6 21 12.3 20 12.6 18.4 13 16.6 12.8 14.4 11.8 13.2Z" fill="var(--ink-y)"/><path d="M12.4 9.6C10.6 10.8 10 13.2 10.2 15.6 10.4 18 11.4 20.6 12.4 21.6H20.6C21.6 20.6 22.6 18 22.8 15.6 23 13.2 22.4 10.8 20.6 9.6Z" fill="var(--ink-r)"/>',
    k:'<g class="ti-bob1"><path d="M2.8 13.2C1.8 14.4 1.6 16.6 2 18.4 2.3 20 3 21 3.6 21.6M11.8 13.2C12.8 14.4 13 16.6 12.6 18.4M3.6 12.4C3.9 11 5.4 10.4 7.3 10.4S10.7 11 11 12.4ZM2.4 12.8H12.2"/><g fill="currentColor" stroke="none"><circle cx="5.6" cy="16" r=".8"/><circle cx="8.8" cy="16" r=".8"/></g></g><g class="ti-bob2"><path d="M12.4 9.6C10.6 10.8 10 13.2 10.2 15.6 10.4 18 11.4 20.6 12.4 21.6M20.6 9.6C22.4 10.8 23 13.2 22.8 15.6 22.6 18 21.6 20.6 20.6 21.6M13.2 8.8C13.6 6.8 15 6 16.5 6S19.4 6.8 19.8 8.8ZM15.8 6C15.7 5 16 4.4 16.5 4.4S17.3 5 17.2 6M11.8 9.2H21.2"/><g fill="currentColor" stroke="none"><circle cx="14.6" cy="14" r=".9"/><circle cx="18.4" cy="14" r=".9"/></g><path d="M15.6 17.4H17.4"/></g>'}
};
const tabIcon=t=>{const i=TI[t];return `<svg class="ti ti-${t}" viewBox="0 0 24 24" aria-hidden="true"><g class="ti-c" stroke="none" transform="translate(.7 .6)">${i.c}</g><g class="ti-k">${i.k}${i.x||''}</g></svg>`};
function drawTabIcons(){
  $$('.tabs button[data-tab]').forEach(b=>{const sv=$('svg',b);if(sv&&!sv.classList.contains('ti'))sv.outerHTML=tabIcon(b.dataset.tab)});
  const L=$$('ul.htabs li');TABS.forEach((t,k)=>{const sv=L[k]&&$('svg',L[k]);if(sv&&!sv.classList.contains('ti'))sv.outerHTML=tabIcon(t)});
}
function tabWiggle(tab){
  if(still())return;const sv=$(`.tabs button[data-tab="${tab}"] svg.ti`);if(!sv)return;
  sv.classList.remove('go');void sv.getBoundingClientRect();sv.classList.add('go');
}

/* ---------- the Pots: who they are ---------- */
const CAST=[
 {id:'master',name:'Tamba Dada',role:'The master pot. Head of the kitchen, retired, still supervising.',days:'Every day, from the shelf',says:'“Hm.”',
  character:'Copper, older than the stove and very aware of it. Doesn’t cook any more; consults. Has opinions about flame height, which he shares by looking at you over his spectacles until you turn it down.',
  story:'Came to the family as a wedding present in 1961, full of laddoos. Has outlived three kitchens, two pressure cookers and one microwave he still calls “the incident”. Retired the year steel arrived and has been a consultant ever since. He is the logo; tap him and he takes you back to today.',
  quirks:['Gets polished every Diwali whether he needs it or not, and pretends not to enjoy it.','Can tell a burnt dal from two rooms away. This is true.','Calls every pressure cooker “the noisy boy”.']},
 {id:'yellow',name:'Sona',role:'The Yellow Pot. Five-Lentil Dal Daliya.',days:'Monday and Friday',says:PF_SAYS.yellow,
  character:'Calm, punctual, faintly smug about both. Five lentils, never a fuss. The pot you would trust with a spare key.',
  story:'Bought on a Monday in Chandni Chowk after a long negotiation in which Sona felt undervalued. Has worked Mondays ever since, and picked up Fridays when nobody else would.',
  quirks:['Carries a ladle everywhere, “in case”.','Counts every whistle out loud.','Thinks turmeric stains are a personality.']},
 {id:'black',name:'Chana Sahab',role:'The Black Pot. Kala Chana and Barley Stew.',days:'Tuesday',says:PF_SAYS.black,
  character:'Serious. Speaks rarely and only in verdicts. Takes a full night’s soak as a matter of principle and will not be rushed.',
  story:'Spent years as a judge at a regional stew competition and never entirely left the bench. Was once described as “stern but fair” and had it framed.',
  quirks:['Rates every meal out of ten. Has never gone above seven.','Will not start without a full night’s soak.','Pretends not to like the barley.']},
 {id:'blue',name:'Captain Neel',role:'The Blue Pot. Fish and Lentil Khichdi.',days:'Wednesday and Saturday',says:PF_SAYS.blue,
  character:'Breezy, salt of the earth, slightly damp. Tells sea stories nobody asked for. Always has a fish with him, and the fish did not agree to this.',
  story:'Did twenty years as the galley pot on a trawler out of Kochi. Retired inland but brought one fish along “for company”. The fish disputes the word company.',
  quirks:['Calls the sink “the harbour”.','Checks the weather before every khichdi.','Will not discuss what happened in 2009.']},
 {id:'red',name:'Rani Rajma',role:'The Red Pot. Rajma and Oats Stew.',days:'Thursday',says:PF_SAYS.red,
  character:'Dramatic, glamorous, an overnight-soak diva. Every Thursday is opening night.',
  story:'Former leading lady of a touring Punjabi theatre company. The rajma bean on her cheek is a beauty spot, she says, and not something she missed while washing up.',
  quirks:['Raises one eyebrow at everything, compliments included.','Expects applause at the third whistle.','Will not be served without a lemon.']},
 {id:'white',name:'Nawab Safed',role:'The White Pot. Chicken and Lentil Haleem.',days:'Sunday',says:PF_SAYS.white,
  character:'The Sunday one. Unhurried and overdressed, and believes slow cooking is a moral position.',
  story:'Claims descent from a long line of Hyderabadi haleem pots and dresses accordingly. Nobody has checked. Nobody dares.',
  quirks:['Wears a bow tie to cook.','Keeps a coriander sprig behind one ear as a pocket square.','Has no nose, and finds the question rude.']}
];
const castOf=id=>CAST.find(c=>c.id===id);
const POKE={master:'“Hm. Hm.”',yellow:'“Yes?”',black:'“Hm.”',blue:'“Mind the fish.”',red:'“Darling. No.”',white:'“One does not poke.”'};
const allPlants=()=>PLANTS.flatMap(g=>g.items.map(i=>i));
function renderPots(){
  const el=$('#pots-wrap');if(!el)return;
  const cooked=mem.cooked||{}, got=mem.stk||[], crew=allPlants();
  const card=c=>{const n=cooked['pot:'+c.id]||0;
    return `<article class="castc${c.id==='master'?' boss':''}" id="cast-${c.id}">
     <div class="castpic">${potFace(c.id,{alive:1,cls:'poke',label:c.name})}</div>
     <div class="castt"><p class="castk">${c.id==='master'?'The master pot':POTS[c.id].name}</p><h2>${c.name}</h2><p class="castr">${c.role}</p>
      <dl class="castd"><dt>On duty</dt><dd>${c.days}</dd>${c.id==='master'?'':`<dt>Cooked so far</dt><dd>${n?n+' time'+(n>1?'s':''):'Not yet. Waiting by the stove.'}</dd>`}<dt>Says</dt><dd>${c.says}</dd></dl></div>
     <div class="castb"><h3>Character</h3><p>${c.character}</p><h3>Backstory</h3><p>${c.story}</p><h3>Eccentricities</h3><ul>${c.quirks.map(q=>`<li>${q}</li>`).join('')}</ul></div></article>`};
  el.innerHTML=CAST.map(card).join('')+`
   <h2 class="crewh" id="crew">The crew</h2>
   <p class="lede">Every plant on your list, drawn by the same hand. ${got.length} of ${crew.length} collected; a new one sometimes turns up under the lid when you finish a day. The outlines are still out there.</p>
   <ol class="crew">${crew.map((i,k)=>{const on=got.includes(i[0]);return `<li class="${on?'got':'unseen'}"><span class="crew-a">${sticker(i[0])}</span><b>${i[1]}</b><small>No. ${String(k+1).padStart(2,'0')}${on?'':' · not met yet'}</small></li>`}).join('')}</ol>`;
}

/* ---------- the family, in character all day ---------- */
const hourNow=()=>new Date().getHours();
const asleep=()=>{const h=hourNow();return h>=22||h<5};
let yawned=false;
function heroMood(){
  const f=$('.hero-art .pf');if(!f)return;
  f.classList.toggle('sleep',!view.off&&asleep());
  $('.hero-art').classList.toggle('sleeping',!view.off&&asleep());
  const h=hourNow();
  if(!yawned&&!view.off&&h>=5&&h<10&&!still()){yawned=true;setTimeout(()=>{f.classList.add('yawn');setTimeout(()=>f.classList.remove('yawn'),2400)},700)}
}
/* poke a pot five times and it gets cross */
let pokes={n:0,t:0,el:null};
function poke(face){
  const t=Date.now();if(pokes.el!==face||t-pokes.t>1600)pokes={n:0,t,el:face};
  pokes.n++;pokes.t=t;
  if(!still()){face.classList.remove('nudge');void face.getBoundingClientRect();face.classList.add('nudge')}
  if(pokes.n<5)return;
  pokes.n=0;const id=[...face.classList].map(c=>c.match(/^pf-(\w+)$/)).filter(Boolean).map(m=>m[1]).find(k=>POKE[k])||'yellow';
  face.classList.add('cross');
  const host=face.parentNode;let b=$('.pokeq',host);if(b)b.remove();
  host.insertAdjacentHTML('beforeend',`<span class="pokeq" role="status">${POKE[id]}</span>`);
  setTimeout(()=>{face.classList.remove('cross');const q=$('.pokeq',host);if(q)q.remove()},2600);
}
/* tomorrow's pot asks for its own soak */
const ASK={black:'“I’m on tomorrow. Soak me.”',red:'“Tomorrow is my opening night. The beans need the whole night.”',white:'“Sunday needs its millet soaked. Tonight, if you please.”'};
const BED_SAY={yellow:'“No soak needed. Same time tomorrow.”',blue:'“Nothing to soak. The fish is ready, unfortunately for the fish.”',white:'“Nothing to soak. Sunday is sorted.”',black:'',red:''};
const THANKS={black:'“Soaked. Acceptable.”',red:'“Soaked. I shall be magnificent.”',white:'“Soaked. Most civilised.”'};
function askHTML(focusCur){
  if(view.off)return '';
  const line=soakLine(tomId);if(!line)return '';
  const c=castOf(tomId);
  /* in the evening the Before bed card speaks for tomorrow's pot instead */
  if(isDone('soak')||focusCur==='soak'||nowMin()>=SOAK_FROM)return '';
  return `<aside class="askpot"><span class="askpic">${potFace(tomId,{alive:1,cls:'poke'})}</span><p><b>${c.name}, the ${POTS[tomId].name}</b><q>${ASK[tomId]||'“Soak me tonight.”'}</q><small>${line} Any time before bed.</small></p><button class="btn small" data-done="soak">Soaked it</button></aside>`;
}

/* water with character: a pour, a glug, and an opinion at ten */
let pourAt=0;
function glug(){
  try{audioOn();if(!ac)return;const t0=ac.currentTime;
    [0,.13,.24].forEach((o,k)=>{const os=ac.createOscillator(),g=ac.createGain(),t=t0+o;os.type='sine';
      os.frequency.setValueAtTime(320-k*40,t);os.frequency.exponentialRampToValueAtTime(110-k*10,t+.11);
      os.connect(g);g.connect(ac.destination);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.18,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+.12);os.start(t);os.stop(t+.13)})}catch(e){}
}

