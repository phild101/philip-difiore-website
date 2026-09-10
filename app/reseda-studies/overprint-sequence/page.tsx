import type { Metadata } from 'next';
import { Sequence } from './sequence';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint / Sequence',
  description:
    'Film, video, live performances and music. An Overprint sequence.',
};

export default function Page() {
  return (
    <main>
      <Sequence />
    </main>
  );
}
