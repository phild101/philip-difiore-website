'use client';
import {useEffect,useState} from 'react';
import {Centered} from './reseda-studies/overprint-centered/centered';
import CollectionOne from './collection-one/page';
import CollectionTwo from './collection-two/page';
export default function Home(){const[legacy,setLegacy]=useState('');useEffect(()=>{const read=()=>{const q=new URLSearchParams(window.location.search);setLegacy(q.has('concept')?'one':q.has('room')?'two':'');};read();window.addEventListener('popstate',read);return()=>window.removeEventListener('popstate',read);},[]);if(legacy==='one')return <CollectionOne/>;if(legacy==='two')return <CollectionTwo/>;return <Centered landingView="info"/>;}
