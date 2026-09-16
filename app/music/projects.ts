import type { FeaturedProject } from '../reseda-studies/overprint/projects';

export const musicProjects: FeaturedProject[] = [
  {
    slug: 'improvisczario',
    work: {
      title: 'Improvisczario',
      artist: 'Bernie Worrell',
      image: 'music/improvisczario-cover-v2.webp',
      externalUrl: 'https://open.spotify.com/album/6ZJ1Wj5dyy9NsEUpslzPhx?si=3etBpv6ISTConQvexkw04w',
    },
    poster: '/images/music/improvisczario-cover-v2.webp',
    aspectRatio: 1,
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
  {option: 'current', title: 'Current cover', subject: 'Saved', image: 'improvisczario-cover-v2.webp', ground: '#78272c'},
  {option: 'cyan-vermilion', title: 'Cyan / Vermilion', subject: 'Option 1', image: 'improvisczario-cyan-vermilion.webp', ground: '#008a9b'},
  {option: 'violet-citron', title: 'Violet / Citron', subject: 'Option 2', image: 'improvisczario-violet-citron.webp', ground: '#502270'},
  {option: 'ochre-petrol', title: 'Ochre / Petrol', subject: 'Option 3', image: 'improvisczario-ochre-petrol.webp', ground: '#d39a37'},
] as const;

export type ImprovisczarioOption = typeof improvisczarioStudies[number]['option'];

export function parseImprovisczarioOption(value: string | null): ImprovisczarioOption {
  return improvisczarioStudies.find(study => study.option === value)?.option ?? 'current';
}

export function withImprovisczarioOption(projects: FeaturedProject[], option: ImprovisczarioOption) {
  if (option === 'current') return projects;
  const study = improvisczarioStudies.find(study => study.option === option)!;
  return projects.map(project => project.slug === 'improvisczario'
    ? {...project, poster: '/images/music/' + study.image, work: {...project.work, image: 'music/' + study.image}}
    : project);
}
