import {Darkroom} from '../../reseda-darkroom/darkroom';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Philip Di Fiore — Reseda / Darkroom'};
export default function Page(){return <main><Darkroom focused/></main>;}
