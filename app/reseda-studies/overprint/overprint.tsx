'use client';
import { DarkroomFeatured } from '../darkroom-featured/featured';
import type { OverprintEdition } from './chromatic';
import './overprint.css';
export function Overprint({
  preview = false,
  edition = 'original',
}: {
  preview?: boolean;
  edition?: OverprintEdition;
}) {
  return (
    <DarkroomFeatured
      treatment="overprint"
      preview={preview}
      edition={edition}
    />
  );
}
