'use client';

// Approved editorial About page, with the current Featured selection preserved.
export function InteractiveAbout({ featuredSlug }: { featuredSlug: string }) {
  const dark = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('about') === 'dark';
  return (
    <iframe
      title="About Philip Di Fiore — rabbit hole"
      src={'/about/charcoal/?layout=editorial&type=header' + (dark ? '&theme=dark' : '') + '&featured=' + encodeURIComponent(featuredSlug) + '#bio'}
      style={{ display: 'block', width: '100%', height: '100dvh', border: 0, background: dark ? '#30302f' : '#fff' }}
    />
  );
}
