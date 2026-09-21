import type { Metadata } from 'next';
import { AllLandingStudies } from './comparison';
export const metadata: Metadata = { title: 'All 15 landing studies — Philip Di Fiore', robots: { index: false, follow: false } };
export default function Page() { return <AllLandingStudies />; }
