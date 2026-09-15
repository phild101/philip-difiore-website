'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { PartyTrack } from './types';
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
const PauseContext = createContext<() => void>(() => {});

export function useRecordingPlayback() {
  const value = useContext(PlaybackContext);
  if (!value) throw new Error('Recording playback provider is missing.');
  return value;
}
export function usePauseRecording() { return useContext(PauseContext); }

export function RecordingPlaybackProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
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

  const pause = useCallback(() => {
    request.current += 1;
    wantsPlayback.current = false;
    audio.current?.pause();
    setPlaying(false);
    setLoading(false);
  }, []);

  const start = useCallback(async (track: PartyTrack, restart = false, reload = false) => {
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
      player.src = '/api/recording-parties/' + encodeURIComponent(track.id) + '/audio';
      player.load();
    } else if (restart || player.ended) {
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
    else void start(track, false, retry);
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

  return <PauseContext.Provider value={pause}>
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
          if (audio.current && Number.isFinite(audio.current.duration)) setDuration(audio.current.duration);
        }}
        onTimeUpdate={() => setElapsed(Math.floor(audio.current?.currentTime || 0))}
        onEnded={ended}
        onError={() => {
          if (current.current && audio.current?.error) {
            wantsPlayback.current = false;
            setPlayError(true); setPlaying(false); setLoading(false);
          }
        }}
      />
      {selected && <>
        <div className="rp-persistent-space" aria-hidden="true" />
        <aside className="rp-persistent" aria-label="Recording Parties player">
          <button className="rp-persistent-track" onClick={openRecording} aria-label={'Open Recording Party ' + selected.party + ', Tape ' + selected.tape}>
            Party {selected.party} <span className="rp-persistent-divider" aria-hidden="true">/</span> Tape {selected.tape}
            <span className="rp-persistent-status" role="status">{playError ? 'Playback unavailable' : loading ? 'Loading…' : ''}</span>
          </button>
          <div className="rp-persistent-controls">
            <button aria-label={playError ? 'Retry recording' : playing || loading ? 'Pause recording' : 'Resume recording'} onClick={() => {
              if (playing || loading) pause();
              else void start(selected, false, playError);
            }}>{playError ? 'Retry' : playing || loading ? 'Pause' : 'Resume'}</button>
            <button aria-label="Restart recording from beginning" onClick={() => void start(selected, true, playError)}>Restart</button>
          </div>
        </aside>
      </>}
    </PlaybackContext.Provider>
  </PauseContext.Provider>;
}
