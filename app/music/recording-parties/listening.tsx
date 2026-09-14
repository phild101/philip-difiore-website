'use client';
import { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { SectionNavigation } from '../../reseda-studies/overprint-centered/navigation';
import { PressArticle } from '../../reseda-studies/darkroom-featured/press';
import { pressItems } from '../../reseda-studies/darkroom-featured/press-data';
import type { PartyCatalog, PartyTrack } from './types';
import { partyAttendees } from './attendees';
import './listening.css';

function clock(seconds: number) {
  const rounded = Math.max(0, Math.floor(seconds));
  return Math.floor(rounded / 60) + ':' + String(rounded % 60).padStart(2, '0');
}
function PlayIcon({paused = true}: {paused?: boolean}) {
  return <svg viewBox="0 0 40 40" aria-hidden="true">{paused ? <path d="M11 5 35 20 11 35Z" /> : <path d="M8 6h9v28H8zM24 6h9v28h-9z" />}</svg>;
}
export function RecordingParties({filmSlug}: {filmSlug: string}) {
  const [catalog, setCatalog] = useState<PartyCatalog | null>(null);
  const [catalogError, setCatalogError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [party, setParty] = useState(1);
  const [selected, setSelected] = useState<PartyTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playError, setPlayError] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [press, setPress] = useState(false);
  const [roomPhoto, setRoomPhoto] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const request = useRef(0);
  const currentTrack = useRef<PartyTrack | null>(null);
  const tracks = catalog?.tracks.filter(track => track.party === party) || [];
  const attendees = partyAttendees[party] || [];
  const article = pressItems.find(item => item.slug === 'bedford-bowery-recording-parties')!;

  useEffect(() => {
    setRoomPhoto(new URLSearchParams(window.location.search).get('photos') === 'room');
    const old = document.title;
    document.title = 'Recording Parties — Philip Di Fiore';
    return () => { document.title = old; request.current += 1; };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setCatalogError(false);
    fetch('/api/recording-parties', {signal: controller.signal})
      .then(response => {if (!response.ok) throw new Error(); return response.json() as Promise<PartyCatalog>;})
      .then(data => {if (!Array.isArray(data.tracks) || !data.tracks.length) throw new Error(); setCatalog(data);})
      .catch(error => {if (error.name !== 'AbortError') setCatalogError(true);});
    return () => controller.abort();
  }, [retry]);

  async function play(track: PartyTrack, restart = false) {
    const player = audio.current;
    if (!player) return;
    const token = ++request.current;
    setPlayError(false);
    if (!restart && currentTrack.current?.id === track.id && player.currentSrc) {
      if (!player.paused) { player.pause(); return; }
    } else {
      player.pause();
      currentTrack.current = track;
      setSelected(track);
      setElapsed(0);
      setDuration(track.duration);
      player.src = '/api/recording-parties/' + track.id + '/audio';
      player.load();
    }
    setLoading(true);
    try { await player.play(); }
    catch { if (request.current === token) { setPlayError(true); setLoading(false); setPlaying(false); } }
  }
  function chooseParty(next: number) {
    if (next === party) return;
    request.current += 1;
    audio.current?.pause();
    if (audio.current) {audio.current.removeAttribute('src'); audio.current.load();}
    currentTrack.current = null;
    setSelected(null); setPlaying(false); setLoading(false); setPlayError(false); setElapsed(0); setDuration(0); setParty(next);
  }
  function ended() {
    setPlaying(false);
    const next = tracks[tracks.findIndex(track => track.id === currentTrack.current?.id) + 1];
    if (next) void play(next);
  }
  return <div className="rp-site">
    <div className="rp-frame">
      <header className="rp-header">
        <a href="#film/if-you-call">Philip Di Fiore</a>
        <SectionNavigation active="music" filmSlug={filmSlug} />
      </header>
      <main>
        <div className="rp-masthead">
          <div><p className="rp-kicker">The Rumpus Room · Brooklyn, New York</p><h1>Recording Parties</h1></div>
          <button className="rp-press-link" onClick={() => setPress(true)}>Read the story<span>Bedford + Bowery</span></button>
        </div>
        <section className="rp-session" aria-label="Listen to the Recording Parties">
          <figure className="rp-session-photo">
            <img src={'/images/music/recording-parties/james-richardson-trumpet-session-' + (roomPhoto ? 'room' : 'film') + '.webp'} alt="James Richardson on trumpet, with musicians gathered around him at The Rumpus Room" width={1200} height={1311} />
            <figcaption className="rp-photo-stamp">The Rumpus<br/>Room</figcaption>
          </figure>
          <div className="rp-listening">
            <p className="rp-listening-label">Listen to the recordings</p>
            <div className="rp-parties" role="group" aria-label="Choose a recording party">
              {[1,2,3].map(number => <button key={number} onClick={() => chooseParty(number)} aria-pressed={party === number} aria-label={'Rumpus Room Party ' + number}>Party <span>0{number}</span></button>)}
            </div>
            <h2>Rumpus Room<br/><span>Party {party}</span></h2>
            <p className="rp-session-meta">{catalog ? tracks.length + ' recordings / ' + clock(tracks.reduce((total, track) => total + track.duration, 0)) : 'Loading recordings…'}</p>
            <div className="rp-tracks" aria-label={'Rumpus Room Party ' + party + ' recordings'}>
              {tracks.map(track => <button key={track.id} className={'rp-track' + (selected?.id === track.id ? ' rp-track-current' : '')} aria-label={(selected?.id === track.id && playing ? 'Pause ' : 'Play ') + track.title} aria-pressed={selected?.id === track.id && playing} onClick={() => void play(track, playError)}>
                <span className="rp-track-name">Tape {track.tape}<span className="rp-track-time">{clock(track.duration)}</span></span><span className="rp-play-control"><PlayIcon paused={selected?.id !== track.id || !playing}/><span>{selected?.id === track.id && playing ? 'Pause' : 'Play'}</span></span>
              </button>)}
              {catalogError && <div className="rp-error" role="alert">The recordings could not be loaded. <button onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
            </div>
            <div className="rp-transport">
              <div className="rp-now" aria-live="polite">{playError ? 'Unable to play this recording.' : loading ? 'Loading Tape ' + selected?.tape + '…' : selected ? (playing ? 'Playing' : 'Paused') + ' / Tape ' + selected.tape : 'Choose a recording'}</div>
              <Slider className="rp-seek" min={0} max={Math.max(1, duration)} step={1} value={[elapsed]} disabled={!selected || playError} aria-label="Playback position" onValueChange={value => {const seconds = Array.isArray(value) ? value[0] : value; if (audio.current && Number.isFinite(audio.current.duration)) {audio.current.currentTime = seconds; setElapsed(seconds);}}}/>
              <div className="rp-timing"><span>{clock(elapsed)}</span><span>{selected ? clock(duration) : '—:—'}</span></div>
              {playError && selected && <button className="rp-retry" onClick={() => void play(selected, true)}>Retry playback</button>}
            </div>
            <section className="rp-attendees" aria-label={'Musicians and attendees of Party ' + party}>
              <h3>Musicians &amp; attendees</h3>
              {attendees.length ? <ul>{attendees.map(person => <li key={person.name}><strong>{person.name}</strong>{person.role && <span>{person.role}</span>}</li>)}</ul> : <p>Party {party} attendee list to be added.</p>}
            </section>
            <p className="rp-note">Musicians from different circles, meeting to improvise freely. Organized and MC’d by Philip Di Fiore. Recorded live at The Rumpus Room.</p>
          </div>
        </section>
        <section className="rp-photographs" aria-label="Inside The Rumpus Room">
          <figure className="rp-wide-photo"><img loading="lazy" src="/images/music/recording-parties/philip-di-fiore-mc-film.webp" width={1672} height={941} alt="Philip Di Fiore at the microphone as master of ceremonies"/><figcaption>Philip Di Fiore, master of ceremonies</figcaption></figure>
          <figure className="rp-tall-photo"><img loading="lazy" src="/images/music/recording-parties/emma-gomis-bass-film.webp" width={935} height={1683} alt="Emma Gomis playing bass at the studio"/><figcaption>Emma Gomis, bass</figcaption></figure>
          <figure className="rp-console-photo"><img loading="lazy" src="/images/music/recording-parties/albert-di-fiore-console-film.webp" width={1572} height={1001} alt="Albert Di Fiore at the recording console"/><figcaption>Albert Di Fiore, at the console</figcaption></figure>
        </section>
        <section className="rp-press-card" aria-label="Recording Parties in the press"><div><p>Press</p><h2>Bedford + Bowery</h2></div><div className="rp-press-actions"><button onClick={() => setPress(true)}>Read the story</button><a href="https://bedfordandbowery.com/2014/06/watch-members-of-mgmt-louis-xiv-and-more-put-a-party-on-vinyl/" target="_blank" rel="noreferrer">Original article</a></div></section>
        <footer className="rp-footer"><span>Photographs: Chris J Lytwn / Bedford + Bowery</span><a href="#music/recording-parties">Back to Music</a></footer>
      </main>
      <audio ref={audio} preload="none" onPlay={() => setPlaying(true)} onPlaying={() => setLoading(false)} onPause={() => setPlaying(false)} onWaiting={() => {if (currentTrack.current) setLoading(true);}} onLoadedMetadata={() => {if (audio.current && Number.isFinite(audio.current.duration)) setDuration(audio.current.duration);}} onTimeUpdate={() => setElapsed(audio.current?.currentTime || 0)} onEnded={ended} onError={() => {if (currentTrack.current) {setPlayError(true); setPlaying(false); setLoading(false);}}}/>
      <PressArticle article={press ? article : null} close={() => setPress(false)} watch={() => {}} fullscreen />
    </div>
  </div>;
}
