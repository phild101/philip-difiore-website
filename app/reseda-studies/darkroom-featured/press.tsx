'use client';
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- The horizontal scroll region is focusable so keyboard users can scroll it with arrow keys. */
/* oxlint-disable next/no-img-element -- The publication logos are retained from the live portfolio. */
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { pressItems, type PressItem, type PressFilm } from './press-data';

type ArticleState = { slug: string; html: string; error: boolean };
export function PressArticle({
  article,
  close,
  watch,
  fullscreen = false,
}: {
  fullscreen?: boolean;
  article: PressItem | null;
  close: () => void;
  watch: (film: PressFilm) => void;
}) {
  const [content, setContent] = useState<ArticleState | null>(null);
  useEffect(() => {
    if (!article) return;
    const controller = new AbortController();
    fetch('/press-articles/' + article.slug + '.json', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Article unavailable');
        return response.json();
      })
      .then((data: unknown) => {
        if (
          !data ||
          typeof data !== 'object' ||
          !('html' in data) ||
          typeof data.html !== 'string'
        )
          throw new Error('Invalid article');
        setContent({ slug: article.slug, html: data.html, error: false });
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setContent({ slug: article.slug, html: '', error: true });
      });
    return () => controller.abort();
  }, [article]);
  const ready = article && content?.slug === article.slug ? content : null;
  return (
    <Dialog
      open={!!article}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent
        className={'df-article-dialog' + (fullscreen ? ' df-article-full' : '')}
      >
        {article && (
          <>
            <div className="df-article-toolbar">
              <DialogTitle className="df-article-label">
                {article.outlet}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {article.project}
              </DialogDescription>
              {article.videos.length > 0 && (
                <div className="df-article-watch">
                  {article.videos.map((film) => (
                    <button key={film.vimeo} onClick={() => watch(film)}>
                      Watch {film.title} ↗
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="df-article-scroll" key={article.slug}>
              {ready ? (
                ready.error ? (
                  <p className="df-article-error">
                    This article could not be loaded.{' '}
                    <a
                      href={
                        'https://philipdifiore.com/press/' + article.slug + '/'
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open the original article ↗
                    </a>
                  </p>
                ) : (
                  <article
                    className="df-article-body"
                    dangerouslySetInnerHTML={{ __html: ready.html }}
                  />
                )
              ) : (
                <output className="df-article-loading">Loading article…</output>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PressFilmstrip({
  watch,
}: {
  watch: (film: PressFilm) => void;
}) {
  const viewport = useRef<HTMLElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });
  const loopWidth = useRef(0);
  const [article, setArticle] = useState<PressItem | null>(null);
  useEffect(() => {
    const strip = viewport.current;
    if (!strip) return;
    function anchor() {
      if (!strip) return;
      const set = strip.firstElementChild as HTMLElement | null;
      if (!set) return;
      const width = set.offsetWidth;
      const offset = loopWidth.current
        ? ((strip.scrollLeft % loopWidth.current) / loopWidth.current) * width
        : 0;
      loopWidth.current = width;
      strip.scrollLeft = width + offset;
    }
    function wrap() {
      if (!strip || !loopWidth.current) return;
      const width = loopWidth.current;
      const delta =
        strip.scrollLeft >= width * 2
          ? -width
          : strip.scrollLeft < width * 0.5
            ? width
            : 0;
      if (delta) {
        strip.scrollTo({ left: strip.scrollLeft + delta, behavior: 'instant' });
        if (drag.current.active) drag.current.scroll += delta;
      }
    }
    function wheel(event: WheelEvent) {
      if (
        !strip ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        event.ctrlKey
      )
        return;
      event.preventDefault();
      const factor =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? strip.clientWidth
            : 1;
      strip.scrollLeft += event.deltaY * factor;
    }
    function move(event: PointerEvent) {
      if (!strip || !drag.current.active) return;
      const distance = event.clientX - drag.current.startX;
      if (Math.abs(distance) > 4) {
        drag.current.moved = true;
        strip.dataset.dragging = 'true';
        strip.scrollLeft = drag.current.scroll - distance;
      }
    }
    function release() {
      drag.current.active = false;
      if (strip) delete strip.dataset.dragging;
    }
    anchor();
    const observer = new ResizeObserver(anchor);
    observer.observe(strip);
    strip.addEventListener('scroll', wrap, { passive: true });
    strip.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    return () => {
      observer.disconnect();
      strip.removeEventListener('scroll', wrap);
      strip.removeEventListener('wheel', wheel);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
  }, []);
  function scroll(direction: number) {
    const strip = viewport.current;
    if (!strip) return;
    strip.scrollBy({
      left: direction * Math.max(strip.clientWidth * 0.8, 260),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <section className="df-press" aria-labelledby="df-press-heading">
      <div className="df-press-heading">
        <h2 id="df-press-heading">PRESS</h2>
        <div className="df-press-arrows">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous press articles"
          >
            <svg viewBox="0 0 30 40" fill="none" aria-hidden="true">
              <path
                d="m24 3-17 17 17 17"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          <button onClick={() => scroll(1)} aria-label="Next press articles">
            <svg viewBox="0 0 30 40" fill="none" aria-hidden="true">
              <path
                d="m6 3 17 17-17 17"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <section
        className="df-press-strip"
        ref={viewport}
        aria-label="Press filmstrip"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            scroll(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          drag.current = {
            active: true,
            startX: event.clientX,
            scroll: viewport.current?.scrollLeft ?? 0,
            moved: false,
          };
        }}
        onClickCapture={(event) => {
          if (event.detail !== 0 && drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        {[0, 1, 2].map((copy) => (
          <div
            className="df-press-set"
            key={copy}
            aria-hidden={copy !== 1 ? true : undefined}
          >
            {pressItems.map((item) => (
              <button
                className="df-press-card"
                key={item.slug}
                tabIndex={copy === 1 ? 0 : -1}
                onClick={() => setArticle(item)}
                aria-label={'Read ' + item.outlet + ': ' + item.project}
              >
                <span className="df-press-logo">
                  {item.logo ? (
                    <img
                      src={'/press-logos/' + item.logo}
                      alt={item.outlet}
                      draggable={false}
                    />
                  ) : (
                    <span className="df-bb">Bedford + Bowery</span>
                  )}
                </span>
                <span className="df-press-caption">{item.project}</span>
              </button>
            ))}
          </div>
        ))}
      </section>
      <PressArticle
        article={article}
        close={() => setArticle(null)}
        watch={watch}
      />
    </section>
  );
}
