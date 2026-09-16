import type { FeaturedProject } from '../reseda-studies/overprint/projects';

export const musicProjects: FeaturedProject[] = [
  {
    slug: 'improvisczario',
    work: {
      title: 'Improvisczario',
      artist: 'Bernie Worrell',
      image: 'music/improvisczario-lynch-signal-ghost.webp',
      externalUrl: 'https://open.spotify.com/album/6ZJ1Wj5dyy9NsEUpslzPhx?si=3etBpv6ISTConQvexkw04w',
    },
    poster: '/images/music/improvisczario-lynch-signal-ghost.webp',
    aspectRatio: 1122 / 1402,
    heading: ['BERNIE WORRELL', 'IMPROVISCZARIO'],
    palette: 'ink',
    composition: 'right',
  },
  {
    slug: 'buffalo-hunt-soundtrack',
    work: {
      title: 'The Buffalo Hunt Soundtrack',
      artist: 'Jason Hill',
      image: 'music/buffalo-hunt-soundtrack-overprint.webp',
      externalUrl: 'https://open.spotify.com/album/2Oq3TjoyVG34DzLTqJboHY?si=ab-fTyeAQT6Y2ufNJ41ncw',
    },
    poster: '/images/music/buffalo-hunt-soundtrack-overprint.webp',
    aspectRatio: 1122 / 1402,
    heading: ['THE BUFFALO HUNT', 'SOUNDTRACK'],
    palette: 'ink',
    composition: 'right',
  },
];

export function isMusicProject(slug: string) {
  return slug === 'recording-parties' || musicProjects.some(project => project.slug === slug);
}

export const improvisczarioStudies = [
  {option: 'current', title: 'Original cover', subject: 'Saved', image: 'improvisczario-cover-v2.webp', ground: '#78272c'},
  {option: 'cyan-vermilion', title: 'Cyan / Vermilion', subject: 'Option 1', image: 'improvisczario-cyan-vermilion.webp', ground: '#008a9b'},
  {option: 'violet-citron', title: 'Violet / Citron', subject: 'Option 2', image: 'improvisczario-violet-citron.webp', ground: '#502270'},
  {option: 'ochre-petrol', title: 'Ochre / Petrol', subject: 'Option 3', image: 'improvisczario-ochre-petrol.webp', ground: '#d39a37'},
] as const;

export const improvisczarioFigureStudies = [
  {option: 'figure-petrol-bone', title: 'Petrol / Bone', subject: 'Option 1', image: 'improvisczario-figure-petrol-bone.webp', ground: '#163d42'},
  {option: 'figure-oxblood-rose', title: 'Oxblood / Rose', subject: 'Option 2', image: 'improvisczario-figure-oxblood-rose.webp', ground: '#4e2028'},
  {option: 'figure-charcoal-ochre', title: 'Charcoal / Ochre', subject: 'Option 3', image: 'improvisczario-figure-charcoal-ochre.webp', ground: '#2b2c29'},
] as const;

export const improvisczarioLynchStudies = [
  {...improvisczarioFigureStudies[0], subject: 'Saved'},
  {option: 'figure-lynch-night-session', title: 'Night Session', subject: 'Option 1', image: 'improvisczario-lynch-night-session.webp', ground: '#0e1718'},
  {option: 'figure-lynch-signal-ghost', title: 'Signal Ghost', subject: 'Selected', image: 'improvisczario-lynch-signal-ghost.webp', ground: '#242b2b'},
  {option: 'figure-lynch-purple-beret', title: 'Signal Ghost — Purple Beret', subject: 'Saved', image: 'improvisczario-lynch-purple-beret.webp', ground: '#242b2b'},
] as const;

export const improvisczarioPhotoOverprintStudies = [
  {option: 'figure-photo-petrol-ochre', title: 'Petrol / Ochre', subject: 'Original preview', image: 'improvisczario-photo-petrol-ochre.webp', ground: '#163b40'},
  {option: 'figure-photo-oxblood-rose', title: 'Oxblood / Rose', subject: 'New 1', image: 'improvisczario-photo-oxblood-rose.webp', ground: '#4d2028'},
  {option: 'figure-photo-indigo-ice', title: 'Indigo / Ice', subject: 'New 2', image: 'improvisczario-photo-indigo-ice.webp', ground: '#202b43'},
] as const;

const allImprovisczarioStudies = [...improvisczarioStudies, ...improvisczarioFigureStudies, ...improvisczarioLynchStudies, ...improvisczarioPhotoOverprintStudies];
export type ImprovisczarioOption = typeof allImprovisczarioStudies[number]['option'];

export function parseImprovisczarioOption(value: string | null): ImprovisczarioOption {
  return allImprovisczarioStudies.find(study => study.option === value)?.option ?? 'figure-lynch-signal-ghost';
}

export function withImprovisczarioOption(projects: FeaturedProject[], option: ImprovisczarioOption) {
  const study = allImprovisczarioStudies.find(study => study.option === option)!;
  return projects.map(project => project.slug === 'improvisczario'
    ? {...project, aspectRatio: option.startsWith('figure-') ? 1122 / 1402 : 1, poster: '/images/music/' + study.image, work: {...project.work, image: 'music/' + study.image}}
    : project);
}
