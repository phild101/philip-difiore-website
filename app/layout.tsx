import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Philip Di Fiore — Six Design Directions',description:'Six interactive visual concepts for Philip Di Fiore’s film portfolio.',robots:{index:false,follow:false}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>;}
