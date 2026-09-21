import type { Metadata } from 'next';
import { LandingComparison } from './studies';
export const metadata: Metadata = { title: 'Landing page studies — Philip Di Fiore', robots: { index: false, follow: false } };
export default function Page() { return <LandingComparison />; }
