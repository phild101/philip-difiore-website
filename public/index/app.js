'use strict';

const $ = id => document.getElementById(id);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projectCategories = ['Film','Music','Live'];
const tagCategories = ['People/Artists','Places','Equipment','Techniques','Formats','Genres','Organizations','Press','Awards'];
const categories = [tagCategories[0],...projectCategories,...tagCategories.slice(1),'All'];
const categorySlug = category => category.toLowerCase().replace(/[\s/]+/g,'-');
const categoryLink = category => '#'+categorySlug(category);
const legacyCategories = {'people':'People/Artists','artists':'People/Artists','artists-and-individuals':'People/Artists','music-video':'Film','music-videos':'Film','all-tags':'All','projects':'All'};
let data, entities, projects, currentCategory='People/Artists';
const content = $('content');
const link = (type,id) => '#'+type+'/'+encodeURIComponent(id);
const projectIds = entity => [...new Set(entity.associations.map(a=>a.projectId))];
const projectCount = entity => projectIds(entity).length;
const tagCount = project => data.entities.filter(e=>e.associations.some(a=>a.projectId===project.id)).length;
const inCategory = (entity,category) => entity.category===category||(entity.secondaryCategories||[]).includes(category);
const entriesFor = category => category==='All'?[...data.entities,...data.projects.filter(p=>!p.indexHidden)]:projectCategories.includes(category)?data.projects.filter(p=>p.indexCategory===category):data.entities.filter(e=>inCategory(e,category));
const categoryCount = category => entriesFor(category).length;
const isProject = item => Boolean(item.title);
const countFor = item => isProject(item)?tagCount(item):projectCount(item);
const sortMode = () => new URLSearchParams(location.search).get('sort')==='tags'?'tags':'alpha';
const alphabeticKey = item => isProject(item)?item.title:item.originalCategory==='person'&&item.lastName?item.lastName+', '+item.label:item.label;
const alphabeticCompare = (a,b) => alphabeticKey(a).localeCompare(alphabeticKey(b),'en',{sensitivity:'base',numeric:true});
function sorted(items){return [...items].sort((a,b)=>sortMode()==='tags'?(countFor(b)-countFor(a)||alphabeticCompare(a,b)):alphabeticCompare(a,b))}
function indexControls(){return `<div class="sort-controls" role="group" aria-label="Sort entries"><span>Sort:</span><button type="button" data-sort="alpha" aria-pressed="${sortMode()==='alpha'}">Alphabetical</button><button type="button" data-sort="tags" aria-pressed="${sortMode()==='tags'}">Tag count</button></div>`}
const entityLink = e => `<a class="term-link${e.category==='Awards'?' award-term':''}" href="${link('entity',e.id)}"><span class="term-label">${e.festival?`<span class="award-festival">${esc(e.festival)}</span><span class="award-distinction">${esc(e.distinction)}</span>`:esc(e.label)}</span></a>`;
function projectLink(p){return `<a class="term-link project-term" href="${link('project',p.id)}"><span class="term-label">${esc(p.title)}${p.artist&&p.artist!=='Philip Di Fiore'?`<span class="project-artist">${esc(p.artist)}</span>`:''}</span></a>`}
history.scrollRestoration='manual';
function rememberScroll(){history.replaceState({...history.state,index:true,scrollY:window.scrollY},'',location.href)}
function goto(hash){rememberScroll();history.pushState({index:true,scrollY:0},'',location.pathname+(sortMode()==='tags'?'?sort=tags':'')+hash);render(true)}
let historyFrame;
function restoreHistory(){cancelAnimationFrame(historyFrame);historyFrame=requestAnimationFrame(()=>{render();window.scrollTo({top:history.state?.scrollY||0,behavior:'instant'})})}
const directAssociation = a => ['documented','philip-provided'].includes(a.status)&&!(/affiliat|prior artist|reference|influence|comparison/i.test(a.role));
function relatedToProjects(ids,excludedId){
  // Lead with the featured cast when In the City is a shared connection.
  const featured=ids.includes('in-the-city')?['julia-stiles','fran-kranz']:[];
  const priority=e=>{const index=featured.indexOf(e.id);return index<0?featured.length:index};
  return data.entities.filter(e=>e.id!==excludedId&&e.category==='People/Artists')
    .map(e=>({entity:e,score:new Set(e.associations.filter(a=>directAssociation(a)&&ids.includes(a.projectId)).map(a=>a.projectId)).size}))
    .filter(e=>e.score>0).sort((a,b)=>priority(a.entity)-priority(b.entity)||b.score-a.score||alphabeticCompare(a.entity,b.entity)).slice(0,5);
}
function relatedTo(entity){return relatedToProjects(entity.associations.filter(directAssociation).map(a=>a.projectId),entity.id)}
function relatedSection(relatives){
  return relatives.length?`<section class="related"><h3 class="section-caption">Also Connected</h3><div class="related-list">${relatives.map(({entity:r})=>`<a href="${link('entity',r.id)}">${esc(r.label)}</a>`).join('')}</div></section>`:'';
}
function conciseCredit(associations){
  return [...new Set(associations.map(a=>(a.displayRole||a.role)+(a.status==='unresolved'?' (unconfirmed)':a.status==='suggested'?' (suggested)':'')))].join(' · ');
}
function projectCard(p,credit,showProjectTitle=true){
  const href=p.href||'';
  const internal=href&&new URL(href,location.href).origin===location.origin;
  return `<figure class="project-card">${p.image?`<img class="project-image" src="${esc(p.image)}" alt="${esc(p.imageAlt||p.title)}" loading="lazy" decoding="async">`:''}<figcaption><p class="project-credit">${showProjectTitle?`<span class="credit-project">${esc(p.title)}</span>`:''}<span>${esc(credit)}</span></p>${href?`<a class="open-project" href="${esc(href)}"${internal?'':' target="_blank" rel="noopener"'} aria-label="Open ${esc(p.title)}">OPEN</a>`:p.image?`<button class="open-project" type="button" data-open-image="${esc(p.id)}" aria-label="Open ${esc(p.title)} photograph">OPEN</button>`:''}</figcaption></figure>`;
}
function renderIndex(category,query){
  const q=query.toLowerCase();
  const items=sorted(entriesFor(query?'All':category).filter(item=>!q||(isProject(item)?[item.title,item.artist]:[item.label,item.category,...item.associations.map(a=>a.role)]).join(' ').toLowerCase().includes(q)));
  if(!items.length)return indexControls()+`<div class="empty">${query?`No matches for “${esc(query)}”.`:'No entries yet.'}${query?'<p>Try another category or search term.</p>':''}</div>`;
  return indexControls()+`<div class="term-grid ${categorySlug(category)}">${items.map(item=>isProject(item)?projectLink(item):entityLink(item)).join('')}</div>`;
}
function renderEntity(e){
  const ids=projectIds(e).sort((a,b)=>Number(projects[b]?.recordType==='studio')-Number(projects[a]?.recordType==='studio'));
  return `<section class="detail-view"><h2 class="detail-title" tabindex="-1">${e.festival?`${esc(e.festival)}<span class="detail-award">${esc(e.distinction)}</span>`:esc(e.label)}</h2><div class="project-cards">${ids.map(id=>{const p=projects[id];return p?projectCard(p,conciseCredit(e.associations.filter(a=>a.projectId===id))):''}).join('')}</div>${relatedSection(relatedTo(e))}</section>`;
}
function renderProject(p){
  return `<section class="detail-view"><h2 class="detail-title" tabindex="-1">${esc(p.title)}</h2><div class="project-cards">${projectCard(p,p.credit||p.artist||'',false)}</div>${relatedSection(relatedToProjects([p.id]))}</section>`;
}
function render(shouldFocus=false){
  if(!data)return;
  const parts=location.hash.slice(1).split('/'),type=parts[0]||'people-artists';let id='';try{id=decodeURIComponent(parts.slice(1).join('/'))}catch{}
  id=data.aliases?.[id]||id;
  const query=new URLSearchParams(location.search).get('q')||'';
  const entity=type==='entity'?entities[id]:null,project=type==='project'?projects[id]:null;
  const selected=Boolean(entity||project),missing=['entity','project'].includes(type)&&!selected;
  document.querySelector('.index-toolbar').hidden=selected;
  currentCategory=entity?.category||project?.indexCategory||legacyCategories[type]||categories.find(c=>categorySlug(c)===type)||'People/Artists';
  $('search').value=query;$('clear-search').hidden=!query;
  document.querySelectorAll('a[data-category]').forEach(a=>{
    a.querySelector('.nav-count').textContent=categoryCount(a.dataset.category);
    if(a.dataset.category===currentCategory&&!missing)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');
  });
  content.innerHTML=missing?`<div class="empty">This entry is no longer in the Index.<p><a class="return-link" href="#all">Browse all entries</a></p></div>`:entity?renderEntity(entity):project?renderProject(project):renderIndex(currentCategory,query);
  content.setAttribute('aria-busy','false');content.classList.remove('content-in');void content.offsetWidth;content.classList.add('content-in');
  document.title=(entity?.label||project?.title||'Index')+' — Philip Di Fiore';
  $('announcement').textContent=missing?'Entry unavailable':selected?(entity?.label||project?.title):query?'Search results for '+query:currentCategory+', '+categoryCount(currentCategory)+' entries';
  if(shouldFocus){window.scrollTo({top:0,behavior:'instant'});(content.querySelector('.detail-title')||$('main')).focus({preventScroll:true})}
}
document.addEventListener('click',event=>{
  const imageButton=event.target.closest('[data-open-image]');
  if(imageButton){const p=projects[imageButton.dataset.openImage],dialog=$('image-preview');dialog.querySelector('img').src=p.image;dialog.querySelector('img').alt=p.imageAlt||p.title;dialog.showModal();return}
  if(event.target.closest('[data-close-image]')){$('image-preview').close();return}

  const sort=event.target.closest('[data-sort]');if(sort){const params=new URLSearchParams(location.search);if(sort.dataset.sort==='tags')params.set('sort','tags');else params.delete('sort');history.replaceState(history.state,'',location.pathname+(params.size?'?'+params.toString():'')+location.hash);render();document.querySelector(`[data-sort="${sort.dataset.sort}"]`)?.focus();return}
  const back=event.target.closest('[data-back]');if(back){if(history.state?.index)history.back();else goto(categoryLink(currentCategory));return}
  const a=event.target.closest('a[href^="#"]');if(a&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();goto(a.getAttribute('href'))}
});
$('search-form').addEventListener('submit',e=>e.preventDefault());
$('search').addEventListener('input',()=>{const value=$('search').value,params=new URLSearchParams(location.search);if(value)params.set('q',value);else params.delete('q');history.replaceState(history.state,'',location.pathname+(params.size?'?'+params.toString():'')+categoryLink(currentCategory));render()});
$('clear-search').addEventListener('click',()=>{const params=new URLSearchParams(location.search);params.delete('q');history.replaceState(history.state,'',location.pathname+(params.size?'?'+params.toString():'')+categoryLink(currentCategory));render();$('search').focus()});
window.addEventListener('popstate',restoreHistory);window.addEventListener('hashchange',restoreHistory);
window.addEventListener('pagehide',rememberScroll);window.addEventListener('pageshow',event=>{if(event.persisted)restoreHistory()});
fetch('data.json').then(r=>{if(!r.ok)throw new Error('Content unavailable');return r.json()}).then(result=>{
  data=result;entities=Object.fromEntries(data.entities.map(e=>[e.id,e]));projects=Object.fromEntries(data.projects.map(p=>[p.id,p]));
  document.querySelector('.categories').innerHTML=categories.map(c=>`<a href="${categoryLink(c)}" data-category="${esc(c)}">${esc(c)} <span class="nav-count">${categoryCount(c)}</span></a>`).join('');
  restoreHistory();
}).catch(()=>{content.setAttribute('aria-busy','false');content.innerHTML='<div class="empty"><p>The index couldn’t load.</p><button onclick="location.reload()">Try again</button></div>'});
