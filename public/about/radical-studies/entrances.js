(() => {
const study=document.body.dataset.study;
const quote='“The rabbit hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.”';
const quotation=()=>`<blockquote class="carroll"><p>${quote}</p><cite>— Lewis Carroll</cite></blockquote>`;
const number=i=>String(i+1).padStart(2,'0');
window.RABBIT_ENTRANCE=(el,{prose,bio})=>{
 el.classList.add('entrance');
 const h='<h1 class="sr-only" tabindex="-1">About Philip Di Fiore</h1>';
 const paragraphs=bio.map((text,i)=>`<p data-paragraph="${i+1}">${prose(text)}</p>`);
 if(study==='scarlet'){
  el.innerHTML=`<div class="scene-content sign-page">${h}<div class="sign-top"><span class="tiny-label">A life in<br>many directions.</span>${quotation()}</div><article class="sign-bio" aria-label="Biography">${paragraphs.join('')}</article><div class="sign-end" aria-hidden="true">↙ &nbsp; ↗ &nbsp; ↘</div></div>`;
 }else if(study==='receipt'){
  el.innerHTML=`<div class="scene-content receipt-scroll">${h}<div class="receipt-paper"><div class="receipt-heading"><span>AN UNFOLDING BIOGRAPHY</span><span>07 BEGINNINGS</span></div>${quotation()}<article class="receipt-bio" aria-label="Biography">${paragraphs.map((p,i)=>`<div class="receipt-line"><span class="receipt-number" aria-hidden="true">${number(i)}</span>${p}</div>`).join('')}</article><div class="receipt-total"><span>CONNECTIONS</span><span>TO BE CONTINUED</span></div><div class="receipt-stamp">KEEP GOING</div></div></div>`;
 }else if(study==='constellation'){
  el.innerHTML=`<div class="scene-content cosmos-page">${h}${quotation()}<article class="orbit-map" aria-label="Biography"><svg class="orbit-lines" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true"><path d="M160 85 C400 -70 830 400 970 96 S1000 530 610 420 S160 600 180 300 S630 70 680 224 S980 560 960 400"/><path d="M160 85 Q470 150 680 224 L180 300 Q500 290 610 420 L970 96"/></svg>${paragraphs.map((p,i)=>`<section class="orbit orbit-${i+1}"><span class="orbit-number" aria-hidden="true">${number(i)}</span>${p}</section>`).join('')}</article></div>`;
 }else if(study==='desktop'){
  el.innerHTML=`<div class="scene-content desktop-page">${h}<div class="desktop-tools"><span>PERSONAL FILES / ABOUT</span><button class="arrange" type="button">Arrange windows</button></div><div class="desktop-space"><section class="desktop-window quote-window"><button class="window-handle" aria-label="Move quotation window. Drag or use arrow keys."><span>READ ME FIRST.txt</span><span aria-hidden="true">⠿</span></button>${quotation()}</section><section class="desktop-window bio-window"><button class="window-handle" aria-label="Move biography window. Drag or use arrow keys."><span>ABOUT.txt</span><span aria-hidden="true">⠿</span></button><article class="desktop-bio" aria-label="Biography">${paragraphs.join('')}</article></section><aside class="desktop-window doors-window"><button class="window-handle" aria-label="Move connections window. Drag or use arrow keys."><span>CONNECTED TO…</span><span aria-hidden="true">⠿</span></button><div class="desktop-doors">${prose('[David Byrne|artist-byrne]')}<br>${prose('[Bernie Worrell|bernie]')}<br>${prose('[George Clinton|artist-clinton]')}<br>${prose('[Recording Parties|recording-parties]')}</div><p class="desktop-note">Every word opens<br>another room.</p></aside></div></div>`;
 }else{
  el.innerHTML=`<div class="scene-content notebook-page">${h}<div class="notebook-sheet"><div class="notebook-top"><span class="notebook-label">a few notes…</span>${quotation()}</div><article class="notebook-bio" aria-label="Biography">${paragraphs.map((p,i)=>`<div class="notebook-line"><span class="note-number" aria-hidden="true">${i+1}.</span>${p}</div>`).join('')}</article><p class="notebook-footnote">follow the underlined words ↗</p></div></div>`;
 }
 // Keep sentence punctuation attached to long inline doors.
 el.querySelectorAll('[data-paragraph] .word').forEach(word=>{const tail=word.nextSibling;if(tail?.nodeType===3&&/^[.,:]/.test(tail.textContent)){word.append(document.createTextNode(tail.textContent[0]));tail.textContent=tail.textContent.slice(1)}});
 if(study==='constellation'){
  requestAnimationFrame(()=>{
   const map=el.querySelector('.orbit-map'),svg=el.querySelector('.orbit-lines');
   const draw=()=>{if(!map.isConnected)return;const bounds=map.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);const points=[...map.querySelectorAll('.orbit-number')].map(n=>{const r=n.getBoundingClientRect();return {x:r.left+r.width/2-bounds.left,y:r.top+r.height/2-bounds.top}});svg.innerHTML=[[0,3],[3,5],[5,6],[6,4],[4,1],[1,2],[2,0]].map(([a,b],i)=>{const p=points[a],q=points[b],lift=i%2?-80:60;return `<path d="M${p.x} ${p.y} C${p.x+(q.x-p.x)*.25} ${p.y+lift},${q.x-(q.x-p.x)*.25} ${q.y-lift},${q.x} ${q.y}"/>`}).join('')};
   draw();document.fonts.ready.then(draw);const observer=new ResizeObserver(()=>{if(!map.isConnected){observer.disconnect();return}draw()});observer.observe(map);
  });
 }
 if(study==='desktop'&&matchMedia('(max-width:760px)').matches)el.querySelectorAll('.window-handle').forEach(b=>{b.disabled=true;b.removeAttribute('aria-label')});
};
if(study!=='desktop')return;
let drag=null,z=5;
const narrow=()=>matchMedia('(max-width: 760px)').matches;
function move(win,x,y){const space=win.parentElement;const limitX=Math.max(0,space.clientWidth-win.offsetWidth);const limitY=Math.max(0,space.clientHeight-win.offsetHeight);x=Math.min(limitX,Math.max(0,x));y=Math.min(limitY,Math.max(0,y));win.style.left=x+'px';win.style.top=y+'px';win.style.right='auto';win.style.transform='none';win.style.zIndex=++z;}
document.addEventListener('pointerdown',e=>{const handle=e.target.closest('.window-handle');if(!handle||narrow())return;const win=handle.parentElement;const box=win.getBoundingClientRect(),parent=win.parentElement.getBoundingClientRect();drag={win,handle,startX:e.clientX,startY:e.clientY,x:box.left-parent.left,y:box.top-parent.top};handle.setPointerCapture(e.pointerId);win.style.zIndex=++z;});
document.addEventListener('pointermove',e=>{if(drag)move(drag.win,drag.x+e.clientX-drag.startX,drag.y+e.clientY-drag.startY)});
document.addEventListener('pointerup',()=>{drag=null});document.addEventListener('pointercancel',()=>{drag=null});
document.addEventListener('keydown',e=>{const handle=e.target.closest('.window-handle');if(!handle||narrow()||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();e.stopPropagation();const win=handle.parentElement;const r=win.getBoundingClientRect(),p=win.parentElement.getBoundingClientRect();move(win,r.left-p.left+(e.key==='ArrowLeft'?-12:e.key==='ArrowRight'?12:0),r.top-p.top+(e.key==='ArrowUp'?-12:e.key==='ArrowDown'?12:0));});
document.addEventListener('click',e=>{if(e.target.closest('.arrange'))document.querySelectorAll('.desktop-window').forEach(w=>w.removeAttribute('style'))});
window.addEventListener('resize',()=>document.querySelectorAll('.desktop-window').forEach(w=>w.removeAttribute('style')));
})();
