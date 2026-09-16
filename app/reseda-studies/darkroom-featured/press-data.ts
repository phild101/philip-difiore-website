export type PressFilm = { title: string; vimeo: string };
export type PressItem = {
  slug: string;
  outlet: string;
  project: string;
  logo?: string;
  videos: PressFilm[];
};
const video = (title: string, vimeo: string): PressFilm => ({ title, vimeo });
export const pressItems: PressItem[] = [
  {
    slug: 'nyt-buffalo-hunt',
    outlet: 'The New York Times',
    project: 'The Buffalo Hunt',
    logo: 'nyt.png',
    videos: [video('The Buffalo Hunt', '290307313')],
  },
  {
    slug: 'ap-buffalo-hunt',
    outlet: 'Associated Press',
    project: 'The Buffalo Hunt',
    logo: 'ap.png',
    videos: [video('The Buffalo Hunt', '290307313')],
  },
  {
    slug: 'sharon-jones-ifc',
    outlet: 'IFC',
    project: 'Sharon Jones & The Dap-Kings',
    logo: 'ifc.png',
    videos: [
      video('The Trilogy', '36364375'),
      video('I Learned the Hard Way', '36354563'),
      video('Game Gets Old', '36317057'),
      video('If You Call', '36319087'),
    ],
  },
  {
    slug: 'spin-in-the-city',
    outlet: 'Spin',
    project: 'Caveman “In the City”',
    logo: 'spin.svg',
    videos: [video('Caveman “In the City”', '99170468')],
  },
  {
    slug: 'consequence-in-the-city',
    outlet: 'Consequence of Sound',
    project: 'Caveman “In the City”',
    logo: 'consequence.jpg',
    videos: [video('Caveman “In the City”', '99170468')],
  },
  {
    slug: 'ifc-old-friend',
    outlet: 'IFC',
    project: 'Caveman “Old Friend”',
    logo: 'ifc.png',
    videos: [video('Caveman “Old Friend”', '43743411')],
  },
  {
    slug: 'paste-old-friend',
    outlet: 'Paste',
    project: 'Caveman “Old Friend”',
    logo: 'paste.jpg',
    videos: [video('Caveman “Old Friend”', '43743411')],
  },
  {
    slug: 'stereogum-old-friend',
    outlet: 'Stereogum',
    project: 'Caveman “Old Friend”',
    logo: 'stereogum.png',
    videos: [video('Caveman “Old Friend”', '43743411')],
  },
  {
    slug: 'pitchfork-runnin',
    outlet: 'Pitchfork',
    project: 'Sinkane “Runnin’”',
    logo: 'pitchfork.svg',
    videos: [video('Sinkane “Runnin’”', '102372771')],
  },
  {
    slug: 'stereogum-warm-spell',
    outlet: 'Stereogum',
    project: 'Sinkane “Warm Spell”',
    logo: 'stereogum.png',
    videos: [video('Sinkane “Warm Spell”', '64088414')],
  },
  {
    slug: 'dummy-warm-spell',
    outlet: 'Dummy',
    project: 'Sinkane “Warm Spell”',
    logo: 'dummy.png',
    videos: [video('Sinkane “Warm Spell”', '64088414')],
  },
  {
    slug: 'fader-young-trouble',
    outlet: 'The Fader',
    project: 'Sinkane “Young Trouble”',
    logo: 'fader.png',
    videos: [video('Sinkane “Young Trouble”', '120972341')],
  },
  {
    slug: 'ifc-spacecamp',
    outlet: 'IFC',
    project: 'Spacecamp “Miko D.T.B.”',
    logo: 'ifc.png',
    videos: [video('Spacecamp “Miko D.T.B.”', '39061407')],
  },
  {
    slug: 'rollingstone-antibalas',
    outlet: 'Rolling Stone',
    project: 'Antibalas',
    logo: 'rollingstone.svg',
    videos: [video('Antibalas', '50027534')],
  },
  {
    slug: 'baeble-save-my-life',
    outlet: 'Baeble Music',
    project: 'Save My Life',
    logo: 'baeble.jpg',
    videos: [video('Save My Life', '71923847')],
  },
  {
    slug: 'bedford-bowery-recording-parties',
    outlet: 'Bedford + Bowery',
    project: 'Recording Parties',
    videos: [],
  },
];
