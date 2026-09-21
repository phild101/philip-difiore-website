'use client';

import { useState, type CSSProperties } from 'react';
import './studies.css';

export const directions = [
  {id: 'poster', name: 'Electric poster', note: 'Oversized type. A controlled collision of images.', color: '#efd536'},
  {id: 'cinema', name: 'Cinema', note: 'One image takes the entire stage.', color: '#dd432c'},
  {id: 'duet', name: 'Two worlds', note: 'Film and music. Two equal doors into the work.', color: '#02a09e'},
  {id: 'editorial', name: 'Blue edition', note: 'A portrait and biography with an editorial rhythm.', color: '#51c4dc'},
  {id: 'index', name: 'Living index', note: 'A direct list of work; color and image follow your selection.', color: '#a72e3e'},
];
const works = [
  {title:'In the City', artist:'Caveman', slug:'in-the-city', section:'film', color:'#b72e24', ink:'#c9f0db'},
  {title:'The Buffalo Hunt', artist:'Documentary', slug:'buffalo-hunt', section:'film', color:'#f1d53f', ink:'#132f65'},
  {title:'Old Friend', artist:'Caveman', slug:'old-friend', section:'film', color:'#1734ac', ink:'#f4d335'},
  {title:'If You Call', artist:'Sharon Jones & The Dap-Kings', slug:'if-you-call', section:'film', color:'#dc4427', ink:'#081521'},
  {title:'Antibalas', artist:'Live performance', slug:'antibalas', section:'film', color:'#6b1d25', ink:'#ffbb4b'},
  {title:'Improvisczario', artist:'Bernie Worrell', slug:'improvisczario', section:'music', color:'#102b3e', ink:'#f3dfad'},
  {title:'Recording Parties', artist:'The Rumpus Room', slug:'recording-parties', section:'music', color:'#02a09e', ink:'#092e33'},
];
const src = (slug: string) => '/images/landing-studies/' + slug + '.webp';
const href = (slug: string, section='film') => '/#' + section + '/' + slug;
function Navigation() {
  return <header className="ls-header"><a href="/#info" className="ls-wordmark">Philip Di Fiore</a><nav aria-label="Main navigation">
    <a href="/#info">Info</a><a href="/#film/in-the-city">Film</a><a href="/#music/recording-parties">Music</a><a href="/index/index.html#people-artists">Index</a>
  </nav></header>;
}
function WorkImage({slug, label, className=''}:{slug:string;label:string;className?:string}) {
  return <img className={className} src={src(slug)} alt={label} draggable={false} />;
}
function Poster() {
  return <div className="ls-canvas ls-poster"><Navigation/><main className="ls-poster-body">
    <h1>Philip<br/>Di Fiore<span className="ls-poster-period">.</span></h1>
    <div className="ls-poster-art">
      <a className="ls-poster-one" href={href('old-friend')} aria-label="Open Old Friend"><WorkImage slug="old-friend" label="Old Friend artwork"/></a>
      <a className="ls-poster-two" href={href('if-you-call')} aria-label="Open If You Call"><WorkImage slug="if-you-call" label="Sharon Jones — If You Call artwork"/></a>
      <a className="ls-poster-three" href={href('improvisczario','music')} aria-label="Open Improvisczario"><WorkImage slug="improvisczario" label="Bernie Worrell — Improvisczario cover"/></a>
    </div>
    <div className="ls-poster-bottom"><p>Filmmaker.<br/>Music producer.</p><div><a href="/#film/in-the-city">Film</a><a href="/#music/recording-parties">Music</a></div><a className="ls-small-link" href="/#info">About Philip</a></div>
  </main></div>;
}
function Cinema() {
  const [selected,setSelected] = useState(0);
  const slides = [works[4],works[0],works[3]];
  const work=slides[selected];
  return <div className="ls-canvas ls-cinema" style={{'--ls-cinema-color':work.color} as CSSProperties}>
    <div className="ls-cinema-image" key={work.slug}><WorkImage slug={work.slug} label={work.title + ' artwork'}/></div>
    <Navigation/><main className="ls-cinema-body"><h1>Philip<br/>Di Fiore</h1><div className="ls-cinema-bottom">
      <div className="ls-cinema-selector" aria-label="Choose featured image">{slides.map((item,i)=><button key={item.slug} aria-pressed={i===selected} aria-label={'Show '+item.title} onClick={()=>setSelected(i)}>{String(i+1).padStart(2,'0')}</button>)}</div>
      <a className="ls-cinema-work" href={href(work.slug)}><span>{work.artist}</span><strong>{work.title}</strong><span className="ls-cinema-open">View film <span aria-hidden="true">↗</span></span></a>
    </div></main>
  </div>;
}
function Duet() {
  return <div className="ls-canvas ls-duet"><Navigation/><main className="ls-doors"><h1 className="ls-sr-only">Philip Di Fiore — Film and Music</h1>
    <a className="ls-door ls-door-film" href="/#film/in-the-city"><span className="ls-door-number">01</span><h2>Film</h2><WorkImage slug="in-the-city" label="In the City artwork"/><span className="ls-door-caption">In the City <span aria-hidden="true">↗</span></span></a>
    <a className="ls-door ls-door-music" href="/#music/recording-parties"><span className="ls-door-number">02</span><h2>Music</h2><WorkImage slug="improvisczario" label="Bernie Worrell — Improvisczario cover"/><span className="ls-door-caption">Albums, scores & Recording Parties <span aria-hidden="true">↗</span></span></a>
  </main></div>;
}
function Editorial() {
  return <div className="ls-canvas ls-editorial"><Navigation/><main>
    <h1>Philip Di Fiore</h1>
    <div className="ls-editorial-spread"><figure><WorkImage slug="philip" label="Portrait of Philip Di Fiore"/><figcaption>Film / Music</figcaption></figure><div className="ls-editorial-copy">
      <p className="ls-editorial-lead">Philip Di Fiore is an award-winning filmmaker known for his cinematic storytelling and mind-bending narratives.</p>
      <p>He writes his own stories and edits his own films.</p>
      <p>The Academy of Motion Picture Arts and Sciences selected his film <a href={href('stranger')}><em>Stranger: Bernie Worrell on Earth</em></a> for inclusion in the Academy Film Archive, its permanent film collection.</p>
      <p>Di Fiore produces music projects and film scores. He built a recording studio and soundstage in Brooklyn, NY (The Rumpus Room) which he operated for ten years.</p>
      <a className="ls-editorial-more" href="/#info">Full biography <span aria-hidden="true">↗</span></a>
    </div></div>
    <div className="ls-editorial-footer"><a href="/#film/in-the-city">Film</a><a href="/#music/recording-parties">Music</a><a href="mailto:info@philipdifiore.com">info@philipdifiore.com</a></div>
  </main></div>;
}
function LivingIndex() {
  const [selected,setSelected]=useState(4);
  const work=works[selected];
  return <div className="ls-canvas ls-index" style={{'--ls-index-ground':work.color,'--ls-index-ink':work.ink} as CSSProperties}><Navigation/>
    <main className="ls-index-body"><div className="ls-index-list"><h1>Selected<br/>work.</h1><div className="ls-index-rows">{works.map((item,i)=><a key={item.slug} href={href(item.slug,item.section)} onPointerEnter={()=>setSelected(i)} onFocus={()=>setSelected(i)} data-selected={i===selected||undefined}>
      <span className="ls-index-number">{String(i+1).padStart(2,'0')}</span><span className="ls-index-work-title">{item.title}<small>{item.artist}</small></span><span className="ls-index-kind">{item.section}</span>
    </a>)}</div></div><div className="ls-index-image"><a href={href(work.slug,work.section)} aria-label={'Open '+work.title}><WorkImage key={work.slug} slug={work.slug} label={work.title+' artwork'}/></a><div><span>{work.title}</span><span>{selected+1} / {works.length}</span></div></div>
    </main><footer className="ls-index-footer"><span>Philip Di Fiore</span><a href="/index/index.html#people-artists">Explore the complete Index <span aria-hidden="true">↗</span></a></footer>
  </div>;
}
export function Surface({direction}:{direction:string}) {
  if(direction==='cinema')return <Cinema/>;
  if(direction==='duet')return <Duet/>;
  if(direction==='editorial')return <Editorial/>;
  if(direction==='index')return <LivingIndex/>;
  return <Poster/>;
}
export function LandingStudy({direction}:{direction:string}) {
  return <div className="ls-study"><nav className="ls-switcher" aria-label="Landing page studies"><a href="/landing-studies/all">All studies</a><div>{directions.map((item,i)=><a href={'/landing-studies/'+item.id} key={item.id} aria-label={'Preview '+item.name} aria-current={direction===item.id?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span><span className="ls-switch-name"> {item.name}</span></a>)}</div></nav><Surface direction={direction}/></div>;
}
export function LandingComparison() {
  return <div className="ls-review"><header><a href="/#info">Philip Di Fiore</a><a href="/landing-studies/round-two">Five new openings ↗</a></header><main><div className="ls-review-intro"><h1>Five ways in.</h1><p>Landing page studies<br/>Choose a direction to explore.</p></div><div className="ls-review-grid">{directions.map((item,i)=><article className="ls-review-card" key={item.id}>
    <div className="ls-mini"><div className="ls-mini-inner" inert aria-hidden="true"><Surface direction={item.id}/></div></div>
    <div className="ls-review-caption"><span style={{color:item.color}}>{String(i+1).padStart(2,'0')}</span><h2>{item.name}</h2><span aria-hidden="true">↗</span></div><p>{item.note}</p>
    <a className="ls-card-open" href={'/landing-studies/'+item.id} aria-label={'Preview '+item.name}/>
  </article>)}</div></main></div>;
}
