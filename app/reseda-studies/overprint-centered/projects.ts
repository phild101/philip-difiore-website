import { artworks, type Artwork } from '../../artworks/data';
import type { FeaturedProject } from '../overprint/projects';
import {
  sequenceArchive,
  sequencePaletteProjects,
} from '../overprint-sequence/projects';

const learnedTheHardWay: Artwork = {
  title: 'I Learned the Hard Way',
  artist: 'Sharon Jones & The Dap-Kings',
  image: 'ilearnednew.jpg',
  vimeo: '36354563',
};
const sharonFilms: FeaturedProject[] = [
  {
    slug: 'i-learned-the-hard-way',
    work: learnedTheHardWay,
    poster: '/images/sequence/i-learned-the-hard-way-overprint.png',
    heading: ['I LEARNED', 'THE HARD WAY'],
    palette: 'ink',
    composition: 'right',
  },
  {
    slug: 'game-gets-old',
    work: artworks[6],
    poster: '/images/sequence/game-gets-old-overprint.png',
    heading: ['GAME', 'GETS OLD'],
    palette: 'ink',
    composition: 'left',
  },
];

function withSharonFilms(projects: FeaturedProject[]) {
  return projects.flatMap((project) =>
    project.slug === 'if-you-call' ? [project, ...sharonFilms] : [project],
  );
}

export const centeredPaletteProjects = {
  vivid: withSharonFilms(sequencePaletteProjects.vivid),
  uganda: withSharonFilms(sequencePaletteProjects.uganda),
};
export const centeredArchive = [...sequenceArchive, learnedTheHardWay];

function withCityPoster(
  projects: FeaturedProject[],
  poster: string,
  aspectRatio: number,
) {
  return projects.map((project) =>
    project.slug === 'in-the-city'
      ? { ...project, poster, aspectRatio }
      : project,
  );
}

export const centeredCityProjects = {
  original: centeredPaletteProjects,
  'night-glass': {
    vivid: withCityPoster(
      centeredPaletteProjects.vivid,
      '/images/sequence/in-the-city-night-glass.png',
      1072 / 1467,
    ),
    uganda: withCityPoster(
      centeredPaletteProjects.uganda,
      '/images/sequence/in-the-city-night-glass.png',
      1072 / 1467,
    ),
  },
  vertigo: {
    vivid: withCityPoster(
      centeredPaletteProjects.vivid,
      '/images/sequence/in-the-city-vertigo.png',
      1122 / 1402,
    ),
    uganda: withCityPoster(
      centeredPaletteProjects.uganda,
      '/images/sequence/in-the-city-vertigo.png',
      1122 / 1402,
    ),
  },
};
export type CityOption = keyof typeof centeredCityProjects;
