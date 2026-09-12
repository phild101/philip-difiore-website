(() => {
  const {notes,topics}=window.ABOUT_GRAPH;
  const board=document.querySelector('.page');
  const stage=document.querySelector('.workspace');
  const composition=document.querySelector('.composition');
  const pieces=new Set();
  const positions=new WeakMap();
  const released=new Map();
  const cloud=document.querySelector('#tag-cloud');
  const status=document.querySelector('#discovery-status');
  let topLayer=2,drag=null,activeTrigger=null,leaveTimer=null,noteNumber=0,compositionScale=1;
  const pieceScale=piece=>composition.contains(piece)?compositionScale:1;
  const paint=(piece,x,y)=>{
    positions.set(piece,{x,y});
    piece.style.setProperty('--move-x',`${x}px`);
    piece.style.setProperty('--move-y',`${y}px`);
  };
  function move(piece,x,y){
    const current=positions.get(piece),scale=pieceScale(piece),rect=piece.getBoundingClientRect();
    const bounds=(composition.contains(piece)||piece.classList.contains('released-note')?stage:board).getBoundingClientRect();
    const baseX=rect.left-current.x*scale-bounds.left,baseY=rect.top-current.y*scale-bounds.top;
    const left=(8-baseX)/scale,right=Math.max(left,(bounds.width-rect.width-8-baseX)/scale);
    const top=(8-baseY)/scale,bottom=Math.max(top,(bounds.height-rect.height-8-baseY)/scale);
    paint(piece,Math.max(left,Math.min(right,x)),Math.max(top,Math.min(bottom,y)));
  }
  function finish(cancel=false){
    if(!drag)return;
    const {piece,pointerId,origin,moved}=drag;
    if(cancel)paint(piece,origin.x,origin.y);
    if(moved)piece.dataset.draggedUntil=String(performance.now()+300);
    piece.classList.remove('dragging');drag=null;
    if(piece.hasPointerCapture(pointerId))piece.releasePointerCapture(pointerId);
  }
  function makeMovable(piece){
    pieces.add(piece);positions.set(piece,{x:0,y:0});
    piece.title='Drag to move. Arrow keys also move this piece.';
    piece.addEventListener('pointerdown',event=>{
      if(!event.isPrimary||event.button!==0||drag)return;
      if(event.pointerType==='touch'&&event.target.closest('.note-body'))return;
      const control=event.target.closest('a,button');
      if(control&&control!==piece)return;
      event.preventDefault();piece.focus({preventScroll:true});
      piece.style.zIndex=String(++topLayer);
      drag={piece,pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,origin:{...positions.get(piece)},moved:false};
      piece.setPointerCapture(event.pointerId);
    });
    piece.addEventListener('pointermove',event=>{
      if(drag?.piece!==piece||drag.pointerId!==event.pointerId)return;
      if(!drag.moved&&Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<4)return;
      drag.moved=true;piece.classList.add('dragging');hideCloud();
      const scale=pieceScale(piece);
      move(piece,drag.origin.x+(event.clientX-drag.startX)/scale,drag.origin.y+(event.clientY-drag.startY)/scale);
    });
    piece.addEventListener('pointerup',event=>{if(drag?.piece===piece&&drag.pointerId===event.pointerId)finish()});
    piece.addEventListener('pointercancel',()=>{if(drag?.piece===piece)finish(true)});
    piece.addEventListener('lostpointercapture',()=>{if(drag?.piece===piece)finish(true)});
    piece.addEventListener('click',event=>{if(performance.now()<Number(piece.dataset.draggedUntil||0)){event.preventDefault();event.stopImmediatePropagation()}},true);
    piece.addEventListener('keydown',event=>{
      const offsets={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(!offsets[event.key]||drag||event.target!==piece)return;
      event.preventDefault();hideCloud();piece.style.zIndex=String(++topLayer);
      const pos=positions.get(piece),[dx,dy]=offsets[event.key],step=event.shiftKey?10:1;
      const scale=pieceScale(piece);move(piece,pos.x+dx*step/scale,pos.y+dy*step/scale);
    });
  }
  document.querySelectorAll('[data-movable]').forEach(makeMovable);
  function hideCloud(){
    clearTimeout(leaveTimer);
    if(activeTrigger)activeTrigger.setAttribute('aria-expanded','false');
    if(cloud.matches(':popover-open'))cloud.hidePopover();
    activeTrigger=null;
  }
  function placeCloud(){
    if(!activeTrigger)return;
    const anchor=activeTrigger.getBoundingClientRect();
    cloud.style.maxHeight=`${innerHeight-24}px`;
    const aboveRoom=Math.max(0,anchor.top-20),belowRoom=Math.max(0,innerHeight-anchor.bottom-20);
    const placeAbove=cloud.offsetHeight<=aboveRoom||aboveRoom>=belowRoom;
    cloud.style.maxHeight=`${Math.max(32,placeAbove?aboveRoom:belowRoom)}px`;
    const width=cloud.offsetWidth,height=cloud.offsetHeight;
    cloud.style.left=`${Math.max(12,Math.min(innerWidth-width-12,anchor.left+anchor.width/2-width/2))}px`;
    cloud.style.top=`${placeAbove?Math.max(12,anchor.top-height-8):Math.min(innerHeight-height-12,anchor.bottom+8)}px`;
  }
  function tag(id){
    const button=document.createElement('button');button.type='button';button.className='fact-tag';
    button.textContent=notes[id].label||notes[id].title;
    button.dataset.note=id;button.title=notes[id].kind;
    button.addEventListener('click',()=>releaseNote(id,activeTrigger||button));
    return button;
  }
  function showCloud(trigger){
    clearTimeout(leaveTimer);if(drag)return;
    if(activeTrigger!==trigger){
      hideCloud();activeTrigger=trigger;
      cloud.replaceChildren(...topics[trigger.dataset.topic].tags.map(tag));
      cloud.setAttribute('aria-label',`Explore ${trigger.textContent}`);
    }
    if(!cloud.matches(':popover-open'))cloud.showPopover();
    trigger.setAttribute('aria-expanded','true');placeCloud();
  }
  function queueHide(){
    clearTimeout(leaveTimer);
    leaveTimer=setTimeout(()=>{if(!cloud.contains(document.activeElement))hideCloud()},240);
  }
  for(const trigger of document.querySelectorAll('[data-topic]')){
    trigger.setAttribute('aria-controls','tag-cloud');trigger.setAttribute('aria-expanded','false');
    trigger.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')showCloud(trigger)});
    trigger.addEventListener('pointerleave',queueHide);
    trigger.addEventListener('focus',()=>{if(trigger.matches(':focus-visible'))showCloud(trigger)});
    trigger.addEventListener('blur',queueHide);
    trigger.addEventListener('click',()=>releaseNote(topics[trigger.dataset.topic].note,trigger));
    trigger.addEventListener('keydown',event=>{
      if(event.key==='ArrowDown'){event.preventDefault();showCloud(trigger);cloud.querySelector('button')?.focus()}
    });
  }
  cloud.addEventListener('pointerenter',()=>clearTimeout(leaveTimer));
  cloud.addEventListener('pointerleave',queueHide);
  cloud.addEventListener('focusin',()=>clearTimeout(leaveTimer));
  cloud.addEventListener('focusout',queueHide);
  cloud.addEventListener('toggle',event=>{if(event.newState==='closed'&&activeTrigger){activeTrigger.setAttribute('aria-expanded','false');activeTrigger=null}});
  cloud.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();const list=[...cloud.querySelectorAll('button')],index=list.indexOf(document.activeElement);
    const step=['ArrowLeft','ArrowUp'].includes(event.key)?-1:1;list[(index+step+list.length)%list.length]?.focus();
  });
  function releaseNote(id,source){
    const sourceBounds=source.getBoundingClientRect();hideCloud();
    if(released.has(id)){
      const existing=released.get(id);existing.style.zIndex=String(++topLayer);
      existing.focus({preventScroll:true});status.textContent=`${notes[id].title} is already on the page.`;return;
    }
    const data=notes[id],note=document.createElement('aside');
    note.className='released-note small-type';note.dataset.movable=`note-${id}`;note.dataset.noteId=id;note.tabIndex=0;
    note.setAttribute('aria-label',`${data.title}. Draggable note.`);note.style.zIndex=String(++topLayer);
    const head=document.createElement('div');head.className='note-head';
    const kind=document.createElement('span');kind.textContent=data.kind;
    const close=document.createElement('button');close.type='button';close.className='note-close';close.textContent='×';close.setAttribute('aria-label',`Remove ${data.title} note`);
    close.addEventListener('click',event=>{pieces.delete(note);released.delete(id);note.remove();if(event.detail===0&&source.isConnected)source.focus?.({preventScroll:true})});head.append(kind,close);
    const title=document.createElement('h2');title.textContent=data.title;
    const copy=document.createElement('p');copy.textContent=data.body;
    const body=document.createElement('div');body.className='note-body';body.append(title,copy);note.append(head,body);
    if(data.tags?.length){const related=document.createElement('div');related.className='note-tags';data.tags.forEach(key=>related.append(tag(key)));body.append(related)}
    if(data.link){const link=document.createElement('a');link.className='note-link';link.href=data.link;link.target='_top';link.rel='noopener';link.textContent=data.linkLabel||'Open project ↗';body.append(link)}
    board.append(note);released.set(id,note);makeMovable(note);
    const bounds=board.getBoundingClientRect(),room=stage.getBoundingClientRect(),r=note.getBoundingClientRect();
    let x=bounds.width-r.width-22-(noteNumber%2)*16;
    let y=sourceBounds.top-bounds.top-28+(noteNumber%4)*30;
    const sourceNote=source.closest('.released-note');
    if(sourceNote&&bounds.width>=700){x=sourceNote.getBoundingClientRect().left-bounds.left-r.width-18}
    if(bounds.width<700){x=18+(noteNumber%2)*8;y=sourceBounds.bottom-bounds.top+16}
    note.style.left=`${Math.max(8,Math.min(bounds.width-r.width-8,x))}px`;
    note.style.top=`${Math.max(room.top-bounds.top+8,Math.min(room.bottom-bounds.top-r.height-8,y))}px`;
    noteNumber++;note.focus({preventScroll:true});status.textContent=`${data.title} released. You can drag this note anywhere.`;
  }
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){if(drag){event.preventDefault();finish(true)}hideCloud()}
  });
  window.addEventListener('blur',()=>finish(true));
  let fitFrame=0;
  function fitComposition(){
    finish(true);
    board.style.setProperty('--stage-height',`${stage.clientHeight}px`);
    compositionScale=Math.min(1,(stage.clientHeight-16)/composition.offsetHeight,stage.clientWidth/composition.offsetWidth);
    compositionScale=Math.max(.1,compositionScale);
    composition.style.transform=`scale(${compositionScale})`;
    composition.style.left=`${(stage.clientWidth-composition.offsetWidth*compositionScale)/2}px`;
    composition.style.top=`${(stage.clientHeight-composition.offsetHeight*compositionScale)/2}px`;
    for(const piece of pieces){const pos=positions.get(piece);move(piece,pos.x,pos.y)}
    if(cloud.matches(':popover-open'))placeCloud();
  }
  function scheduleFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitComposition)}
  new ResizeObserver(scheduleFit).observe(stage);
  window.addEventListener('resize',scheduleFit);
  document.fonts.ready.then(scheduleFit);
  fitComposition();
  window.addEventListener('scroll',()=>{if(cloud.matches(':popover-open'))placeCloud()},{passive:true});
})();
