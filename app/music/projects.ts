import type { FeaturedProject } from '../reseda-studies/overprint/projects';

export const musicProjects: FeaturedProject[] = [
  {
    slug: 'improvisczario',
    work: {
      title: 'Improvisczario',
      artist: 'Bernie Worrell',
      image: 'music/improvisczario-overprint.webp',
      externalUrl: 'https://open.spotify.com/album/6ZJ1Wj5dyy9NsEUpslzPhx?si=3etBpv6ISTConQvexkw04w',
    },
    poster: '/images/music/improvisczario-overprint.webp',
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
