export type PartyAttendee = { name: string; role?: string };

// Philip will supply the confirmed lists. Press-photo subjects are not evidence
// of which recording party someone attended, so do not infer memberships.
export const partyAttendees: Record<number, PartyAttendee[]> = {
  1: [],
  2: [],
  3: [],
};
