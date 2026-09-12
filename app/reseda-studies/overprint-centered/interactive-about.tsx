'use client';

// Keep the approved free-form layout isolated from the older design studies.
export function InteractiveAbout({ featuredSlug }: { featuredSlug: string }) {
  return (
    <iframe
      title="About Philip Di Fiore — interactive biography"
      src={'/about/overprint/index.html?featured=' + encodeURIComponent(featuredSlug)}
      style={{ display: 'block', width: '100%', height: '100dvh', border: 0, background: '#fff' }}
    />
  );
}
