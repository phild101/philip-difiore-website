(() => {
const {notes,topics}=window.ABOUT_GRAPH,custom=window.RABBIT_PASSAGES;
const stage=document.querySelector('#stage'),scenes=document.querySelector('#scenes'),page=document.querySelector('.page');
const back=document.querySelector('#back'),home=document.querySelector('#home'),trail=document.querySelector('#trail'),depth=document.querySelector('#depth'),hint=document.querySelector('#entrance-hint');
const dialog=document.querySelector('#trail-dialog');let path=[{id:'bio',via:'',scroll:0}],busy=false,activeScene=null,flightSerial=0,animations=[],finishFlight=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const word=(label,id)=>`<button class="word" data-label="${esc(label)}" data-go="${esc(id)}">${esc(label)}</button>`;
function prose(s){let out='',last=0;for(const m of s.matchAll(/\[([^\]|]+)\|([^\]]+)\]/g)){out+=esc(s.slice(last,m.index))+(notes[m[2]]?word(m[1],m[2]):esc(m[1]));last=m.index+m[0].length}return (out+esc(s.slice(last))).replace(/\n\n/g,'<br><br>')}
const bio=[
'is an [award winning|recognition] [filmmaker|film-index] known for his [cinematic storytelling|stories] style and [mind bending narratives|experiments].',
'writes [screenplays and fiction|writing].',
'[edits|editing] all of his own [videos|video-index].',
'produces [music|records] ([albums|records] and [film scores|score]) with unbelievable [musicians|musicians-index].',
'founded, owned and operated a film and music [recording studio|rumpus-room] in [Brooklyn|places] for [ten years|ten-years].',
'builds [creative tools|tools] for writing, filmmaker and the creative process.',
'is a partner of creative studio, [Rumpus Productions|rumpus], with his wife [Lara|lara].'];
const entranceWords=['film-index','writing','editing','musicians-index','rumpus-room','tools','rumpus'];
const labelOf=source=>source?.dataset.label||source?.textContent||'';
const incoming={};for(const [id,n] of Object.entries(notes))for(const target of n.tags)(incoming[target]??=[]).push(id);
function node(id){const n=notes[id],c=custom[id]||{};return {...n,...c,heading:c.heading||n.title,body:c.body||n.body,related:c.related||[]}}
function scene(id){
const el=document.createElement('section');el.className='scene';el.dataset.id=id;
if(id==='bio'){el.innerHTML=`<div class="scene-content entry"><h1 class="signature" tabindex="-1"><span class="given">PHILIP</span><span class="family">DI FIORE</span><span class="dots">…</span></h1><article class="bio" aria-label="Biography">${bio.map(p=>'<p>'+prose(p)+'</p>').join('')}</article></div>`;el.classList.add('entrance');el.querySelectorAll('.bio .word').forEach(word=>{const tail=word.nextSibling;if(tail?.nodeType===3&&/^[.,]/.test(tail.textContent)){word.append(document.createTextNode(tail.textContent[0]));tail.textContent=tail.textContent.slice(1)}});el.querySelectorAll('.bio p').forEach((p,i)=>{const word=p.querySelector('[data-go="'+entranceWords[i]+'"]');if(word){word.classList.add('lead-word');const arrow=document.createElement('span');arrow.className='enter-mark';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';word.append(arrow)}});return el}
const n=node(id);el.dataset.layout=n.layout||'quiet';
const inline=[...n.body.matchAll(/\|([^\]]+)\]/g)].map(m=>m[1]);
const links=[...new Set([...n.related,...n.tags,...(incoming[id]||[])])].filter(k=>k!==id&&!inline.includes(k)).sort((a,b)=>Number(path.some(p=>p.id===a))-Number(path.some(p=>p.id===b)));
if(!links.length&&inline.length<2)links.push('stories','places');
if(!inline.length&&!links.length)links.push('musicians-index','stories');
const max=inline.length>=3?1:Math.max(2,4-inline.length);
el.innerHTML=`<div class="scene-content destination"><div class="anchor"><p class="kind">${esc(n.kind)}</p><h1 tabindex="-1">${n.layout==='numeral'&&n.heading.includes('\n')?n.heading.split('\n').map((line,i)=>i?'<span class="number-caption">'+esc(line)+'</span>':esc(line)).join(''):esc(n.heading)}</h1></div><div class="fact"><p class="passage">${prose(n.body)}</p><div class="side-paths" aria-label="Related paths">${links.slice(0,max).map(k=>word(notes[k].label||notes[k].title,k)).join('')}</div>${n.link?`<a class="work-link" href="${esc(n.link)}">Open in Featured ↗</a>`:''}</div></div>`;
return el;
}
function controls(){const current=path.at(-1);back.hidden=trail.hidden=path.length===1;home.hidden=path.length<=2;hint.hidden=path.length!==1;depth.textContent=String(path.length-1).padStart(2,'0');back.textContent=path.length>1?'← Back to '+(path.at(-2).id==='bio'?'bio':notes[path.at(-2).id].title):'← Back';page.classList.toggle('dark',Boolean(custom[current.id]?.dark));document.title=(current.id==='bio'?'About':notes[current.id].title)+' — Philip Di Fiore / Fast';}
function fitScene(){stage.style.setProperty('--stage-h',stage.clientHeight+'px');const entry=activeScene?.querySelector('.entry');if(entry){entry.style.transform='none';const scale=Math.min(1,(stage.clientHeight-8)/entry.offsetHeight);entry.style.transform=`scale(${Math.max(.2,scale)})`}}
new ResizeObserver(fitScene).observe(stage);document.fonts.ready.then(fitScene);
function remember(){if(activeScene){path.at(-1).scroll=activeScene.querySelector('.scene-content').scrollTop;history.replaceState({rabbit:true,path},'')}}
function travelFor(source){const room=stage.getBoundingClientRect(),r=source?.getBoundingClientRect();const step=path.length;const fontScale=source?parseFloat(getComputedStyle(source).fontSize)/38*(r.height/Math.max(source.offsetHeight,1)):1;
return {x:r?(r.left+r.width/2-room.left)/room.width:.5,y:r?(r.top+r.height/2-room.top)/room.height:.5,dx:[.88,.52,-.76,.64][step%4],dy:[-.2,.7,.34,-.52][step%4],turn:step%2?1.2:-1.2,portal:step%3===1,fontScale,label:labelOf(source)}}
function show(direction=0,travel=null){
 const serial=++flightSerial;animations.forEach(a=>a.cancel());animations=[];
 const old=activeScene,next=scene(path.at(-1).id);scenes.replaceChildren(...(old?[old]:[]),next);activeScene=next;controls();fitScene();
 const dark=Boolean(custom[path.at(-1).id]?.dark);next.style.setProperty('--ink',dark?'#f5f5f2':'#30302f');next.style.setProperty('--paper',dark?'#30302f':'#f5f5f2');next.style.setProperty('--muted',dark?'#c2c2bd':'#727270');next.style.color=dark?'#f5f5f2':'#30302f';
 next.querySelector('.scene-content').scrollTop=path.at(-1).scroll||0;
 const portal=document.querySelector('#flight-word');portal.style.opacity='0';
 const finish=()=>{if(serial!==flightSerial)return;old?.remove();next.inert=false;next.removeAttribute('aria-hidden');page.classList.remove('flying');stage.removeAttribute('aria-busy');busy=false;if(!dialog.open)next.querySelector('h1')?.focus({preventScroll:true});document.querySelector('#status').textContent=path.at(-1).id==='bio'?'Philip Di Fiore. Biography.':notes[path.at(-1).id].title};
 finishFlight=()=>{animations.forEach(a=>a.cancel());portal.style.opacity='0';finish()};
 if(!old||!direction||reduced.matches){finish();return}
 busy=true;page.classList.add('flying');stage.setAttribute('aria-busy','true');old.inert=true;old.setAttribute('aria-hidden','true');next.inert=true;
 const t=travel||{x:.5,y:.5,dx:.75,dy:.25,turn:1.2,portal:false},w=stage.clientWidth,h=stage.clientHeight;
 const duration=t.portal?900:765,ease='cubic-bezier(.55,0,.2,1)';const turn=innerWidth<=600?0:t.turn;
 const far=`translate(${-t.dx*w*.42}px,${-t.dy*h*.42}px) scale(${t.portal?2.5:1.4}) rotate(${-turn}deg)`;
 const near=`translate(${t.dx*w*.40}px,${t.dy*h*.40}px) scale(${t.portal?.64:.78}) rotate(${turn}deg)`;
 const settled='translate(0px,0px) scale(1) rotate(0deg)';
 const out=direction>0?far:near,enter=direction>0?near:far;
 old.style.transformOrigin=`${t.x*100}% ${t.y*100}%`;
 animations.push(old.animate([{transform:settled,opacity:1},{transform:out,opacity:0}],{duration,easing:ease,fill:'both'}));
 animations.push(next.animate([{transform:enter,opacity:0},{transform:enter,opacity:0,offset:.12},{transform:'translate(0px,0px) scale(1.018) rotate(0deg)',opacity:1,offset:.86},{transform:settled,opacity:1}],{duration,easing:ease,fill:'both'}));
 if(t.portal&&t.label){
  portal.textContent=t.label;portal.style.fontSize='38px';portal.style.color=getComputedStyle(next).color;portal.style.left='0px';portal.style.top='0px';portal.style.transformOrigin='center';
  const pw=portal.offsetWidth,ph=portal.offsetHeight,peak=Math.min(18,Math.max(w/Math.max(pw,1)*1.3,h/Math.max(ph,1)*.95));
  const start=`translate(${t.x*w-pw/2}px,${t.y*h-ph/2}px) scale(${Math.min(1.8,Math.max(.3,t.fontScale||.42))})`;
  const mid=`translate(${w/2-pw/2}px,${h/2-ph/2}px) scale(${peak}) rotate(${-turn}deg)`;
  const end=`translate(${w/2-pw/2-t.dx*w*.16}px,${h/2-ph/2-t.dy*h*.16}px) scale(${peak*1.4}) rotate(${-turn*1.5}deg)`;
  let frames=[{transform:start,opacity:0},{transform:start,opacity:1,offset:.12},{transform:mid,opacity:.96,offset:.58},{transform:end,opacity:0}];
  if(direction<0)frames=frames.slice().reverse().map(({offset,...f},i)=>({...f,offset:[0,.42,.88,1][i]}));
  animations.push(portal.animate(frames,{duration,easing:ease,fill:'both'}));
 }
 Promise.all(animations.map(a=>a.finished.catch(()=>{}))).then(finish);
}
function go(id,source){if(!notes[id])return;if(busy)finishFlight?.();remember();const travel=travelFor(source);path=[...path,{id,via:labelOf(source)||notes[id].title,travel,scroll:0}];history.pushState({rabbit:true,path},'', '#'+id);show(1,travel)}
scenes.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)go(b.dataset.go,b)});
function jump(index){if(index>=0&&index<path.length-1)history.go(index-(path.length-1));}
back.addEventListener('click',()=>jump(path.length-2));home.addEventListener('click',()=>jump(0));document.querySelector('#header-about').addEventListener('click',e=>{e.preventDefault();jump(0)});
window.addEventListener('popstate',()=>{if(history.state?.rabbit){const previous=path,nextPath=history.state.path;const direction=nextPath.length<previous.length?-1:1;const travel=Math.abs(nextPath.length-previous.length)>1?{x:.5,y:.5,dx:.2,dy:.15,turn:0,portal:false}:(direction<0?previous.at(-1).travel:nextPath.at(-1).travel);path=nextPath;show(direction,travel)}else{location.reload()}});
reduced.addEventListener('change',e=>{if(e.matches&&busy)finishFlight?.()});
scenes.addEventListener('scroll',()=>{if(!busy&&activeScene)remember()},true);
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&!dialog.open&&!e.target.closest('input,textarea')){e.preventDefault();jump(path.length-2)}});
trail.addEventListener('click',()=>{document.querySelector('#trail-list').innerHTML=path.map((p,i)=>`<li><button data-index="${i}" ${i===path.length-1?'aria-current="step"':''}>${esc(p.id==='bio'?'Philip Di Fiore…':notes[p.id].title)}${p.via?`<span class="trail-via">via ${esc(p.via)}</span>`:''}</button></li>`).join('');dialog.showModal()});
document.querySelector('#trail-list').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b){dialog.close();jump(Number(b.dataset.index))}});document.querySelector('#close-trail').addEventListener('click',()=>dialog.close());
let start='';try{start=decodeURIComponent(location.hash.slice(1))}catch{};if(history.state?.rabbit)path=history.state.path;else{history.replaceState({rabbit:true,path},'','#bio');if(notes[start]){path=[...path,{id:start,via:notes[start].title}];history.pushState({rabbit:true,path},'','#'+start)}}show();
})();
