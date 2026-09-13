/* Navigation is curated, but the reader sees only subjects and factoids.
   A departure keeps its work context, and never offers more than one outside choice. */
(()=>{
const aliases={
  "blue-note": "film-sleeves-move",
  "francis-wolff": "film-wolff-miles",
  "reid-miles": "film-wolff-miles",
  "35mm": "film-1964-glass",
  "1964": "film-1964-glass",
  "old-friend": "film-tube-time",
  "tube-camera": "film-tube-time",
  "time-folding": "film-tube-time",
  "one-house": "film-claryville-weekend",
  "phone": "film-sarsgaard-rough-cut",
  "hotel": "film-jane-hotel",
  "in-the-city": "film-jane-hotel",
  "improvisczario": "wl-improvisczario-room",
  "improvis-players": "wl-one-keyboard",
  "improvis-keys": "wl-one-keyboard",
  "baby-elephant": "wl-film-becomes-band",
  "prince-paul": "wl-film-becomes-band",
  "newkirk": "wl-newkirk-replay",
  "sample-tuning": "wl-samples-in-key",
  "de-la-soul": "wl-knee-deep-meeting",
  "knee-deep": "wl-knee-deep-meeting",
  "flash-light": "wl-flash-light-layers",
  "minimoog": "wl-flash-light-layers",
  "david-byrne": "wl-brainwave-return",
  "stop-making-sense": "wl-stage-assembled",
  "nona-hendryx": "wl-nona-soundplay",
  "wave-glove": "wl-nona-soundplay"
},groups={
  "film": [
    "film-claryville-weekend",
    "film-sarsgaard-rough-cut",
    "film-jane-hotel",
    "film-sleeves-move",
    "film-1964-glass",
    "film-lytwyn",
    "film-caveman-air",
    "one-take",
    "spacecamp-song-story"
  ],
  "music": [
    "wl-film-becomes-band",
    "wl-brainwave-return",
    "wl-improvisczario-room",
    "wl-knee-deep-meeting",
    "wl-flash-light-layers",
    "wl-shock-g-sendback",
    "wl-nona-soundplay",
    "recording-parties",
    "wl-listen-first"
  ],
  "studio": [
    "recording-parties",
    "live-mix",
    "film-caveman-air",
    "night-sessions",
    "party-before-music",
    "score",
    "jason-hill",
    "mindhunter-glass",
    "mindhunter-theme",
    "mindhunter-btk"
  ],
  "process": [
    "young-trouble",
    "playable",
    "film-sarsgaard-rough-cut",
    "spacecamp-song-story",
    "film-tube-time",
    "buffalo-elder-speech",
    "film-lytwyn",
    "party-before-music",
    "film-sleeves-move"
  ],
  "documentary": [
    "wl-stranger-four-years",
    "academy-collection",
    "buffalo-hunt",
    "no-narration",
    "buffalo-elder-speech",
    "buffalo-elder-delivery",
    "score",
    "wl-film-becomes-band"
  ]
},families={
  "film-claryville-weekend": "film",
  "film-sarsgaard-rough-cut": "process",
  "film-jane-hotel": "film",
  "film-sleeves-move": "process",
  "film-1964-glass": "film",
  "film-lytwyn": "process",
  "film-caveman-air": "studio",
  "one-take": "film",
  "spacecamp-song-story": "process",
  "wl-film-becomes-band": "documentary",
  "wl-brainwave-return": "music",
  "wl-improvisczario-room": "music",
  "wl-knee-deep-meeting": "music",
  "wl-flash-light-layers": "music",
  "wl-shock-g-sendback": "music",
  "wl-nona-soundplay": "music",
  "recording-parties": "studio",
  "wl-listen-first": "music",
  "live-mix": "studio",
  "night-sessions": "studio",
  "party-before-music": "process",
  "score": "documentary",
  "jason-hill": "studio",
  "mindhunter-glass": "studio",
  "mindhunter-theme": "studio",
  "mindhunter-btk": "studio",
  "young-trouble": "process",
  "playable": "process",
  "film-tube-time": "process",
  "buffalo-elder-speech": "documentary",
  "wl-stranger-four-years": "documentary",
  "academy-collection": "documentary",
  "buffalo-hunt": "documentary",
  "no-narration": "documentary",
  "buffalo-elder-delivery": "documentary",
  "stranger": "documentary",
  "recognition": "documentary",
  "pine-ridge": "documentary",
  "no-interviews": "documentary",
  "film-index": "documentary",
  "rumpus-room": "studio",
  "ten-years": "studio",
  "4000": "studio",
  "session-players": "studio",
  "party-guitars": "studio",
  "party-keys": "studio",
  "party-rhythm": "studio",
  "party-record-sleeves": "studio",
  "24-track": "studio",
  "tape-vinyl": "studio",
  "no-digital": "studio",
  "albert": "studio",
  "lenny-kravitz": "studio",
  "hotel-edison": "studio",
  "department-recording-power": "studio",
  "trident-console": "studio",
  "mindhunter": "studio",
  "mindhunter-metal-cello": "studio",
  "mindhunter-tape-loops": "studio",
  "mindhunter-wendy-kay": "studio",
  "gone-girl-trailer": "studio",
  "david-fincher": "studio",
  "tools": "process",
  "writing": "process",
  "editing": "process",
  "stories": "process",
  "experiments": "process",
  "collage": "process",
  "oil-paint": "process",
  "stop-motion": "process",
  "fruit": "process",
  "body-paint": "process",
  "warm-spell": "process",
  "unpredictable": "process",
  "another-world": "process",
  "sharon": "film",
  "trilogy": "film",
  "if-you-call": "film",
  "i-learned-the-hard-way": "film",
  "game-gets-old": "film",
  "video-index": "film",
  "caveman": "film",
  "live-index": "film",
  "save-my-life": "film",
  "extended-ending": "film",
  "har-mar": "film",
  "places": "film",
  "bernie": "music",
  "records": "music",
  "album-players": "music",
  "musicians-index": "music",
  "baby-voices": "music",
  "baby-textures": "music",
  "baby-breath": "music",
  "film-musicians": "music",
  "blue-note": "process",
  "francis-wolff": "film",
  "reid-miles": "film",
  "35mm": "film",
  "1964": "film",
  "old-friend": "process",
  "tube-camera": "process",
  "time-folding": "process",
  "one-house": "film",
  "phone": "process",
  "hotel": "film",
  "in-the-city": "film",
  "improvisczario": "music",
  "improvis-players": "music",
  "improvis-keys": "music",
  "baby-elephant": "documentary",
  "prince-paul": "documentary",
  "newkirk": "music",
  "sample-tuning": "music",
  "de-la-soul": "music",
  "knee-deep": "music",
  "flash-light": "music",
  "minimoog": "music",
  "david-byrne": "music",
  "stop-making-sense": "music",
  "nona-hendryx": "music",
  "wave-glove": "music"
},detours={
  "film": [
    "film-preservation",
    "art-fog"
  ],
  "music": [
    "sound-voyager",
    "detour-glass-armonica"
  ],
  "studio": [
    "sound-whale-tapes",
    "sound-sofar"
  ],
  "process": [
    "art-queneau",
    "art-cage"
  ],
  "documentary": [
    "film-preservation",
    "frontier-dawson"
  ]
},related={
  "stranger": [
    "wl-stranger-four-years"
  ],
  "academy-collection": [
    "wl-stranger-four-years",
    "wl-film-becomes-band"
  ],
  "trilogy": [
    "film-sleeves-move",
    "film-street-comparisons"
  ],
  "rumpus-room": [
    "film-caveman-air"
  ],
  "tape-vinyl": [
    "wl-brainwave-return"
  ],
  "wl-brainwave-return": [
    "tape-vinyl"
  ],
  "wl-stage-assembled": [
    "wl-stranger-four-years",
    "wl-nona-soundplay"
  ],
  "wl-listen-first": [
    "wl-one-keyboard",
    "wl-talking-heads-pulse"
  ],
  "wl-samples-in-key": [
    "wl-newkirk-replay",
    "wl-film-becomes-band"
  ],
  "wl-nona-soundplay": [
    "wl-brainwave-return",
    "wl-film-becomes-band"
  ],
  "mindhunter-wendy-kay": [
    "mindhunter-theme",
    "score"
  ],
  "film-sarsgaard-rough-cut": [
    "film-claryville-weekend"
  ],
  "film-caveman-air": [
    "recording-parties"
  ],
  "bernie": [
    "wl-stranger-four-years",
    "wl-listen-first"
  ]
};
const {notes}=window.ABOUT_GRAPH,passages=window.RABBIT_PASSAGES;
for(const [id,ids] of Object.entries(related))passages[id]={...(passages[id]||{}),related:ids};
for(const [id,n] of Object.entries(notes)){
 const c={...n,...passages[id]};
 if(c.scope==='detour')continue;
 c.body=c.body.replace(/\|([^\]]+)\]/g,(_,id)=>'|'+(aliases[id]||id)+']');
 c.related=[...new Set((c.related||[]).map(id=>aliases[id]||id))].filter(k=>k!==id);
 notes[id]={...n,...c};passages[id]=c;
}
window.RABBIT_BALANCE={aliases,groups,families,detours};
})();
