import type { Metadata } from 'next';
import { QuietEdition } from './quiet';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Quiet edition',
  robots: { index: false, follow: false, noarchive: true },
};

export default function Page() { return <QuietEdition />; }
