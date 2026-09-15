import type { Metadata } from 'next';
import { RecordingPlaybackProvider } from './music/recording-parties/playback';
import './globals.css';
import './reseda/reseda.css';
import './catalog/catalog.css';
import './reseda-darkroom/darkroom.css';
export const metadata:Metadata={title:'Philip Di Fiore — 20 Website Studies',description:'Twenty website studies: six original portfolio directions, six interactive browser artworks, a Reseda adaptation, six composed visual studies, and Reseda in a darkroom.',robots:{index:false,follow:false}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><RecordingPlaybackProvider>{children}</RecordingPlaybackProvider></body></html>;}
