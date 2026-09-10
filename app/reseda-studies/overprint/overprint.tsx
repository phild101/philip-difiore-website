'use client';
import { DarkroomFeatured } from '../darkroom-featured/featured';
import './overprint.css';
export function Overprint({ preview = false }: { preview?: boolean }) {
  return <DarkroomFeatured treatment="overprint" preview={preview} />;
}
