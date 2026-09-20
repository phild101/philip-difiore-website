'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import './project-gallery.css';

type Photo = { src: string; thumbnail: string; width: number; height: number; alt: string };

function GalleryPhotographs({ photos }: { photos: Photo[] }) {
  const [viewport, api] = useEmblaCarousel({
    loop: true, duration: 25,
    breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
  });
  const [selected, setSelected] = useState(0);
  const thumbnails = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const select = () => setSelected(api.selectedScrollSnap());
    select();
    api.on('select', select);
    return () => { api.off('select', select); };
  }, [api]);

  useEffect(() => {
    thumbnails.current?.children[selected]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [selected]);

  useEffect(() => {
    if (!api) return;
    const navigate = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') api.scrollPrev(); else api.scrollNext();
    };
    window.addEventListener('keydown', navigate, true);
    return () => window.removeEventListener('keydown', navigate, true);
  }, [api]);

  return <div className="pg-photographs">
    <div className="pg-viewport" ref={viewport} role="region" aria-label="Film photographs" aria-roledescription="carousel" tabIndex={0}>
      <div className="pg-track">
        {photos.map((photo, i) => <div className="pg-slide" key={photo.src} role="group" aria-roledescription="slide"
          aria-label={`${i + 1} of ${photos.length}`} aria-hidden={i !== selected || undefined}>
          <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height}
            loading={i === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
        </div>)}
      </div>
    </div>
    <div className="pg-controls">
      <button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous photograph">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
      </button>
      <output aria-live="polite" aria-atomic="true">{selected + 1} / {photos.length}</output>
      <button type="button" onClick={() => api?.scrollNext()} aria-label="Next photograph">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>
    <div className="pg-thumbnails" ref={thumbnails} role="group" aria-label="Choose a photograph">
      {photos.map((photo, i) => <button key={photo.src} type="button" aria-label={`Photograph ${i + 1}`}
        aria-pressed={i === selected} onClick={() => api?.scrollTo(i)}>
        <img src={photo.thumbnail} alt="" width={96} height={64} loading="lazy" draggable={false} />
      </button>)}
    </div>
  </div>;
}

export function BuffaloHuntGallery({ open, close, returnFocus }: { open: boolean; close: () => void; returnFocus: RefObject<HTMLButtonElement | null> }) {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!open || photos) return;
    const controller = new AbortController();
    setError(false);
    fetch('/images/buffalo-hunt-gallery/photos.json', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Gallery unavailable'); return response.json(); })
      .then((items: unknown) => {
        if (!Array.isArray(items) || !items.length || items.some(photo => !photo ||
          typeof photo.src !== 'string' || typeof photo.thumbnail !== 'string' || typeof photo.alt !== 'string' ||
          typeof photo.width !== 'number' || typeof photo.height !== 'number')) throw new Error('Invalid gallery');
        setPhotos(items);
      })
      .catch(error => { if (error.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, [open, photos, attempt]);

  return <Dialog open={open} onOpenChange={value => { if (!value) close(); }}>
    <DialogContent fullscreen showCloseButton={false} className="pg-dialog" finalFocus={returnFocus}>
      <header className="pg-header">
        <div><DialogTitle className="pg-title">The Buffalo Hunt</DialogTitle>
          <DialogDescription className="pg-description">Photo gallery</DialogDescription></div>
        <DialogClose className="pg-close" aria-label="Close photo gallery">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </DialogClose>
      </header>
      {photos ? <GalleryPhotographs photos={photos} /> : <div className="pg-status" role="status">
        {error ? <><p>The photographs couldn’t load.</p><button onClick={() => setAttempt(value => value + 1)}>Try again</button></> : 'Loading photographs…'}
      </div>}
    </DialogContent>
  </Dialog>;
}
