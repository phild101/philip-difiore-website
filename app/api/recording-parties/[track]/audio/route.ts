import { recordingPlayback } from '@/lib/recording-parties';
export async function GET(_request: Request, { params }: {params: Promise<{track: string}>}) {
  try {
    const {track} = await params;
    const url = await recordingPlayback(track);
    if (!url) return new Response('Recording not found', {status: 404});
    return new Response(null, {status: 302, headers: {Location: url, 'Cache-Control': 'no-store'}});
  } catch {
    return new Response('This recording is temporarily unavailable. Please try again.', {status: 503, headers: {'Cache-Control':'no-store'}});
  }
}
