'use client';
import { Sequence } from '../overprint-sequence/sequence';
import './screen-fit.css';

export function ScreenFit({ preview = false }: { preview?: boolean }) {
  return <Sequence preview={preview} fitScreen />;
}
