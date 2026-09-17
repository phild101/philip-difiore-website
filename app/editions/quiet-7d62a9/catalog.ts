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

// Intrinsic dimensions keep each enlarged photograph uncropped and reserve its layout before loading.
const photographSizes: Record<string, [number, number]> = {
  '/images/in-the-city.jpg': [1380,1260],
  '/press/nyt-buffalo-hunt/img/lead.jpg': [600,317],
  '/images/ilearnednew.jpg': [640,800],
  '/images/oldfriendnew.jpg': [640,800],
  '/images/strangernew.jpg': [640,800],
  '/images/gamenew.jpg': [640,800],
  '/images/runninnew2.jpg': [640,800],
  '/images/ifyoucallnew.jpg': [640,800],
  '/images/mikodtbnew2.jpg': [640,800],
  '/images/warmspellnew.jpg': [640,800],
  '/images/quiet-edition/the-trilogy.webp': [1600,664],
  '/images/young-trouble.jpg': [964,720],
  '/images/naomi-what-have-you-done.jpg': [1380,1260],
  '/images/rival-schools.jpg': [1380,1260],
  '/images/rdgldgrn.jpg': [1400,1716],
  '/images/man-man.jpg': [1380,1260],
  '/images/diiv.jpg': [1380,1260],
  '/images/quiet-edition/antibalas.webp': [1600,898],
  '/images/savemylifenew.jpg': [640,800],
  '/images/classactressnew.jpg': [640,800],
  '/images/recording-parties.jpg': [835,1024],
  '/images/music/improvisczario-cover-v2.webp': [1254,1254],
  '/images/music/buffalo-hunt-soundtrack-cover-v2.webp': [640,640],
};
export const quietPhotographSize = (project: FeaturedProject) => photographSizes[quietPhotograph(project)];
