'use client';

import { useEffect, useRef, useState, type ReactNode, type MutableRefObject } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';

const phoneQuery = '(max-width: 760px), (max-width: 1024px) and (max-height: 540px) and (pointer: coarse)';

export function useMobileCarousel(enabled: boolean) {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const media = window.matchMedia(phoneQuery);
    const update = () => setPhone(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [enabled]);
  return enabled && phone;
}

export function MobileProjectCarousel({ indices, selected, renderSlide, onSelect, controller }: {
  indices: number[];
  selected: number;
  renderSlide: (index: number) => ReactNode;
  onSelect: (index: number) => void;
  controller: MutableRefObject<EmblaCarouselType | undefined>;
}) {
  // startIndex is mount-only: changing carousel options during selection would
  // reinitialize its physics and interrupt the very next touch.
  const initial = useRef(indices.indexOf(selected));
  const callback = useRef(onSelect);
  callback.current = onSelect;
  const [viewport, api] = useEmblaCarousel({
    loop: true, startIndex: initial.current, skipSnaps: false,
    watchSlides: false, duration: 25,
    breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
  });
  const listKey = indices.join(',');

  useEffect(() => {
    controller.current = api;
    if (!api) return;
    const update = () => callback.current(indices[api.selectedScrollSnap()]);
    const settle = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        api.scrollTo(api.selectedScrollSnap(), true);
    };
    api.on('select', update);
    api.on('pointerUp', settle);
    return () => {
      api.off('select', update);
      api.off('pointerUp', settle);
      if (controller.current === api) controller.current = undefined;
    };
  }, [api, controller, listKey]);

  useEffect(() => {
    if (!api) return;
    const destination = indices.indexOf(selected);
    // Only external navigation (hash/back/forward) needs synchronization.
    if (destination !== api.selectedScrollSnap()) api.scrollTo(destination, true);
  }, [api, selected, listKey]);

  return <div className="cf-carousel" ref={viewport} aria-roledescription="carousel">
    <div className="cf-carousel-track">
      {indices.map((index, position) => (
        <div className="cf-carousel-slide" key={index} role="group" aria-roledescription="slide"
          aria-label={`${position + 1} of ${indices.length}`}
          aria-hidden={index !== selected || undefined} inert={index !== selected || undefined}>
          {renderSlide(index)}
        </div>
      ))}
    </div>
  </div>;
}
