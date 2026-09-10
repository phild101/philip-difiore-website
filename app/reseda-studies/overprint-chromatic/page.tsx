import type { Metadata } from 'next';
import { Chromatic } from './chromatic';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint / Chromatic',
  description: 'Twelve photographic collages. Twelve distinct color palettes.',
};

export default function Page() {
  return (
    <main>
      <Chromatic />
    </main>
  );
}
