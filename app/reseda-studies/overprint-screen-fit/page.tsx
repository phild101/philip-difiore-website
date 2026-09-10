import type { Metadata } from 'next';
import { ScreenFit } from './screen-fit';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Overprint / Screen Fit',
  description: 'The complete Overprint composition, fitted to the screen.',
};

export default function Page() {
  return (
    <main>
      <ScreenFit />
    </main>
  );
}
