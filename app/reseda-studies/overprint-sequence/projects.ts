import type { Artwork } from '../../artworks/data';
import {
  overprintArchive,
  overprintProjects,
  type FeaturedProject,
} from '../overprint/projects';

const diiv: Artwork = {
  title: 'DIIV',
  artist: 'Live at the Brooklyn Bowl',
  image: 'diiv.jpg',
  vimeo: '107213700',
};
const classActress: Artwork = {
  title: 'Class Actress',
  artist: 'Live at the Brooklyn Bowl',
  image: 'classactressnew.jpg',
  vimeo: '104872335',
};
const saveMyLife: Artwork = {
  title: 'Save My Life',
  artist: 'Har Mar Superstar & Friends',
  image: 'savemylifenew.jpg',
  vimeo: '71923847',
};
const rivalSchools: Artwork = {
  title: 'Shot After Shot',
  artist: 'Rival Schools',
  image: 'rival-schools.jpg',
  vimeo: '36565732',
};
const rdgldgrn: Artwork = {
  title: 'Power Ups',
  artist: 'RDGLDGRN',
  image: 'rdgldgrn.jpg',
  vimeo: '77447226',
};
const antibalas: Artwork = {
  title: 'Antibalas',
  artist: 'Live at the House of Soul',
  image: 'antibalasnew.jpg',
  vimeo: '50027534',
};
const liveProjects: FeaturedProject[] = [
  {
    slug: 'diiv',
    work: diiv,
    poster: '/images/sequence/diiv-overprint.png',
    heading: ['DIIV'],
    palette: 'ink',
    composition: 'right',
  },
  {
    slug: 'class-actress',
    work: classActress,
    poster: '/images/sequence/class-actress-overprint.png',
    heading: ['CLASS', 'ACTRESS'],
    palette: 'vermilion',
    composition: 'right',
  },
  {
    slug: 'save-my-life',
    work: saveMyLife,
    poster: '/images/sequence/save-my-life-overprint.png',
    heading: ['SAVE', 'MY LIFE'],
    palette: 'ink',
    composition: 'right',
  },
  {
    slug: 'antibalas',
    work: antibalas,
    poster: '/images/sequence/antibalas-overprint.png',
    heading: ['ANTIBALAS'],
    palette: 'ink',
    composition: 'right',
  },
];
const videoProjects: FeaturedProject[] = [
  {
    slug: 'rival-schools',
    work: rivalSchools,
    poster: '/images/sequence/rival-schools-vivid.png',
    heading: ['RIVAL', 'SCHOOLS'],
    palette: 'paper',
    composition: 'right',
  },
  {
    slug: 'rdgldgrn',
    work: rdgldgrn,
    poster: '/images/sequence/rdgldgrn-overprint.png',
    heading: ['RDGLDGRN'],
    palette: 'ink',
    composition: 'right',
  },
];

export const sequenceProjects = overprintProjects.flatMap((project) => {
  if (project.slug === 'man-man') return [project, ...liveProjects];
  if (project.slug === 'naomi-shelton') return [project, ...videoProjects];
  return [project];
});
export const sequenceArchive = [
  ...overprintArchive,
  diiv,
  classActress,
  saveMyLife,
  rivalSchools,
  rdgldgrn,
  antibalas,
];

export type RivalPalette = 'vivid' | 'uganda';
export const sequencePaletteProjects = {
  vivid: sequenceProjects,
  uganda: sequenceProjects.map((project) =>
    project.slug === 'rival-schools'
      ? { ...project, poster: '/images/sequence/rival-schools-uganda.png' }
      : project,
  ),
};
