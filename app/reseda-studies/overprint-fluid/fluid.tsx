'use client';
import { Sequence } from '../overprint-sequence/sequence';
import './fluid.css';

export function Fluid({ preview = false }: { preview?: boolean }) {
  return <Sequence preview={preview} fluid />;
}
