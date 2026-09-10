import type { Metadata } from 'next';
import { Overprint } from './overprint';
export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint',
  description:
    'Film, photographs and printed fragments. An artist portfolio in vermilion, cobalt and paper.',
};
export default function Page() {
  return (
    <main>
      <Overprint />
    </main>
  );
}
