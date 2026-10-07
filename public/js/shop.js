/* ---------- shopping ---------- */
function seasonNote(t){
  const s=SEASON[mon];
  if(t==='@greens')return 'In the market now: '+s.g.toLowerCase()+'.';
  if(t==='@crucifer')return 'In the market now: '+s.c.toLowerCase()+'.';
  if(t==='@veg')return 'In the market now: '+s.v.toLowerCase()+'.';
  if(t==='@fruit')return 'In the market now: '+s.f.toLowerCase()+'.';
  return t;
}
const AKA={mung:'moong dal',redlentil:'masoor dal',pigeon:'toor or arhar dal',blackgram:'urad dal',bengal:'chana dal',bchick:'kala chana',kidney:'rajma',wchick:'kabuli chana',soya:'nutrela chunks',bbarley:'jau daliya',wbarley:'jau',fmillet:'ragi atta',pmillet:'bajra',gramflour:'sattu',rchick:'bhuna chana',asafoetida:'hing',fenuseed:'methi dana',mustardseed:'sarson or rai',cumin:'jeera',turmeric:'haldi',pepper:'kali mirch',garam:'garam masala',gooseberry:'amla',guava:'amrud',cucumber:'kheera',tomato:'tamatar',onion:'pyaaz',garlic:'lahsun',ginger:'adrak',lemon:'nimbu',cabbage:'patta gobhi',radish:'mooli',walnuts:'akhrot',peanuts:'moongphali',flax:'alsi',curd:'dahi',eggs:'anda',chicken:'murgh',liver:'kaleji',oats:'oats',mustardoil:'sarson ka tel',walnut:'akhrot',creatine:'supplement powder'};
function listHTML(list,key){
  return list.map(g=>`<div class="gwrap"><h3 class="grp">${kiOf(g.g)}${g.g}<small data-gc></small></h3>${g.h?`<p class="ghint">${g.h==='@greens'?'Buy two different kinds each week, and not the ones you bought last week. '+seasonNote('@greens'):g.h}</p>`:''}<div class="items">${g.items.map(i=>`
   <div class="item${mem[key][i.id]?' ticked':''}"><label><input type="checkbox" data-k="${key}" data-id="${i.id}" ${mem[key][i.id]?'checked':''}><span class="box"></span>
    <span class="what">${sticker(i.id)}${(key==='w'&&planName(i.id))||i.n}${i.opt?'<i>optional</i>':''}${key==='w'&&planName(i.id)?`<em class="aka">${i.n} · from your plan</em>`:AKA[i.id]?`<em class="aka">${AKA[i.id]}</em>`:''}</span><span class="qty num">${i.q}</span></label>
    <button class="more" data-more aria-expanded="false" aria-label="Swaps and season for ${i.n}"></button>
    <div class="notes"><p><b>If you can’t get it:</b> ${i.s}</p><p><b>Season:</b> ${seasonNote(i.t)}</p></div></div>`).join('')}</div></div>`).join('');
}
const total=list=>list.reduce((a,g)=>a+g.items.length,0);
function setHide(on){
  mem.hide=on?1:0;save();
  $('#shop').classList.toggle('hide-done',on);
  $$('[data-hide]').forEach(b=>{b.setAttribute('aria-pressed',on);b.textContent=on?'Show ticked':'Hide ticked'});
}
const monthCard=(i,now2)=>{const s=SEASON[i];return `<div class="month${now2?' now':''}">${now2?`<h3>${MONTHS[i]}<span>this month</span></h3>`:''}<dl><dt>Greens</dt><dd>${s.g}</dd><dt>Cabbage family</dt><dd>${s.c}</dd><dt>Other</dt><dd>${s.v}</dd><dt>Fruit</dt><dd>${s.f}</dd></dl><p>${s.n}</p></div>`};
function renderShop(){
  $('#list-w').innerHTML=listHTML(WEEKLY,'w');
  $('#list-m').innerHTML=listHTML(MONTHLY,'m');
  count('w');count('m');
  const order=[...Array(12).keys()].map(i=>(mon+i)%12);
  $('#months').innerHTML=monthCard(mon,true)+'<h2>The other months</h2>'+order.slice(1).map(i=>`<details class="mo"><summary>${MONTHS[i]}</summary>${monthCard(i,false)}</details>`).join('');
}
function count(key){
  const n=total(key==='w'?WEEKLY:MONTHLY), done=Object.values(mem[key]).filter(Boolean).length;
  $('#count-'+key).textContent=done===n?`All ${n} bought`:`${done} of ${n} bought`;
  $('#bar-'+key).style.width=(done/n*100)+'%';
  $$('.gwrap',$('#list-'+key)).forEach(g=>{const a=$$('.item',g);$('[data-gc]',g).textContent=a.filter(x=>x.classList.contains('ticked')).length+' of '+a.length});
}

