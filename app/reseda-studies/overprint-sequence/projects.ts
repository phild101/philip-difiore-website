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
];

export const sequenceProjects = overprintProjects.flatMap((project) =>
  project.slug === 'man-man' ? [project, ...liveProjects] : [project],
);
export const sequenceArchive = [...overprintArchive, diiv, classActress];
