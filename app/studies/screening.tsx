'use client';
import { useEffect } from 'react';
import { useDismissRecording } from '../music/recording-parties/playback';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Artwork } from '../artworks/data';
import './shared.css';
export function Screening({
  work,
  close,
  fullscreen = false,
}: {
  work: Artwork | null;
  close: () => void;
  fullscreen?: boolean;
}) {
  const dismissRecording = useDismissRecording();
  useEffect(() => { if (work) dismissRecording(); }, [work, dismissRecording]);
  return (
    <Dialog
      open={!!work}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent
        fullscreen={fullscreen}
        className={
          'study-screening' + (fullscreen ? ' study-screening-full' : '')
        }
      >
        {work && (
          <>
            <DialogTitle className={fullscreen ? 'sr-only' : undefined}>
              {work.title}
            </DialogTitle>
            <DialogDescription className={fullscreen ? 'sr-only' : undefined}>
              {work.artist} · A film by Philip Di Fiore
            </DialogDescription>
            <iframe
              src={`https://player.vimeo.com/video/${work.vimeo}?autoplay=1&title=0&byline=0&portrait=0${fullscreen ? '&transparent=0' : ''}`}
              title="Film screening"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            {!fullscreen && (
              <a
                href={'https://vimeo.com/' + work.vimeo}
                target="_blank"
                rel="noreferrer"
              >
                View on Vimeo ↗
              </a>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
