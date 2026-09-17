import { notFound } from 'next/navigation';
import { pressItems } from '../../reseda-studies/darkroom-featured/press-data';
import { LegacyPressReader } from './reader';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = pressItems.find(item => item.slug === slug);
  if (!article) notFound();
  return <LegacyPressReader article={article} />;
}
