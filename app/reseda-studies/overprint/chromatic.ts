import type { CSSProperties } from 'react';
import type { FeaturedProject } from './projects';

export type OverprintEdition = 'original' | 'chromatic' | 'sequence';
type Palette = {
  ground: string;
  type: string;
  paper: string;
  ink: string;
  label: string;
  labelInk: string;
};
export const chromaticPalettes: Record<string, Palette> = {
  'if-you-call': {
    ground: '#3a2338',
    type: '#f2b99a',
    paper: '#e8d6c2',
    ink: '#231c24',
    label: '#f2b99a',
    labelInk: '#3a2338',
  },
  'old-friend': {
    ground: '#dfa48c',
    type: '#243c32',
    paper: '#ece2cc',
    ink: '#243c32',
    label: '#243c32',
    labelInk: '#ece2cc',
  },
  stranger: {
    ground: '#d5a5b2',
    type: '#302d32',
    paper: '#e5ddd8',
    ink: '#302d32',
    label: '#c3c995',
    labelInk: '#302d32',
  },
  'in-the-city': {
    ground: '#123f42',
    type: '#ce9872',
    paper: '#d5ded6',
    ink: '#183236',
    label: '#d5ded6',
    labelInk: '#123f42',
  },
  runnin: {
    ground: '#bdc69b',
    type: '#4a252f',
    paper: '#ece7d4',
    ink: '#4a252f',
    label: '#4a252f',
    labelInk: '#ece7d4',
  },
  'warm-spell': {
    ground: '#4b3529',
    type: '#d1accc',
    paper: '#ede0cf',
    ink: '#4b3529',
    label: '#d1accc',
    labelInk: '#4b3529',
  },
  'miko-dtb': {
    ground: '#40284b',
    type: '#c5ca78',
    paper: '#e0d7e6',
    ink: '#40284b',
    label: '#e0d7e6',
    labelInk: '#40284b',
  },
  'young-trouble': {
    ground: '#b5d6d0',
    type: '#783f30',
    paper: '#e2e8df',
    ink: '#292b2a',
    label: '#783f30',
    labelInk: '#e2e8df',
  },
  'naomi-shelton': {
    ground: '#d9b36d',
    type: '#312236',
    paper: '#ede2d3',
    ink: '#312236',
    label: '#312236',
    labelInk: '#d9b36d',
  },
  'man-man': {
    ground: '#332d3e',
    type: '#b8d0ba',
    paper: '#e7dedf',
    ink: '#332d3e',
    label: '#cea1b2',
    labelInk: '#332d3e',
  },
  'recording-parties': {
    ground: '#b4c3a4',
    type: '#3c302a',
    paper: '#e8dfd0',
    ink: '#3c302a',
    label: '#cfa1ad',
    labelInk: '#3c302a',
  },
  'buffalo-hunt': {
    ground: '#c8b6d0',
    type: '#5d3b29',
    paper: '#e7dfca',
    ink: '#694832',
    label: '#694832',
    labelInk: '#e7dfca',
  },
};

export function chromaticProperties(slug: string): CSSProperties {
  const palette = chromaticPalettes[slug];
  return {
    '--cs-ground': palette.ground,
    '--cs-type': palette.type,
    '--cs-paper': palette.paper,
    '--cs-ink': palette.ink,
    '--cs-label': palette.label,
    '--cs-label-ink': palette.labelInk,
  } as CSSProperties;
}

export function featuredPoster(
  project: FeaturedProject,
  edition: OverprintEdition,
) {
  if (edition === 'sequence') {
    if (project.slug === 'runnin') return '/images/sequence/runnin-v3.png';
    if (project.slug === 'young-trouble')
      return '/images/sequence/young-trouble-v2.png';
    if (project.slug === 'man-man') return '/images/chromatic/man-man.png';
    if (project.slug === 'recording-parties')
      return '/images/sequence/recording-parties-v3.png';
  }
  return edition === 'chromatic'
    ? '/images/chromatic/' + project.slug + '.png'
    : project.poster;
}
