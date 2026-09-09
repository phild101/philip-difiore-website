'use client';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import type {Artwork} from '../artworks/data';
import './shared.css';
export function Screening({work,close}:{work:Artwork|null;close:()=>void}){return <Dialog open={!!work} onOpenChange={open=>{if(!open)close();}}><DialogContent className="study-screening">{work&&<><DialogTitle>{work.title}</DialogTitle><DialogDescription>{work.artist} · A film by Philip Di Fiore</DialogDescription><iframe src={`https://player.vimeo.com/video/${work.vimeo}?autoplay=1&title=0&byline=0&portrait=0`} title="Film screening" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/><a href={'https://vimeo.com/'+work.vimeo} target="_blank" rel="noreferrer">View on Vimeo ↗</a></>}</DialogContent></Dialog>}
