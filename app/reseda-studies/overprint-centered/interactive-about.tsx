'use client';

// Approved placeholder while the larger biography and connections are compiled.
export function InteractiveAbout({ featuredSlug }: { featuredSlug: string }) {
  return (
    <iframe
      title="About Philip Di Fiore — rabbit hole"
      src={'/about/rabbit-hole-open/?featured=' + encodeURIComponent(featuredSlug) + '#bio'}
      style={{ display: 'block', width: '100%', height: '100dvh', border: 0, background: '#fff' }}
    />
  );
}
