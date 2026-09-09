import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Philip Di Fiore — Browser Studies',description:'Two collections of website studies. Six original portfolio directions and six interactive browser artworks.',robots:{index:false,follow:false}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
