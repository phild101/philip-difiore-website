'use client';
import { Overprint } from '../overprint/overprint';
import './sequence.css';

export function Sequence({ preview = false }: { preview?: boolean }) {
  return <Overprint preview={preview} edition="sequence" />;
}
