import type { Metadata } from 'next';
import { RecordingPlaybackProvider } from './music/recording-parties/playback';
import './globals.css';
import './reseda/reseda.css';
import './catalog/catalog.css';
import './reseda-darkroom/darkroom.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://philipdifiore.com'),
  title: 'Philip Di Fiore — Film & Music',
  description: 'Philip Di Fiore is an award-winning filmmaker known for his cinematic storytelling and mind-bending narratives. Films, music projects, and Recording Parties.',
  alternates: { canonical: 'https://philipdifiore.com/' },
  robots: { index: true, follow: true },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><RecordingPlaybackProvider>{children}</RecordingPlaybackProvider></body></html>;}
