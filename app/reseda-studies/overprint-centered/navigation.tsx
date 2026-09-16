'use client';

import { useEffect, useRef } from 'react';
import './header-preview.css';

export type SiteSection = 'film' | 'music' | 'info' | 'press';

export function SectionNavigation({
  active,
  filmSlug,
}: {
  active: SiteSection;
  filmSlug: string;
}) {
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = navigation.current?.closest('header');
    if (!header) return;
    const sync = () => {
      const choice = new URLSearchParams(window.location.search).get('header');
      if (choice === 'bold' || (choice === null && window.location.pathname === '/')) {
        header.dataset.headerFont = 'bold';
      } else {
        delete header.dataset.headerFont;
      }
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      delete header.dataset.headerFont;
    };
  }, []);

  return (
    <nav ref={navigation} aria-label="Main navigation">
      <a href={'#film/' + filmSlug} aria-current={active === 'film' ? 'page' : undefined}>Film</a>
      <a href="#music/recording-parties" aria-current={active === 'music' ? 'page' : undefined}>Music</a>
      <a href="#info" aria-current={active === 'info' ? 'page' : undefined}>Info</a>
    </nav>
  );
}
