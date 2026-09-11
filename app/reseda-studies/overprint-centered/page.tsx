import type { Metadata } from 'next';
import { Centered } from './centered';
export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint / Center Frame',
  description:
    'Photographic artwork between vertical lettering and an open frame.',
};
export default function Page() {
  return (
    <main>
      <Centered />
    </main>
  );
}
