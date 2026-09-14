export type SiteSection = 'film' | 'music' | 'info';

export function SectionNavigation({
  active,
  filmSlug,
}: {
  active: SiteSection;
  filmSlug: string;
}) {
  return (
    <nav aria-label="Main navigation">
      <a href={'#film/' + filmSlug} aria-current={active === 'film' ? 'page' : undefined}>Film</a>
      <a href="#music/recording-parties" aria-current={active === 'music' ? 'page' : undefined}>Music</a>
      <a href="#info" aria-current={active === 'info' ? 'page' : undefined}>Info</a>
    </nav>
  );
}
