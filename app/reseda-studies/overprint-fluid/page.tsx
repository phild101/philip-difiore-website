import type { Metadata } from 'next';
import { Fluid } from './fluid';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint / Fluid',
  description: 'An Overprint composition that adapts to the window.',
};

export default function Page() {
  return (
    <main>
      <Fluid />
    </main>
  );
}
