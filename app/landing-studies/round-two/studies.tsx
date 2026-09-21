'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type KeyboardEvent } from 'react';
import './studies.css';

const base = '/landing-studies/round-two';
const image = (name: string) => `/images/landing-studies/${name}.webp`;
const extra = (name: string) => `/images/landing-round-two/${name}.webp`;
export const openings = [
  { id: 'reveal', name: 'Under the ink', verb: 'Reveal', note: 'Pull a seam between the source image and its finished overprint.', color: '#d6ed38' },
  { id: 'room', name: 'In the room', verb: 'Listen', note: 'A photograph and a live recording put you inside a Recording Party.', color: '#28c4cd' },
  { id: 'titles', name: 'Opening titles', verb: 'Watch', note: 'A short, changing title sequence introduces the work through rhythm.', color: '#f78aaa' },
  { id: 'compose', name: 'The composition', verb: 'Arrange', note: 'Move the images, change their order, and make your own composition.', color: '#f17b38' },
  { id: 'story', name: 'A shared room', verb: 'Read', note: 'One real studio story, where a recording session meets an editing session.', color: '#9bd8e3' },
];

function Header() {
  return <header className="lr-header"><a href="/#info">Philip Di Fiore</a><nav aria-label="Main navigation">
    <a href="/#info">Info</a><a href="/#film/in-the-city">Film</a><a href="/#music/recording-parties">Music</a><a href="/index/index.html#people-artists">Index</a>
  </nav></header>;
}
function Picture({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={className} draggable={false} />;
}

function Reveal() {
  const [split, setSplit] = useState(48);
  return <section className="lr-canvas lr-reveal"><Header /><main>
    <div className="lr-reveal-type" aria-hidden="true">SHARON<br />JONES</div>
    <h1 className="lr-sr-only">Sharon Jones — If You Call, photograph and overprint</h1>
    <div className="lr-print" style={{ '--split': `${split}%` } as CSSProperties}>
      <Picture src={extra('if-you-call-original')} alt="Source image of Sharon Jones" />
      <div className="lr-print-ink"><Picture src={image('if-you-call')} alt="If You Call finished overprint artwork" /></div>
      <div className="lr-print-seam" aria-hidden="true"><span>↔</span></div>
      <input type="range" min="0" max="100" value={split} aria-label="Reveal the overprint" onChange={e => setSplit(Number(e.target.value))} />
    </div>
    <div className="lr-reveal-caption"><span>If You Call<br />Sharon Jones & The Dap-Kings</span><span>Photograph <span aria-hidden="true">↔</span> Overprint<br /><small>Drag across the image</small></span></div>
  </main></section>;
}

const roomPhotos = [
  { src: extra('room-trumpet-original'), alt: 'James Richardson playing trumpet at Recording Party 2' },
  { src: extra('room-philip-mc'), alt: 'Philip Di Fiore at the microphone at Recording Party 2' },
  { src: extra('room-piano-duet'), alt: 'Emma and Andrea Gomis at the piano at Recording Party 2' },
];
const clock = (value: number) => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
function Room({ miniature = false }: { miniature?: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(1873.296);
  const [photo, setPhoto] = useState(0);
  useEffect(() => {
    const player = audio.current;
    return () => { if (player) { player.pause(); player.removeAttribute('src'); player.load(); } };
  }, []);
  async function toggle() {
    const player = audio.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    setError(''); setLoading(true);
    try {
      if (!player.getAttribute('src') || player.error) player.src = 'https://philipdifiore.com/api/recording-parties/2-1-1/audio';
      await player.play();
    } catch { setError('The recording could not load. Try again.'); }
    finally { setLoading(false); }
  }
  return <section className="lr-canvas lr-room"><Header /><main>
    <div className="lr-room-photo"><Picture key={photo} src={roomPhotos[photo].src} alt={roomPhotos[photo].alt} />
      <div className="lr-room-wash" />
      <div className="lr-room-place">The Rumpus Room<br />Brooklyn, New York</div>
      <button className="lr-room-play" onClick={toggle} disabled={loading || miniature} aria-label={playing ? 'Pause recording' : 'Play Recording Party 2, Tape 1'}>
        {loading ? <span className="lr-loading">…</span> : playing ? <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 8h7v24h-7zm13 0h7v24h-7z" /></svg> : <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M13 7l22 13-22 13z" /></svg>}
      </button>
      <div className="lr-room-photo-nav"><button onClick={() => setPhoto((photo + 2) % 3)} aria-label="Previous room photograph">‹</button><span>{photo + 1} / 3</span><button onClick={() => setPhoto((photo + 1) % 3)} aria-label="Next room photograph">›</button></div>
    </div>
    <div className="lr-room-player"><h1>Recording Party 2<span>Tape 1</span></h1><div className="lr-room-seek"><input type="range" min="0" max={duration} step="1" value={time} aria-label="Recording position" onChange={e => { const value = Number(e.target.value); if (audio.current?.getAttribute('src')) { audio.current.currentTime = value; setTime(value); } }} /><div><span>{clock(time)}</span><span>{clock(duration)}</span></div></div></div>
    {error && <p role="alert" className="lr-room-error">{error} <button onClick={toggle}>Retry</button></p>}
    <small className="lr-room-credit">Photographs: Chris J Lytwn / Bedford + Bowery</small>
    {!miniature && <audio ref={audio} preload="none" onError={() => { setPlaying(false); setLoading(false); setError('The recording could not load. Try again.'); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={() => setTime(audio.current?.currentTime || 0)} onLoadedMetadata={() => { if (audio.current && Number.isFinite(audio.current.duration)) setDuration(audio.current.duration); }} />}
  </main></section>;
}

const frames = [
  { title: 'In the City', artist: 'Caveman', src: 'in-the-city', ground: '#f24937', ink: '#171640' },
  { title: 'Old Friend', artist: 'Caveman', src: 'old-friend', ground: '#293ad6', ink: '#f2e547' },
  { title: 'Improvisczario', artist: 'Bernie Worrell', src: 'improvisczario', ground: '#ed99b6', ink: '#182331' },
  { title: 'Philip Di Fiore', artist: 'Filmmaker. Music producer.', src: '', ground: '#eb3856', ink: '#25164b' },
];
function Titles({ miniature = false }: { miniature?: boolean }) {
  const [frame, setFrame] = useState(miniature ? 2 : 0);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (miniature) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { setReduced(media.matches); if (media.matches) { setRunning(false); setFrame(3); } };
    sync(); if (!media.matches) setRunning(true);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [miniature]);
  useEffect(() => {
    if (!running || miniature) return;
    const timer = setTimeout(() => {
      if (frame < frames.length - 1) setFrame(frame + 1); else setRunning(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, [frame, running, miniature]);
  const item = frames[frame];
  return <section className="lr-canvas lr-titles" style={{ '--ground': item.ground, '--ink': item.ink } as CSSProperties}><Header /><main>
    <div className={`lr-title-frame lr-title-frame-${frame}`} key={frame}>
      {item.src && <Picture src={image(item.src)} alt={`${item.title} artwork`} />}
      <h1>{frame === 3 ? <>Philip<br />Di Fiore<span>.</span></> : item.title}</h1><p>{item.artist}</p>
    </div>
    <div className="lr-title-controls"><span>0{frame + 1} / 04</span><div>{running ? <button onClick={() => setRunning(false)}>Pause</button> : <button onClick={() => { if (frame === 3) setFrame(0); setRunning(true); }}>{frame === 3 ? 'Replay' : 'Play'}</button>}<button onClick={() => { setRunning(false); setFrame((frame + 1) % frames.length); }}>{reduced ? 'Next image' : 'Next'}</button></div></div>
  </main></section>;
}

type Piece = { x: number; y: number; rotation: number; z: number };
const arrangements: Piece[][] = [
  [{ x: 21, y: 43, rotation: -8, z: 1 }, { x: 51, y: 55, rotation: 3, z: 2 }, { x: 80, y: 40, rotation: 8, z: 3 }],
  [{ x: 33, y: 40, rotation: 8, z: 2 }, { x: 64, y: 40, rotation: -9, z: 1 }, { x: 51, y: 58, rotation: -2, z: 3 }],
  [{ x: 24, y: 55, rotation: 0, z: 1 }, { x: 50, y: 37, rotation: 0, z: 2 }, { x: 76, y: 55, rotation: 0, z: 3 }],
];
const pieces = [{ src: 'in-the-city', name: 'In the City' }, { src: 'improvisczario', name: 'Improvisczario' }, { src: 'old-friend', name: 'Old Friend' }];
function Compose() {
  const [positions, setPositions] = useState<Piece[]>(arrangements[0]);
  const [selected, setSelected] = useState(1);
  const [arrangement, setArrangement] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ index: number; clientX: number; clientY: number; x: number; y: number } | null>(null);
  function move(index: number, change: Partial<Piece>) { setPositions(current => current.map((value, i) => i === index ? { ...value, ...change } : value)); }
  function start(event: PointerEvent<HTMLButtonElement>, index: number) {
    event.currentTarget.setPointerCapture(event.pointerId); setSelected(index);
    move(index, { z: Math.max(...positions.map(p => p.z)) + 1 });
    drag.current = { index, clientX: event.clientX, clientY: event.clientY, x: positions[index].x, y: positions[index].y };
  }
  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!drag.current || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    move(drag.current.index, { x: Math.max(16, Math.min(84, drag.current.x + (event.clientX - drag.current.clientX) / rect.width * 100)), y: Math.max(28, Math.min(69, drag.current.y + (event.clientY - drag.current.clientY) / rect.height * 100)) });
  }
  function keyMove(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const key = event.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(key)) return;
    event.preventDefault();
    const p = positions[index];
    move(index, { x: Math.max(16, Math.min(84, p.x + (key === 'ArrowRight' ? 3 : key === 'ArrowLeft' ? -3 : 0))), y: Math.max(28, Math.min(69, p.y + (key === 'ArrowDown' ? 3 : key === 'ArrowUp' ? -3 : 0))) });
  }
  return <section className="lr-canvas lr-compose"><Header /><main>
    <h1 className="lr-sr-only">Compose with images from Philip Di Fiore’s work</h1>
    <div className="lr-compose-stage" ref={stage}><span className="lr-compose-word" aria-hidden="true">&amp;</span>
      {pieces.map((piece, i) => <button key={piece.src} className="lr-piece" aria-label={`Move ${piece.name} image. Use arrow keys to position it.`} aria-describedby="compose-instructions" onFocus={() => setSelected(i)} onPointerDown={e => start(e, i)} onPointerMove={pointerMove} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onKeyDown={e => keyMove(e, i)} style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%`, transform: `translate(-50%,-50%) rotate(${positions[i].rotation}deg)`, zIndex: positions[i].z }}><Picture src={image(piece.src)} alt={piece.name} /></button>)}
    </div>
    <div className="lr-compose-controls"><p id="compose-instructions">Drag the images.<br /><small>Or use Tab and arrow keys.</small></p><div><button onClick={() => { const next = (arrangement + 1) % arrangements.length; setArrangement(next); setPositions(arrangements[next]); }}>Rearrange</button><button aria-label={`Rotate ${pieces[selected].name}`} onClick={() => move(selected, { rotation: positions[selected].rotation + 10 })}>Rotate</button><button onClick={() => { setPositions(arrangements[0]); setArrangement(0); }}>Reset</button></div></div>
  </main></section>;
}

function Story() {
  const [scene, setScene] = useState(false);
  return <section className="lr-canvas lr-story"><Header /><main>
    <div className="lr-story-opening"><p>Brooklyn, New York<br />The Rumpus Room</p><h1>One room.<br /><em>Two sessions.</em></h1><span className="lr-story-rule" /></div>
    <div className="lr-story-spread"><div className="lr-story-copy"><p>Francis and the Lights were recording <em>It’ll Be Better</em> at Philip’s studio. Philip was editing Sharon Jones’s <em>I Learned the Hard Way.</em></p><p>Jake Schreier, a member of the band and a filmmaker, sat in on the edit. He offered suggestions for the opening confrontation between Lee Fields and Sharon.</p><button onClick={() => setScene(!scene)} aria-pressed={scene}>{scene ? 'Return to the studio' : 'See the film image'} <span aria-hidden="true">{scene ? '−' : '+'}</span></button></div>
      <figure className={scene ? 'lr-story-photo lr-story-film' : 'lr-story-photo'}><Picture src={scene ? '/images/sequence/i-learned-the-hard-way-overprint.webp' : extra('room-philip-mc')} alt={scene ? 'I Learned the Hard Way artwork' : 'Philip at The Rumpus Room during Recording Party 2'} /><figcaption>{scene ? <>I Learned the Hard Way — Sharon Jones & The Dap-Kings</> : <>Philip at The Rumpus Room.<br />Recording Party 2 · Photograph by Chris J Lytwn</>}</figcaption></figure>
    </div>
  </main></section>;
}

export function Surface({ direction, miniature = false }: { direction: string; miniature?: boolean }) {
  if (direction === 'room') return <Room miniature={miniature} />;
  if (direction === 'titles') return <Titles miniature={miniature} />;
  if (direction === 'compose') return <Compose />;
  if (direction === 'story') return <Story />;
  return <Reveal />;
}
export function RoundTwoStudy({ direction }: { direction: string }) {
  return <div className="lr-study"><nav className="lr-switcher" aria-label="Second set of landing page studies"><a href="/landing-studies/all">All 15</a><div>{openings.map((item, i) => <a key={item.id} href={`${base}/${item.id}`} aria-label={`Preview ${item.name}`} aria-current={direction === item.id ? 'page' : undefined}><span>{String(i + 6).padStart(2, '0')}</span><span className="lr-switch-name">{item.name}</span></a>)}</div></nav><Surface direction={direction} /></div>;
}
export function RoundTwoComparison() {
  return <div className="lr-review"><header><a href="/#info">Philip Di Fiore</a><a href="/landing-studies">Saved first five</a></header><main><div className="lr-review-heading"><div><p>Landing studies / Round 02</p><h1>Something<br /><em>happens here.</em></h1></div><p>Five new openings.<br />The header takes you places.<br />The page gives you an experience.</p></div><div className="lr-review-grid">{openings.map((item, i) => <article className={`lr-review-card lr-card-${item.id}`} key={item.id}><div className="lr-mini"><div className="lr-mini-inner" inert aria-hidden="true"><Surface direction={item.id} miniature /></div></div><div className="lr-card-caption"><span style={{ color: item.color }}>0{i + 1} / {item.verb}</span><h2>{item.name}</h2><p>{item.note}</p></div><a href={`${base}/${item.id}`} aria-label={`Preview ${item.name}`} /></article>)}</div><footer><a href="/landing-studies">All five original directions are saved here.</a></footer></main></div>;
}
