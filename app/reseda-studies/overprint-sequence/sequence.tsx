'use client';
import { Overprint } from '../overprint/overprint';
import './sequence.css';

export function Sequence({
  preview = false,
  fitScreen = false,
}: {
  preview?: boolean;
  fitScreen?: boolean;
}) {
  return (
    <Overprint preview={preview} edition="sequence" fitScreen={fitScreen} />
  );
}
