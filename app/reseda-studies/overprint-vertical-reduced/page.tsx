import type { Metadata } from 'next';
import { PosterDirection } from '../poster-directions/directions';
export const metadata: Metadata = {
  title: 'Philip Di Fiore — Vertical / 85%',
  description: 'The complete Vertical composition, reduced together to 85%.',
};
export default function Page() {
  return (
    <main>
      <PosterDirection layout="vertical" reduced />
    </main>
  );
}
