import { artworks, type Artwork } from '../../artworks/data';
import type { FeaturedProject } from '../overprint/projects';
import { musicProjects } from '../../music/projects';
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
    project.slug === 'if-you-call' ? [project, ...sharonFilms]
      : project.slug === 'recording-parties' ? [project, ...musicProjects] : [project],
  );
}

export const centeredPaletteProjects = {
  vivid: withSharonFilms(sequencePaletteProjects.vivid),
  uganda: withSharonFilms(sequencePaletteProjects.uganda),
};

const filmOrder = [
  'in-the-city',
  'buffalo-hunt',
  'i-learned-the-hard-way',
  'old-friend',
  'stranger',
  'game-gets-old',
  'runnin',
  'if-you-call',
  'warm-spell',
  'the-trilogy',
  'miko-dtb',
  'young-trouble',
  'naomi-shelton',
  'rival-schools',
  'rdgldgrn',
  'man-man',
  'diiv',
  'antibalas',
  'save-my-life',
  'class-actress',
];
const filmRank = new Map(filmOrder.map((slug, index) => [slug, index]));

export function orderSiteProjects(projects: FeaturedProject[]) {
  return [...projects].sort((a, b) =>
    (filmRank.get(a.slug) ?? filmOrder.length) - (filmRank.get(b.slug) ?? filmOrder.length),
  );
}

export const centeredArchive = [
  ...sequenceArchive.map(work => work.title === 'Antibalas'
    ? { ...work, image: 'sequence/antibalas-anti-3-amber-room-rhythm.webp' }
    : work),
  learnedTheHardWay,
  theTrilogy,
];

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

export type AntibalasOption = 'current' | '1' | '2' | '3' | '3-cyan-coral' | '3-violet-citron' | '3-amber-oxblood' | '3-photo-original' | '3-photo-cyan' | '3-photo-amber' | '3-amber-room-plates' | '3-amber-room-rhythm';

const antibalasAlternatives = {
  '1': { image: 'sequence/antibalas-anti-1.webp', aspectRatio: 1073 / 1466 },
  '2': { image: 'sequence/antibalas-anti-2.webp', aspectRatio: 1060 / 1484 },
  '3': { image: 'sequence/antibalas-anti-3.webp', aspectRatio: 1122 / 1402 },
  '3-cyan-coral': { image: 'sequence/antibalas-anti-3-cyan-coral.webp', aspectRatio: 1122 / 1402 },
  '3-violet-citron': { image: 'sequence/antibalas-anti-3-violet-citron.webp', aspectRatio: 1122 / 1402 },
  '3-amber-oxblood': { image: 'sequence/antibalas-anti-3-amber-oxblood.webp', aspectRatio: 1122 / 1402 },
  '3-photo-original': { image: 'sequence/antibalas-anti-3-photo-original.webp', aspectRatio: 1122 / 1402 },
  '3-photo-cyan': { image: 'sequence/antibalas-anti-3-photo-cyan.webp', aspectRatio: 1122 / 1402 },
  '3-photo-amber': { image: 'sequence/antibalas-anti-3-photo-amber.webp', aspectRatio: 1072 / 1467 },
  '3-amber-room-plates': { image: 'sequence/antibalas-anti-3-amber-room-plates.webp', aspectRatio: 1072 / 1467 },
  '3-amber-room-rhythm': { image: 'sequence/antibalas-anti-3-amber-room-rhythm.webp', aspectRatio: 1072 / 1467 },
};

export function parseAntibalasOption(value: string | null): AntibalasOption {
  return value === 'current' || (value !== null && Object.hasOwn(antibalasAlternatives, value))
    ? value as AntibalasOption
    : '3-amber-room-rhythm';
}

export function withAntibalasOption(
  projects: FeaturedProject[],
  option: AntibalasOption,
) {
  if (option === 'current') return projects;
  const alternative = antibalasAlternatives[option];
  return projects.map((project) =>
    project.slug === 'antibalas'
      ? {
          ...project,
          work: { ...project.work, image: alternative.image },
          poster: '/images/' + alternative.image,
          aspectRatio: alternative.aspectRatio,
        }
      : project,
  );
}
