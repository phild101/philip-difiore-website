'use client';

import { useEffect, useRef, useState } from 'react';

// Keep the approved free-form layout isolated from the older design studies.
export function InteractiveAbout({ featuredSlug }: { featuredSlug: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1110);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    let observer: ResizeObserver | undefined;
    function measure() {
      const body = element?.contentDocument?.body;
      if (!body) return;
      const nextHeight = Math.ceil(body.getBoundingClientRect().height);
      if (nextHeight > 0) setHeight(nextHeight);
    }
    function loaded() {
      observer?.disconnect();
      const body = element?.contentDocument?.body;
      if (!body) return;
      observer = new ResizeObserver(measure);
      observer.observe(body);
      measure();
    }
    element.addEventListener('load', loaded);
    loaded();
    return () => {
      observer?.disconnect();
      element.removeEventListener('load', loaded);
    };
  }, []);

  return (
    <iframe
      ref={frame}
      title="About Philip Di Fiore — interactive biography"
      src={'/about/overprint/index.html?featured=' + encodeURIComponent(featuredSlug)}
      style={{ display: 'block', width: '100%', height, border: 0, background: '#fff' }}
    />
  );
}
