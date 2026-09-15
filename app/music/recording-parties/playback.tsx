'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import type { PartyTrack } from './types';
import { Slider } from '@/components/ui/slider';
import './playback.css';

type Playback = {
  selected: PartyTrack | null;
  playing: boolean;
  loading: boolean;
  playError: boolean;
  elapsed: number;
  duration: number;
  play: (track: PartyTrack, queue: PartyTrack[], retry?: boolean) => void;
  seek: (seconds: number) => void;
};
const PlaybackContext = createContext<Playback | null>(null);
const DismissContext = createContext<() => void>(() => {});

export function useRecordingPlayback() {
  const value = useContext(PlaybackContext);
  if (!value) throw new Error('Recording playback provider is missing.');
  return value;
}
export function useDismissRecording() { return useContext(DismissContext); }

function clock(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
}
function TransportIcon({ type }: { type: 'play' | 'pause' | 'previous' | 'next' }) {
  const paths = {
    play: 'M7 4 21 12 7 20Z',
    pause: 'M6 4h4v16H6zM14 4h4v16h-4z',
    previous: 'M4 4h3v16H4zM20 4 8 12 20 20Z',
    next: 'M17 4h3v16h-3zM4 4 16 12 4 20Z',
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]}/></svg>;
}
function PersistentSeek({ elapsed, duration, ready, seek }: {
  elapsed: number; duration: number; ready: boolean; seek: (seconds: number) => void;
}) {
  const [draft, setDraft] = useState<number | null>(null);
  const position = Math.min(duration, draft ?? elapsed);
  return <div className="rp-persistent-progress">
    <span className="rp-persistent-time">{clock(position)}</span>
    <Slider className="rp-persistent-seek" min={0} max={Math.max(1, duration)} step={1}
      value={[position]} disabled={!ready} thumbLabel="Recording playback position"
      thumbValueText={(_formatted, seconds) => clock(seconds) + ' of ' + clock(duration)}
      onValueChange={value => setDraft(Array.isArray(value) ? value[0] : value)}
      onValueCommitted={value => { seek(Array.isArray(value) ? value[0] : value); setDraft(null); }}/>
    <span className="rp-persistent-time">{clock(duration)}</span>
  </div>;
}

export function RecordingPlaybackProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const dock = useRef<HTMLElement>(null);
  const [dockHeight, setDockHeight] = useState(0);
  const current = useRef<PartyTrack | null>(null);
  const queue = useRef<PartyTrack[]>([]);
  const request = useRef(0);
  const wantsPlayback = useRef(false);
  const [selected, setSelected] = useState<PartyTrack | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playError, setPlayError] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canSeek, setCanSeek] = useState(false);
  const [surface, setSurface] = useState({background:"#fff", ink:"#1b1b1b"});

  const pause = useCallback(() => {
    request.current += 1;
    wantsPlayback.current = false;
    audio.current?.pause();
    setPlaying(false);
    setLoading(false);
  }, []);

  const dismiss = useCallback(() => {
    pause();
    current.current = null;
    queue.current = [];
    setSelected(null);
    setElapsed(0);
    setDuration(0);
    setCanSeek(false);
    setPlayError(false);
    setDockHeight(0);
    if (audio.current) { audio.current.removeAttribute('src'); audio.current.load(); }
  }, [pause]);

  const start = useCallback(async (track: PartyTrack, reload = false) => {
    const player = audio.current;
    if (!player) return;
    const token = ++request.current;
    wantsPlayback.current = true;
    setPlayError(false);
    if (current.current?.id !== track.id || reload || !player.getAttribute('src')) {
      player.pause();
      current.current = track;
      setSelected(track);
      setPlaying(false);
      setElapsed(0);
      setDuration(track.duration);
      setCanSeek(false);
      player.src = '/api/recording-parties/' + encodeURIComponent(track.id) + '/audio';
      player.load();
    } else if (player.ended) {
      player.currentTime = 0;
      setElapsed(0);
    }
    setLoading(true);
    try {
      await player.play();
      if (request.current === token && wantsPlayback.current) {
        setLoading(false);
        setPlaying(!player.paused);
      }
    } catch {
      if (request.current === token && wantsPlayback.current) {
        wantsPlayback.current = false;
        setPlayError(true);
        setLoading(false);
        setPlaying(false);
      }
    }
  }, []);

  const play = useCallback((track: PartyTrack, tracks: PartyTrack[], retry = false) => {
    queue.current = tracks.filter(item => item.party === track.party);
    if (!retry && current.current?.id === track.id && wantsPlayback.current) pause();
    else void start(track, retry);
  }, [pause, start]);

  const seek = useCallback((seconds: number) => {
    const player = audio.current;
    if (!player || !Number.isFinite(player.duration)) return;
    player.currentTime = Math.max(0, Math.min(seconds, player.duration));
    setElapsed(Math.floor(player.currentTime));
  }, []);

  function ended() {
    setPlaying(false);
    setLoading(false);
    if (!wantsPlayback.current) return;
    const index = queue.current.findIndex(track => track.id === current.current?.id);
    const next = index >= 0 ? queue.current[index + 1] : undefined;
    if (next) void start(next);
    else wantsPlayback.current = false;
  }

  const queueIndex = queue.current.findIndex(track => track.id === selected?.id);
  const hasPrevious = queueIndex > 0;
  const hasNext = queueIndex >= 0 && queueIndex < queue.current.length - 1;
  function skip(direction: -1 | 1) {
    const index = queue.current.findIndex(track => track.id === current.current?.id);
    if (index < 0) return;
    const track = queue.current[index + direction];
    if (track) void start(track);
  }

  function openRecording() {
    if (!selected) return;
    const url = new URL(window.location.href);
    url.searchParams.set('party', String(selected.party));
    url.hash = 'music/recording-parties/listen';
    window.history.pushState(null, '', url.pathname + url.search + url.hash);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  useEffect(() => () => {
    request.current += 1;
    wantsPlayback.current = false;
    audio.current?.pause();
  }, []);

  useEffect(() => {
    if (!selected || !dock.current) return;
    const element = dock.current;
    const measure = () => setDockHeight(Math.ceil(element.getBoundingClientRect().height));
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [!!selected]);

  useEffect(() => {
    if (!selected) return;
    let frame = 0;
    const observer = new MutationObserver(update);
    function update() {
      const page = document.querySelector('.op-site');
      const room = page?.querySelector('.dr-room');
      const header = page?.querySelector('.df-nav');
      const next = {
        background: room ? getComputedStyle(room).backgroundColor : '#fff',
        ink: header ? getComputedStyle(header).color : '#1b1b1b',
      };
      setSurface(old => old.background === next.background && old.ink === next.ink ? old : next);
      observer.disconnect();
      if (page) observer.observe(page, {attributes:true, attributeFilter:['class', 'style']});
    }
    function afterNavigation() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(update); });
    }
    update();
    window.addEventListener('hashchange', afterNavigation);
    window.addEventListener('popstate', afterNavigation);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('hashchange', afterNavigation);
      window.removeEventListener('popstate', afterNavigation);
    };
  }, [!!selected]);

  return <DismissContext.Provider value={dismiss}>
    <PlaybackContext.Provider value={{ selected, playing, loading, playError, elapsed, duration, play, seek }}>
      {children}
      <audio
        ref={audio}
        data-recording-audio
        preload="none"
        onPlay={() => {
          if (!wantsPlayback.current) { audio.current?.pause(); return; }
          setPlaying(true);
        }}
        onPlaying={() => { if (wantsPlayback.current) { setPlaying(true); setLoading(false); } }}
        onPause={() => {
          const player = audio.current;
          if (!player?.paused) return;
          setPlaying(false);
          setLoading(false);
          if (!player.ended) wantsPlayback.current = false;
        }}
        onWaiting={() => { if (wantsPlayback.current) setLoading(true); }}
        onLoadedMetadata={() => {
          if (audio.current && Number.isFinite(audio.current.duration)) {
            setDuration(audio.current.duration);
            setCanSeek(true);
          }
        }}
        onTimeUpdate={() => setElapsed(Math.floor(audio.current?.currentTime || 0))}
        onEnded={ended}
        onError={() => {
          if (current.current && audio.current?.error) {
            wantsPlayback.current = false;
            setPlayError(true); setPlaying(false); setLoading(false); setCanSeek(false);
          }
        }}
      />
      {selected && <>
        <div className="rp-persistent-space" style={{height:dockHeight || undefined, background:surface.background}} aria-hidden="true" />
        <aside ref={dock} style={{"--player-ground":surface.background,"--player-ink":surface.ink} as CSSProperties} className="rp-persistent" aria-label="Recording Parties player">
          <button className="rp-persistent-track" onClick={openRecording} aria-label={'Open Recording Party ' + selected.party + ', Tape ' + selected.tape}>
            Now playing: Recording Party {selected.party}/ Tape {selected.tape}
            <span className="rp-persistent-status" role="status">{playError ? 'Playback unavailable' : loading ? 'Loading…' : ''}</span>
          </button>
          <PersistentSeek key={selected.id} elapsed={elapsed} duration={duration} ready={canSeek && !playError} seek={seek}/>
          <div className="rp-persistent-controls">
            <button aria-label="Previous recording" title="Previous recording" disabled={!hasPrevious} onClick={() => skip(-1)}><TransportIcon type="previous"/></button>
            <button aria-label={playError ? 'Retry recording' : playing || loading ? 'Pause recording' : 'Play recording'} title={playError ? 'Retry recording' : playing || loading ? 'Pause' : 'Play'} onClick={() => {
              if (playing || loading) pause();
              else void start(selected, playError);
            }}><TransportIcon type={playing || loading ? 'pause' : 'play'}/></button>
            <button aria-label="Next recording" title="Next recording" disabled={!hasNext} onClick={() => skip(1)}><TransportIcon type="next"/></button>
          </div>
          <button className="rp-persistent-close" aria-label="Close player" title="Close player" onClick={dismiss}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
          </button>
        </aside>
      </>}
    </PlaybackContext.Provider>
  </DismissContext.Provider>;
}
