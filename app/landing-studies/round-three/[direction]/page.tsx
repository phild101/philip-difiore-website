import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ThirdStudy } from '../studies';

const choices = ['oxblood', 'portrait', 'masthead', 'blue', 'coral'];
export const metadata: Metadata = { title: 'Landing studies — Philip Di Fiore', robots: { index: false, follow: false } };
export function generateStaticParams() { return choices.map(direction => ({ direction })); }
export default async function Page({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  if (!choices.includes(direction)) notFound();
  return <ThirdStudy direction={direction} />;
}
