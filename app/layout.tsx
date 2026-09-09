import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Philip Di Fiore — 19 Website Studies',description:'Nineteen website studies: six original portfolio directions, six interactive browser artworks, a Reseda adaptation, and six composed visual studies.',robots:{index:false,follow:false}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
