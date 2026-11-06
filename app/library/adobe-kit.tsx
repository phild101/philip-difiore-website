'use client';

import { useEffect, useRef } from 'react';

// Phil's Adobe Fonts kit (ITC Avant Garde Gothic), loaded without blocking the page. The stylesheet starts as a print sheet,
// which the browser fetches without holding the page back, and becomes a screen sheet when it has arrived. On 2026-11-05 the kit
// took more than 60 seconds to answer on pages that loaded it the blocking way, and those pages stayed blank for that time.
// When the face's two main weights have loaded, the page's root takes the class kit-ready; a page may hold its large type back
// until then, for 2 seconds at most (ag-landing.css, ag-info.css), so that the type does not show first in a fallback face.
export function AdobeKit() {
  const link = useRef<HTMLLinkElement>(null);
  useEffect(() => {
    const el = link.current;
    if (!el) return;
    const root = document.documentElement;
    const ready = () => root.classList.add('kit-ready');
    const show = () => {
      el.media = 'all';
      const weights = ['700', '300'].map(w => document.fonts.load(w + ' 40px "itc-avant-garde-gothic-pro"', 'AB'));
      Promise.all(weights).then(ready, ready);
    };
    if (el.sheet) show();
    else el.addEventListener('load', show, { once: true });
    const late = window.setTimeout(ready, 2000);
    return () => { el.removeEventListener('load', show); window.clearTimeout(late); };
  }, []);
  return <link ref={link} rel="stylesheet" href="https://use.typekit.net/iof8yta.css" media="print" />;
}
