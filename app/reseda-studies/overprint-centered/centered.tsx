'use client';
import { PosterDirection } from '../poster-directions/directions';
import './centered.css';
export function Centered({ preview = false, landingView = 'featured' }: { preview?: boolean; landingView?: 'featured' | 'info' }) {
  return <PosterDirection layout="centered" preview={preview} landingView={landingView} />;
}
