import type { Metadata } from 'next';
import { VerticalType } from './vertical-type';
export const metadata: Metadata = {
  title: 'Philip Di Fiore — Vertical / Smaller Type',
  description: 'Original Vertical artwork with category lettering 25% smaller.',
};
export default function Page() {
  return (
    <main>
      <VerticalType />
    </main>
  );
}
