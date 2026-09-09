import {notFound} from 'next/navigation';
import {BeautifulComposition} from '../beautiful';
import {beautyStudies} from '../data';
import type {Metadata} from 'next';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;const study=beautyStudies.find(s=>s.slug===slug);return {title:study?`Philip Di Fiore — ${study.name}`:'Study not found'};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const kind=beautyStudies.findIndex(s=>s.slug===slug);if(kind<0)notFound();return <main><BeautifulComposition kind={kind}/></main>;}
