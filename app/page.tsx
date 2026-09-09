'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import CollectionOne from './collection-one/page';
import {works} from './artworks/works';
import {studies,type Artwork} from './artworks/data';
import './artworks/art.css';
const noop=()=>{};
export default function ArtCollection(){
 const [room,setRoom]=useState(-1);const[legacy,setLegacy]=useState(false);const[notes,setNotes]=useState(false);const[screening,setScreening]=useState<Artwork|null>(null);const[chrome,setChrome]=useState(true);const[paused,setPaused]=useState(false);
 useEffect(()=>{const read=()=>{const params=new URLSearchParams(window.location.search);setLegacy(params.has('concept'));const r=Number(params.get('room'));setRoom(r>=1&&r<=6&&Number.isInteger(r)?r-1:-1);};read();window.addEventListener('popstate',read);return()=>window.removeEventListener('popstate',read);},[]);
 const enter=(n:number)=>{setRoom(n);setLegacy(false);setChrome(true);setPaused(false);window.history.pushState({},'',n>=0?'?room='+(n+1):window.location.pathname);window.scrollTo(0,0);};
 const Active=works[room];const work=studies[room];
 if(legacy)return <CollectionOne/>;
 return <main className={room<0?'art-home':'art-view'+(paused?' paused':'')}>
 {room<0?<><header className="art-index-top"><span>Philip Di Fiore / Collection II</span><Link href="/collection-one/">The first six ↗</Link></header><div className="art-index-intro"><h1>Six works<br/><em>for a browser.</em></h1><p>Images, intervals, traces.<br/>Each study is a different way<br/>of being with the films.</p></div><div className="art-index-grid">{studies.map((s,i)=>{const C=works[i];return <article className="art-study" key={s.title}><div className="art-preview"><div className="art-preview-screen" aria-hidden="true" inert><C watch={noop} preview/></div></div><button className="art-study-link" onClick={()=>enter(i)} aria-label={'Enter '+s.title}><span className="art-study-no">0{i+1}</span><span className="art-study-name">{s.title}</span><span className="art-study-arrow">↗</span></button><p className="art-study-rule">{s.material}</p></article>;})}</div><footer className="art-index-bottom"><span>Six interactive studies using Philip’s existing films and imagery.</span><Link href="/collection-one/">Collection I is preserved here ↗</Link></footer></>:<><Active key={room} watch={setScreening} paused={paused}/>{chrome?<nav className="art-review-dock" aria-label="Design study controls"><span className="art-dock-title">II / 0{room+1}<span className="dock-title-name"> · {work.title}</span></span><button onClick={()=>enter(-1)}>Index</button><button onClick={()=>setNotes(true)}>Notes</button><button onClick={()=>setPaused(p=>!p)} aria-pressed={paused} title="Hold page animations; film playback is separate">{paused?'Animate':'Hold'}</button><button onClick={()=>enter((room+1)%6)} aria-label="Next study">→</button><button className="art-hide" onClick={()=>setChrome(false)} aria-label="Hide study controls">−</button></nav>:<button className="art-show-controls" onClick={()=>setChrome(true)} aria-label="Show study controls">+</button>}</>}
 <Dialog open={notes} onOpenChange={setNotes}><DialogContent className="art-note-dialog">{work&&<><span className="art-note-label">Study 0{room+1} / {work.material}</span><DialogTitle>{work.title}</DialogTitle><DialogDescription>{work.rule}</DialogDescription><p>{work.note}</p><p className="art-gesture">{work.gesture}</p></>}</DialogContent></Dialog>
 <Dialog open={!!screening} onOpenChange={open=>{if(!open)setScreening(null);}}><DialogContent className="art-screening">{screening&&<><DialogTitle>{screening.title}</DialogTitle><DialogDescription>{screening.artist}</DialogDescription><iframe src={`https://player.vimeo.com/video/${screening.vimeo}?autoplay=1&title=0&byline=0&portrait=0`} title="Film screening" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/><a href={'https://vimeo.com/'+screening.vimeo} target="_blank" rel="noreferrer">View on Vimeo ↗</a></>}</DialogContent></Dialog>
 </main>;
}
