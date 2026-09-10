import type { Metadata } from 'next';
import { PosterDirection } from '../poster-directions/directions';
export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint / Horizontal',
  description: 'Photographs, printed color, moving pictures.',
};
export default function Page() {
  return (
    <main>
      <PosterDirection layout="horizontal" />
    </main>
  );
}
