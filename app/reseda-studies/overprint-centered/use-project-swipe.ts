'use client';

import { useRef, type PointerEvent, type MouseEvent, type AnimationEvent } from 'react';

// Keep ordinary vertical scrolling and pinch zoom; only claim a deliberate
// horizontal gesture on the artwork itself, never on the links beneath it.
export function useProjectSwipe(enabled: boolean, move: (step: 1 | -1) => void) {
  const gesture = useRef<{ id: number; x: number; y: number; dx: number; horizontal: boolean } | null>(null);
  const suppressClickUntil = useRef(0);

  function reset(surface: HTMLElement) {
    gesture.current = null;
    delete surface.dataset.dragging;
    surface.style.setProperty('--cf-swipe-offset', '0px');
  }

  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      if (!enabled || event.pointerType === 'mouse') return;
      if (!event.isPrimary) {
        reset(event.currentTarget);
        return;
      }
      if (!window.matchMedia('(max-width: 760px), (max-width: 1024px) and (max-height: 540px) and (pointer: coarse)').matches) return;
      suppressClickUntil.current = 0;
      event.currentTarget.style.setProperty('--cf-swipe-release', '0px');
      event.currentTarget.style.setProperty('--cf-swipe-settle', '180ms');
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, horizontal: false };
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (!start.horizontal) {
        if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
          reset(event.currentTarget);
          return;
        }
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
        start.horizontal = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = 'true';
      }
      start.dx = dx;
      suppressClickUntil.current = Date.now() + 600;
      // A little resistance keeps the current poster in view during the drag.
      const offset = Math.max(-event.currentTarget.clientWidth * .35, Math.min(event.currentTarget.clientWidth * .35, dx * .65));
      event.currentTarget.style.setProperty('--cf-swipe-offset', offset + 'px');
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const start = gesture.current;
      if (!start || start.id !== event.pointerId) return;
      if (start.horizontal) suppressClickUntil.current = Date.now() + 600;
      const threshold = Math.max(44, event.currentTarget.clientWidth * .12);
      const committed = start.horizontal && Math.abs(start.dx) >= threshold;
      const release = event.currentTarget.style.getPropertyValue('--cf-swipe-offset');
      reset(event.currentTarget);
      if (committed) {
        event.currentTarget.style.setProperty('--cf-swipe-settle', '0ms');
        event.currentTarget.style.setProperty('--cf-swipe-release', release);
        move(start.dx < 0 ? 1 : -1);
      }
    },
    onPointerCancel(event: PointerEvent<HTMLDivElement>) {
      reset(event.currentTarget);
    },
    onLostPointerCapture(event: PointerEvent<HTMLDivElement>) {
      // Capturing on the stage releases the image's implicit touch capture.
      // That bubbled event is not the end of the stage's gesture.
      if (event.target === event.currentTarget) reset(event.currentTarget);
    },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      // A swipe on a film/Spotify link must not also activate that link.
      if (event.detail !== 0 && Date.now() < suppressClickUntil.current) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    onDragStart(event: MouseEvent<HTMLDivElement>) {
      event.preventDefault();
    },
    onAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
      if (event.animationName === 'cf-swipe-arrive')
        event.currentTarget.style.setProperty('--cf-swipe-release', '0px');
    },
  };
}
