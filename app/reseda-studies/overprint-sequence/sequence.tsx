'use client';
import { Overprint } from '../overprint/overprint';
import './sequence.css';

export function Sequence({
  preview = false,
  landingView = 'featured',
  reduced = false,
  fitScreen = false,
  fluid = false,
  posterLayout,
}: {
  preview?: boolean;
  landingView?: 'featured' | 'info';
  reduced?: boolean;
  fitScreen?: boolean;
  fluid?: boolean;
  posterLayout?: 'vertical' | 'horizontal' | 'centered';
}) {
  return (
    <Overprint
      preview={preview}
      landingView={landingView}
      reduced={reduced}
      edition="sequence"
      fitScreen={fitScreen}
      fluid={fluid}
      posterLayout={posterLayout}
    />
  );
}
