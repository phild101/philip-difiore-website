import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LandingStudy } from '../studies';
export const metadata: Metadata = { title: 'Landing page study — Philip Di Fiore', robots: { index: false, follow: false } };
export function generateStaticParams() { return ['poster', 'cinema', 'duet', 'editorial', 'index'].map(direction => ({direction})); }
export default async function Page({params}: {params: Promise<{direction: string}>}) {
  const {direction} = await params;
  if (!['poster', 'cinema', 'duet', 'editorial', 'index'].includes(direction)) notFound();
  return <LandingStudy direction={direction} />;
}
