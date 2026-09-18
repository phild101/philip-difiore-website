'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SectionNavigation } from './navigation';
import { BioPreview, type BioPreviewItem } from './bio-preview';
import type { FeaturedProject } from '../overprint/projects';
import { featuredPoster } from '../overprint/chromatic';
import { isMusicProject } from '../../music/projects';
import { projectLinks } from '../darkroom-featured/press-data';
import './info.css';

export function InfoPage({ filmSlug, projects, homeHref = '#film/if-you-call', projectImage, navigation }: { filmSlug: string; projects: FeaturedProject[]; homeHref?: string; projectImage?: (project: FeaturedProject) => string; navigation?: ReactNode }) {
  const biography = useRef<HTMLElement>(null);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  function project(slug: string): BioPreviewItem {
    const item = projects.find(item => item.slug === slug)!;
    return {
      title: item.work.title,
      image: projectImage ? projectImage(item) : featuredPoster(item, 'sequence'),
      aspectRatio: item.slug === 'improvisczario' ? item.aspectRatio : undefined,
      href: '#' + (isMusicProject(slug) ? 'music/' : 'film/') + slug,
    };
  }
  const academy = projectLinks.find(link => link.outlet === 'Academy Collection')!;
  function preview(id: string, title: string, items: BioPreviewItem[], children: ReactNode = title) {
    return <BioPreview id={id} title={title} items={items} active={activePreview} setActive={setActivePreview}>{children}</BioPreview>;
  }
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Info — Philip Di Fiore';
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const article = biography.current;
    if (!article) return;
    const sync = () => {
      const choice = new URLSearchParams(window.location.search).get('info');
      if (choice === 'bold' || (choice === null && window.location.pathname === '/')) {
        article.dataset.infoFont = 'bold';
      } else {
        delete article.dataset.infoFont;
      }
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      delete article.dataset.infoFont;
    };
  }, []);

  return (
    <div className="info-site">
      <div className="info-frame">
        <header className="info-header">
          <a href={homeHref} aria-label="Philip Di Fiore — Home">Philip Di Fiore</a>
          {navigation ?? <SectionNavigation active="info" filmSlug={filmSlug} />}
        </header>
        <main className="info-content" aria-label="Info about Philip Di Fiore">
          <h1 className="info-sr-only">Philip Di Fiore</h1>
          <article ref={biography} className="info-bio" aria-label="Biography">
            <figure className="info-portrait">
            <img
              src="/images/info/philip-modern-noir.png"
              alt="Black-and-white portrait of Philip Di Fiore"
              width={1122}
              height={1402}
            />
            </figure>
            <p>Philip Di Fiore is an award-winning filmmaker known for his {preview('storytelling', 'cinematic storytelling', ['in-the-city', 'buffalo-hunt', 'i-learned-the-hard-way'].map(project))} and {preview('narratives', 'mind-bending narratives', [project('old-friend')])}. He writes his own stories and edits his own films.</p>
            <p>The {preview('academy', 'Academy of Motion Picture Arts and Sciences', [{title: 'Academy Film Archive', image: '/press-logos/' + academy.logo, href: academy.href, external: true, logo: true}])} selected his film <em>{preview('stranger', 'Stranger: Bernie Worrell on Earth', [project('stranger')])}</em> for inclusion in the Academy Film Archive, its permanent film collection.</p>
            <p>Di Fiore produces {preview('music', 'music projects', [project('recording-parties'), project('improvisczario')])} and {preview('scores', 'film scores', [project('buffalo-hunt-soundtrack')])}. He built a recording studio and soundstage in Brooklyn, NY (The Rumpus Room) which he operated for ten years.</p>
            <p>Di Fiore organizes and MC’s <em>{preview('parties', 'Recording Parties', [project('recording-parties')])}</em>- relaxed gatherings where musicians from different circles meet, socialize and play. The music from these parties is recorded and archived.</p>
            <p>He builds apps, tools and games for writing, filmmaking and the creative process.</p>
            <p><a className="info-email" href="mailto:info@philipdifiore.com">info@philipdifiore.com</a></p>
          </article>
        </main>
      </div>
    </div>
  );
}
