'use client';
import { Sequence } from '../overprint-sequence/sequence';
import './directions.css';
export function PosterDirection({
  layout,
  preview = false,
}: {
  layout: 'vertical' | 'horizontal';
  preview?: boolean;
}) {
  return <Sequence preview={preview} posterLayout={layout} />;
}
