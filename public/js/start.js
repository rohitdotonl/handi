/* ---------- start ---------- */
applyTheme(mem.theme);
renderCook();renderPlan();renderShop();renderPlants();renderPrep();renderToday();
setHide(!!mem.hide);
$$('.page').forEach(pg=>{const first=$('.seg button',pg);if(first)showSub(pg.id,mem.sub[pg.id]&&$(`.sub[data-sub="${mem.sub[pg.id]}"]`,pg)?mem.sub[pg.id]:first.dataset.sub)});
fillArt();drawTabIcons();renderPots();placeTrack();castArt();wideQ.addEventListener('change',placeTrack);
(()=>{const h=location.hash.slice(1);const [t,s]=h.split('/');const tab=show(h?t:(mem.tab||'today'));if(s)showSub(tab,s)})();
$$('.savenote').forEach(e=>e.textContent=canSave?'Ticks are saved on this device.':'Ticks can’t be saved in this preview; they stay only while the page is open.');
drawDock();
addEventListener('resize',segFit);$$('.seg').forEach(g=>g.addEventListener('scroll',segFit,{passive:true}));
$('#menu').addEventListener('click',e=>{if(e.target.id==='menu')openMenu(false)});
/* a link like #cook matches the page's id, and the browser scrolls the title under the header; undo that */
if(location.hash){const top=()=>window.scrollTo({top:0,behavior:'instant'});top();requestAnimationFrame(top);addEventListener('load',()=>setTimeout(top,0),{once:true})}
addEventListener('hashchange',()=>{if($('#sheet').hidden)setTimeout(()=>window.scrollTo({top:0,behavior:'instant'}),0)});
addEventListener('scroll',()=>document.body.classList.toggle('scrolled',scrollY>4),{passive:true});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>applyTheme(mem.theme));
setInterval(()=>{const a=document.activeElement;if($('#sheet').hidden&&(!a||!a.closest('#focus,#tl,#strip')))renderToday()},60000);

