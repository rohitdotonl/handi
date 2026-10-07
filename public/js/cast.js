/* ==========================================================================
   THE POT FAMILY. Five pots, one hand, one formula.

   THE FACE FORMULA (never break it):
   1. The head is a steel handi seen straight on, in a 120 x 120 box: a domed
      lid with a knob (y 12-35), a rim band (y 35-43), a belly that is widest
      at y 84 (x 12-108) and runs off the bottom of the crop. Two loop
      handles at y 52-66 are the ears.
   2. Eyes: two dots, r 3.3, at (47,72) and (73,72). Never bigger, never moved.
   3. Nose: one single stroke hooking down from (60.5,73), or no nose at all.
   4. Mouth: a short deadpan line, 11 wide, at y 92. Never a grin. The most it
      ever does is a tiny satisfied curve when the bowl is full.
   5. Brows: two short strokes at y 64. This is where the personality lives.
   6. Same crop, same proportions, same 2.4 key line, same fade at the bottom,
      same misregistration: the colour plate sits 1.4, 1 off the key plate.
   7. At most two telling details per pot. Deadpan always.
   ========================================================================== */
const PF_BELLY='M28 42C15 50 10 66 12 84C13 98 17 110 21 124H99C103 110 107 98 108 84C110 66 105 50 92 42Z';
const PF_LID='M30 35C31 25 44 20 60 19.5C76 19.5 89 25.5 90.5 35Z', PF_KNOB='M54.5 20.2C53.6 14.6 56.4 11.6 60.2 11.6C64 11.6 66.6 14.8 65.6 20.2';
const PF_RIM='M23 35.6C40 32.2 80 32 97 35.2C98 37.6 98.2 40.2 97.2 42.6C80 45.6 40 45.8 23.4 42.8C22.4 40.4 22.4 38 23 35.6Z';
const PF={
  /* brows: [left, right, width]; details: at most two */
  yellow:{brow:['M42 65.6Q47 63.4 52 65','M68 65Q73 63.4 78 65.6',2.4],nose:1,det:['ladle']},
  black:{brow:['M39 63.6L53.6 65.6','M66.4 65.6L81 63.6',5],nose:1,det:[]},
  blue:{brow:['M42 65.2L52.2 64.6','M67.8 64.6L78 65.2',2.4],nose:1,det:['fish']},
  red:{brow:['M42 65.4L52 64.8','M67 63.4C69.8 57.6 76 56.4 80.4 59.6',2.6],nose:1,det:['bean']},
  white:{brow:['M42 63.6Q47 61 52 63','M68 63Q73 61 78 63.6',2.2],nose:0,det:['bow','sprig']},
  /* the master pot: copper, retired, supervises. Not one of the five; it is the logo. */
  master:{brow:['M40.6 62.4Q46.6 59.6 53 62.6','M67 62.6Q73.4 59.6 79.4 62.4',3.4],nose:1,det:['specs','stache']}
};
const PF_DET={
  ladle:{c:'<path d="M84 33L101.5 7.5" stroke="var(--pf-steel)" stroke-width="4.6" stroke-linecap="round"/>',
    k:'<path d="M83.6 33.4L101.4 7.2C102.8 5.2 106.2 5.8 105.4 8.6" fill="none" stroke-width="2.2"/><path d="M86.6 31.2L99 13" stroke-width="1" opacity=".55"/>'},
  fish:{c:'<path d="M36 30.5C31 30 27 29 24 27.5L19 22C20.8 26.5 21.2 28.5 22.6 29.6C21 31 20 33 18.6 36L24.5 32C28 31.5 32 32 36 32.5Z" fill="color-mix(in oklab,var(--ink-b) 45%,var(--t-bg))"/>',
    k:'<path d="M35 30.4C31 30 27 29 24 27.5L19 22C20.8 26.5 21.2 28.5 22.6 29.6C21 31 20 33 18.6 36L24.5 32C28 31.5 31 32 35 32.3" fill="none" stroke-width="1.8"/><path d="M24.6 28.6L23.6 31.4" stroke-width="1"/>'},
  bean:{c:'<path d="M29.4 86.4c0-3.6 4.4-4.4 5.8-2 .9 1.5 4.4.3 4.4 3.1 0 3.6-10.2 3.8-10.2-1.1z" fill="color-mix(in oklab,var(--ink-r) 50%,#2a0d0a)"/>',
    k:'<path d="M28 86c0-3.6 4.4-4.4 5.8-2 .9 1.5 4.4.3 4.4 3.1 0 3.6-10.2 3.8-10.2-1.1z" fill="none" stroke="var(--pf-face)" stroke-width="1.4"/>'},
  bow:{c:'<path d="M60 47.6L49.8 42.8L50.4 52.6ZM60 47.6L70.2 42.8L69.6 52.6Z" fill="var(--ink-r)"/>',
    k:'<path d="M59 47L48.6 42L49.2 51.8ZM59 47L69.2 42L68.6 51.8Z" fill="none" stroke="var(--pf-face)" stroke-width="1.6" stroke-linejoin="round"/><circle cx="59" cy="47" r="2.4" fill="var(--pf-face)" stroke="none"/>'},
  sprig:{c:'<g fill="var(--ink-g)"><circle cx="108.6" cy="40" r="3.4"/><circle cx="113" cy="45.4" r="3"/><circle cx="104" cy="43.6" r="2.8"/></g>',
    k:'<path d="M99.6 57C102.6 51 106 46.4 110.4 41.6M106.6 45.6L111.6 45.2" fill="none" stroke-width="1.4"/>'},
  specs:{c:'<g fill="color-mix(in oklab,var(--pf-steel) 55%,transparent)"><circle cx="47" cy="72" r="8"/><circle cx="73" cy="72" r="8"/></g>',
    k:'<circle cx="47" cy="72" r="8" stroke-width="1.8"/><circle cx="73" cy="72" r="8" stroke-width="1.8"/><path d="M55 71.2Q60 68.6 65 71.2M39 70.6L31 66.6M81 70.6L89 66.6" stroke-width="1.6"/>'},
  stache:{c:'<path d="M60 84.4C55 82.2 47.6 83.2 43.6 87.6C42 89.4 39.4 89.6 37.8 88C39.8 92.6 47.6 93.4 52.4 90.2C55 88.6 57.8 88 60 88C62.2 88 65 88.6 67.6 90.2C72.4 93.4 80.2 92.6 82.2 88C80.6 89.6 78 89.4 76.4 87.6C72.4 83.2 65 82.2 60 84.4Z" fill="var(--pot-white)"/>',
    k:'<path d="M59 83.8C54 81.6 46.6 82.6 42.6 87C41 88.8 38.4 89 36.8 87.4C38.8 92 46.6 92.8 51.4 89.6C54 88 56.8 87.4 59 87.4C61.2 87.4 64 88 66.6 89.6C71.4 92.8 79.2 92 81.2 87.4C79.6 89 77 88.8 75.4 87C71.4 82.6 64 81.6 59 83.8Z" stroke-width="1.8"/>'},
  buoy:{c:'',k:''}
};
/* potFace(id, {mood 0-6, cls, hero, alive, buoy, label, box: extra svg attributes})
   alive: the face can blink, sleep (.sleep), yawn (.yawn) and get cross (.cross). */
function potFace(id,o={}){
  const P=PF[id]||PF.yellow, m=Math.max(0,Math.min(6,o.mood||0)), lift=(-m*.42).toFixed(2), full=m>=6;
  const dark=id==='black', face=dark?'var(--pf-face-black)':'var(--pf-face)';
  const fill=id==='white'?'var(--pot-white)':id==='master'?'var(--pot-master)':`var(--pot-${id})`;
  const det=P.det.map(d=>PF_DET[d]);
  const tilt='';
  const lidG=(inner)=>`<g class="pf-lid"${tilt}>${inner}</g>`;
  const shade=dark?`<rect x="0" y="40" width="70" height="84" fill="url(#pf-htp)" clip-path="url(#pf-belly)" mask="url(#pf-hl)"/>`
                  :`<rect x="40" y="40" width="80" height="84" fill="url(#pf-ht)" clip-path="url(#pf-belly)" mask="url(#pf-sh)"/>`;
  const mouth=full?'M54.5 91.4Q60 95.2 65.5 91.4':'M54.5 92.4C57.5 92 61.5 92.2 65.5 91.8';
  const ring=(d,cls)=>`<g class="${cls}"><path d="${d}" fill="none" stroke="var(--pot-white)" stroke-width="9"/><path d="${d}" fill="none" stroke="var(--ink-r)" stroke-width="9" stroke-dasharray="17 15"/></g>`;
  const buoyBack=o.buoy?ring('M11.6 101A49 12.5 0 0 1 109.6 101','pf-buoy'):'';
  const buoy=o.buoy?`<g class="pf-buoy">${ring('M11.6 101A49 12.5 0 0 0 109.6 101','')}<g fill="none" stroke="var(--k)" stroke-width="1.8" filter="url(#pf-wob)"><path d="M6.6 100.4A54 17 0 0 0 114.6 100.4"/><path d="M15.6 100.4A44 8.2 0 0 0 103.6 100.4"/><path d="M6.6 100.4A54 17 0 0 1 16 91.4M114.6 100.4A54 17 0 0 0 105 91.4"/></g></g>`:'';
  return `<svg${o.box?' '+o.box:''} class="pf pf-${id}${o.cls?' '+o.cls:''}" viewBox="0 0 120 120"${o.label?` role="img" aria-label="${o.label}"`:' aria-hidden="true"'}>
<g mask="url(#pf-fade)"><g class="pf-c" transform="translate(1.4 1)">${det.map(d=>d.c).join('')}${lidG(`<path d="${PF_LID}" fill="var(--pf-steel)"/><path d="${PF_LID}" fill="url(#pf-hts)"/><path d="${PF_KNOB}" fill="var(--pf-steel)"/>`)}${buoyBack}<path d="${PF_BELLY}" fill="${fill}"/>${shade}<path d="${PF_RIM}" fill="var(--pf-steel)"/><path d="${PF_RIM}" fill="url(#pf-hts)"/></g>
<g class="pf-k" fill="none" stroke="var(--k)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" filter="url(#pf-wob)">${lidG(`<path d="${PF_LID}"/><path d="${PF_KNOB}"/>`)}<path d="${PF_RIM}"/><path d="M28 42.6C15 50 10 66 12 84C13 98 17 110 21 124M92.5 42.2C105.5 50.5 110.4 67 108.2 84.5C106.8 98 103 110 99.5 124"/><path d="M23.6 52C13 50 10.6 64 19.6 66.4M96.4 52C107 50 109.4 64 100.4 66.4"/>${det.map(d=>d.k).join('')}</g>
<g class="pf-f" fill="${face}" stroke="${face}" stroke-linecap="round" stroke-linejoin="round" filter="url(#pf-wob)"><g class="pf-brow" fill="none" stroke-width="${P.brow[2]}" transform="translate(0 ${lift})"><path d="${P.brow[0]}"/><path d="${P.brow[1]}"/></g><g class="pf-eyes"><circle cx="47" cy="72" r="3.3" stroke="none"/><circle cx="73" cy="72" r="3.3" stroke="none"/></g>${o.alive?`<g class="pf-shut" fill="none" stroke-width="2.2"><path d="M42.6 71.6Q47 75.4 51.4 71.6"/><path d="M68.6 71.6Q73 75.4 77.4 71.6"/></g><g class="pf-cross" fill="none" stroke-width="${P.brow[2]}"><path d="M41.6 61.4L52.6 66.2"/><path d="M67.4 66.2L78.4 61.4"/></g><ellipse class="pf-yawn" cx="60" cy="93.4" rx="3.6" ry="4.6" stroke="none"/>`:''}${P.nose?'<path d="M60.5 73C59 78 57 81 58.6 82.6C59.6 83.4 61.6 83 62.6 82.2" fill="none" stroke-width="2"/>':''}${o.hero?`<path class="pf-mouth" d="M54.5 92.4C57.5 92 61.5 92.2 65.5 91.8" fill="none" stroke-width="2.2"/><path class="pf-smile" d="M54.5 91.4Q60 95.2 65.5 91.4" fill="none" stroke-width="2.2"/>`:`<path d="${mouth}" fill="none" stroke-width="2.2"/>`}</g></g>${buoy}</svg>`;
}
/* shared plates for every member of the cast: halftone screens, the fade, the wobble */
const PF_DEFS=`<svg class="pf-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
<pattern id="pf-ht" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle cx="1.7" cy="1.7" r="1.05" fill="var(--pf-shade)"/></pattern>
<pattern id="pf-htp" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle cx="1.7" cy="1.7" r="1" fill="var(--t-bg)" opacity=".5"/></pattern>
<pattern id="pf-hts" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="1.4" cy="1.4" r=".7" fill="var(--pf-dot)"/></pattern>
<pattern id="pf-htd" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(15)"><circle cx="2.5" cy="2.5" r="1.5" fill="currentColor"/></pattern>
<linearGradient id="pf-fg" x1="0" y1="0" x2="0" y2="1"><stop offset=".72" stop-color="#fff"/><stop offset=".86" stop-color="#000"/></linearGradient>
<linearGradient id="pf-sg" x1="0" y1="0" x2="1" y2="0"><stop offset=".55" stop-color="#000"/><stop offset=".78" stop-color="#fff"/></linearGradient>
<linearGradient id="pf-hg" x1="0" y1="0" x2="1" y2="0"><stop offset=".2" stop-color="#fff"/><stop offset=".45" stop-color="#000"/></linearGradient>
<mask id="pf-fade" maskUnits="userSpaceOnUse" x="-20" y="-20" width="160" height="160"><rect x="-20" y="-20" width="160" height="160" fill="url(#pf-fg)"/></mask>
<mask id="pf-sh" maskUnits="userSpaceOnUse" x="-20" y="-20" width="160" height="160"><rect x="-20" y="-20" width="160" height="160" fill="url(#pf-sg)"/></mask>
<mask id="pf-hl" maskUnits="userSpaceOnUse" x="-20" y="-20" width="160" height="160"><rect x="-20" y="-20" width="160" height="160" fill="url(#pf-hg)"/></mask>
<clipPath id="pf-belly"><path d="${PF_BELLY}"/></clipPath>
<filter id="pf-wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="pf-wob-s" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="1" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="pf-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.05"/></filter>
</defs></svg>`;
/* the cast says a word, rarely, and never more than one line */
const PF_SAYS={
  yellow:'“Same time tomorrow.”',
  black:'“Acceptable.”',
  blue:'“The fish was not consulted.”',
  red:'“I would call that a triumph. Quietly.”',
  white:'“Sunday best. As usual.”'
};

/* a small pot: the family portrait, cropped small */
const potIcon=id=>potFace(id,{cls:'pot'});
document.body.insertAdjacentHTML('afterbegin',PF_DEFS);
/* stickers: a die-cut ingredient, drawn once as a white edge and once in colour */
const STK_SHAPE={
  round:c=>`<circle cx="12" cy="13.2" r="7" fill="${c}"/><path d="M12 6.4c.8-2 2.7-2.9 4.8-2.5-.9 1.9-2.7 2.9-4.8 2.5z" fill="#3f9a45"/><circle cx="9.4" cy="10.8" r="1.6" fill="#fff" opacity=".45"/>`,
  leaf:c=>`<path d="M5 19C5.6 10.5 11.4 5 19.5 4.6 19.4 13 13.6 18.8 5 19z" fill="${c}"/><path d="M5.6 18.4 17.6 6.6M10 14.2l-.3-3.4M13.4 10.8l-.2-3.2M10 14.2l3.4.3M13.4 10.8l3.2.3" stroke="rgba(0,0,0,.28)" stroke-width=".9" fill="none" stroke-linecap="round"/>`,
  seeds:c=>`<ellipse cx="8.4" cy="14" rx="3.6" ry="2.7" transform="rotate(-25 8.4 14)" fill="${c}"/><ellipse cx="15.2" cy="16.2" rx="3.6" ry="2.7" transform="rotate(20 15.2 16.2)" fill="${c}"/><ellipse cx="13" cy="8.6" rx="3.6" ry="2.7" transform="rotate(-5 13 8.6)" fill="${c}"/><path d="M7 13.2l2.6-1M14 15.6l2.4 1.1M11.8 8.3h2.4" stroke="rgba(0,0,0,.22)" stroke-width=".9" stroke-linecap="round"/>`,
  egg:()=>`<ellipse cx="8.4" cy="13.8" rx="5.3" ry="6.7" fill="#fbf8f1"/><ellipse cx="15.8" cy="12.2" rx="5.3" ry="6.7" fill="#fbf8f1"/>`,
  garlic:c=>`<path d="M12 3.4c.8 2.6 6.6 4.4 6.6 9.4 0 3.6-2.8 5.8-6.6 5.8s-6.6-2.2-6.6-5.8C5.4 7.8 11.2 6 12 3.4z" fill="${c}"/><path d="M12 6.4c-1.6 2.4-2 5.6-1.2 11M12 6.4c1.6 2.4 2 5.6 1.2 11" stroke="rgba(0,0,0,.14)" stroke-width=".8" fill="none"/>`,
  drop:c=>`<path d="M12 3.6c3.2 4.6 6.2 7.6 6.2 11.2a6.2 6.2 0 0 1-12.4 0c0-3.6 3-6.6 6.2-11.2z" fill="${c}"/><path d="M9.4 14.6a2.8 2.8 0 0 0 2 2.8" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".6"/>`,
  mound:c=>`<path d="M3.6 18.6c1.8-6.4 5-9.8 8.4-9.8s6.6 3.4 8.4 9.8z" fill="${c}"/><circle cx="9" cy="15" r=".9" fill="#fff" opacity=".45"/><circle cx="13.4" cy="12.4" r=".7" fill="#fff" opacity=".45"/>`,
  bulb:c=>`<path d="M12 3.4c.9 3.4 6.4 5 6.4 10.4a6.4 6.4 0 0 1-12.8 0C5.6 8.4 11.1 6.8 12 3.4z" fill="${c}"/><path d="M12 6.4c-1.8 2.6-2.4 6-1.6 11.6M12 6.4c1.8 2.6 2.4 6 1.6 11.6" stroke="rgba(255,255,255,.4)" stroke-width="1" fill="none"/>`,
  root:c=>`<path d="M5.4 19.6 15 8.2c1.6-1.5 3.6.5 2.2 2.1L7.6 20.4c-.9.8-2.9.1-2.2-.8z" fill="${c}"/><path d="M16.2 8.4c-.4-2.4.3-4 1.6-4.8M17.4 9.4c1.4-1.6 3.2-2 4.4-1.4M16.8 8.8c.6-2 2-3.4 3.4-3.6" stroke="#3f9a45" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M9.6 15.6l1.4.8M12 12.8l1.3.9" stroke="rgba(0,0,0,.2)" stroke-width=".9" stroke-linecap="round"/>`,
  pod:c=>`<path d="M4.6 18.4C7 10 13 5.6 19.6 5c.4 6.8-5.6 12.6-15 13.4z" fill="${c}"/><path d="M7 16.6c3.4-1.4 7.6-5 10.6-9.6" stroke="rgba(255,255,255,.35)" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
  grain:c=>`<path d="M6 20 17.6 5.2" stroke="#b39355" stroke-width="1.2" stroke-linecap="round"/>${[[9,15.4],[11.6,12],[14.2,8.6],[16.8,5.6]].map(([x,y])=>`<ellipse cx="${x-2.2}" cy="${y-.8}" rx="2.4" ry="1.4" transform="rotate(-70 ${x-2.2} ${y-.8})" fill="${c}"/><ellipse cx="${x+1.4}" cy="${y+1.8}" rx="2.4" ry="1.4" transform="rotate(-10 ${x+1.4} ${y+1.8})" fill="${c}"/>`).join('')}`,
  chilli:c=>`<path d="M6 18.6c5.6-.4 10.2-4.6 11.6-11 .3-1.3 2.1-1 2 .3-.6 7.4-6.4 12.6-13.4 12.6-1.2 0-1.4-1.8-.2-1.9z" fill="${c}"/><path d="M18.8 7.4c-.2-1.6.4-2.8 1.6-3.6" stroke="#2c7433" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,
  cup:c=>`<circle cx="12" cy="12.4" r="7.4" fill="#e9ecef"/><circle cx="12" cy="12.4" r="5.6" fill="${c}"/><ellipse cx="10.4" cy="10.6" rx="2" ry="1" transform="rotate(-35 10.4 10.6)" fill="#fff" opacity=".35"/>`,
  meat:c=>`<path d="M5.6 11.2c0-4.6 6.4-6.8 10.6-3.6 3.6 2.8 3.4 9.4-1.8 10.8-5.6 1.4-8.8-2.2-8.8-7.2z" fill="${c}"/><path d="M9 10.4c1.6-1.4 4.4-1.6 6 .2" stroke="rgba(255,255,255,.45)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
  fish:c=>`<path d="M3.6 12.4c3.6-5 9.6-6 14.6-2.6L21 7.4l-1 5 1 5-2.8-2.4c-5 3.4-11 2.4-14.6-2.6z" fill="${c}"/><circle cx="7.4" cy="11.6" r="1" fill="#2b2b33"/>`,
  jar:c=>`<rect x="6.4" y="7" width="11.2" height="12.4" rx="2.4" fill="${c}"/><rect x="7.4" y="4.2" width="9.2" height="3.4" rx="1" fill="#a3a9b0"/><rect x="8.4" y="10.4" width="7.2" height="4.4" rx=".8" fill="#fff" opacity=".7"/>`
};
const STK={eggs:['egg'],curd:['cup','#fbf8f1'],fish:['fish','#9fb3c4'],tins:['jar','#9fb3c4'],chicken:['meat','#e8a37a'],liver:['meat','#8e3b2e'],
  greens1:['leaf','#3f9a45'],greens2:['leaf','#2f7f3a'],herbs:['leaf','#4caf50'],fenugreek:['leaf','#5a9e3a'],mustard:['leaf','#6aa84f'],lambs:['leaf','#7cb36a'],spinach:['leaf','#2f7f3a'],amaranth:['leaf','#a3324a'],malabar:['leaf','#3e8a3a'],purslane:['leaf','#8bbf5a'],moringa:['leaf','#6aa84f'],dill:['leaf','#86b864'],mint:['leaf','#4caf50'],coriander:['leaf','#3f9a45'],
  cabbage:['round','#b9d98f'],cauliflower:['round','#efe6cf'],broccoli:['round','#4f8a3a'],kohlrabi:['round','#b7d58f'],radish:['bulb','#f4f0ea'],turnip:['bulb','#e2d2ec'],
  cucumber:['pod','#4f8f3a'],tomato:['round','#d9412f'],onion:['bulb','#b0446b'],garlic:['garlic','#efe7da'],root:['root','#e8742a'],carrot:['root','#e8742a'],bcarrot:['root','#4a1f3e'],beetroot:['bulb','#8e1f45'],sweetpotato:['bulb','#b4533a'],
  bottlegourd:['pod','#a8c97a'],ridgegourd:['pod','#5f8f3a'],pumpkin:['round','#e8892a'],roundgourd:['round','#9cc26e'],okra:['pod','#5f9a3a'],bittergourd:['pod','#3f7f2a'],capsicum:['round','#3f9a45'],flatbeans:['pod','#7fb04a'],other:['round','#a3a9b0'],
  guava:['round','#a7c957'],gooseberry:['round','#c5d86d'],fruit:['round','#f39a1e'],lemon:['round','#f4dd4a'],apple:['round','#d9412f'],orange:['round','#f39a1e'],papaya:['round','#f08a3c'],pomegranate:['round','#c22a3a'],pear:['round','#c9d65a'],banana:['pod','#f4d53a'],mango:['round','#f5b324'],javaplum:['round','#5b2a6e'],jujube:['round','#b8452a'],melon:['round','#9fcf73'],grapes:['seeds','#6d8f3a'],lychee:['round','#d9576a'],
  ginger:['mound','#d6a85a'],chilli:['chilli','#3f9a45'],turmeric:['mound','#e3a21a'],fturmeric:['root','#e08a1a'],
  mung:['seeds','#e8c43a'],redlentil:['seeds','#e5763a'],pigeon:['seeds','#e3b23a'],blackgram:['seeds','#f1ead8'],bengal:['seeds','#e8b84a'],bchick:['seeds','#5a3d22'],kidney:['seeds','#8e2a2a'],wchick:['seeds','#e8cf9a'],chickpea:['seeds','#d9b26a'],soya:['seeds','#e8d3a0'],peanut:['seeds','#c8925a'],peanuts:['seeds','#c8925a'],blackeyed:['seeds','#efe6d4'],peas:['seeds','#6aa84f'],horsegram:['seeds','#8a5a3a'],rchick:['seeds','#a8743a'],
  barley:['grain','#d9c08a'],bbarley:['grain','#d9c08a'],wbarley:['grain','#cdb07a'],oats:['grain','#e3cf9e'],fmillet:['mound','#8a4f3a'],pmillet:['grain','#9c9a8a'],corn:['grain','#f2c230'],gramflour:['mound','#e7c46a'],
  walnut:['bulb','#b08053'],walnuts:['bulb','#b08053'],flax:['seeds','#7a4a2a'],mustardoil:['drop','#d9a21a'],evoo:['drop','#9aa63a'],olive:['drop','#9aa63a'],
  cumin:['seeds','#8a6a3a'],mustardseed:['seeds','#3a2a20'],fenuseed:['seeds','#c9a03a'],pepper:['seeds','#2b2624'],asafoetida:['mound','#e9dcc0'],salt:['mound','#f1e6ea'],garam:['mound','#8a4a2a'],
  tea:['cup','#5a3a24'],coffee:['cup','#5a3a24'],creatine:['jar','#e6e9ee']};
/* stickers join the family in the same formula: dot eyes, a deadpan line, one detail (the garlic's beard) */
const STK_FACE={
  egg:'<g fill="#25211c"><circle cx="6.9" cy="13.4" r=".85"/><circle cx="9.9" cy="13.4" r=".85"/><circle cx="14.3" cy="11.8" r=".85"/><circle cx="17.3" cy="11.8" r=".85"/></g><path d="M7.4 16.4h2M14.8 14.8h2" stroke="#25211c" stroke-width=".8" stroke-linecap="round"/>',
  garlic:'<g fill="#25211c"><circle cx="10" cy="12.2" r=".85"/><circle cx="14" cy="12.2" r=".85"/></g><path d="M11.1 15h1.8" stroke="#25211c" stroke-width=".8" stroke-linecap="round"/><path d="M8.6 18l-.9 2.6M10.3 18.5l-.3 3M12 18.7v3.2M13.7 18.5l.3 3M15.4 18l.9 2.6" stroke="var(--k)" stroke-width=".9" stroke-linecap="round"/>'
};
/* the rest of the crew get the same face: two dots and a deadpan line, placed on each shape's middle.
   Dark ingredients get a light face. The grain stalk is too thin for a face and stays shy. */
const STK_AT={round:[12,13.4,1.7],leaf:[11.6,12.6,1.5],seeds:[13,8.7,1.1],mound:[12,15,1.7],bulb:[12,13.6,1.7],root:[10.6,14.4,1.1],pod:[11.4,12.6,1.4],chilli:[11.6,15.4,1.2],cup:[12,12.4,1.6],meat:[11.8,12.2,1.7],jar:[12,12.4,1.5],drop:[12,14.4,1.6]};
const lum=c=>{if(!/^#[0-9a-f]{6}$/i.test(c||''))return 1;const v=[1,3,5].map(i=>parseInt(c.substr(i,2),16)/255);return .2126*v[0]+.7152*v[1]+.0722*v[2]};
function stkFace(k,c){
  if(STK_FACE[k])return STK_FACE[k];const a=STK_AT[k];if(!a)return '';
  const [x,y,d]=a, ink=k!=='jar'&&lum(c)<.3?'#f6f1e4':'#25211c', r=d>1.4?.8:.62;
  return `<g class="face"><circle cx="${x-d}" cy="${y}" r="${r}" fill="${ink}"/><circle cx="${x+d}" cy="${y}" r="${r}" fill="${ink}"/><path d="M${x-d*.55} ${y+d*1.35}h${d*1.1}" stroke="${ink}" stroke-width=".7" stroke-linecap="round"/></g>`;
}
const sticker=id=>{const [k,c]=STK[id]||['round','#a3a9b0'],g=STK_SHAPE[k](c);return `<svg class="stk" viewBox="0 0 24 24" aria-hidden="true"><g class="cut">${g}</g><g class="col" transform="translate(.5 .45)">${g}</g><g class="ko">${g}</g>${stkFace(k,c)}</svg>`};
/* water: a steel tumbler from above; fish: a steel plate with a fish on it */
const glassArt=on=>`<svg class="gl" viewBox="0 0 40 40" aria-hidden="true"><circle class="r" cx="20" cy="20" r="17"/>${SHINE}<circle class="w" cx="20" cy="20" r="14.2"/>${on?'<circle cx="20" cy="20" r="14.2" fill="var(--water)"/><circle cx="20" cy="20" r="9.5" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1"/><circle cx="20" cy="20" r="5" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/><ellipse cx="14.5" cy="13.5" rx="3.4" ry="1.5" transform="rotate(-40 14.5 13.5)" fill="rgba(255,255,255,.6)"/>':''}</svg>`;
const plateArt=on=>`<svg class="gl" viewBox="0 0 48 48" aria-hidden="true"><circle class="r" cx="24" cy="24" r="22.5"/><path class="sh" d="M6.5 17A19 19 0 0 1 17 6.5"/><circle class="w" cx="24" cy="24" r="15.5"/>${on?
  '<g transform="rotate(-30 24 24)"><path d="M10 24c4-6.5 12-8 19-4l5.5-4.5-1.5 8.5 1.5 8.5-5.5-4.5c-7 4-15 2.5-19-4z" fill="#a9bccb"/><path d="M12.5 22.6c5-4 11-4.5 16-1.6" stroke="#71889b" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="14.6" cy="23.4" r="1.2" fill="#2b2b33"/><path d="M19 21v6M22.5 20.4v7.2" stroke="#8ea3b4" stroke-width=".9"/></g>'+
  '<path d="M31 30.5a5.5 5.5 0 0 1 9.4-3.9z" fill="#f4dd6a" stroke="#c9a516" stroke-width="1" stroke-linejoin="round"/>'+
  '<g fill="var(--b-leaf-art)" transform="translate(16 33) rotate(20)"><circle cx="0" cy="-2" r="2"/><circle cx="-2" cy=".4" r="1.8"/><circle cx="2" cy=".4" r="1.8"/></g>':''}</svg>`;
/* the hero: the day's pot in a big steel bowl, with what that pot really holds, finished raw on top */
const sprig=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 0v9" stroke="var(--b-leaf-art)" stroke-width="1.2" fill="none" stroke-linecap="round"/><circle cx="0" cy="-3.6" r="3.4"/><circle cx="-3.4" cy=".4" r="3.1"/><circle cx="3.4" cy=".4" r="3.1"/><path d="M0 -1v-4.4M0-1l-2.6 1.2M0-1l2.6 1.2" stroke="rgba(0,0,0,.18)" stroke-width=".6"/></g>`;
const bean=(x,y,a,c,h)=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-5.2-1.2C-5.2-4.6-.6-4.8.6-2.6 1.6-.9 5.2-2.4 5.2 1 5.2 4.6-5.2 4.8-5.2-1.2z" fill="${c}"/><path d="M-3.4-1.8c1-1.4 2.4-1.6 3.2-.8" stroke="${h}" stroke-width="1" fill="none" stroke-linecap="round"/></g>`;
/* the bowl fills as the day goes: dal, the pot's own beans, greens, lemon, flax and oil, then coriander */
const leaf=(x,y,a,c)=>`<path transform="translate(${x} ${y}) rotate(${a})" d="M-4.5 0C-2.8-3.4 2.8-3.4 4.5 0 2.8 3.4-2.8 3.4-4.5 0z" fill="${c}"/>`;
const bowlArt=id=>{
  /* front-on steel bowl; the food sits in an ellipse, foreshortened. Same inks as the cast. */
  const E=(cx,cy,rx,ry,f,a=0,x='')=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${a?` transform="rotate(${a} ${cx} ${cy})"`:''}${x}/>`;
  const P=[[26,19,20],[38,13,-30],[52,24,40],[64,14,10],[78,22,-20],[90,16,50],[100,21,-40],[44,27,0],[70,28,30],[58,18,-60],[84,27,15],[32,25,70]];
  const ING={
    yellow:P.map(([x,y,a],k)=>E(x,y,1.5,.8,k%3?'var(--k)':'var(--ink-r)',a)).join(''),
    black:P.slice(0,10).map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.2" fill="color-mix(in oklab,var(--ink-y) 35%,#3a2a1c)" stroke="var(--k)" stroke-width=".9"/>`).join(''),
    blue:P.slice(0,7).map(([x,y,a])=>`<rect x="${x-5}" y="${y-2.6}" width="10" height="5.2" rx="2.4" fill="var(--pot-white)" stroke="var(--k)" stroke-width=".9" transform="rotate(${a/4} ${x} ${y})"/>`).join(''),
    red:P.slice(0,11).map(([x,y,a])=>E(x,y,3.6,2,'color-mix(in oklab,var(--ink-r) 45%,#2a0d0a)',a/2,' stroke="var(--k)" stroke-width=".7"')).join(''),
    white:P.slice(0,7).map(([x,y,a])=>`<rect x="${x-4.6}" y="${y-3}" width="9.2" height="6" rx="2" fill="color-mix(in oklab,var(--ink-y) 55%,#fff)" stroke="var(--k)" stroke-width=".9" transform="rotate(${a/3} ${x} ${y})"/>`).join('')
  };
  const dal=id==='white'?'color-mix(in oklab,var(--ink-y) 30%,var(--pot-white))':id==='black'?'color-mix(in oklab,var(--ink-y) 35%,#5a4330)':`var(--pot-${id})`;
  const green=[[30,16,20],[46,22,-30],[62,25,35],[76,13,-10],[92,24,40],[54,12,60],[38,26,-50]].map(([x,y,a])=>E(x,y,4.2,1.8,'var(--ink-g)',a)).join('');
  const sprig=(x,y)=>`<g fill="var(--ink-g)" stroke="var(--k)" stroke-width=".6"><circle cx="${x}" cy="${y-1.6}" r="2.1"/><circle cx="${x-2.2}" cy="${y+.6}" r="1.9"/><circle cx="${x+2.2}" cy="${y+.6}" r="1.9"/></g>`;
  return `<span class="hero-art" data-n="0">${potFace(id,{hero:1,alive:1,cls:'poke'})}<i class="pf-zzz" aria-hidden="true"><b>z</b><b>z</b><b>z</b></i><svg class="bowl" viewBox="0 0 120 64" aria-hidden="true" data-n="0">
<defs><clipPath id="hb-in"><ellipse cx="60" cy="19.5" rx="48.5" ry="11.2"/></clipPath></defs>
<path class="b-steel" d="M7 18C8 41 30 60 60 60C90 60 112 41 113 18Z"/><path class="b-dots" d="M70 20C100 22 110 30 112 18C111 41 92 58 66 60Z"/>
<ellipse cx="60" cy="18" rx="53" ry="13.4" class="b-steel"/><ellipse cx="60" cy="19.5" rx="48.5" ry="11.2" fill="color-mix(in oklab,var(--pf-steel) 70%,var(--k))"/><ellipse cx="60" cy="19.5" rx="48.5" ry="11.2" class="b-dots"/>
<g clip-path="url(#hb-in)">
<g class="ly" data-l="1">${E(60,20.5,49,11.4,dal)}${E(70,23,40,8,'url(#pf-ht)')}</g>
<g class="ly" data-l="2">${ING[id]||ING.yellow}</g>
<g class="ly" data-l="3">${green}</g>
<g class="ly" data-l="4"><path d="M80 18.5A9 5.4 0 0 1 98 18.5Z" fill="var(--ink-y)" stroke="var(--k)" stroke-width="1.2" stroke-linejoin="round"/><path d="M89 18.4L84 15M89 18.4L89 13.6M89 18.4L94 15" stroke="var(--k)" stroke-width=".6" fill="none"/></g>
<g class="ly" data-l="5"><path d="M24 20q10-4 20 0t20 0 20 0 18-1" stroke="var(--ink-y)" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"/>${P.map(([x,y])=>`<circle cx="${x+3}" cy="${y-2}" r=".9" fill="var(--k)"/>`).join('')}</g>
<g class="ly" data-l="6">${sprig(40,17)}${sprig(60,23)}${sprig(74,15)}${sprig(28,23)}</g>
</g>
<g class="b-k" filter="url(#pf-wob)"><ellipse cx="60" cy="18" rx="53" ry="13.4"/><path d="M7 18.4C8 41 30 60 60 60C90 60 112 41 113 18.4"/><path d="M44 59.6C46 62.6 74 62.6 76 59.6" /></g>
<circle class="ripple" cx="60" cy="20" r="14" fill="none" stroke="var(--k)" stroke-width="1.2"/>
<g class="glint" fill="var(--ink-y)" stroke="var(--k)" stroke-width=".8">${[[12,6,.6],[108,4,.5],[116,30,.45]].map(([x,y,k])=>`<path transform="translate(${x} ${y}) scale(${k})" d="M0-7L1.6-1.6 7 0 1.6 1.6 0 7-1.6 1.6-7 0-1.6-1.6z"/>`).join('')}</g></svg></span>`;
};
const LAYERS=(T)=>['the dal',T.id==='mince'?'the soya and peas':{yellow:'the five lentils',black:'the black chickpeas',blue:'the fish',red:'the kidney beans',white:'the chicken'}[T.color],'the greens','the lemon','flax and olive oil','the coriander'];
const clockSvg='<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v4.3l2.6 1.6"/></svg>';

