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
const theTrilogy: Artwork = {
  title: 'The Trilogy',
  artist: 'Sharon Jones & The Dap-Kings',
  image: 'sequence/the-trilogy-double-exposure.webp',
  vimeo: '36364375',
};
const sharonFilms: FeaturedProject[] = [
  {
    slug: 'i-learned-the-hard-way',
    work: learnedTheHardWay,
    poster: '/images/sequence/i-learned-the-hard-way-overprint.webp',
    heading: ['I LEARNED', 'THE HARD WAY'],
    palette: 'ink',
    composition: 'right',
  },
  {
    slug: 'game-gets-old',
    work: artworks[6],
    poster: '/images/sequence/game-gets-old-overprint.webp',
    heading: ['GAME', 'GETS OLD'],
    palette: 'ink',
    composition: 'left',
  },
  {
    slug: 'the-trilogy',
    work: theTrilogy,
    poster: '/images/sequence/the-trilogy-double-exposure.webp',
    aspectRatio: 1122 / 1402,
    heading: ['THE', 'TRILOGY'],
    palette: 'ink',
    composition: 'right',
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
export const centeredArchive = [...sequenceArchive, learnedTheHardWay, theTrilogy];

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
      '/images/sequence/in-the-city-night-glass.webp',
      1072 / 1467,
    ),
    uganda: withCityPoster(
      centeredPaletteProjects.uganda,
      '/images/sequence/in-the-city-night-glass.webp',
      1072 / 1467,
    ),
  },
  vertigo: {
    vivid: withCityPoster(
      centeredPaletteProjects.vivid,
      '/images/sequence/in-the-city-vertigo-v2.webp',
      1122 / 1402,
    ),
    uganda: withCityPoster(
      centeredPaletteProjects.uganda,
      '/images/sequence/in-the-city-vertigo-v2.webp',
      1122 / 1402,
    ),
  },
};
export type CityOption = keyof typeof centeredCityProjects;

export type TrilogyOption = 'current' | 'heavy' | 'double-exposure';

const trilogyAlternatives = {
  current: {
    image: 'sequence/the-trilogy-overprint-v2.webp',
    aspectRatio: 1122 / 1402,
  },
  heavy: {
    image: 'sequence/the-trilogy-heavy-overprint.webp',
    aspectRatio: 1122 / 1402,
  },
};

export function withTrilogyOption(
  projects: FeaturedProject[],
  option: TrilogyOption,
) {
  if (option === 'double-exposure') return projects;
  const alternative = trilogyAlternatives[option];
  return projects.map((project) =>
    project.slug === 'the-trilogy'
      ? {
          ...project,
          work: { ...project.work, image: alternative.image },
          poster: '/images/' + alternative.image,
          aspectRatio: alternative.aspectRatio,
        }
      : project,
  );
}
