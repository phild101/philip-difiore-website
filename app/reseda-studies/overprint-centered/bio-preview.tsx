'use client';

import type { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';

export type BioPreviewItem = {
  title: string;
  image: string;
  aspectRatio?: number;
  href: string;
  external?: boolean;
  logo?: boolean;
};

export function BioPreview({ id, title, children, items, active, setActive }: {
  id: string;
  title: string;
  children: ReactNode;
  items: BioPreviewItem[];
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  return <Popover open={active === id} onOpenChange={open => setActive(open ? id : null)}>
    <PopoverTrigger className="info-project-link" nativeButton={false} render={<span />}
      openOnHover delay={180} closeDelay={220} aria-label={'Explore ' + title}>
      {children}
    </PopoverTrigger>
    <PopoverContent className="info-preview" side="top" sideOffset={12} align="center"
      initialFocus={type => type === 'keyboard'} data-count={items.length}>
      <div className="info-preview-heading">
        <PopoverTitle>{title}</PopoverTitle>
        <button className="info-preview-close" onClick={() => setActive(null)} aria-label="Close preview">×</button>
      </div>
      <div className="info-preview-grid">
        {items.map(item => <a key={item.href} className={'info-preview-card' + (item.logo ? ' info-preview-logo' : '')}
          href={item.href} target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined} onClick={() => setActive(null)}
          aria-label={item.title + (item.external ? ' (opens in a new tab)' : '')}>
          <img src={item.image} alt="" style={item.aspectRatio ? { aspectRatio: item.aspectRatio } : undefined} />
          <span>{item.title}</span>
        </a>)}
      </div>
    </PopoverContent>
  </Popover>;
}
