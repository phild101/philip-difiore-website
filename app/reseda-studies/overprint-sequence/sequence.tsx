'use client';
import { Overprint } from '../overprint/overprint';
import './sequence.css';

export function Sequence({
  preview = false,
  fitScreen = false,
  fluid = false,
}: {
  preview?: boolean;
  fitScreen?: boolean;
  fluid?: boolean;
}) {
  return (
    <Overprint
      preview={preview}
      edition="sequence"
      fitScreen={fitScreen}
      fluid={fluid}
    />
  );
}
