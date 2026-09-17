import type { FeaturedProject } from '../overprint/projects';

export const buffaloFilmStudies = [
  {option: 'current', title: 'Current artwork', subject: 'Saved', image: 'overprint/buffalo-hunt.webp', ground: '#f1d53f'},
  {option: 'acid-negative', title: 'Acid Negative', subject: 'New 1', image: 'sequence/buffalo-hunt-bufftry-acid-negative.webp', ground: '#172c68'},
  {option: 'cold-press', title: 'Cold Press', subject: 'New 2', image: 'sequence/buffalo-hunt-bufftry-cold-press.webp', ground: '#581e2a'},
] as const;

export type BuffaloFilmOption = typeof buffaloFilmStudies[number]['option'];

export function parseBuffaloFilmOption(value: string | null): BuffaloFilmOption {
  return buffaloFilmStudies.find(study => study.option === value)?.option ?? 'current';
}

export function withBuffaloFilmOption(projects: FeaturedProject[], option: BuffaloFilmOption) {
  if (option === 'current') return projects;
  const study = buffaloFilmStudies.find(study => study.option === option)!;
  return projects.map(project => project.slug === 'buffalo-hunt'
    ? {...project, aspectRatio: 1122 / 1402, poster: '/images/' + study.image, work: {...project.work, image: study.image}}
    : project);
}
