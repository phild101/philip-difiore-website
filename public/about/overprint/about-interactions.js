(() => {
  const {notes,topics}=window.ABOUT_GRAPH;
  const board=document.querySelector('.page');
  const pieces=new Set();
  const positions=new WeakMap();
  const released=new Map();
  const cloud=document.querySelector('#tag-cloud');
  const status=document.querySelector('#discovery-status');
  let topLayer=2,drag=null,activeTrigger=null,leaveTimer=null,noteNumber=0;
  const paint=(piece,x,y)=>{
    positions.set(piece,{x,y});
    piece.style.setProperty('--move-x',`${x}px`);
    piece.style.setProperty('--move-y',`${y}px`);
  };
  function move(piece,x,y){
    const current=positions.get(piece),bounds=board.getBoundingClientRect(),rect=piece.getBoundingClientRect();
    const baseX=rect.left-current.x-bounds.left,baseY=rect.top-current.y-bounds.top;
    const left=8-baseX,right=Math.max(left,bounds.width-rect.width-8-baseX);
    const top=8-baseY,bottom=Math.max(top,bounds.height-rect.height-8-baseY);
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
      move(piece,drag.origin.x+event.clientX-drag.startX,drag.origin.y+event.clientY-drag.startY);
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
      move(piece,pos.x+dx*step,pos.y+dy*step);
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
    const anchor=activeTrigger.getBoundingClientRect(),width=cloud.offsetWidth,height=cloud.offsetHeight;
    cloud.style.left=`${Math.max(12,Math.min(innerWidth-width-12,anchor.left+anchor.width/2-width/2))}px`;
    const above=anchor.top-height-8;
    cloud.style.top=`${above>=10?above:Math.max(10,Math.min(innerHeight-height-10,anchor.bottom+8))}px`;
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
    note.append(head,title,copy);
    if(data.tags?.length){const related=document.createElement('div');related.className='note-tags';data.tags.forEach(key=>related.append(tag(key)));note.append(related)}
    if(data.link){const link=document.createElement('a');link.className='note-link';link.href=data.link;link.target='_top';link.rel='noopener';link.textContent=data.linkLabel||'Open project ↗';note.append(link)}
    board.append(note);released.set(id,note);makeMovable(note);
    const bounds=board.getBoundingClientRect(),r=note.getBoundingClientRect();
    let x=bounds.width-r.width-22-(noteNumber%2)*16;
    let y=sourceBounds.top-bounds.top-28+(noteNumber%4)*30;
    const sourceNote=source.closest('.released-note');
    if(sourceNote&&bounds.width>=700){x=sourceNote.getBoundingClientRect().left-bounds.left-r.width-18}
    if(bounds.width<700){x=18+(noteNumber%2)*8;y=sourceBounds.bottom-bounds.top+16}
    note.style.left=`${Math.max(8,Math.min(bounds.width-r.width-8,x))}px`;
    note.style.top=`${Math.max(110,Math.min(bounds.height-r.height-16,y))}px`;
    noteNumber++;note.focus({preventScroll:true});status.textContent=`${data.title} released. You can drag this note anywhere.`;
  }
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){if(drag){event.preventDefault();finish(true)}hideCloud()}
  });
  window.addEventListener('blur',()=>finish(true));
  window.addEventListener('resize',()=>{finish(true);for(const piece of pieces){const pos=positions.get(piece);move(piece,pos.x,pos.y)}if(cloud.matches(':popover-open'))placeCloud()});
  window.addEventListener('scroll',()=>{if(cloud.matches(':popover-open'))placeCloud()},{passive:true});
})();
