import type {Metadata} from 'next';
import {DarkroomMagazine} from './magazine';
export const metadata:Metadata={title:'Philip Di Fiore — Darkroom/Magazine',description:'Darkroom/Magazine. Films and images presented as an editorial journal.'};
export default function Page(){return <main><DarkroomMagazine/></main>;}
