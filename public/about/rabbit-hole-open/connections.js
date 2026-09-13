/* A clicked subject opens its own story. Connections live inside the writing. */
(()=>{
const aliases={
 'blue-note':'film-sleeves-move','35mm':'film-1964-glass','1964':'film-1964-glass',
 'old-friend':'film-tube-time','tube-camera':'film-tube-time','time-folding':'film-tube-time','one-house':'film-claryville-weekend','phone':'film-sarsgaard-rough-cut','hotel':'film-jane-hotel','in-the-city':'film-jane-hotel',
 'improvisczario':'music-improvisczario','improvis-players':'wl-one-keyboard','improvis-keys':'wl-one-keyboard','baby-elephant':'music-baby-elephant',
 'lenny-kravitz':'artist-kravitz','prince-paul':'artist-prince-paul','de-la-soul':'artist-de-la-soul','david-byrne':'artist-byrne','david-fincher':'artist-fincher',
 'newkirk':'wl-newkirk-replay','sample-tuning':'wl-samples-in-key','knee-deep':'wl-knee-deep-meeting','flash-light':'wl-flash-light-layers','stop-making-sense':'wl-stage-assembled','nona-hendryx':'wl-nona-soundplay','wave-glove':'wl-nona-soundplay',
 'runnin':'revolution','naomi-shelton':'naomi','save-my-life':'one-take','rival':'rival-schools','spacecamp':'spacecamp-song-story','har-mar':'extended-ending'
};
const {notes}=window.ABOUT_GRAPH,passages=window.RABBIT_PASSAGES;
const get=id=>({...notes[id],...passages[id]});
const update=(id,patch)=>{const n={...get(id),...patch};notes[id]=n;passages[id]=n;};
const wording={
 'musicians-index':"[Bernie Worrell|bernie] made keyboards speak in voices nobody expected. His musical circles include [George Clinton|artist-clinton], [Bootsy Collins|artist-bootsy] and [David Byrne|artist-byrne]. [Prince Paul|artist-prince-paul] brought a different history of sampling and invention to [Baby Elephant|music-baby-elephant]. Philip’s other music projects include [Improvisczario|music-improvisczario], [Recording Parties|recording-parties] and [The Buffalo Hunt soundtrack|music-buffalo-hunt].",
 'records':"Philip produced Bernie Worrell’s [Improvisczario|music-improvisczario] and executive produced Baby Elephant’s [Turn My Teeth Up!|music-baby-elephant]. Both were recorded in [Lenny Kravitz|artist-kravitz]’s private [studio at Hotel Edison|night-sessions]. [Recording Parties|recording-parties] brought musicians together at the Rumpus Room; [The Buffalo Hunt soundtrack|music-buffalo-hunt] took shape with Jason Hill and Ari Ingber.",
 'tape-vinyl':"A performance captured on tape eventually becomes a groove a needle can follow. For [Recording Parties|recording-parties], Josh Bonati mastered and cut from the stereo tape, with no digital program in the route described in 2014. He also cut five dubplates for [David Byrne’s return to a Baby Elephant song|wl-brainwave-return]. The finished record can carry a whole visual world too: [the planned Recording Parties sleeves|party-record-sleeves] were deliberately spare.",
 'live-mix':"The [Recording Parties|recording-parties] tracks were mixed live from 24-track tape onto two-track tape. Several people had their hands on the desk, so making the mix was itself a coordinated performance. That stereo tape then went to Josh Bonati, who [mastered and cut directly from it|tape-vinyl].",
 'wl-stage-assembled':"[David Byrne|artist-byrne] designed Stop Making Sense to show what it takes to put on a show. He begins alone, then musicians and equipment gradually arrive. Each entrance lets the audience hear a new contribution; [Bernie Worrell|bernie] becomes part of that expanding ensemble. Byrne compared it to revealing a magician’s method while the magic continues. The construction itself becomes part of the performance.",
 'mindhunter-wendy-kay':"For Wendy and Kay’s music, Hill listened to [Brian Eno’s Music for Airports|artist-eno] and studied his process. He recorded piano, then played Rhodes without hearing that take. Loops of different lengths overlapped; one piano ran at half speed. The cue accompanies their breakup and Wendy overhearing Kay speak to her former husband. Hill also composed [The Buffalo Hunt’s score|music-buffalo-hunt] with Ari Ingber.",
 'rival-schools':"Rival Schools’ Shot After Shot is one of Philip’s [music videos|video-index]. His other work in the form ranges from the old television texture of [Caveman’s Old Friend|film-tube-time] to [Sinkane’s performed images|playable].",
 'naomi':"Philip directed What Have You Done for Naomi Shelton & The Gospel Queens. The group’s Daptone world also includes [Sharon Jones & The Dap-Kings|sharon], whose three-film project was photographed on [35mm with a vintage anamorphic lens|film-1964-glass]."
};
for(const [id,body] of Object.entries(wording))update(id,{body});
update('writing',{body:get('writing').body+' A book can also become an experiment in possibility: [one set of pages, a hundred trillion poems|art-queneau].'});
update('art-queneau',{body:'Raymond Queneau wrote ten sonnets whose lines could be exchanged without breaking their rhyme scheme or syntax. Fourteen positions, ten choices apiece: one small book contains 100 trillion possible poems. The reader assembles a poem the author may never have seen. It is literature built as a [tool for writing|tools]. In a recording studio, [Eno and Bowie used private rules|eno-oblique-strategies] to make their own results less predictable.'});

update('score',{link:'/music/buffalo-hunt-soundtrack/',linkLabel:'Open soundtrack project ↗'});
update('tape-vinyl',{title:'Cutting a record',heading:'TAPE TO\nGROOVE',kind:'RECORDING / A PHYSICAL PROCESS'});
// Reconnect existing words instead of appending a generic related-topic menu.
const annotate={
 'mindhunter-tape-loops':[['Hill','jason-hill']],
 '24-track':[['Recording Parties','recording-parties'],['sessions','recording-parties']],
 'playable':[['Philip','editing'],['musical equipment and keyboards','young-trouble']],
 'rumpus-room':[['Recording Parties','recording-parties'],['Caveman','caveman']],
 'spacecamp-song-story':[['Philip’s video','miko-dtb']],
 'buffalo-elder-speech':[['film','buffalo-hunt']],
 'buffalo-elder-delivery':[['Jason Hill','jason-hill']],
 'wl-samples-in-key':[['Prince Paul','artist-prince-paul'],['De La Soul','artist-de-la-soul'],['engineer','wl-film-becomes-band']],
 'wl-nona-soundplay':[['Baby Elephant','music-baby-elephant'],['movement affecting sound, light and triggered images','playable']],
 'wl-listen-first':[['Bernie','bernie'],['different people','wl-one-keyboard']],
 'wl-talking-heads-pulse':[['Bernie','bernie']],
 'wl-flash-light-layers':[['Bernie','bernie'],['Minimoog','minimoog']],
 'minimoog':[['Players','wl-flash-light-layers'],['sound','wl-one-keyboard']],
 'celesta':[['celesta','wl-one-keyboard'],['player','clavinet']],
 'clavinet':[['Clavinet 1','wl-one-keyboard'],['strings','wl-flash-light-layers']],
 'turntables':[['record labels','party-record-sleeves'],['a short passage keep going','artist-prince-paul']],
 'mike-gordon':[['Mike Gordon','wl-one-keyboard'],['cover illustration and hand lettering','party-record-sleeves']],
 'warren-haynes':[['Warren Haynes','wl-one-keyboard'],['Gov’t Mule','album-players']],
 'newkirk':[['Prince Paul','artist-prince-paul'],['Don Newkirk','wl-newkirk-replay']],
 'revolution':[['Sinkane','sinkane'],['Runnin’','mars']],
 'body-paint':[['Warm Spell','warm-spell'],['photography','fruit']],
 'stop-motion':[['Stop motion','collage'],['Miko D.T.B.','miko-dtb']],
 'oil-paint':[['Oil painting','collage'],['Miko D.T.B.','miko-dtb']],
 'alibi':[['Miko D.T.B.','miko-dtb'],['Spacecamp','spacecamp-song-story']],
 'mars':[['Warm Spell','warm-spell'],['Runnin’','revolution']],
 'mean-love':[['Young Trouble','young-trouble'],['Sinkane','sinkane']],
 'coco-beware':[['Old Friend','film-tube-time'],['Caveman','caveman']],
 'pantages':[['Academy Awards','academy-collection']],
 'televised-oscars':[['Academy','academy-collection'],['ceremony','pantages']],
 'film-sarsgaard-rough-cut':[['Peter Sarsgaard','artist-sarsgaard']],
 'film-street-comparisons':[['Martin Scorsese','artist-scorsese'],['Mean Streets','artist-scorsese']],
 'film-wolff-miles':[['Sharon Jones','sharon']],
 'james-richardson':[['guitar and trumpet','party-guitars']],
 'jon-wiley':[['drums and guitar','party-rhythm']],
 'james-pollis':[['guitar','party-guitars']],
 'darwin-smith':[['guitar','party-guitars']],
 'gregory-richardson':[['drums and piano','party-rhythm']],
 'jon-cowherd':[['piano','party-keys']],
 'andrew-borger':[['drums','party-rhythm']],
 'don-de-vore':[['participants','session-players']],
 'michael-rosen':[['keys','party-keys']]
};
function inPlain(body,phrase,target){let done=false;return body.split(/(\[[^\]]+\])/g).map(s=>{if(done||s.startsWith('['))return s;if(s.includes(phrase)){done=true;return s.replace(phrase,`[${phrase}|${target}]`)}return s;}).join('');}
for(const [id,pairs] of Object.entries(annotate)){let n=get(id);if(!n.body)continue;for(const [phrase,target] of pairs)n.body=inPlain(n.body,phrase,target);update(id,{body:n.body});}
const identities=[[/^Lenny Kravitz(?:’s)?$/i,'artist-kravitz'],[/^David Bowie(?:’s)?$/i,'artist-bowie'],[/^Robert Fripp(?:’s)?$/i,'artist-fripp'],[/^David Byrne(?:’s)?$/i,'artist-byrne'],[/^Brian Eno(?:’s)?$/i,'artist-eno'],[/^Prince Paul(?:’s)?$/i,'artist-prince-paul'],[/^De La Soul(?:’s)?$/i,'artist-de-la-soul'],[/^George Clinton(?:’s)?$/i,'artist-clinton'],[/^Bootsy Collins(?:’s)?$/i,'artist-bootsy'],[/^Peter Sarsgaard(?:’s)?$/i,'artist-sarsgaard'],[/^David Fincher(?:’s)?$/i,'artist-fincher']];
const names=[['David Bowie','artist-bowie'],['Robert Fripp','artist-fripp'],['Lenny Kravitz','artist-kravitz'],['David Byrne','artist-byrne'],['Brian Eno','artist-eno'],['George Clinton','artist-clinton'],['Bootsy Collins','artist-bootsy'],['Prince Paul','artist-prince-paul'],['De La Soul','artist-de-la-soul'],['Peter Sarsgaard','artist-sarsgaard'],['David Fincher','artist-fincher'],['Martin Scorsese','artist-scorsese'],['Baby Elephant','music-baby-elephant'],['Improvisczario','music-improvisczario'],['Turn My Teeth Up!','music-baby-elephant'],['Recording Parties','recording-parties']];
for(const id of Object.keys(notes)){
 let n=get(id);if(!n.body)continue;
 n.body=n.body.replace(/\[([^\]|]+)\|([^\]]+)\]/g,(_,label,target)=>{
  // Josh remains properly credited; the clickable subject is the cutting process.
  if(/^Josh Bonati/.test(label))return label;
  const person=identities.find(([re])=>re.test(label));target=person?person[1]:(aliases[target]||target);
  if(/^(Baby Elephant|Turn My Teeth Up)/i.test(label))target='music-baby-elephant';
  if(/^Improvisc?zario/i.test(label))target='music-improvisczario';
  if(/Buffalo Hunt/.test(label)&&(/score|soundtrack/i.test(label)||target==='score'))target='music-buffalo-hunt';
  return target===id?label:`[${label}|${target}]`;
 });
 for(const [name,target] of names)if(target!==id&&!n.body.includes('|'+target+']'))n.body=inPlain(n.body,name,target);
 update(id,{body:n.body});
}
window.RABBIT_BALANCE={aliases};
})();
