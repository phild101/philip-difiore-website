(() => {
// This chosen edition keeps its own wording/order; earlier About studies are preserved.
window.RABBIT_ENTRANCE=(el,{prose,bio})=>{
 const paragraphs=[
  bio[0],
  'is an [editor|editing] on his projects (and occasionally the projects of others).',
  'his film [Stranger|stranger]: Bernie Worrell on Earth was selected for inclusion in the permanent collection of the [Academy of Motion Picture Arts and Sciences|academy-collection].',
  '[produces albums and film scores|records] with unbelievable [musicians|musicians-index].',
  bio[4],
  bio[1],
  bio[5]
 ];
 el.classList.add('entrance');
 el.innerHTML='<div class="scene-content entry"><h1 class="sr-only" tabindex="-1">About Philip Di Fiore</h1><article class="bio" aria-label="Biography">'+paragraphs.map(p=>'<p class="bio-paragraph"><span class="bio-ellipsis">...</span><span class="bio-copy">'+prose(p)+'</span></p>').join('')+'</article></div>';
 const keys=['film-index','editing','academy-collection','records','rumpus-room','writing','tools'];
 el.querySelectorAll('.bio p').forEach((p,i)=>p.querySelector('[data-go="'+keys[i]+'"]')?.classList.add('lead-word'));
 el.querySelectorAll('.bio .word').forEach(word=>{const tail=word.nextSibling;if(tail?.nodeType===3&&/^[.,:]/.test(tail.textContent)){word.append(document.createTextNode(tail.textContent[0]));tail.textContent=tail.textContent.slice(1)}});
};
})();
