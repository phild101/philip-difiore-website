'use client';
import { PosterDirection } from '../poster-directions/directions';
import './centered.css';
export function Centered({ preview = false }: { preview?: boolean }) {
  return <PosterDirection layout="centered" preview={preview} />;
}
