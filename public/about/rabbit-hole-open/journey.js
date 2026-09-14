(() => {
const {notes,topics}=window.ABOUT_GRAPH,custom=window.RABBIT_PASSAGES;
const balance=window.RABBIT_BALANCE;
const resolve=id=>balance.aliases[id]||id;
const stage=document.querySelector('#stage'),scenes=document.querySelector('#scenes'),page=document.querySelector('.page');
const home=document.querySelector('#home'),hint=document.querySelector('#entrance-hint'),sourceNote=document.querySelector('#source-note');
const journeyControls=home.parentElement,controlsFooter=journeyControls.parentElement;
let path=[{id:'bio',via:'',scroll:0}],busy=false,activeScene=null,flightSerial=0,animations=[],finishFlight=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const featuredSlug=new URLSearchParams(location.search).get('featured');
const featuredBase=window.ABOUT_GRAPH.featuredBase;
document.querySelector('header>a').href=featuredBase+'if-you-call';
document.querySelector('#header-featured').href=featuredBase+(featuredSlug&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(featuredSlug)?featuredSlug:'if-you-call');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Inline connections stay available even when the reader has visited them before.
const available=id=>Boolean(notes[id])&&id!==path.at(-1).id;
const word=(label,id)=>available(id)?`<button class="word" data-label="${esc(label)}" data-go="${esc(id)}">${esc(label)}</button>`:esc(label);
function prose(s){let out='',last=0;for(const m of s.matchAll(/\[([^\]|]+)\|([^\]]+)\]/g)){out+=esc(s.slice(last,m.index))+(notes[m[2]]?word(m[1],m[2]):esc(m[1]));last=m.index+m[0].length}return (out+esc(s.slice(last))).replace(/\n\n/g,'<br><br>')}
const bio=[
'is an award winning [filmmaker|film-index] known for his [cinematic storytelling style|stories] and [mind bending narratives|experiments].',
'writes [screenplays and fiction|writing].',
'[edits|editing] all of his own [videos|video-index].',
'produces [music|records] (albums and [film scores|score]) with unbelievable [musicians|musicians-index].',
'founded, owned and operated a film and music [recording studio|rumpus-room] in [Brooklyn|places] for [ten years|ten-years].',
'builds [creative tools|tools] for writing, filmmaking and the creative process.',
'his film [Stranger|stranger]: Bernie Worrell on Earth was selected for inclusion in the [permanent collection of the Academy of Motion Picture Arts and Sciences|academy-collection].'];
const labelOf=source=>source?.dataset.label||source?.textContent||'';
function node(id){const n=notes[id],c=custom[id]||{};return {...n,...c,heading:c.heading||n.title,body:c.body||n.body,related:c.related||[]}}
function scene(id){
const el=document.createElement('section');el.className='scene';el.dataset.id=id;
if(id==='bio'&&window.RABBIT_ENTRANCE){window.RABBIT_ENTRANCE(el,{prose,bio});return el;}
if(id==='bio'){el.innerHTML=`<div class="scene-content entry"><h1 class="sr-only" tabindex="-1">About Philip Di Fiore</h1><blockquote class="entrance-quote"><p>“The rabbit hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.” <cite>— Lewis Carroll</cite></p></blockquote><article class="bio" aria-label="Biography">${bio.map(p=>'<p>'+prose(p)+'</p>').join('')}</article></div>`;el.classList.add('entrance');el.querySelectorAll('.bio .word').forEach(word=>{const tail=word.nextSibling;if(tail?.nodeType===3&&/^[.,:]/.test(tail.textContent)){word.append(document.createTextNode(tail.textContent[0]));tail.textContent=tail.textContent.slice(1)}});const keys=['film-index','writing','editing','records','rumpus-room','tools','stranger'];el.querySelectorAll('.bio p').forEach((p,i)=>p.querySelector('[data-go="'+keys[i]+'"]')?.classList.add('lead-word'));return el}
const n=node(id);el.dataset.layout=n.layout||'quiet';

el.innerHTML=`<div class="scene-content destination"><div class="anchor"><p class="kind">${esc(n.kind)}</p><h1 tabindex="-1">${n.layout==='numeral'&&n.heading.includes('\n')?n.heading.split('\n').map((line,i)=>i?'<span class="number-caption">'+esc(line)+'</span>':esc(line)).join(''):esc(n.heading)}</h1></div><div class="fact"><p class="passage">${prose(n.body)}</p>${n.link?`<a class="work-link" target="_top" href="${esc(n.link)}">${esc(n.linkLabel||'Open in Featured ↗')}</a>`:''}</div></div>`;
return el;
}
function controls(){const current=path.at(-1);page.classList.toggle('at-entrance',current.id==='bio');const sources=current.id==='bio'?[]:(node(current.id).sources||[]);sourceNote.open=false;sourceNote.hidden=!sources.length;document.querySelector('#source-content').innerHTML=sources.map(s=>s.url&&/^https?:\/\//.test(s.url)?`<p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a></p>`:`<p>${esc(s.title)}</p>`).join('');home.hidden=current.id==='bio';if(hint)hint.hidden=current.id!=='bio';
if(page.hasAttribute('data-paired-actions')){
 journeyControls.querySelector('.work-link')?.remove();
 const fact=activeScene?.querySelector('.fact');
 const kind=activeScene?.querySelector('.anchor .kind');
 if(kind&&fact)fact.prepend(kind);
 const work=fact?.querySelector('.work-link');
 if(work){work.textContent=work.textContent.replace(/(open in featured)\s*↗/i,'$1');journeyControls.insertBefore(work,home);}
 (fact||controlsFooter).append(journeyControls);
}
page.classList.toggle('dark',Boolean(custom[current.id]?.dark));document.title=(current.id==='bio'?'About':notes[current.id].title)+' — Philip Di Fiore';}
// Size complete words to their column; never chop surnames into fragments.
const measureHeading=document.createElement('canvas').getContext('2d');
function fitHeading(){
 const heading=activeScene?.querySelector('.destination h1');if(!heading||!measureHeading)return;
 heading.style.fontSize='';heading.style.overflowWrap='normal';heading.style.wordBreak='normal';heading.style.hyphens='none';
 const style=getComputedStyle(heading),size=parseFloat(style.fontSize),spacing=parseFloat(style.letterSpacing)||0;
 measureHeading.font=style.fontWeight+' '+size+'px '+style.fontFamily;
 const words=heading.textContent.trim().split(/\s+/).map(w=>style.textTransform==='uppercase'?w.toUpperCase():w);
 const widest=Math.max(...words.map(w=>measureHeading.measureText(w).width+Math.max(0,w.length-1)*spacing));
 const available=heading.clientWidth-3;
 if(widest>available&&available>0)heading.style.fontSize=(size*available/widest)+'px';
}
function fitScene(){stage.style.setProperty('--stage-h',stage.clientHeight+'px');fitHeading();}
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
 const finish=()=>{if(serial!==flightSerial)return;old?.remove();next.inert=false;next.removeAttribute('aria-hidden');page.classList.remove('flying');stage.removeAttribute('aria-busy');busy=false;next.querySelector('h1')?.focus({preventScroll:true});document.querySelector('#status').textContent=path.at(-1).id==='bio'?'Philip Di Fiore. Biography.':notes[path.at(-1).id].title};
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
function go(id,source){if(!available(id))return;if(busy)finishFlight?.();remember();const travel=travelFor(source);path=[...path,{id,via:labelOf(source)||notes[id].title,travel,scroll:0}];history.pushState({rabbit:true,path},'', '#'+id);show(1,travel)}
document.addEventListener('keydown',e=>{if(e.key==='Escape')sourceNote.open=false});
document.addEventListener('pointerdown',e=>{if(!sourceNote.contains(e.target))sourceNote.open=false});
scenes.addEventListener('click',e=>{const b=e.target.closest('[data-go],[data-revisit]');if(!b)return;if(b.dataset.revisit){jump(path.map(p=>p.id).lastIndexOf(b.dataset.revisit));return}go(b.dataset.go,b)});
function jump(index){if(index>=0&&index<path.length-1)history.go(index-(path.length-1));}
home.addEventListener('click',()=>jump(0));document.querySelector('#header-about').addEventListener('click',e=>{e.preventDefault();jump(0)});
window.addEventListener('popstate',()=>{if(history.state?.rabbit){const previous=path,nextPath=history.state.path;const direction=nextPath.length<previous.length?-1:1;const travel=Math.abs(nextPath.length-previous.length)>1?{x:.5,y:.5,dx:.2,dy:.15,turn:0,portal:false}:(direction<0?previous.at(-1).travel:nextPath.at(-1).travel);path=nextPath;show(direction,travel)}else{location.reload()}});
reduced.addEventListener('change',e=>{if(e.matches&&busy)finishFlight?.()});
scenes.addEventListener('scroll',()=>{if(!busy&&activeScene)remember()},true);
window.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&!e.target.closest('input,textarea')){e.preventDefault();jump(path.length-2)}});
let start='';try{start=resolve(decodeURIComponent(location.hash.slice(1)))}catch{};if(history.state?.rabbit){path=history.state.path.map(p=>({...p,id:resolve(p.id)})).filter(p=>p.id==='bio'||notes[p.id]);history.replaceState({rabbit:true,path},'','#'+path.at(-1).id)}else{history.replaceState({rabbit:true,path},'','#bio');if(notes[start]){path=[...path,{id:start,via:notes[start].title}];history.pushState({rabbit:true,path},'','#'+start)}}show();
})();
