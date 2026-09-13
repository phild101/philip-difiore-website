/* Authored branches, September 2026. Facts stay fixed between visits.
   Live generation is deliberately separate from this curated first collection. */
(()=>{
const entries=[
  {
    "id": "night-sessions",
    "title": "After hours at Hotel Edison",
    "heading": "AFTER\nHOURS",
    "kind": "A MEMORY",
    "body": "At [Hotel Edison|hotel-edison], Philip and his brother [Albert|albert] used [Lenny Kravitz’s|lenny-kravitz] private studio at night while Lenny was away. Both of Philip’s Bernie Worrell album projects were recorded there.",
    "related": [],
    "sources": [
      {
        "title": "Philip Di Fiore — personal recollection"
      }
    ],
    "dark": true,
    "layout": "stack",
    "curated": true
  },
  {
    "id": "albert",
    "title": "Albert Di Fiore",
    "heading": "ALBERT",
    "kind": "ENGINEER / BROTHER",
    "body": "Albert was [Lenny Kravitz’s|lenny-kravitz] engineer. When Lenny was away, Albert and Philip worked in his Hotel Edison studio [at night|night-sessions]. The brothers later ran [the Rumpus Room|rumpus-room] in Brooklyn.",
    "related": [],
    "sources": [
      {
        "title": "Philip Di Fiore — personal recollection"
      },
      {
        "title": "Bedford + Bowery — Recording Parties",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "lenny-kravitz",
    "title": "Lenny Kravitz",
    "heading": "LENNY\nKRAVITZ",
    "kind": "A STUDIO AT NIGHT",
    "body": "The private studio at [Hotel Edison|hotel-edison] belonged to Lenny Kravitz. Philip’s brother [Albert|albert] was his engineer; the brothers used the room at night when Lenny was away.",
    "related": [
      "night-sessions"
    ],
    "sources": [
      {
        "title": "Philip Di Fiore — personal recollection"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "hotel-edison",
    "title": "Hotel Edison",
    "heading": "1931",
    "kind": "PLACE",
    "body": "Hotel Edison opened in 1931, with Thomas Edison switching on its marquee. Its interiors appear in [The Godfather|the-godfather] and [Birdman|birdman]. Philip remembers another use for the building: [recording at night|night-sessions].",
    "related": [],
    "sources": [
      {
        "title": "Hotel Edison — official hotel history",
        "url": "https://www.edisonhotelnyc.com/history"
      },
      {
        "title": "Philip Di Fiore — personal recollection"
      }
    ],
    "layout": "numeral",
    "curated": true
  },
  {
    "id": "musicians-index",
    "title": "Musicians",
    "heading": "MUSICIANS",
    "kind": "PEOPLE",
    "body": "People met through [films and videos|film-musicians], through [albums|album-players], and through the improvised gatherings at [Recording Parties|session-players].",
    "related": [],
    "sources": [],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "film-musicians",
    "title": "Music in the films",
    "heading": "ON\nSCREEN",
    "kind": "MUSIC / FILM",
    "body": "[Sharon Jones & The Dap-Kings|sharon]. [Bernie Worrell|bernie]. And the artists whose songs became [music videos|video-index].",
    "related": [],
    "sources": [],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "film-index",
    "title": "Films",
    "heading": "FILM",
    "kind": "WORKS",
    "body": "[Three Sharon Jones films|trilogy]. A portrait of [Bernie Worrell|stranger]. Life and traditions on [Pine Ridge|buffalo-hunt].",
    "related": [
      "live-index"
    ],
    "sources": [],
    "layout": "stack",
    "maxExits": 4,
    "curated": true
  },
  {
    "id": "video-index",
    "title": "Music videos",
    "heading": "VIDEO",
    "kind": "WORKS",
    "body": "Two stories for [Caveman|caveman]. Three different worlds for [Sinkane|sinkane]. And [three more artists|other-videos].",
    "related": [],
    "sources": [],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "other-videos",
    "title": "Three more worlds",
    "heading": "THREE\nWORLDS",
    "kind": "VIDEO",
    "body": "[Spacecamp|spacecamp]. [Naomi Shelton & The Gospel Queens|naomi]. [Rival Schools|rival].",
    "related": [],
    "sources": [],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "live-index",
    "title": "Save My Life",
    "heading": "KEEP\nGOING",
    "kind": "LIVE",
    "body": "[Save My Life|save-my-life] stretches a song’s ending into a performance lasting a little more than twelve minutes, filmed in [one take|one-take].",
    "related": [
      "extended-ending"
    ],
    "sources": [
      {
        "title": "Baeble — preserved press article",
        "url": "https://philipdifiore.com/press/baeble-save-my-life/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "places",
    "title": "Places",
    "heading": "SOME\nWHERE",
    "kind": "PLACES",
    "body": "A [studio in Brooklyn|rumpus-room]. An [old house in Claryville|one-house]. A [New York hotel after dark|night-sessions].",
    "related": [],
    "sources": [],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "rumpus-room",
    "title": "The Rumpus Room",
    "heading": "THE\nRUMPUS\nROOM",
    "kind": "BROOKLYN",
    "body": "Philip and his brother [Albert|albert] ran the Rumpus Room. At [Recording Parties|recording-parties], musicians gathered without rehearsals or scripts; the sessions went straight to [tape|24-track].",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "recording-parties",
    "title": "Recording Parties",
    "heading": "RECORDING\nPARTIES",
    "kind": "MUSIC",
    "body": "A roomful of [musicians|session-players], improvising together. The sessions were recorded live to [24-track tape|24-track], then mixed by several pairs of hands working the [desk together|live-mix].",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "session-players",
    "title": "The recording party",
    "heading": "THE\nPLAYERS",
    "kind": "RECORDING PARTIES",
    "body": "[Guitars and trumpet|party-guitars]. [Piano and keys|party-keys]. [Drums and bass|party-rhythm]. Musicians moved between instruments as the sessions unfolded.",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "party-guitars",
    "title": "Guitars and trumpet",
    "heading": "STRINGS\n& BRASS",
    "kind": "RECORDING PARTIES",
    "body": "[Jon Wiley|jon-wiley], [James Pollis|james-pollis], [James Richardson|james-richardson], [Jason Hill|jason-hill] and [Darwin Smith|darwin-smith] played guitar. Richardson also played trumpet. [Don De Vore|don-de-vore] was among the other participants.",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "maxExits": 6,
    "curated": true
  },
  {
    "id": "party-keys",
    "title": "Piano and keys",
    "heading": "BLACK\n& WHITE",
    "kind": "RECORDING PARTIES",
    "body": "At the keys: [Jon Cowherd|jon-cowherd], [Ari Ingber|ari-ingber], [Michael Rosen|michael-rosen], [Gregory Richardson|gregory-richardson] and the sisters [Emma|emma-gomis] and [Andrea Gomis|andrea-gomis].",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "maxExits": 6,
    "curated": true
  },
  {
    "id": "party-rhythm",
    "title": "Drums and bass",
    "heading": "THE\nPULSE",
    "kind": "RECORDING PARTIES",
    "body": "[Andrew Borger|andrew-borger], [Gregory Richardson|gregory-richardson] and [Jon Wiley|jon-wiley] on drums. [Emma Gomis|emma-gomis] on bass. The captions catch players moving between instruments.",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "maxExits": 4,
    "curated": true
  },
  {
    "id": "jon-wiley",
    "title": "Jon Wiley",
    "heading": "JON\nWILEY",
    "kind": "MUSICIAN",
    "body": "Jon Wiley played drums and guitar at [Recording Parties|recording-parties]. A curator as well as a player.",
    "related": [
      "party-guitars",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "james-pollis",
    "title": "James Pollis",
    "heading": "JAMES\nPOLLIS",
    "kind": "MUSICIAN",
    "body": "James Pollis played guitar at [Recording Parties|recording-parties].",
    "related": [
      "party-guitars",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "james-richardson",
    "title": "James Richardson",
    "heading": "JAMES\nRICHARDSON",
    "kind": "MUSICIAN",
    "body": "James Richardson played guitar and trumpet at [Recording Parties|recording-parties]. The article also identifies him with MGMT and Kuroma.",
    "related": [
      "party-guitars",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "darwin-smith",
    "title": "Darwin Smith",
    "heading": "DARWIN\nSMITH",
    "kind": "MUSICIAN",
    "body": "Darwin Smith played guitar at [Recording Parties|recording-parties]. The captions identify him with Darwin Deez.",
    "related": [
      "party-guitars",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "gregory-richardson",
    "title": "Gregory Richardson",
    "heading": "GREGORY\nRICHARDSON",
    "kind": "MUSICIAN",
    "body": "Gregory Richardson played drums and piano at [Recording Parties|recording-parties]. The captions identify him with Darwin Deez.",
    "related": [
      "party-rhythm",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "jon-cowherd",
    "title": "Jon Cowherd",
    "heading": "JON\nCOWHERD",
    "kind": "MUSICIAN",
    "body": "Jon Cowherd played piano at [Recording Parties|recording-parties].",
    "related": [
      "party-keys",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "andrew-borger",
    "title": "Andrew Borger",
    "heading": "ANDREW\nBORGER",
    "kind": "MUSICIAN",
    "body": "Andrew Borger played drums at [Recording Parties|recording-parties]. The captions also name his work with Tom Waits, Norah Jones and Ani DiFranco.",
    "related": [
      "party-rhythm",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "ari-ingber",
    "title": "Ari Ingber",
    "heading": "ARI\nINGBER",
    "kind": "MUSICIAN",
    "body": "Ari played keys at [Recording Parties|recording-parties]. He also composed [The Buffalo Hunt’s score|score] with [Jason Staehler Hill|jason-hill].",
    "related": [],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "emma-gomis",
    "title": "Emma Gomis",
    "heading": "EMMA\nGOMIS",
    "kind": "MUSICIAN",
    "body": "Emma Gomis played bass and piano at [Recording Parties|recording-parties]. Her sister [Andrea|andrea-gomis] is also pictured at the piano.",
    "related": [
      "party-keys"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "michael-rosen",
    "title": "Michael Rosen",
    "heading": "MICHAEL\nROSEN",
    "kind": "MUSICIAN",
    "body": "Michael Rosen played keys at [Recording Parties|recording-parties]. The captions identify him with Icewater.",
    "related": [
      "party-keys",
      "24-track"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "andrea-gomis",
    "title": "Andrea Gomis",
    "heading": "ANDREA\nGOMIS",
    "kind": "MUSICIAN",
    "body": "Andrea Gomis played piano at [Recording Parties|recording-parties]. Her sister [Emma|emma-gomis] also played bass and piano.",
    "related": [
      "party-keys"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "don-de-vore",
    "title": "Don De Vore",
    "heading": "DON\nDE VORE",
    "kind": "RECORDING PARTIES",
    "body": "Don De Vore appears among the [Recording Parties|recording-parties] participants. The article identifies him with Amazing Baby; the caption does not name his instrument.",
    "related": [
      "session-players",
      "live-mix"
    ],
    "sources": [
      {
        "title": "Bedford + Bowery — preserved press article",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "35mm",
    "title": "35mm",
    "heading": "35mm",
    "kind": "FILM STOCK",
    "body": "The [Sharon Jones trilogy|trilogy] was photographed in Panavision on 35mm film, using an [anamorphic lens from 1964|1964].",
    "related": [
      "blue-note"
    ],
    "sources": [
      {
        "title": "IFC — preserved press article",
        "url": "https://philipdifiore.com/press/sharon-jones-ifc/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "blue-note",
    "title": "Blue Note",
    "heading": "BLUE\nNOTE",
    "kind": "RECORD SLEEVES",
    "body": "For the [Sharon Jones films|trilogy], Philip drew on the Blue Note world of photographer [Francis Wolff|francis-wolff] and designer [Reid Miles|reid-miles].",
    "related": [],
    "sources": [
      {
        "title": "IFC — preserved press article",
        "url": "https://philipdifiore.com/press/sharon-jones-ifc/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "francis-wolff",
    "title": "Francis Wolff",
    "heading": "FRANCIS\nWOLFF",
    "kind": "PHOTOGRAPHY",
    "body": "Francis Wolff’s Blue Note photography was one of the visual reference points for Philip’s [Sharon Jones trilogy|trilogy]. The album sleeves also led him to [Reid Miles|reid-miles].",
    "related": [
      "blue-note"
    ],
    "sources": [
      {
        "title": "IFC — preserved press article",
        "url": "https://philipdifiore.com/press/sharon-jones-ifc/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "reid-miles",
    "title": "Reid Miles",
    "heading": "REID\nMILES",
    "kind": "DESIGN",
    "body": "Reid Miles’s Blue Note covers helped shape the visual thinking behind the [Sharon Jones films|trilogy]. Photography, lettering and framing met on a record sleeve.",
    "related": [
      "francis-wolff",
      "miko-dtb"
    ],
    "sources": [
      {
        "title": "IFC — preserved press article",
        "url": "https://philipdifiore.com/press/sharon-jones-ifc/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "score",
    "title": "The Buffalo Hunt score",
    "heading": "THE\nSCORE",
    "kind": "COMPOSERS",
    "body": "[Jason Staehler Hill|jason-hill] and [Ari Ingber|ari-ingber] composed The Buffalo Hunt’s score. Philip recalls recording it at Hill’s private studio, [Department of Recording and Power|department-recording-power].",
    "related": [],
    "sources": [
      {
        "title": "The New York Times — preserved press article",
        "url": "https://philipdifiore.com/press/nyt-buffalo-hunt/"
      },
      {
        "title": "Philip Di Fiore — personal recollection"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "jason-hill",
    "title": "Jason Hill",
    "heading": "JASON\nHILL",
    "kind": "MUSICIAN / COMPOSER",
    "body": "Jason played guitar at [Recording Parties|recording-parties] and composed [The Buffalo Hunt’s score|score] with Ari Ingber. His work also leads to [David Fincher|david-fincher] and Mindhunter.",
    "related": [],
    "layout": "stack",
    "sources": [
      {
        "title": "Bedford + Bowery — Recording Parties",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      },
      {
        "title": "The New York Times — The Buffalo Hunt",
        "url": "https://philipdifiore.com/press/nyt-buffalo-hunt/"
      },
      {
        "title": "Jason Hill — Mindhunter credits",
        "url": "https://jasonhillmusic.com/projects/mindhunter/"
      }
    ],
    "curated": true
  },
  {
    "id": "department-recording-power",
    "title": "Department of Recording and Power",
    "heading": "A ROOM\nWITH A PAST",
    "kind": "STUDIO",
    "body": "[Jason Hill|jason-hill] runs Department of Recording and Power in a Glendale building used for recording since the late 1970s. [Mindhunter|mindhunter] was scored here. The room's [Trident console|trident-console] arrived with a separate history of its own.",
    "related": [],
    "sources": [
      {
        "title": "Department of Recording and Power — The Studio",
        "url": "https://departmentofrecordingandpower.com/studio"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "trident-console",
    "title": "The Trident console",
    "heading": "1978",
    "kind": "STUDIO",
    "body": "Before arriving at [Hill's studio|department-recording-power], this 1978 Trident TSM recorded Madonna's True Blue and mixed [Live to Tell|madonna], according to the studio's history. The console carried those sessions with it into a different room.",
    "related": [],
    "sources": [
      {
        "title": "Department of Recording and Power — The Studio",
        "url": "https://departmentofrecordingandpower.com/studio"
      }
    ],
    "layout": "numeral",
    "curated": true
  },
  {
    "id": "madonna",
    "title": "Madonna",
    "heading": "LIVE\nTO TELL",
    "kind": "MUSIC",
    "body": "Madonna wrote Live to Tell with Patrick Leonard for the world of At Close Range and True Blue. Its mix passed through [the Trident|trident-console]. Four years later, she worked with David Fincher on [Vogue|vogue].",
    "related": [],
    "sources": [
      {
        "title": "Madonna — Live to Tell: official credits",
        "url": "https://www.madonna.com/products/live-to-tell"
      },
      {
        "title": "Department of Recording and Power — The Studio",
        "url": "https://departmentofrecordingandpower.com/studio"
      },
      {
        "title": "Madonna — Vogue: official credits",
        "url": "https://www.madonna.com/products/vogue"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "vogue",
    "title": "Vogue",
    "heading": "VOGUE",
    "kind": "MUSIC VIDEO",
    "body": "[Madonna|madonna] and Shep Pettibone wrote and produced Vogue, released in March 1990. [David Fincher|david-fincher] directed the video. The record and the film share a title, but their credits open different doors.",
    "related": [],
    "sources": [
      {
        "title": "Madonna — Vogue: official credits",
        "url": "https://www.madonna.com/products/vogue"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "david-fincher",
    "title": "David Fincher",
    "heading": "DAVID\nFINCHER",
    "kind": "CINEMA",
    "body": "For [Mindhunter|mindhunter], David Fincher asked Jason Hill to think of [Psycho|psycho] without its famous stabbing sound. The director of [Vogue|vogue] offered an influence, then room to depart.",
    "related": [],
    "sources": [
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      },
      {
        "title": "Madonna — Vogue: official credits",
        "url": "https://www.madonna.com/products/vogue"
      }
    ],
    "layout": "quiet",
    "dark": true,
    "curated": true
  },
  {
    "id": "mindhunter",
    "title": "Mindhunter",
    "heading": "LISTEN\nUNDERNEATH",
    "kind": "SOUNDTRACK",
    "body": "Jason Hill scored Mindhunter at [Department of Recording and Power|department-recording-power]. [Crystal glasses|mindhunter-glass] became instruments, while the [opening theme|mindhunter-theme] kept a delay Hill hadn't planned.",
    "related": [],
    "sources": [
      {
        "title": "Jason Hill — Mindhunter project credits",
        "url": "https://jasonhillmusic.com/projects/mindhunter/"
      },
      {
        "title": "Department of Recording and Power — The Studio",
        "url": "https://departmentofrecordingandpower.com/studio"
      },
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ],
    "layout": "wide",
    "dark": true,
    "curated": true
  },
  {
    "id": "mindhunter-theme",
    "title": "The delayed note",
    "heading": "KEEP THE\nACCIDENT",
    "kind": "SOUND",
    "body": "Working late, [Jason Hill|jason-hill] heard his notes arriving late through some outboard gear. He liked the pulse. [Mindhunter|mindhunter] used that night's theme mix, despite his later, more elaborate versions.",
    "related": [],
    "sources": [
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "mindhunter-glass",
    "title": "Crystal voices",
    "heading": "CRYSTAL\nVOICES",
    "kind": "SOUND",
    "body": "For [Mindhunter|mindhunter], Hill arranged crystal wine glasses into something he could play like a piano. He also borrowed and sampled a [glass armonica|glass-armonica], extending the palette beyond the cupboard.",
    "related": [],
    "sources": [
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "glass-armonica",
    "title": "The glass armonica",
    "heading": "1761",
    "kind": "INSTRUMENT",
    "body": "Franklin's 1761 glass armonica turns nested bowls beneath wet fingertips. A pedal spins them; their sizes determine pitch. [Jason Hill|mindhunter-glass] sampled one. [Mozart and Beethoven|glass-repertoire] wrote for it.",
    "related": [],
    "sources": [
      {
        "title": "The Franklin Institute — Benjamin Franklin's Glass Armonica",
        "url": "https://fi.edu/en/science-and-education/collection/benjamin-franklins-glass-armonica"
      },
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ],
    "layout": "numeral",
    "curated": true
  },
  {
    "id": "glass-repertoire",
    "title": "A nearly forgotten voice",
    "heading": "THE SOUND\nSURVIVES",
    "kind": "MUSIC",
    "body": "Mozart, Beethoven and Donizetti wrote for [Franklin's glass instrument|glass-armonica]. By the 1820s, it was nearly forgotten. Almost two centuries later, [Jason Hill|jason-hill] sampled one for Mindhunter.",
    "related": [],
    "sources": [
      {
        "title": "The Franklin Institute — Benjamin Franklin's Glass Armonica",
        "url": "https://fi.edu/en/science-and-education/collection/benjamin-franklins-glass-armonica"
      },
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "bernard-herrmann",
    "title": "Bernard Herrmann",
    "heading": "MUSIC\n& NOISE",
    "kind": "COMPOSER",
    "body": "Bernard Herrmann scored [Psycho|psycho] entirely for strings. On Hitchcock's next film, [The Birds|the-birds], his credit changed to sound consultant. Electronic cries and beating wings would occupy the space usually given to an orchestral score.",
    "related": [],
    "sources": [
      {
        "title": "American Film Institute — Psycho",
        "url": "https://catalog.afi.com/Catalog/moviedetails/53260"
      },
      {
        "title": "American Film Institute — The Birds credits",
        "url": "https://catalog.afi.com/Film/22975-THE-BIRDS?cxt=filmography"
      },
      {
        "title": "AFI Silver — The Birds programme note",
        "url": "https://afisilver.afi.com/films/preview/afi_preview_64/files/assets/common/downloads/publication.pdf"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "psycho",
    "title": "Psycho",
    "heading": "STRINGS\nIN THE\nSHOWER",
    "kind": "CINEMA",
    "body": "Hitchcock wanted Psycho's shower scene without music. [Bernard Herrmann|bernard-herrmann] supplied the string cue anyway. Decades later, [David Fincher|david-fincher] invoked the score as a starting point for Mindhunter.",
    "related": [],
    "sources": [
      {
        "title": "American Film Institute — Psycho production history",
        "url": "https://catalog.afi.com/Catalog/moviedetails/53260"
      },
      {
        "title": "Jason Hill — first-person interview with Pop Disciple",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ],
    "layout": "stack",
    "dark": true,
    "curated": true
  },
  {
    "id": "the-birds",
    "title": "The Birds",
    "heading": "ELECTRONIC\nFLOCK",
    "kind": "CINEMA",
    "body": "Some of cinema's most unsettling bird cries came from [Oskar Sala|oskar-sala] and his [Mixturtrautonium|trautonium]. Hitchcock's The Birds credits [Bernard Herrmann|bernard-herrmann] as sound consultant, with Sala and Remi Gassmann responsible for electronic sound production and composition.",
    "related": [],
    "sources": [
      {
        "title": "Deutsches Museum — Oskar Sala and electronic music",
        "url": "https://www.deutsches-museum.de/museum/aktuell/ein-leben-fuer-die-elektronische-musik"
      },
      {
        "title": "American Film Institute — The Birds credits",
        "url": "https://catalog.afi.com/Film/22975-THE-BIRDS?cxt=filmography"
      }
    ],
    "layout": "wide",
    "dark": true,
    "curated": true
  },
  {
    "id": "trautonium",
    "title": "The Trautonium",
    "heading": "A WIRE.\nNO KEYS.",
    "kind": "INSTRUMENT",
    "body": "The Trautonium makes a tone when a finger presses its wire against a metal rail. Pitch can slide between notes. [Oskar Sala|oskar-sala] developed its possibilities for decades, eventually giving [Hitchcock's birds|the-birds] their electronic voices.",
    "related": [],
    "sources": [
      {
        "title": "Deutsches Museum — Oskar Sala and electronic music",
        "url": "https://www.deutsches-museum.de/museum/aktuell/ein-leben-fuer-die-elektronische-musik"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "oskar-sala",
    "title": "Oskar Sala",
    "heading": "2,000\nTAPES",
    "kind": "SOUND",
    "body": "The musician behind [The Birds|the-birds] left nearly 2,000 tapes to the Deutsches Museum. They preserve a lifetime spent extending the [Trautonium|trautonium]: a private studio's experiments becoming an archive other ears can enter.",
    "related": [],
    "sources": [
      {
        "title": "Deutsches Museum — Oskar Sala and electronic music",
        "url": "https://www.deutsches-museum.de/museum/aktuell/ein-leben-fuer-die-elektronische-musik"
      }
    ],
    "layout": "numeral",
    "curated": true
  },
  {
    "id": "the-godfather",
    "title": "The Godfather",
    "heading": "THE\nGODFATHER",
    "kind": "CINEMA",
    "body": "[Hotel Edison's interiors|hotel-edison] appear in The Godfather. Elsewhere in the film, Michael's restaurant meeting gathers tension from an [elevated train|godfather-train] that never enters the picture. One location is visible; another arrives entirely through sound.",
    "related": [],
    "sources": [
      {
        "title": "Hotel Edison — official hotel history",
        "url": "https://www.edisonhotelnyc.com/history"
      },
      {
        "title": "Walter Murch — Art of the Cut interview",
        "url": "https://www.provideocoalition.com/aotc-murch-films/"
      }
    ],
    "layout": "quiet",
    "dark": true,
    "curated": true
  },
  {
    "id": "godfather-train",
    "title": "The train you never see",
    "heading": "AN\nUNSEEN\nTRAIN",
    "kind": "SOUND",
    "body": "Walter Murch used the train in [The Godfather|the-godfather] to carry Michael's mounting emotion while Coppola held back the music. The metallic screech reminded Murch of [Bernard Herrmann|bernard-herrmann]. A sound effect was doing a composer's work.",
    "related": [],
    "sources": [
      {
        "title": "Walter Murch — Art of the Cut interview",
        "url": "https://www.provideocoalition.com/aotc-murch-films/"
      }
    ],
    "layout": "wide",
    "dark": true,
    "curated": true
  },
  {
    "id": "birdman",
    "title": "Birdman",
    "heading": "A MOVING\nPULSE",
    "kind": "CINEMA",
    "body": "Birdman passes through [Hotel Edison|hotel-edison] and unfolds as if the camera never stops. Alejandro González Iñárritu used [Antonio Sánchez's drums|birdman-drums] to help shape its rhythm, giving a film with hidden cuts an audible pulse.",
    "related": [],
    "sources": [
      {
        "title": "Hotel Edison — official hotel history",
        "url": "https://www.edisonhotelnyc.com/history"
      },
      {
        "title": "Motion Picture Association — interview with Antonio Sánchez",
        "url": "https://www.motionpictures.org/2014/10/drummer-antonio-sanchez-gives-birdman-its-essential-beat/"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "birdman-drums",
    "title": "Antonio Sánchez's drums",
    "heading": "LESS\nPOLISHED",
    "kind": "SOUNDTRACK",
    "body": "Antonio Sánchez thought his first [Birdman|birdman] recordings sounded too polished. For the final sessions, he prepared the drums to sound older and rougher. He also had to match [another drummer's movements|birdman-drummer], already filmed on screen.",
    "related": [],
    "sources": [
      {
        "title": "Motion Picture Association — interview with Antonio Sánchez",
        "url": "https://www.motionpictures.org/2014/10/drummer-antonio-sanchez-gives-birdman-its-essential-beat/"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "birdman-drummer",
    "title": "Two drummers, one performance",
    "heading": "HANDS\n& SOUND",
    "kind": "PERFORMANCE",
    "body": "The drummer glimpsed in [Birdman|birdman] is Nate Smith. The performance you hear is [Antonio Sánchez|birdman-drums], who learned Smith's filmed movements and matched them in the studio. The soundtrack and the hands reached the scene by separate routes.",
    "related": [],
    "sources": [
      {
        "title": "Motion Picture Association — interview with Antonio Sánchez",
        "url": "https://www.motionpictures.org/2014/10/drummer-antonio-sanchez-gives-birdman-its-essential-beat/"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "album-players",
    "title": "Album players",
    "heading": "THE\nPLAYERS",
    "kind": "PLAYERS",
    "body": "The people credited on [Improvisczario|improvis-players] and [Turn My Teeth Up!|baby-voices] open routes through banjo, harmonica, keyboards, guest voices and turntables.",
    "related": [],
    "sources": [
      {
        "title": "AllMusic — Improvisczario: album and credits",
        "url": "https://www.allmusic.com/album/improvisczario-mw0000748291"
      },
      {
        "title": "AllMusic — Turn My Teeth Up!: album and credits",
        "url": "https://www.allmusic.com/album/turn-my-teeth-up%21-mw0000482685"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "improvisczario",
    "title": "Improvisczario",
    "heading": "IMPROVIS\nCZARIO",
    "kind": "RECORD",
    "body": "Philip produced [Bernie Worrell’s|bernie] Improvisczario in 2007. [Albert Di Fiore|albert] engineered and mixed it; the album credits name Edison Studios in New York.",
    "related": [
      "improvis-players"
    ],
    "sources": [
      {
        "title": "AllMusic — Improvisczario: album and credits",
        "url": "https://www.allmusic.com/album/improvisczario-mw0000748291"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "improvis-players",
    "title": "Improvisczario players",
    "heading": "AROUND\nBERNIE",
    "kind": "PLAYERS",
    "body": "On Improvisczario: [Will Calhoun|will-calhoun], drums; Brett Bass, bass; [Darryl Dixon|baby-breath], saxophone and flute; [Mike Gordon|mike-gordon], banjo; [Warren Haynes|warren-haynes], electric guitar. Bernie Worrell plays the keyboards.",
    "related": [
      "improvis-keys"
    ],
    "sources": [
      {
        "title": "AllMusic — Improvisczario: album and credits",
        "url": "https://www.allmusic.com/album/improvisczario-mw0000748291"
      }
    ],
    "layout": "stack",
    "maxExits": 5,
    "curated": true
  },
  {
    "id": "improvis-keys",
    "title": "Bernie’s keyboards",
    "heading": "MANY\nKEYS",
    "kind": "KEYS",
    "body": "Bernie’s Improvisczario credits include grand piano, Wurlitzer, Hammond B3, [clavinet|clavinet] and [celeste|celesta]. The closing track carries that last instrument’s name: “Celeste.”",
    "related": [],
    "sources": [
      {
        "title": "AllMusic — Improvisczario: album and credits",
        "url": "https://www.allmusic.com/album/improvisczario-mw0000748291"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "celesta",
    "title": "Celesta",
    "heading": "A KEYBOARD\nTHAT RINGS",
    "kind": "INSTRUMENT",
    "body": "A celesta sounds when hammers strike bars. Yamaha’s 1992 design moved the strike underneath, adapting a grand piano’s action to give the player a wider dynamic range.",
    "related": [
      "improvis-keys",
      "clavinet"
    ],
    "sources": [
      {
        "title": "Yamaha — The structure of the celesta",
        "url": "https://www.yamaha.com/en/musical_instrument_guide/celesta/mechanism/mechanism004.html"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "clavinet",
    "title": "Clavinet",
    "heading": "STRINGS\nUNDER\nTHE KEYS",
    "kind": "INSTRUMENT",
    "body": "Ernst Zacharias developed the Hohner Clavinet 1 in 1964. Beneath its sixty keys sit strings; pressing a key divides a string into damped and vibrating sections.",
    "related": [
      "improvis-keys",
      "minimoog"
    ],
    "sources": [
      {
        "title": "EBOARDMUSEUM — Hohner Clavinet 1",
        "url": "https://artsandculture.google.com/story/hohner-clavinet-1-eboardmuseum/KgUhKA1T6eUK6Q?hl=en-US"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "will-calhoun",
    "title": "Will Calhoun",
    "heading": "WILL\nCALHOUN",
    "kind": "DRUMMER",
    "body": "Living Colour drummer Will Calhoun studied music production and engineering at Berklee. His work also moves through jazz and electronic percussion—a wider map behind the [drums|improvis-players].",
    "related": [
      "flute-detour"
    ],
    "sources": [
      {
        "title": "Berklee — Will Calhoun",
        "url": "https://www.berklee.edu/people/will-calhoun-0"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "flute-detour",
    "title": "The flute detour",
    "heading": "ANOTHER\nINSTRUMENT",
    "kind": "DETOUR",
    "body": "On tour, Pharoah Sanders steered [Will Calhoun|will-calhoun] away from a shop’s drum section. Calhoun bought a Chinese flute; learning it, he said, expanded his drumming vocabulary.",
    "related": [
      "baby-breath"
    ],
    "sources": [
      {
        "title": "Berklee — Living Colour and Will Calhoun clinic, 2015",
        "url": "https://college.berklee.edu/news/living-colour-and-drummer-will-calhoun"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "mike-gordon",
    "title": "Mike Gordon",
    "heading": "MUSIC\n& LETTERING",
    "kind": "PLAYER",
    "body": "Mike Gordon’s credits for The Green Sparrow reach beyond the music: he made its cover illustration and hand lettering. The 2008 album was recorded in Vermont and New York.",
    "related": [
      "improvis-players",
      "records"
    ],
    "sources": [
      {
        "title": "Phish — The Green Sparrow: original album notes",
        "url": "https://phish.com/release/the-green-sparrow-mike-gordon/"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "warren-haynes",
    "title": "Warren Haynes",
    "heading": "THE SIDE\nPROJECT",
    "kind": "GUITARIST",
    "body": "Warren Haynes joined the re-formed Allman Brothers Band in 1989. Eight years later, he and bassist Allen Woody left to concentrate on their side project, Gov’t Mule.",
    "related": [
      "improvis-players",
      "album-players"
    ],
    "sources": [
      {
        "title": "Warren Haynes — official biography",
        "url": "https://warrenhaynes.net/bio/"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "baby-elephant",
    "title": "Turn My Teeth Up!",
    "heading": "TURN MY\nTEETH UP!",
    "kind": "RECORD",
    "body": "Philip executive-produced Turn My Teeth Up! in 2007. [Baby Elephant|baby-voices] brings together keyboardist Bernie Worrell, [Prince Paul|prince-paul] and drummer [Newkirk|newkirk].",
    "related": [],
    "sources": [
      {
        "title": "AllMusic — Turn My Teeth Up!: album and credits",
        "url": "https://www.allmusic.com/album/turn-my-teeth-up%21-mw0000482685"
      }
    ],
    "layout": "wide",
    "dark": true,
    "curated": true
  },
  {
    "id": "baby-voices",
    "title": "Baby Elephant guests",
    "heading": "SEVEN\nGUESTS",
    "kind": "GUESTS",
    "body": "Baby Elephant’s guests include [David Byrne|david-byrne], George Clinton, [Nona Hendryx|nona-hendryx], Shock G, Gabby La La, Yellowman and Reggie Watts, all credited on Turn My Teeth Up!",
    "related": [
      "baby-breath"
    ],
    "sources": [
      {
        "title": "AllMusic — Turn My Teeth Up!: album and credits",
        "url": "https://www.allmusic.com/album/turn-my-teeth-up%21-mw0000482685"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "baby-breath",
    "title": "Breath, strings, skins",
    "heading": "BREATH.\nSTRINGS.\nSKINS.",
    "kind": "PLAYERS",
    "body": "Turn My Teeth Up! credits Big Nancy, harmonica; [Darryl Dixon|improvis-players], flute and saxophone; John Hickey, guitar; and Anthony Riscica, drums.",
    "related": [
      "baby-textures"
    ],
    "sources": [
      {
        "title": "AllMusic — Turn My Teeth Up!: album and credits",
        "url": "https://www.allmusic.com/album/turn-my-teeth-up%21-mw0000482685"
      }
    ],
    "layout": "stack",
    "curated": true
  },
  {
    "id": "baby-textures",
    "title": "Baby Elephant textures",
    "heading": "UNDER\nTHE VOICES",
    "kind": "PLAYERS",
    "body": "Roc Raida plays [turntables|turntables]; Smoke, bass. David Baron contributes sound effects. Turn My Teeth Up! also credits [Albert Di Fiore|albert] with engineering and mixing.",
    "related": [
      "baby-elephant"
    ],
    "sources": [
      {
        "title": "AllMusic — Turn My Teeth Up!: album and credits",
        "url": "https://www.allmusic.com/album/turn-my-teeth-up%21-mw0000482685"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "prince-paul",
    "title": "Prince Paul",
    "heading": "THE DJ\nCAME FIRST",
    "kind": "PRODUCER",
    "body": "Prince Paul called DJing his first passion. Long before [Baby Elephant|baby-elephant], he scratched with Stetsasonic and developed his production ideas with [De La Soul|de-la-soul].",
    "related": [
      "newkirk"
    ],
    "sources": [
      {
        "title": "Prince Paul — Red Bull Music Academy lecture, 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "newkirk",
    "title": "Don Newkirk",
    "heading": "PLAY IT\nBY HAND",
    "kind": "KEYS",
    "body": "Prince Paul says Don Newkirk replayed the keyboard part from Lonnie Liston Smith’s “Expansions” for Stetsasonic’s “Talking All That Jazz,” while Paul looped the beats.",
    "related": [
      "sample-tuning",
      "baby-elephant"
    ],
    "sources": [
      {
        "title": "Prince Paul — Red Bull Music Academy lecture, 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "de-la-soul",
    "title": "De La Soul",
    "heading": "A PILE\nOF RECORDS",
    "kind": "SAMPLES",
    "body": "Making 3 Feet High and Rising, De La Soul and [Prince Paul|prince-paul] pooled records from different musical worlds. Paul remembers finding ways to make those borrowed sounds fit together.",
    "related": [
      "sample-tuning",
      "knee-deep"
    ],
    "sources": [
      {
        "title": "Prince Paul — Red Bull Music Academy lecture, 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "sample-tuning",
    "title": "Tuning samples",
    "heading": "MOVE\nTHE NOTE",
    "kind": "METHOD",
    "body": "[Prince Paul|prince-paul] describes pitch-shifting samples on 3 Feet High and Rising: moving a bassline into the same key as sampled horns so multiple recordings could sit together.",
    "related": [
      "knee-deep",
      "newkirk"
    ],
    "sources": [
      {
        "title": "Prince Paul — Red Bull Music Academy lecture, 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "knee-deep",
    "title": "A synth line comes around",
    "heading": "A LINE\nCOMES\nAROUND",
    "kind": "LOOP",
    "body": "De La Soul’s 1989 “Me, Myself and I,” produced by [Prince Paul|prince-paul], samples [Bernie Worrell’s|bernie] synthesizer work from Funkadelic’s 1979 “(Not Just) Knee Deep.”",
    "related": [
      "flash-light"
    ],
    "sources": [
      {
        "title": "Pitchfork — Turn My Teeth Up!",
        "url": "https://pitchfork.com/reviews/albums/10723-turn-my-teeth-up/"
      }
    ],
    "layout": "wide",
    "dark": true,
    "curated": true
  },
  {
    "id": "flash-light",
    "title": "Flash Light",
    "heading": "3\nMINIMOOGS",
    "kind": "SYNTHESIZER",
    "body": "Bernie Worrell said there are three [Minimoogs|minimoog] on “Flash Light”: the famous bass part and two more making cartoon-like voices. The bassline was only part of his arrangement.",
    "related": [
      "bernie",
      "knee-deep"
    ],
    "sources": [
      {
        "title": "Bernie Worrell — interview with POW, 2015",
        "url": "https://www.powmag.net/p/the-minute-you-think-you-know-it-all-youre-in-trouble-an-interview-with-bernie-worrell"
      }
    ],
    "layout": "numeral",
    "dark": true,
    "curated": true
  },
  {
    "id": "minimoog",
    "title": "Minimoog",
    "heading": "A SMALLER\nMACHINE",
    "kind": "INSTRUMENT",
    "body": "Released in 1970, the Minimoog Model D put synthesizer modules into a portable instrument with their connections already wired. Players could make sound without assembling a patch-cable network.",
    "related": [
      "flash-light",
      "clavinet"
    ],
    "sources": [
      {
        "title": "Moog Music — Minimoog Model D manual",
        "url": "https://back.moogmusic.com/sites/default/files/2022-11/Minimoog_Model_D_Manual.pdf"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "turntables",
    "title": "Turntables",
    "heading": "A MARK ON\nTHE RECORD",
    "kind": "INSTRUMENT",
    "body": "Grandmaster Flash described marking record labels to find a break’s beginning without lifting the needle. Alternating between two copies, he could make a short passage keep going.",
    "related": [
      "prince-paul",
      "tape-vinyl"
    ],
    "sources": [
      {
        "title": "Grandmaster Flash — Fresh Air interview, 2002",
        "url": "https://freshairarchive.org/segments/dj-and-hip-hop-forefather-grandmaster-flash-0"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "david-byrne",
    "title": "David Byrne",
    "heading": "DAVID\nBYRNE",
    "kind": "VOICE",
    "body": "David Byrne sings “How Does the Brainwave?” on [Turn My Teeth Up!|baby-elephant]. He and [Bernie Worrell|bernie] had already shared the screen in the Talking Heads concert film Stop Making Sense.",
    "related": [
      "stop-making-sense"
    ],
    "sources": [
      {
        "title": "Pitchfork — Turn My Teeth Up!",
        "url": "https://pitchfork.com/reviews/albums/10723-turn-my-teeth-up/"
      },
      {
        "title": "A24 — Stop Making Sense",
        "url": "https://a24films.com/films/stop-making-sense"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "stop-making-sense",
    "title": "Stop Making Sense",
    "heading": "STOP\nMAKING\nSENSE",
    "kind": "FILM",
    "body": "Jonathan Demme’s Stop Making Sense features [David Byrne|david-byrne], [Bernie Worrell|bernie] and an expanded Talking Heads lineup. Its concert footage was shot at Hollywood’s Pantages Theatre in December 1983.",
    "related": [
      "pantages"
    ],
    "sources": [
      {
        "title": "A24 — Stop Making Sense",
        "url": "https://a24films.com/films/stop-making-sense"
      }
    ],
    "layout": "wide",
    "dark": true,
    "curated": true
  },
  {
    "id": "pantages",
    "title": "Hollywood Pantages",
    "heading": "ANOTHER\nLIFE",
    "kind": "THEATRE",
    "body": "The Pantages opened in 1930 with a mixture of vaudeville and motion pictures. Decades before [Stop Making Sense|stop-making-sense], the theatre hosted the Academy Awards from 1950 through 1960.",
    "related": [
      "televised-oscars"
    ],
    "sources": [
      {
        "title": "Broadway in Hollywood — Pantages Theatre history",
        "url": "https://www.broadwayinhollywood.com/visit/aboutpantagestheatre"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "televised-oscars",
    "title": "The Oscars go on television",
    "heading": "1953\nON AIR",
    "kind": "BROADCAST",
    "body": "NBC televised the Oscars for the first time in 1953. Radio carried on alongside television: the Academy says the ceremony was still broadcast simultaneously on radio as late as 1968.",
    "related": [
      "pantages",
      "academy-collection"
    ],
    "sources": [
      {
        "title": "Academy — Oscars on the Air",
        "url": "https://www.oscars.org/news/oscars-air"
      }
    ],
    "layout": "numeral",
    "curated": true
  },
  {
    "id": "nona-hendryx",
    "title": "Nona Hendryx",
    "heading": "WEAR\nTHE SOUND",
    "kind": "VOICE",
    "body": "Nona Hendryx’s Audio Tutu puts four speakers into a skirt. Her performances combine movement, music and triggered images, allowing the sound system to travel with the performer.",
    "related": [
      "wave-glove",
      "baby-voices"
    ],
    "sources": [
      {
        "title": "Nona Hendryx — Technology and artist statement",
        "url": "https://www.nonahendryx.com/technology"
      }
    ],
    "layout": "wide",
    "curated": true
  },
  {
    "id": "wave-glove",
    "title": "W.A.V.E. Glove",
    "heading": "A HAND.\nA VOICE.",
    "kind": "GESTURE",
    "body": "[Nona Hendryx’s|nona-hendryx] W.A.V.E. Glove uses bend sensors to control vocal effects. Designed with Takahiko Tsuchiya, it turns movements of the hand into changes in the sound of a voice.",
    "related": [
      "sample-tuning"
    ],
    "sources": [
      {
        "title": "Nona Hendryx — Technology and artist statement",
        "url": "https://www.nonahendryx.com/technology"
      }
    ],
    "layout": "quiet",
    "curated": true
  },
  {
    "id": "records",
    "title": "Records + recordings",
    "heading": "ON\nRECORD",
    "kind": "MUSIC",
    "body": "Philip produced [Improvisczario|improvisczario] and executive-produced Baby Elephant’s [Turn My Teeth Up!|baby-elephant].\n\nThen there are the [Recording Parties|recording-parties]: music being made in the room.",
    "related": [],
    "layout": "stack",
    "sources": [
      {
        "title": "AllMusic — Improvisczario credits",
        "url": "https://www.allmusic.com/album/improvisczario-mw0000748291"
      },
      {
        "title": "AllMusic — Turn My Teeth Up! credits",
        "url": "https://www.allmusic.com/album/turn-my-teeth-up%21-mw0000482685"
      }
    ],
    "curated": true
  },
  {
    "id": "bernie",
    "title": "Bernie Worrell",
    "heading": "BERNIE\nWORRELL",
    "kind": "MUSICIAN",
    "body": "Philip filmed Bernie in [Stranger|stranger] and produced his album [Improvisczario|improvisczario]. Follow Bernie’s keyboards further and a bassline becomes [three Minimoogs|flash-light].",
    "related": [],
    "layout": "stack",
    "sources": [
      {
        "title": "Philip Di Fiore — Stranger",
        "url": "https://philipdifiore.com/"
      },
      {
        "title": "AllMusic — Improvisczario",
        "url": "https://www.allmusic.com/album/improvisczario-mw0000748291"
      },
      {
        "title": "Bernie Worrell — first-person interview",
        "url": "https://www.powmag.net/p/the-minute-you-think-you-know-it-all-youre-in-trouble-an-interview-with-bernie-worrell"
      }
    ],
    "curated": true
  }
];
const {notes,topics}=window.ABOUT_GRAPH,passages=window.RABBIT_PASSAGES;
for(const {id,...entry} of entries){
 notes[id]={...(notes[id]||{}),tags:[],...entry};
 passages[id]={...entry};
}
// Keep the requested About selection distinct from the full Featured archive.
const excluded=new Set(['rdgldgrn','rdg','man-man','manman','diiv','diiv-band','class-actress','class-actress-band','antibalas','antibalas-band','back-patio','house-of-soul','brooklyn-bowl']);
for(const id of excluded){delete notes[id];delete passages[id];}
for(const n of Object.values(notes))n.tags=(n.tags||[]).filter(id=>!excluded.has(id));
for(const n of Object.values(passages))n.related=(n.related||[]).filter(id=>!excluded.has(id));
for(const n of Object.values(topics))n.tags=(n.tags||[]).filter(id=>!excluded.has(id));
// Extend press provenance to the existing authored scenes.
for(const [id,n] of Object.entries(notes)){
 if(n.sources?.length)continue;
 const files=[...String(n.source||'').matchAll(/([a-z0-9-]+)\.json/g)].map(m=>m[1]);
 if(files.length)n.sources=[...new Set(files)].map(name=>({title:'Preserved press article',url:'https://philipdifiore.com/press/'+name+'/'}));
 else if(/^User-supplied/i.test(n.source||''))n.sources=[{title:'Philip Di Fiore — supplied biography and recollections'}];
 if(passages[id]&&!passages[id].sources?.length)passages[id].sources=n.sources||[];
}
window.RABBIT_COLLECTION={edition:'deep-branches-1',newScenes:entries.map(n=>n.id)};
})();
