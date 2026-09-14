(() => {
const query=new URLSearchParams(location.search);
if(query.get('ink')==='colors')document.documentElement.dataset.ink='colors';
if(query.get('layout')==='editorial')document.documentElement.dataset.layout='editorial';
if(query.get('type')==='sans')document.documentElement.dataset.type='sans';
if(query.get('type')==='header'){
 document.documentElement.dataset.type='header';
 document.documentElement.dataset.layout='editorial';
 document.querySelector('header>a').textContent='Philip Di Fiore';
 document.querySelector('#header-featured').textContent='Featured';
 document.querySelector('#header-about').textContent='About';
 document.querySelector('#home').textContent='Back to About';
 const sentence=s=>s.toLowerCase().replace(/(^|[\s/—])([a-z])/g,(_,space,letter)=>space+letter.toUpperCase());
 for(const [id,n] of Object.entries(window.ABOUT_GRAPH.notes)){
  const passage=window.RABBIT_PASSAGES[id];
  const title=passage?.title||n.title;
  const patch={heading:title,kind:sentence(passage?.kind||n.kind||'')};
  if(passage?.linkLabel||n.linkLabel){const label=passage?.linkLabel||n.linkLabel;patch.linkLabel=label===label.toUpperCase()?sentence(label):label;}
  Object.assign(n,patch);if(passage)Object.assign(passage,patch);
 }
}
})();
