'use client';
import { DarkroomFeatured } from '../darkroom-featured/featured';
import type { OverprintEdition } from './chromatic';
import './overprint.css';
export function Overprint({
  preview = false,
  edition = 'original',
  fitScreen = false,
  fluid = false,
}: {
  preview?: boolean;
  edition?: OverprintEdition;
  fitScreen?: boolean;
  fluid?: boolean;
}) {
  return (
    <DarkroomFeatured
      treatment="overprint"
      preview={preview}
      edition={edition}
      fitScreen={fitScreen}
      fluid={fluid}
    />
  );
}
