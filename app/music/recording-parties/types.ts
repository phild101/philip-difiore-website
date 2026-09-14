export type PartyTrack = {
  id: string;
  party: number;
  tape: number;
  title: string;
  duration: number;
};
export type PartyCatalog = { tracks: PartyTrack[] };
