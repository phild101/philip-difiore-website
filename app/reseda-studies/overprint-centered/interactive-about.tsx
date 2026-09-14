'use client';

// Approved editorial About page, with the current Featured selection preserved.
export function InteractiveAbout({ featuredSlug }: { featuredSlug: string }) {
  return (
    <iframe
      title="About Philip Di Fiore — rabbit hole"
      src={'/about/charcoal/?layout=editorial&type=header&featured=' + encodeURIComponent(featuredSlug) + '#bio'}
      style={{ display: 'block', width: '100%', height: '100dvh', border: 0, background: '#fff' }}
    />
  );
}
