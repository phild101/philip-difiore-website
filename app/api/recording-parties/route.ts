import { recordingTracks } from '@/lib/recording-parties';
export async function GET() {
  try {
    const rows = await recordingTracks();
    return Response.json({ tracks: rows.map((row: {party_number: number; tape_number: number; export_version: number; title: string; duration_seconds: number}) => ({
      id: [row.party_number, row.tape_number, row.export_version].join('-'),
      party: row.party_number, tape: row.tape_number, title: row.title, duration: Number(row.duration_seconds),
    })) }, { headers: { 'Cache-Control': 'private, max-age=60' } });
  } catch {
    return Response.json({ error: 'The recordings could not be loaded. Please try again.' }, {status: 503, headers: {'Cache-Control':'no-store'}});
  }
}
