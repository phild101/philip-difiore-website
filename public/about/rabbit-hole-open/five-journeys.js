// Five edited journeys. Kept separate so earlier wording remains recoverable.
(() => {
const notes=window.ABOUT_GRAPH.notes, passages=window.RABBIT_PASSAGES;
const entries=[
  {
    "id": "wl-stranger-four-years",
    "title": "Four years, one festival",
    "heading": "FOUR\nYEARS",
    "kind": "STRANGER / MAKING THE FILM",
    "body": "Most of the concert footage in Stranger came from one festival: Jazz Fest 2003, although making the film took four years. Philip’s portrait of [Bernie Worrell|bernie] premiered at Slamdance in 2005, with [George Clinton|artist-clinton] and David Byrne among the musicians describing his reach. [The finished film|stranger] brings those conversations together with the performances they struggle to explain.",
    "layout": "wide",
    "sources": [
      {
        "title": "Seth Lind — Stranger production notes",
        "url": "https://seth-lind.com/"
      }
    ]
  },
  {
    "id": "bernie",
    "title": "Bernie Worrell",
    "heading": "HE COULD\nHEAR IT.",
    "kind": "BERNIE WORRELL / THE EAR",
    "body": "At soundcheck, Bernie could hum the pitch of microphone feedback, play the offending note on his keyboard, and tell the engineer where to find it. His ear also heard family resemblances between a gospel hymn, an Indian raga and a classical piece. He resisted ranking them: the classical music stayed inside whatever he played. He first met [George Clinton|artist-clinton] in a Plainfield barbershop when he was eight. Years later, that ear would make a synthesizer produce [three different voices inside Flash Light|wl-flash-light-layers].",
    "layout": "stack",
    "sources": [
      {
        "title": "Bernie Worrell — firsthand Red Bull Music Academy interview, 2013",
        "url": "https://www.redbullmusicacademy.com/lectures/bernie-worrell/"
      }
    ]
  },
  {
    "id": "wl-flash-light-layers",
    "title": "Listen above the bassline",
    "heading": "THREE\nVOICES",
    "kind": "FLASH LIGHT / INSIDE THE RECORD",
    "body": "The famous bassline can swallow your attention. [Bernie|bernie] said there are three Minimoog parts on Flash Light: one carrying the bass, two making cartoon voices. Listen above the bottom end and the record starts having little conversations with itself. He found those sounds by turning knobs, trying waveforms and trusting his ear; decades later, he still preferred his original Model D. A different band gave that same ear [a straight pulse with space around it|wl-talking-heads-pulse]. The sounds changed. His freedom to invent remained.",
    "layout": "wide",
    "sources": [
      {
        "title": "Bernie Worrell — interview with Peter Holslin, November 18, 2015",
        "url": "https://www.powmag.net/p/the-minute-you-think-you-know-it-all-youre-in-trouble-an-interview-with-bernie-worrell"
      },
      {
        "title": "Bernie Worrell — Talking Heads working methods, firsthand interview",
        "url": "https://www.redbullmusicacademy.com/lectures/bernie-worrell/"
      }
    ]
  },
  {
    "id": "wl-talking-heads-pulse",
    "title": "The students made the call",
    "heading": "WHO\nARE YOU?",
    "kind": "BERNIE WORRELL / TALKING HEADS",
    "body": "When Talking Heads approached Bernie, he didn’t know who they were. Later he learned that [David Byrne|artist-byrne], Tina Weymouth and Chris Frantz had slipped into P-Funk shows as art students. Now the listeners wanted him inside their music. Bernie described Chris holding a straight beat while Steve Scales’s percussion moved around it. In the studio they could begin with a jam; onstage, he could choose his own parts. [The band growing before your eyes|wl-stage-assembled] in Stop Making Sense makes that expanding sound visible.",
    "layout": "stack",
    "sources": [
      {
        "title": "Bernie Worrell — firsthand Red Bull Music Academy interview, 2013",
        "url": "https://www.redbullmusicacademy.com/lectures/bernie-worrell/"
      },
      {
        "title": "Talking Heads and collaborators — firsthand Stop Making Sense oral history",
        "url": "https://www.theringer.com/2023/09/27/music/stop-making-sense-talking-heads-movie-oral-history"
      }
    ]
  },
  {
    "id": "artist-byrne",
    "title": "David Byrne",
    "heading": "THE SUIT\nDANCES TOO.",
    "kind": "DAVID BYRNE / MAKING A PERFORMANCE",
    "body": "During rehearsals and touring, Byrne discovered that a small wiggle sent waves through his giant linen suit, and kept the accidental movement. The broad silhouette drew on Japanese Noh costumes; stagehands working in view also influenced [the show’s visible construction|wl-stage-assembled], with [Bernie Worrell|bernie] among its expanding band. Byrne later gave an old organ another unexpected job: letting visitors [play an entire building|byrne-playing-building].",
    "layout": "stack",
    "sources": [
      {
        "title": "David Byrne — firsthand account in the Stop Making Sense oral history",
        "url": "https://www.theringer.com/2023/09/27/music/stop-making-sense-talking-heads-movie-oral-history"
      },
      {
        "title": "Creative Time — interview with David Byrne about Playing the Building",
        "url": "https://creativetime.org/programs/archive/2008/byrne/interview.html"
      }
    ]
  },
  {
    "id": "byrne-playing-building",
    "title": "The organ that played the room",
    "heading": "PLAY THE\nBUILDING",
    "kind": "DAVID BYRNE / PLAYING THE BUILDING",
    "body": "[Byrne|artist-byrne] owned a pump organ whose tuning made it a poor studio prospect, so he used its keyboard to operate machines that struck beams, vibrated metal and blew air through pipes. At New York’s Battery Maritime Building, visitors played the structure without amplification; the organ’s back stayed open so they could see the workings. Byrne’s voice appears on [Baby Elephant’s Turn My Teeth Up!|music-baby-elephant], the Bernie Worrell album Philip executive-produced.",
    "layout": "wide",
    "sources": [
      {
        "title": "Creative Time — David Byrne’s firsthand account of the organ and installation",
        "url": "https://creativetime.org/programs/archive/2008/byrne/interview.html"
      },
      {
        "title": "Creative Time — Playing the Building project description",
        "url": "https://creativetime.org/programs/archive/2008/byrne/project.html"
      },
      {
        "title": "Spotify — How Does the Brain Wave? performer credits",
        "url": "https://open.spotify.com/track/1zmdjuKTxwq8CADbCR9Yew"
      },
      {
        "title": "Philip Di Fiore — supplied recollection of both Bernie Worrell album projects at Hotel Edison; existing project credits"
      }
    ]
  },
  {
    "id": "night-sessions",
    "title": "After hours at Hotel Edison",
    "heading": "THE NIGHT\nSHIFT",
    "kind": "PHILIP / A STUDIO MEMORY",
    "body": "Philip and his brother Albert worked at night in Lenny Kravitz’s private studio inside New York’s Hotel Edison. Albert was Kravitz’s engineer; when Lenny was away, the brothers could use the room. Bernie Worrell’s Improvisczario and [Baby Elephant’s Turn My Teeth Up!|music-baby-elephant] were recorded there. The room belonged to a musician who liked to [start recording before a song felt settled|artist-kravitz].",
    "layout": "stack",
    "sources": [
      {
        "title": "Philip Di Fiore — firsthand recollections: Albert, nighttime use of Kravitz’s Hotel Edison studio, and the two Bernie Worrell album projects"
      },
      {
        "title": "AudioTechnology — Lenny Kravitz and Tom Edmonds describe recording first takes, November 15, 2011",
        "url": "https://www.audiotechnology.com/features/lenny-kravitz"
      }
    ]
  },
  {
    "id": "artist-kravitz",
    "title": "Record it while you learn it",
    "heading": "THE FIRST\nTAKE",
    "kind": "LENNY KRAVITZ / RECORDING",
    "body": "Lenny Kravitz plays drums while Craig Ross follows the guitar riff, with Kravitz calling out sections as they record. Engineer Tom Edmonds prepares even disposable vocals carefully because Kravitz often asks for that first take later; his [Bahamas studio kept tape feeding directly into Pro Tools|kravitz-keep-rolling]. In New York, [the Hotel Edison studio became Philip and Albert’s nighttime workspace|night-sessions] when Kravitz was away. The brothers recorded [Baby Elephant|music-baby-elephant] there.",
    "layout": "stack",
    "sources": [
      {
        "title": "AudioTechnology — Lenny Kravitz and engineer Tom Edmonds on first takes, scratch vocals, and Gregory Town Sound’s tape workflow, November 15, 2011",
        "url": "https://www.audiotechnology.com/features/lenny-kravitz"
      },
      {
        "title": "Philip Di Fiore — firsthand recollections of nighttime sessions in Kravitz’s Hotel Edison studio"
      }
    ]
  },
  {
    "id": "music-baby-elephant",
    "title": "An interview becomes a band",
    "heading": "BABY\nELEPHANT",
    "kind": "TURN MY TEETH UP! / AN ALBUM BEGINS",
    "body": "For Philip’s Bernie Worrell documentary, Prince Paul came in as a fan being interviewed. During the process, someone asked whether he wanted to work with Bernie. He jumped at it. [The Stranger interview|stranger] opened onto Baby Elephant: Worrell, Paul and Don Newkirk making Turn My Teeth Up!, with Philip as executive producer. Paul wanted live instruments and an unforced feel. Newkirk had already [played a record’s keyboard part anew|wl-newkirk-replay] over a beat loop on an earlier record with Paul.",
    "layout": "stack",
    "sources": [
      {
        "title": "WHO?MAG — William Hernandez interviews Prince Paul about Baby Elephant’s documentary origin, members, and live instrumentation",
        "url": "https://www.whomag.net/prince-paul/"
      },
      {
        "title": "Philip Di Fiore — firsthand testimony: Stranger and executive producer credit on Turn My Teeth Up!"
      },
      {
        "title": "Red Bull Music Academy — Prince Paul identifies Don Newkirk’s keyboard replay on Talking All That Jazz, Cape Town 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      }
    ]
  },
  {
    "id": "wl-newkirk-replay",
    "title": "Newkirk plays the sample",
    "heading": "PLAY THE\nSAMPLE",
    "kind": "DON NEWKIRK / PRINCE PAUL",
    "body": "For Stetsasonic’s “Talking All That Jazz,” [Prince Paul|artist-prince-paul] looped the beat while Don Newkirk replayed the keyboard part from Lonnie Liston Smith’s “Expansions.” Replaying the passage put a new performance inside the loop. With [De La Soul, Paul would retune the records themselves|wl-samples-in-key], making sampled instruments fit together.",
    "layout": "wide",
    "sources": [
      {
        "title": "Red Bull Music Academy — Prince Paul describes Newkirk replaying Expansions and using pitch-shifting with De La Soul, Cape Town 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      }
    ]
  },
  {
    "id": "wl-samples-in-key",
    "title": "Making the records agree",
    "heading": "ONE\nKEY",
    "kind": "PRINCE PAUL / ARRANGEMENT",
    "body": "On 3 Feet High and Rising, [Prince Paul|artist-prince-paul] and De La Soul could take a bassline and a horn passage from different records and make them behave like one arrangement. They pitch-shifted the samples into the same key before layering more sounds; Paul learned by asking the engineer how to achieve what he imagined. The same sessions also left room for [an accidental silence|wl-prince-paul-mistake].",
    "layout": "quiet",
    "sources": [
      {
        "title": "Red Bull Music Academy — Prince Paul explains pitch-shifting bass and horn samples into the same key and learning by questioning the engineer, Cape Town 2003",
        "url": "https://www.redbullmusicacademy.com/lectures/prince-paul-prince-of-thieves/"
      },
      {
        "title": "Micro-Chop — Gino Sorcinelli interviews Prince Paul about the accidental beat dropout in Me Myself and I",
        "url": "https://medium.com/micro-chop/obscure-records-mistakes-and-mixing-by-hand-prince-paul-reconstructs-the-making-of-3-feet-high-8ff4149f308e"
      }
    ]
  },
  {
    "id": "wl-prince-paul-mistake",
    "title": "The mistake stayed",
    "heading": "KEEP THE\nMISTAKE",
    "kind": "DE LA SOUL / MIXING BY HAND",
    "body": "While mixing [De La Soul’s “Me Myself and I”|artist-de-la-soul] by hand, Prince Paul and Posdnuos forgot to leave the beat running. They looked at each other, brought it back on time, and kept the take. They could have edited the tape or started again; instead, the lapse became part of the song. The listener had never heard the intended version. Philip would later [interview Paul for Stranger|stranger], asking a devoted P-Funk listener about Bernie Worrell.",
    "layout": "stack",
    "sources": [
      {
        "title": "Micro-Chop — Gino Sorcinelli interviews Prince Paul: Obscure Records, Mistakes, and Mixing by Hand",
        "url": "https://medium.com/micro-chop/obscure-records-mistakes-and-mixing-by-hand-prince-paul-reconstructs-the-making-of-3-feet-high-8ff4149f308e"
      },
      {
        "title": "WHO?MAG — Prince Paul recalls being interviewed for the Bernie Worrell documentary as a Parliament-Funkadelic fan",
        "url": "https://www.whomag.net/prince-paul/"
      },
      {
        "title": "Philip Di Fiore — firsthand testimony identifying the documentary as Stranger: Bernie Worrell on Earth"
      }
    ]
  },
  {
    "id": "department-recording-power",
    "title": "The room behind the scores",
    "heading": "A ROOM\nFOR TAPE",
    "kind": "DEPARTMENT OF RECORDING AND POWER",
    "body": "Philip remembers recording [The Buffalo Hunt’s soundtrack|music-buffalo-hunt] at Jason Hill’s Department of Recording and Power. Hill bought the Glendale studio as an empty room in 2015, then rebuilt it with two live rooms, isolation booths and a room just for tape. Mindhunter was scored there, too, by [a composer whose introduction to David Fincher began on vacation|jason-hill].",
    "layout": "stack",
    "sources": [
      {
        "title": "Philip Di Fiore — personal recollection supplied for this project"
      },
      {
        "title": "Department of Recording and Power — The Studio",
        "url": "https://departmentofrecordingandpower.com/studio"
      }
    ]
  },
  {
    "id": "jason-hill",
    "title": "A record played on vacation",
    "heading": "A RECORD\nON VACATION",
    "kind": "JASON HILL / DAVID FINCHER",
    "body": "Hill moved between fronting Louis XIV and Vicky Cryer and [playing guitar at Philip’s Recording Parties|party-guitars]. A fan of his bands, Ceán Chaffin introduced their music to David Fincher while on vacation. Fincher’s response was an assignment to remake [“She” for the Gone Girl trailer|gone-girl-trailer]; Hill’s recent breakup gave him a way into the song’s troubled relationship.",
    "layout": "quiet",
    "sources": [
      {
        "title": "Jason Hill — firsthand interview with Modern Horrors, November 2017",
        "url": "https://modernhorrors.com/maestro-monsters-composer-jason-hill-talks-mindhunter/"
      },
      {
        "title": "Bedford + Bowery — preserved Recording Parties photographs and captions identify Jason Hill playing guitar",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ]
  },
  {
    "id": "gone-girl-trailer",
    "title": "A love song becomes a warning",
    "heading": "SHE",
    "kind": "GONE GIRL / THE TRAILER",
    "body": "Fincher chose a song audiences knew from romance: Elvis Costello’s version of “She” in Notting Hill. For Gone Girl’s 2014 trailer, [Hill|jason-hill] heard another possibility in the words—a couple unable to live together or apart. Richard Butler of the Psychedelic Furs sang the new arrangement. The familiar declaration of love became uneasy. By [Mindhunter|mindhunter], Fincher’s musical requests would become stranger still: [what might the death of disco sound like?|artist-fincher-prompts]",
    "layout": "wide",
    "sources": [
      {
        "title": "Jason Hill — firsthand interview with Modern Horrors, November 2017",
        "url": "https://modernhorrors.com/maestro-monsters-composer-jason-hill-talks-mindhunter/"
      },
      {
        "title": "Jason Hill — official Gone Girl Trailer project credits",
        "url": "https://jasonhillmusic.com/projects/gone-girl/"
      },
      {
        "title": "The Credits — Jason Hill on Fincher’s musical prompts, September 17, 2019",
        "url": "https://www.motionpictures.org/2019/09/how-mindhunters-composer-jason-hill-manipulates-sound-to-create-an-unexpected-score/"
      }
    ]
  },
  {
    "id": "artist-fincher-prompts",
    "title": "What does the death of disco sound like?",
    "heading": "THE DEATH\nOF DISCO",
    "kind": "DAVID FINCHER / A MUSICAL BRIEF",
    "body": "For Mindhunter’s second season, Fincher gave [Jason Hill|jason-hill] the phrase “the death of disco.” Hill could not say exactly what it meant. That uncertainty made the instruction useful: it started a search without supplying a sound to copy. Hill made the score’s instruments himself or recorded them with friends. His experiments could be as physical as [bowing a seven-foot metal construction|mindhunter-metal-cello] or emerge from [a delay he decided to keep|mindhunter-theme].",
    "layout": "stack",
    "sources": [
      {
        "title": "The Credits — firsthand interview with Jason Hill, September 17, 2019",
        "url": "https://www.motionpictures.org/2019/09/how-mindhunters-composer-jason-hill-manipulates-sound-to-create-an-unexpected-score/"
      },
      {
        "title": "Pop Disciple — Jason Hill on the accidental delay in Mindhunter’s theme, September 6, 2019",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ]
  },
  {
    "id": "mindhunter-theme",
    "title": "The mistake survived two months of work",
    "heading": "KEEP\nTHE FIRST MIX",
    "kind": "MINDHUNTER / MAIN TITLES",
    "body": "Late one night, [Hill|jason-hill] played a note and heard it arrive late. His equipment was delaying the sound, but he liked the pulse and kept going. He forgot the recording, found it a week and a half later, and sent it to Fincher. Two months of work with a quartet and drummers never displaced that first mix. Even as Fincher [reshot the title sequence over marks on the reels|artist-fincher-fingerprints], the music kept its accident. Elsewhere, Hill made [delay stretch across a room|mindhunter-tape-loops].",
    "layout": "quiet",
    "sources": [
      {
        "title": "Pop Disciple — Jason Hill’s firsthand account of the theme, revisions and title reshoot, September 6, 2019",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      }
    ]
  },
  {
    "id": "mindhunter-tape-loops",
    "title": "The room becomes part of the instrument",
    "heading": "TAPE\nACROSS THE ROOM",
    "kind": "MINDHUNTER / RECORDING",
    "body": "For parts of Mindhunter, Hill ran tape between two reel-to-reel machines, looping it around microphone stands five or ten feet away before the sound reached a computer. The distance produced echoes he could answer while playing. The recording system became part of the performance. At Philip and Albert’s [Recording Parties|recording-parties], tape captured another kind of performance after the musicians had finished: [several people working the mixing desk together|live-mix], sending the result from 24 tracks onto two.",
    "layout": "wide",
    "sources": [
      {
        "title": "Pop Disciple — Jason Hill’s firsthand account of physical tape delays, September 6, 2019",
        "url": "https://www.popdisciple.com/interviews/jason-hill"
      },
      {
        "title": "Bedford + Bowery — reporting and interview with Philip Di Fiore, June 17, 2014; preserved article verified locally",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ]
  },
  {
    "id": "rumpus-room",
    "title": "The Rumpus Room",
    "heading": "IN THE\nNEXT ROOM",
    "kind": "THE RUMPUS ROOM / BROOKLYN",
    "body": "It’ll Be Better was recorded here. Its cover was photographed here, too. While Francis and the Lights worked on [the album|itll-be-better], Jake Schreier sat with Philip’s edit of [Lee Fields confronting Sharon Jones|i-learned-the-hard-way] and suggested changes to the opening scene. Music and film shared an address, and sometimes a pair of eyes. The studio could even become a film set: part of Ray Tintori’s [MGMT video Kids|mgmt-kids] was shot at the Rumpus Room.",
    "layout": "wide",
    "sources": [
      {
        "title": "Philip Di Fiore — firsthand recollections supplied September 13, 2026"
      }
    ]
  },
  {
    "id": "itll-be-better",
    "title": "It’ll Be Better",
    "heading": "EVERY\nKEY BLACK",
    "kind": "FRANCIS AND THE LIGHTS / RECORDING",
    "body": "[Francis|francis-and-lights] painted every piano key black, removing the familiar visual map. He played through It’ll Be Better in sequence before recording, then laid down piano before building the rhythms. The drum kit arrived [one instrument at a time|francis-drum-pieces]: he looped a verse and played just the hi-hat until something interested him. The record’s spare surface concealed all those separate decisions. [Jake Schreier|artist-schreier], his friend since thirteen, would carry their musical partnership into a feature film.",
    "layout": "stack",
    "sources": [
      {
        "title": "EQ — Francis and the Lights: Frighteningly Simple, Richard Thomas, September 2010",
        "url": "https://www.worldradiohistory.com/Archive-All-Audio/EQ-Magazine/EQ-2010-09.pdf"
      },
      {
        "title": "Interview — Jake Schreier on working with Francis, August 15, 2012",
        "url": "https://www.interviewmagazine.com/film/jake-schreier-robot-frank"
      }
    ]
  },
  {
    "id": "artist-schreier",
    "title": "Jake Schreier",
    "heading": "LEAVE OFF\nTHE FACE",
    "kind": "JAKE SCHREIER / ROBOT & FRANK",
    "body": "Jake wanted the robot short enough to seem cute, tall enough to reach a shelf, and entirely faceless. The audience would have to supply its feelings. For the score, he and [Francis|francis-and-lights] watched old Coen brothers films and worked out themes. It was Francis’s first complete film score. Their experiments already included a performance [edited with light|francis-light-cut]. The robot’s warmth would come through [Peter Sarsgaard’s voice|artist-sarsgaard], even when its delivery stayed level.",
    "layout": "stack",
    "sources": [
      {
        "title": "Interview — Jake Schreier describes the robot, score and voice, August 15, 2012",
        "url": "https://www.interviewmagazine.com/film/jake-schreier-robot-frank"
      },
      {
        "title": "Fenway Recordings — Darling, It’s Alright, directed by Jake Schreier, August 19, 2010",
        "url": "https://www.fenwayrecordings.com/news/darling-its-alright-by-francis-and-the-lights-live-performance"
      }
    ]
  },
  {
    "id": "artist-sarsgaard",
    "title": "Peter Sarsgaard",
    "heading": "A LIST\nOF LINES",
    "kind": "PETER SARSGAARD / THE ROBOT’S VOICE",
    "body": "Peter Sarsgaard and Frank Langella never performed Robot & Frank together. On set, Langella’s nephew read the robot’s lines. Later, [Jake Schreier|artist-schreier] gave Sarsgaard the dialogue as a printed list, loosening it from the scenes so it would sound more robotic. Schreier thinks the final readings came from one half-hour pass. Sarsgaard’s [preparation for Memory|artist-sarsgaard-memory] involved weekly conversations. Another voice, [the caller in Old Friend|old-friend], emerged after he watched Philip’s rough cut without a word of explanation.",
    "layout": "quiet",
    "sources": [
      {
        "title": "Interview — Jake Schreier’s firsthand account of recording Sarsgaard, August 15, 2012",
        "url": "https://www.interviewmagazine.com/film/jake-schreier-robot-frank"
      },
      {
        "title": "Associated Press — Sarsgaard’s preparation for Memory, December 2023",
        "url": "https://apnews.com/article/13989e5e2f9e4d1be66acb16acddaab2"
      },
      {
        "title": "IFC — Philip Di Fiore on the Old Friend voice session, June 27, 2012; preserved interview",
        "url": "https://philipdifiore.com/press/ifc-old-friend/"
      }
    ]
  },
  {
    "id": "old-friend",
    "title": "Old Friend",
    "heading": "DOWN\nTHE HALL",
    "kind": "CAVEMAN / MAKING THE FILM",
    "body": "Sam Hopkins stalked the hallways in a fedora, then went into the kitchen to cook for everyone. Old Friend’s cast and crew spent the shoot together in [one Claryville house|film-claryville-weekend]. A vintage tube camera made its rooms look like [an old television transmission|film-tube-time]; the past seemed to be leaking into the present. The soft menace on the telephone came later. [Peter’s timing|film-sarsgaard-rough-cut] reminded Philip of the jazz trumpet players they talked about when they weren’t working.",
    "layout": "wide",
    "sources": [
      {
        "title": "IFC — Philip Di Fiore’s firsthand account of Old Friend, June 27, 2012; preserved interview",
        "url": "https://philipdifiore.com/press/ifc-old-friend/"
      }
    ]
  },
  {
    "id": "mgmt-kids",
    "title": "MGMT — Kids",
    "heading": "FRANCIS\nIS THE WOLF.",
    "kind": "MGMT / RAY TINTORI",
    "body": "The wolf in Ray Tintori’s Kids is [Francis|francis-and-lights]. Part of the video was filmed at [the Rumpus Room|rumpus-room], where his band also recorded It’ll Be Better and shot its cover. The film changes medium, too: Christy Karacas directed its animation, with Lizzi Akana and Henry Thurlow animating. Francis’s own performance films took another turn. In Darling, It’s Alright, Jake Schreier kept the camera running and let [the lighting make the edits|francis-light-cut].",
    "layout": "stack",
    "sources": [
      {
        "title": "Philip Di Fiore — firsthand recollections supplied September 13, 2026"
      },
      {
        "title": "Lizzi Akana — MGMT Kids production and animation credits",
        "url": "https://www.lizziakana.com/mgmt-kids-music-video"
      },
      {
        "title": "Fenway Recordings — Darling, It’s Alright single-take performance, August 19, 2010",
        "url": "https://www.fenwayrecordings.com/news/darling-its-alright-by-francis-and-the-lights-live-performance"
      }
    ]
  },
  {
    "id": "recording-parties",
    "title": "The party was the session",
    "heading": "EAT FIRST.\nTHEN PLAY.",
    "kind": "RECORDING PARTIES / THE RUMPUS ROOM",
    "layout": "stack",
    "body": "The Recording Parties began with food, drinks and people getting acquainted. Philip, Albert and Jon Wiley invited musicians to play outside the expectations attached to their usual bands. Albert recorded the sessions live; [several people later performed the mix together|live-mix]. The photographs [keep track of who played what|session-players]. Har Mar Superstar, Caveman, Sinkane and French Kicks found another way to play together: [refusing to let an Elton John ending finish|save-my-life].",
    "sources": [
      {
        "title": "Bedford + Bowery — Andrew Alexander interviews Philip at the Recording Parties, June 17, 2014; preserved local press archive",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      },
      {
        "title": "Baeble Music — Matt Howard describes Save My Life and its continuous take, September 27, 2013; preserved local press archive",
        "url": "https://philipdifiore.com/press/baeble-save-my-life/"
      }
    ]
  },
  {
    "id": "save-my-life",
    "title": "An ending becomes the whole film",
    "heading": "KEEP\nSINGING",
    "kind": "SAVE MY LIFE / HAR MAR SUPERSTAR & FRIENDS",
    "layout": "stack",
    "body": "Har Mar Superstar and members of Caveman, Sinkane and French Kicks take the ending of Elton John’s “Someone Saved My Life Tonight” and keep it going for a little over twelve minutes. Philip films the entire performance in one continuous take. A repeated refrain becomes the structure of a whole film. [Har Mar was also reshaping his own songwriting around his voice|har-mar]; [Elton’s original album has its own story of a band playing without stopping|artist-elton-john].",
    "sources": [
      {
        "title": "Baeble Music — Matt Howard describes Save My Life and its continuous take, September 27, 2013; preserved local press archive",
        "url": "https://philipdifiore.com/press/baeble-save-my-life/"
      },
      {
        "title": "Jonk Music — Rebecca Edwards interviews Har Mar Superstar about writing Bye Bye 17, March 31, 2014",
        "url": "https://www.jonkmusic.com/2014/03/qa-har-mar-superstar/"
      },
      {
        "title": "Elton John — Captain Fantastic and the Brown Dirt Cowboy: Inside the Studio; firsthand accounts from Gus Dudgeon and Nigel Olsson, October 23, 2025",
        "url": "https://www.eltonjohn.com/stories/captain-fantastic-and-the-brown-dirt-cowboy-inside-the-studio"
      }
    ]
  },
  {
    "id": "har-mar",
    "title": "The songs came with winter",
    "heading": "WINTER\nCHANGED IT",
    "kind": "HAR MAR SUPERSTAR / SONGWRITING",
    "layout": "stack",
    "body": "After eight years in Los Angeles, Har Mar Superstar felt stalled. A winter residency in New York brought the songs for Bye Bye 17: he wrote on guitar, finding chords that suited his voice, then recorded with Spoon’s Jim Eno. His phone held scraps of lyrics and music; finishing one song could release five more. The voice at the center of those songs also carries [Philip’s Save My Life|save-my-life], stretching [an Elton John refrain|artist-elton-john] with the other musicians.",
    "sources": [
      {
        "title": "Jonk Music — Rebecca Edwards interviews Har Mar Superstar about writing Bye Bye 17, March 31, 2014",
        "url": "https://www.jonkmusic.com/2014/03/qa-har-mar-superstar/"
      },
      {
        "title": "Baeble Music — Matt Howard describes Save My Life and its continuous take, September 27, 2013; preserved local press archive",
        "url": "https://philipdifiore.com/press/baeble-save-my-life/"
      }
    ]
  },
  {
    "id": "artist-elton-john",
    "title": "Nine minutes into a take",
    "heading": "ALL IN\nONE GO?",
    "kind": "ELTON JOHN / CAPTAIN FANTASTIC",
    "layout": "wide",
    "body": "Nine minutes into a take at Caribou, Neil Sedaka leaned toward producer Gus Dudgeon: was the band really playing it all in one go? Elton John’s musicians were joining “We All Fall in Love Sometimes” to “Curtains,” and recorded the pair in two takes. Drummer Nigel Olsson remembered concentrating hard because everyone had committed to finishing together. The same album supplied [Har Mar’s refrain in Philip’s film|save-my-life]. At Philip’s studio, [the mix could demand several performers too|live-mix].",
    "sources": [
      {
        "title": "Elton John — Captain Fantastic and the Brown Dirt Cowboy: Inside the Studio; firsthand accounts from Gus Dudgeon and Nigel Olsson, October 23, 2025",
        "url": "https://www.eltonjohn.com/stories/captain-fantastic-and-the-brown-dirt-cowboy-inside-the-studio"
      },
      {
        "title": "Baeble Music — Matt Howard describes Save My Life and its continuous take, September 27, 2013; preserved local press archive",
        "url": "https://philipdifiore.com/press/baeble-save-my-life/"
      },
      {
        "title": "Bedford + Bowery — Andrew Alexander interviews Philip at the Recording Parties, June 17, 2014; preserved local press archive",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      }
    ]
  },
  {
    "id": "live-mix",
    "title": "The mix was another performance",
    "heading": "SEVERAL\nPAIRS\nOF HANDS",
    "kind": "RECORDING PARTIES / MIXING LIVE",
    "layout": "stack",
    "body": "The players had finished, but the Recording Parties still needed another group performance. Albert’s 24-track recording went through a desk with several people riding its controls, mixing live onto two-track tape. The stereo tape then went to [mastering and cutting onto vinyl|tape-vinyl]. Philip described the aim as working quickly without making the sound sterile. The process preserved the pace of [the gatherings themselves|recording-parties]; his [unbroken Save My Life film|one-take] lets a live performance set the pace on screen.",
    "sources": [
      {
        "title": "Bedford + Bowery — Andrew Alexander interviews Philip at the Recording Parties, June 17, 2014; preserved local press archive",
        "url": "https://philipdifiore.com/press/bedford-bowery-recording-parties/"
      },
      {
        "title": "Baeble Music — Matt Howard describes Save My Life and its continuous take, September 27, 2013; preserved local press archive",
        "url": "https://philipdifiore.com/press/baeble-save-my-life/"
      }
    ]
  },
  {
    "id": "francis-drum-pieces",
    "body": "The piano came first. Francis recorded its feel before building the rhythm around it. Then he played the drum kit one instrument at a time against looped sections of the songs: hi-hat, snare, toms. Hundreds of performances were edited and reassembled in Pro Tools.\n\nFrancis and [Jake Schreier|artist-schreier] built [It’ll Be Better|itll-be-better] through those choices. During the album sessions, Jake also sat with Philip to work on another performance: [Lee Fields confronting Sharon Jones|i-learned-the-hard-way]."
  },
  {
    "id": "editing",
    "body": "Philip is an editor on his projects and occasionally the projects of others. When [Jake Schreier sat in on his edit|artist-schreier] of I Learned the Hard Way, the opening confrontation between Lee Fields and Sharon Jones gained another filmmaker’s perspective. Other films ask him to leave time intact: [Save My Life|save-my-life] unfolds in a continuous take; a nearly five-minute speech in The Buffalo Hunt is [allowed to remain whole|buffalo-elder-speech]."
  },
  {
    "id": "music-buffalo-hunt",
    "body": "[Jason Hill|jason-hill] and Ari Ingber composed the soundtrack for [The Buffalo Hunt|buffalo-hunt]. The recording took place at Hill’s [Department of Recording and Power studio|department-recording-power]. Hill’s work extends into [David Fincher’s films and television|artist-fincher]; both composers also participated in [Recording Parties|recording-parties].",
    "sources": [
      {
        "title": "The Buffalo Hunt — Soundtrack — credits",
        "url": "https://thebuffalohuntmovie.com/"
      },
      {
        "title": "Philip Di Fiore — firsthand recollection of the soundtrack recording at Jason Hill’s studio"
      }
    ]
  }
];
for(const {id,...entry} of entries){const node={...notes[id],...passages[id],...entry,curated:true,related:[]};notes[id]=node;passages[id]=node;}
})();
