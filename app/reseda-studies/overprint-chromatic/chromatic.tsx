'use client';
import { Overprint } from '../overprint/overprint';
import './chromatic.css';

export function Chromatic({ preview = false }: { preview?: boolean }) {
  return <Overprint preview={preview} edition="chromatic" />;
}
