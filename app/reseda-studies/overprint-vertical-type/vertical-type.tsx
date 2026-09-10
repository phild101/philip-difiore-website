'use client';
import { PosterDirection } from '../poster-directions/directions';
import './vertical-type.css';
export function VerticalType({ preview = false }: { preview?: boolean }) {
  return (
    <div className="vertical-smaller-type">
      <PosterDirection layout="vertical" preview={preview} />
    </div>
  );
}
