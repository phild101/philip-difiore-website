import { centeredPaletteProjects, orderSiteProjects } from '../../reseda-studies/overprint-centered/projects';
import type { FeaturedProject } from '../../reseda-studies/overprint/projects';

// Separate display assets; the shared project records retain all current links and ordering.
const photographs: Record<string, string> = {
  'buffalo-hunt': '/press/nyt-buffalo-hunt/img/lead.jpg',
  'the-trilogy': '/images/quiet-edition/the-trilogy.webp',
  antibalas: '/images/quiet-edition/antibalas.webp',
  improvisczario: '/images/music/improvisczario-cover-v2.webp',
  'buffalo-hunt-soundtrack': '/images/music/buffalo-hunt-soundtrack-cover-v2.webp',
};

export const quietProjects = orderSiteProjects(centeredPaletteProjects.vivid);
export function quietPhotograph(project: FeaturedProject) {
  return photographs[project.slug] || '/images/' + project.work.image;
}
