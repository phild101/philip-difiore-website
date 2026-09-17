import { recordingServiceKey } from './recording-environment';

const origin = 'https://gjvvbofpkxuicrpshxun.supabase.co';
const bucket = 'recording-parties-audio';
type RecordingRow = {
  party_number: number; tape_number: number; export_version: number;
  title: string; duration_seconds: number; storage_bucket: string; storage_path: string;
};
// Exact project and bucket: this server helper cannot sign arbitrary user paths.
async function recordingRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const key = recordingServiceKey();
  if (!key) throw new Error('Recording service is not configured');
  const response = await fetch(origin + path, {
    ...init,
    headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Recording service unavailable');
  return response.json() as Promise<T>;
}
export async function recordingTracks() {
  return recordingRequest<RecordingRow[]>('/rest/v1/recording_party_tracks?project_id=eq.9&select=party_number,tape_number,export_version,title,duration_seconds,storage_bucket,storage_path&order=party_number,tape_number,export_version');
}
export async function recordingPlayback(id: string): Promise<string | null> {
  if (!/^\d+-\d+-\d+$/.test(id)) return null;
  const rows = await recordingTracks();
  const track = rows.find((row: {party_number: number; tape_number: number; export_version: number}) =>
    [row.party_number, row.tape_number, row.export_version].join('-') === id);
  if (!track || track.storage_bucket !== bucket || !/^party-[1-3]\/RRParty[1-3]-Tape\d+-InProg\d+\.mp3$/.test(track.storage_path)) return null;
  const signed = await recordingRequest<{signedURL: string}>('/storage/v1/object/sign/' + bucket + '/' + track.storage_path,
    { method: 'POST', body: JSON.stringify({ expiresIn: 14400 }) });
  const url = new URL(signed.signedURL, origin + '/storage/v1/');
  // Supabase returns /object/sign/... relative to /storage/v1.
  if (url.pathname.startsWith('/object/')) url.pathname = '/storage/v1' + url.pathname;
  if (url.origin !== origin || !url.pathname.startsWith('/storage/v1/object/sign/' + bucket + '/'))
    throw new Error('Unexpected playback location');
  return url.href;
}
