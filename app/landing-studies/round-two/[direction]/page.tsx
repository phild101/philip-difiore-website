import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RoundTwoStudy } from '../studies';

const choices = ['reveal', 'room', 'titles', 'compose', 'story'];
export const metadata: Metadata = {
  title: 'A new opening — Philip Di Fiore',
  robots: { index: false, follow: false },
};
export function generateStaticParams() { return choices.map(direction => ({ direction })); }
export default async function Page({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  if (!choices.includes(direction)) notFound();
  return <RoundTwoStudy direction={direction} />;
}
