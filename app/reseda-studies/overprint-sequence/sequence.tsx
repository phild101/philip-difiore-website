'use client';
import { Overprint } from '../overprint/overprint';
import './sequence.css';

export function Sequence({
  preview = false,
  reduced = false,
  fitScreen = false,
  fluid = false,
  posterLayout,
}: {
  preview?: boolean;
  reduced?: boolean;
  fitScreen?: boolean;
  fluid?: boolean;
  posterLayout?: 'vertical' | 'horizontal';
}) {
  return (
    <Overprint
      preview={preview}
      reduced={reduced}
      edition="sequence"
      fitScreen={fitScreen}
      fluid={fluid}
      posterLayout={posterLayout}
    />
  );
}
