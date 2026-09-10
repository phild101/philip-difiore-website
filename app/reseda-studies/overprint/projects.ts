import { artworks, type Artwork } from '../../artworks/data';
export type FeaturedWork =
  | Artwork
  | { title: string; artist: string; image: string; articleSlug: string };
export type FeaturedProject = {
  slug: string;
  work: FeaturedWork;
  poster: string;
  heading: string[];
  palette:
    | 'vermilion'
    | 'yellow'
    | 'paper'
    | 'cobalt'
    | 'ink'
    | 'paper-red'
    | 'paper-blue';
  composition: 'right' | 'left' | 'center';
};
const inTheCity: Artwork = {
  title: 'In the City',
  artist: 'Caveman',
  image: 'in-the-city.jpg',
  vimeo: '99170468',
};
const youngTrouble: Artwork = {
  title: 'Young Trouble',
  artist: 'Sinkane',
  image: 'young-trouble.jpg',
  vimeo: '120972341',
};
const naomi: Artwork = {
  title: 'What Have You Done',
  artist: 'Naomi Shelton & The Gospel Queens',
  image: 'naomi-what-have-you-done.jpg',
  vimeo: '39072847',
};
const manMan: Artwork = {
  title: 'Man Man',
  artist: 'Live at the Brooklyn Bowl',
  image: 'man-man.jpg',
  vimeo: '104872340',
};
const recordingParties: FeaturedWork = {
  title: 'Recording Parties',
  artist: 'The Rumpus Room',
  image: 'recording-parties.jpg',
  articleSlug: 'bedford-bowery-recording-parties',
};
export const overprintProjects: FeaturedProject[] = [
  {
    slug: 'if-you-call',
    work: artworks[5],
    poster: '/images/overprint/if-you-call.png',
    heading: ['SHARON JONES', '& THE', 'DAP-KINGS'],
    palette: 'vermilion',
    composition: 'right',
  },
  {
    slug: 'old-friend',
    work: artworks[0],
    poster: '/images/overprint/old-friend.png',
    heading: ['OLD', 'FRIEND'],
    palette: 'yellow',
    composition: 'right',
  },
  {
    slug: 'stranger',
    work: artworks[1],
    poster: '/images/overprint/stranger.png',
    heading: ['STRANGER'],
    palette: 'paper',
    composition: 'left',
  },
  {
    slug: 'in-the-city',
    work: inTheCity,
    poster: '/images/overprint/in-the-city.png',
    heading: ['IN THE', 'CITY'],
    palette: 'cobalt',
    composition: 'right',
  },
  {
    slug: 'runnin',
    work: artworks[4],
    poster: '/images/overprint/runnin.png',
    heading: ['RUNNIN’'],
    palette: 'ink',
    composition: 'center',
  },
  {
    slug: 'warm-spell',
    work: artworks[2],
    poster: '/images/overprint/warm-spell.png',
    heading: ['WARM', 'SPELL'],
    palette: 'vermilion',
    composition: 'left',
  },
  {
    slug: 'miko-dtb',
    work: artworks[7],
    poster: '/images/overprint/miko-dtb.png',
    heading: ['MIKO', 'D.T.B.'],
    palette: 'yellow',
    composition: 'center',
  },
  {
    slug: 'young-trouble',
    work: youngTrouble,
    poster: '/images/overprint/young-trouble.png',
    heading: ['YOUNG', 'TROUBLE'],
    palette: 'paper-red',
    composition: 'right',
  },
  {
    slug: 'naomi-shelton',
    work: naomi,
    poster: '/images/overprint/naomi-shelton.png',
    heading: ['NAOMI', 'SHELTON', '& THE GOSPEL', 'QUEENS'],
    palette: 'paper-blue',
    composition: 'left',
  },
  {
    slug: 'man-man',
    work: manMan,
    poster: '/images/overprint/man-man.png',
    heading: ['MAN', 'MAN'],
    palette: 'ink',
    composition: 'center',
  },
  {
    slug: 'recording-parties',
    work: recordingParties,
    poster: '/images/overprint/recording-parties.png',
    heading: ['RECORDING', 'PARTIES'],
    palette: 'cobalt',
    composition: 'right',
  },
  {
    slug: 'buffalo-hunt',
    work: artworks[3],
    poster: '/images/overprint/buffalo-hunt.png',
    heading: ['THE', 'BUFFALO', 'HUNT'],
    palette: 'paper-blue',
    composition: 'left',
  },
];
export const darkroomProjects = overprintProjects.slice(0, 2);
export const darkroomArchive = [5, 0, 2, 1, 3, 4, 6, 7].map((n) => artworks[n]);
export const overprintArchive = [
  ...darkroomArchive,
  inTheCity,
  youngTrouble,
  naomi,
  manMan,
  recordingParties,
];
