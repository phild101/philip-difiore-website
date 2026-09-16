'use client';
import { DarkroomFeatured } from '../darkroom-featured/featured';
import type { OverprintEdition } from './chromatic';
import './overprint.css';
export function Overprint({
  preview = false,
  landingView = 'featured',
  reduced = false,
  edition = 'original',
  fitScreen = false,
  fluid = false,
  posterLayout,
}: {
  preview?: boolean;
  landingView?: 'featured' | 'info';
  reduced?: boolean;
  edition?: OverprintEdition;
  fitScreen?: boolean;
  fluid?: boolean;
  posterLayout?: 'vertical' | 'horizontal' | 'centered';
}) {
  return (
    <DarkroomFeatured
      treatment="overprint"
      preview={preview}
      landingView={landingView}
      reduced={reduced}
      edition={edition}
      fitScreen={fitScreen}
      fluid={fluid}
      posterLayout={posterLayout}
    />
  );
}
