import type { Metadata } from 'next';
import { FrameColorStudies } from './studies';

export const metadata: Metadata = {
  title: 'Philip Di Fiore — Frame Color Studies',
  description:
    'Five separate color mockups for review alongside the current design.',
};

export default function Page() {
  return <FrameColorStudies />;
}
