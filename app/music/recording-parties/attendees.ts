export type PartyAttendee = { name: string; role?: string };

// Philip confirmed the Bedford + Bowery photographs are all from Party 2.
// Names follow its captions; Gregory Richardson and Andrea Gomis also appear.
// Alphabetize by full surname (including De Vore and Di Fiore), then given name.
export const partyAttendees: Record<number, PartyAttendee[]> = {
  1: [],
  2: [
    {name: 'Andrew Borger'},
    {name: 'Jon Cowherd'},
    {name: 'Don De Vore'},
    {name: 'Albert Di Fiore'},
    {name: 'Philip Di Fiore'},
    {name: 'Andrea Gomis'},
    {name: 'Emma Gomis'},
    {name: 'Jason Hill'},
    {name: 'Ari Ingber'},
    {name: 'James Pollis'},
    {name: 'Gregory Richardson'},
    {name: 'James Richardson'},
    {name: 'Michael Rosen'},
    {name: 'Darwin Smith'},
    {name: 'Jon Wiley'},
  ],
  3: [],
};
