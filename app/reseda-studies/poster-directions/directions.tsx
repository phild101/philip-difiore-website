'use client';
import { Sequence } from '../overprint-sequence/sequence';
import './directions.css';
export function PosterDirection({
  layout,
  preview = false,
  landingView = 'featured',
  reduced = false,
}: {
  layout: 'vertical' | 'horizontal' | 'centered';
  preview?: boolean;
  landingView?: 'featured' | 'info';
  reduced?: boolean;
}) {
  return <Sequence landingView={landingView} preview={preview} posterLayout={layout} reduced={reduced} />;
}
