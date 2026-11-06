'use client';

import { useEffect, useRef, useState } from 'react';
import { PressArticle } from '../reseda-studies/darkroom-featured/press';
import { BuffaloHuntGallery } from '../reseda-studies/darkroom-featured/project-gallery';
import { pressItems, type PressItem, type PressFilm } from '../reseda-studies/darkroom-featured/press-data';
import { useDismissRecording } from '../music/recording-parties/playback';

// Film and Music as a stand of Library covers (Phil, 2026-11-05: "I'd like you to mockup the site with LIBRARY COVERS option using
// the site images", then "This is great"). The page is the approved mockup's own code and styles, served from /library/ as they
// are (ag.css and ag.js from Studio 101, site.css, library.css, data.js, stand.js), and drawn inside a shadow root, so that the
// site's other styles and the Library's styles never meet. This component gives the page what the site already has: the press
// articles, The Buffalo Hunt's photo gallery, and the rule that a film stops the Recording Parties player.
type Stand = { show: (section: string, slug: string) => void; watch: (vimeo: string, title: string) => void; destroy: () => void };
type StandOptions = { onPress: (slug: string) => void; onGallery: (link: HTMLElement) => void; onWatch: () => void; busy: () => boolean };
declare global {
  interface Window { LibraryStand?: { mount: (root: ShadowRoot, options: StandOptions) => Stand } }
}

const STYLES = ['/library/ag.css', '/library/site.css', '/library/library.css'];
const SCRIPTS = ['/library/ag.js', '/library/data.js', '/library/stand.js'];
const FACES = /@font-face\s*\{[^}]*\}/g;

// The Library's styles are written for a page of their own: body[data-area="library"], body, html and :root. Inside the shadow
// root the host element stands for that page. The host starts from the browser's own values, as a page does, and it clips what
// runs past its sides without becoming a scroll box, so that the header stays locked at the top of the window.
function forHost(css: string) {
  return ':host{all:initial;display:block;min-height:100vh;min-height:100dvh}\n' +
    css.replace(FACES, '')
      .replace(/body\[data-area="library"\]/g, ':host')
      .replace(/body\.(is-[a-z]+)/g, ':host(.$1)')
      .replace(/(^|[{},\s])(?:html|body|:root)(?=\s*\{)/g, '$1:host') +
    '\n:host{overflow-x:clip}';
}

let assets: Promise<string> | null = null;
function load() {
  if (!assets) {
    assets = (async () => {
      const texts = await Promise.all(STYLES.map(async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(url);
        return response.text();
      }));
      const css = texts.join('\n');
      // A font face counts only in the page itself, not inside a shadow root: the Library's fallback faces go to the page.
      const faces = css.match(FACES);
      if (faces && !document.querySelector('style[data-library-faces]')) {
        const style = document.createElement('style');
        style.dataset.libraryFaces = '';
        style.textContent = faces.join('\n');
        document.head.append(style);
      }
      return forHost(css);
    })();
    // The scripts download together and run in their order (async = false), while the styles download.
    const scripts = Promise.all(SCRIPTS.map(src => new Promise<void>((done, fail) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => done();
      script.onerror = () => fail(new Error(src));
      document.head.append(script);
    })));
    assets = Promise.all([assets, scripts]).then(([css]) => css);
    assets.catch(() => { assets = null; });
  }
  return assets;
}

export function Library({ section, slug }: { section: 'film' | 'music'; slug: string }) {
  const host = useRef<HTMLDivElement>(null);
  const stand = useRef<Stand | null>(null);
  const want = useRef({ section, slug });
  const busy = useRef(false);
  const galleryButton = useRef<HTMLButtonElement | null>(null);
  const [article, setArticle] = useState<PressItem | null>(null);
  const [gallery, setGallery] = useState(false);
  const [failed, setFailed] = useState(false);
  const dismissRecording = useDismissRecording();
  const dismiss = useRef(dismissRecording);

  useEffect(() => { dismiss.current = dismissRecording; }, [dismissRecording]);
  useEffect(() => { busy.current = !!article || gallery; }, [article, gallery]);
  useEffect(() => {
    want.current = { section, slug };
    stand.current?.show(section, slug);
  }, [section, slug]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let gone = false;
    load().then(css => {
      if (gone || !window.LibraryStand) return;
      const root = element.shadowRoot ?? element.attachShadow({ mode: 'open' });
      root.replaceChildren();
      const style = document.createElement('style');
      style.textContent = css;
      root.append(style);
      stand.current = window.LibraryStand.mount(root, {
        onPress: pressSlug => setArticle(pressItems.find(item => item.slug === pressSlug) ?? null),
        onGallery: link => { galleryButton.current = link as HTMLButtonElement; setGallery(true); },
        onWatch: () => dismiss.current(),
        busy: () => busy.current,
      });
      stand.current.show(want.current.section, want.current.slug);
    }).catch(() => { if (!gone) setFailed(true); });
    return () => {
      gone = true;
      stand.current?.destroy();
      stand.current = null;
    };
  }, []);

  function watchPressFilm(work: PressFilm) {
    setArticle(null);
    stand.current?.watch(work.vimeo, work.title);
  }

  return <>
    <style>{'html,body{background:#f6f2e9}'}</style>
    <div ref={host} className="library-host" data-area="library" data-page={section} />
    {failed && <p style={{ padding: 40, color: '#171512', font: '700 12px/1.6 "DM Sans",Arial,sans-serif', letterSpacing: '.05em', textTransform: 'uppercase' }}>
      The page could not load. <a href="" onClick={event => { event.preventDefault(); window.location.reload(); }} style={{ borderBottom: '1px solid currentColor' }}>Try again</a>
    </p>}
    <PressArticle article={article} fullscreen close={() => setArticle(null)} watch={watchPressFilm} />
    <BuffaloHuntGallery open={gallery} close={() => setGallery(false)} returnFocus={galleryButton} />
  </>;
}
