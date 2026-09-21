import type { Metadata } from 'next';
import { RoundTwoComparison } from './studies';

export const metadata: Metadata = {
  title: 'Five new openings — Philip Di Fiore',
  robots: { index: false, follow: false },
};
export default function Page() { return <RoundTwoComparison />; }
