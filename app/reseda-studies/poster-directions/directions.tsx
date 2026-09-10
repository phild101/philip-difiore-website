'use client';
import { Sequence } from '../overprint-sequence/sequence';
import './directions.css';
export function PosterDirection({
  layout,
  preview = false,
  reduced = false,
}: {
  layout: 'vertical' | 'horizontal';
  preview?: boolean;
  reduced?: boolean;
}) {
  return <Sequence preview={preview} posterLayout={layout} reduced={reduced} />;
}
