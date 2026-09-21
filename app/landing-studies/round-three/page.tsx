import type { Metadata } from 'next';
import { AllLandingStudies } from '../all/comparison';
export const metadata: Metadata = { title: 'All landing studies — Philip Di Fiore', robots: { index: false, follow: false } };
export default function Page() { return <AllLandingStudies />; }
