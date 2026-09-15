export type PartyAttendee = { name: string; role?: string };

// Philip confirmed the Bedford + Bowery photographs are all from Party 2.
// Names follow its captions; Gregory Richardson and Andrea Gomis also appear.
export const partyAttendees: Record<number, PartyAttendee[]> = {
  1: [],
  2: [
    {name: 'James Richardson'},
    {name: 'Andrew Borger'},
    {name: 'Jon Cowherd'},
    {name: 'James Pollis'},
    {name: 'Ari Ingber'},
    {name: 'Jon Wiley'},
    {name: 'Darwin Smith'},
    {name: 'Don De Vore'},
    {name: 'Jason Hill'},
    {name: 'Emma Gomis'},
    {name: 'Philip Di Fiore'},
    {name: 'Albert Di Fiore'},
    {name: 'Michael Rosen'},
    {name: 'Gregory Richardson'},
    {name: 'Andrea Gomis'},
  ],
  3: [],
};
