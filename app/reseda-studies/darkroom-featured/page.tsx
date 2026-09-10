import type { Metadata } from 'next';
import { DarkroomFeatured } from './featured';
export const metadata: Metadata = {
  title: 'Philip Di Fiore — Darkroom / Featured',
  description:
    'Featured films, biography and an archive of moving pictures by Philip Di Fiore.',
};
export default function Page() {
  return (
    <main>
      <DarkroomFeatured />
    </main>
  );
}
