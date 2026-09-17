import type { Metadata } from 'next';
import { AustereEdition } from './quiet';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Austere',
  robots: { index: false, follow: false, noarchive: true },
};

export default function Page() { return <AustereEdition />; }
