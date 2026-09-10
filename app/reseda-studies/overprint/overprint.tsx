'use client';
import { DarkroomFeatured } from '../darkroom-featured/featured';
import type { OverprintEdition } from './chromatic';
import './overprint.css';
export function Overprint({
  preview = false,
  reduced = false,
  edition = 'original',
  fitScreen = false,
  fluid = false,
  posterLayout,
}: {
  preview?: boolean;
  reduced?: boolean;
  edition?: OverprintEdition;
  fitScreen?: boolean;
  fluid?: boolean;
  posterLayout?: 'vertical' | 'horizontal';
}) {
  return (
    <DarkroomFeatured
      treatment="overprint"
      preview={preview}
      reduced={reduced}
      edition={edition}
      fitScreen={fitScreen}
      fluid={fluid}
      posterLayout={posterLayout}
    />
  );
}
