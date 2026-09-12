/* First-pass editorial notes. Facts are drawn from the user's bio and the existing
   design-concepts/app project metadata + public/press-articles snapshots.
   Film-process and album notes do not imply producing credits for those albums. */
(() => {
  let site=new URL('/',window.location.href);
  if(window.parent!==window)try{const parentURL=new URL(window.parent.location.href);if(parentURL.origin===site.origin)site=parentURL;}catch{}
  const base=site.origin+site.pathname+site.search+'#featured/';
  const notes={},topics={};
  const add=(id,title,kind,body,tags=[],slug=null,source='User-supplied bio')=>{
    notes[id]={title,kind,body,tags,source,...(slug?{link:base+slug}:{})};return id;
  };
  const workRows=[
    ['if-you-call','If You Call','Sharon Jones & The Dap-Kings','FILM'],
    ['i-learned-the-hard-way','I Learned the Hard Way','Sharon Jones & The Dap-Kings','FILM'],
    ['game-gets-old','Game Gets Old','Sharon Jones & The Dap-Kings','FILM'],
    ['old-friend','Old Friend','Caveman','VIDEO'],
    ['stranger','Stranger','Bernie Worrell on Earth','FILM'],
    ['in-the-city','In the City','Caveman','VIDEO'],
    ['runnin','Runnin’','Sinkane','VIDEO'],
    ['warm-spell','Warm Spell','Sinkane','VIDEO'],
    ['miko-dtb','Miko D.T.B.','Spacecamp','VIDEO'],
    ['young-trouble','Young Trouble','Sinkane','VIDEO'],
    ['naomi-shelton','What Have You Done','Naomi Shelton & The Gospel Queens','VIDEO'],
    ['man-man','Man Man','Live at the Brooklyn Bowl','LIVE'],
    ['recording-parties','Recording Parties','The Rumpus Room','MUSIC'],
    ['buffalo-hunt','The Buffalo Hunt','Philip Di Fiore','FILM'],
    ['diiv','DIIV','Live at the Brooklyn Bowl','LIVE'],
    ['class-actress','Class Actress','Live at the Brooklyn Bowl','LIVE'],
    ['save-my-life','Save My Life','Har Mar Superstar & Friends','LIVE'],
    ['rival-schools','Shot After Shot','Rival Schools','VIDEO'],
    ['rdgldgrn','Power Ups','RDGLDGRN','VIDEO'],
    ['antibalas','Antibalas','Live at the House of Soul','LIVE']
  ];
  for(const [slug,title,artist,format] of workRows)add(slug,title,format,artist,[],slug,'app/artworks/data.ts; overprint/projects.ts; overprint-sequence/projects.ts; overprint-centered/projects.ts');
  const artistRows=[
    ['sharon','Sharon Jones & The Dap-Kings',['if-you-call','i-learned-the-hard-way','game-gets-old']],
    ['caveman','Caveman',['old-friend','in-the-city']],
    ['bernie','Bernie Worrell',['stranger']],
    ['sinkane','Sinkane',['runnin','warm-spell','young-trouble']],
    ['spacecamp','Spacecamp',['miko-dtb']],
    ['naomi','Naomi Shelton & The Gospel Queens',['naomi-shelton']],
    ['manman','Man Man',['man-man']],['diiv-band','DIIV',['diiv']],
    ['class-actress-band','Class Actress',['class-actress']],
    ['har-mar','Har Mar Superstar',['save-my-life']],
    ['rival','Rival Schools',['rival-schools']],['rdg','RDGLDGRN',['rdgldgrn']],['antibalas-band','Antibalas',['antibalas']]
  ];
  for(const [id,artist,works] of artistRows)add(id,artist,'MUSICIAN / WORK',works.map(key=>notes[key].title).join(' · '),works,null,'Existing featured-project metadata');
  // The named participants below are documented in Recording Parties captions.
  // Their other employers/bands are not presented as Philip's collaborators.
  const sessionRows=[
    ['jon-wiley','Jon Wiley','Drums + guitar'],['james-pollis','James Pollis','Guitar'],
    ['james-richardson','James Richardson','Guitar + trumpet'],['jason-hill','Jason Hill','Guitar'],
    ['darwin-smith','Darwin Smith','Guitar'],['gregory-richardson','Gregory Richardson','Drums + piano'],
    ['jon-cowherd','Jon Cowherd','Piano'],['andrew-borger','Andrew Borger','Drums'],
    ['don-de-vore','Don De Vore','Session participant'],['ari-ingber','Ari Ingber','Keys'],
    ['emma-gomis','Emma Gomis','Bass + piano'],['michael-rosen','Michael Rosen','Keys'],
    ['andrea-gomis','Andrea Gomis','Piano']
  ];
  for(const [id,name,instrument] of sessionRows)add(id,name,'RECORDING PARTIES',instrument,['recording-parties'],null,'bedford-bowery-recording-parties.json captions');
  const facts=[
    ['35mm','35mm','FILM STOCK','The three Sharon Jones films were shot in Panavision on 35mm film.',['trilogy','1964'],'if-you-call','sharon-jones-ifc.json'],
    ['1964','A lens from 1964','ON SET','Philip and cinematographer Christopher J. Lytwyn used a 1964 anamorphic lens for the Sharon Jones trilogy.',['35mm','blue-note'],'i-learned-the-hard-way','sharon-jones-ifc.json'],
    ['blue-note','Blue Note','VISUAL INSPIRATION','Vintage Blue Note album covers helped shape the visual world of the Sharon Jones films.',['trilogy'],'game-gets-old','sharon-jones-ifc.json'],
    ['trilogy','Three Sharon Jones films','CONNECTED WORKS','If You Call. I Learned the Hard Way. Game Gets Old. Three films within one Sharon Jones project.',['if-you-call','i-learned-the-hard-way','game-gets-old'],null,'sharon-jones-ifc.json; press-data.ts'],
    ['phone','A voice on the phone','HIDDEN IN THE FILM','The ominous caller in Caveman’s Old Friend is Peter Sarsgaard.',['tube-camera','old-friend'],'old-friend','ifc-old-friend.json'],
    ['tube-camera','Tube camera','CAMERA','Old Friend used a vintage black-and-white tube video camera for its early-television look.',['one-house','phone'],'old-friend','ifc-old-friend.json'],
    ['one-house','One house, one weekend','LOCATION','The Old Friend cast and crew stayed together in an old house in Claryville, New York, for the weekend shoot.',['time-folding'],'old-friend','ifc-old-friend.json'],
    ['time-folding','Time folding','STORY','Discussing Old Friend, Philip described a past that holds on and folds into the present.',['phone','old-friend'],'old-friend','ifc-old-friend.json'],
    ['hotel','A hotel nightmare','STORY / CAST','A couple’s New York visit becomes a nightmare in In the City, starring Julia Stiles, Fran Kranz and Michael Cavadias.',['in-the-city'],'in-the-city','consequence-in-the-city.json'],
    ['playable','Playable pictures','EXPERIMENT','Young Trouble’s images were manipulated through musical equipment and keyboards. The pictures became something the team could play.',['unpredictable','young-trouble'],'young-trouble','fader-young-trouble.json'],
    ['unpredictable','No fixed outcome','PROCESS','For Young Trouble, the team began without knowing exactly what the experiment would produce. Sinkane and the labels agreed to try it.',['playable'],'young-trouble','fader-young-trouble.json'],
    ['another-world','Another world','STORY','Warm Spell follows a man into an alternate reality populated by sirens.',['fruit','body-paint'],'warm-spell','dummy-warm-spell.json'],
    ['fruit','Fruit + flowers','MATERIAL','Close views of fruit and flowers help construct Warm Spell’s strange world.',['body-paint'],'warm-spell','dummy-warm-spell.json'],
    ['body-paint','Body paint','MATERIAL','Warm Spell pairs black-and-white photography with bodies coated in lustrous paint.',['fruit','warm-spell'],'warm-spell','stereogum-warm-spell.json; dummy-warm-spell.json'],
    ['collage','Collage + superimposition','PROCESS','Miko D.T.B. combines collage and superimposition with claymation, stop motion and oil painting.',['stop-motion','oil-paint','alibi'],'miko-dtb','ifc-spacecamp.json'],
    ['stop-motion','Stop motion + claymation','PROCESS','Two of the image-making techniques woven into Spacecamp’s Miko D.T.B.',['collage'],'miko-dtb','ifc-spacecamp.json'],
    ['oil-paint','Oil painting','MATERIAL','Oil painting is part of the mixed-media construction of Miko D.T.B.',['collage'],'miko-dtb','ifc-spacecamp.json'],
    ['revolution','Revolution','STORY','A revolution breaks out in Sinkane’s Runnin’.',['runnin','mars'],'runnin','pitchfork-runnin.json'],
    ['no-narration','No narrator','DOCUMENTARY','The Buffalo Hunt lets the Oglala Lakota community speak without a narrator.',['no-interviews','pine-ridge'],'buffalo-hunt','ap-buffalo-hunt.json'],
    ['no-interviews','No interviews','DOCUMENTARY','For The Buffalo Hunt, Philip conducted no interviews and brought in no outside experts.',['no-narration'],'buffalo-hunt','ap-buffalo-hunt.json'],
    ['pine-ridge','Pine Ridge','PLACE','The Buffalo Hunt follows traditions and community life on the Pine Ridge Reservation in South Dakota.',['no-narration','score'],'buffalo-hunt','ap-buffalo-hunt.json'],
    ['recognition','The Buffalo Hunt','RECOGNITION','Best feature documentary honors at the Prague Film Awards and Canada International Film Festival.',['buffalo-hunt','no-narration'],'buffalo-hunt','ap-buffalo-hunt.json'],
    ['score','A film score','COMPOSERS','Jason Staehler Hill and Ari Ingber composed the score for The Buffalo Hunt.',['buffalo-hunt','jason-hill','ari-ingber'],'buffalo-hunt','nyt-buffalo-hunt.json'],
    ['one-take','One take','PERFORMANCE','Save My Life is one continuous take, lasting a little more than twelve minutes.',['extended-ending'],'save-my-life','baeble-save-my-life.json'],
    ['extended-ending','An ending that keeps going','MUSIC','Har Mar Superstar and members of Caveman, Sinkane and French Kicks extend the ending of Elton John’s Someone Saved My Life Tonight.',['one-take','har-mar'],'save-my-life','baeble-save-my-life.json'],
    ['back-patio','A back patio in Bushwick','PLACE','Antibalas performed Dirty Money behind Daptone’s House of Soul Studios. Philip’s film launched the Live From the House of Soul series.',['antibalas','house-of-soul'],'antibalas','rollingstone-antibalas.json'],
    ['house-of-soul','House of Soul','STUDIO','Daptone’s studio in Bushwick was the setting for the Antibalas performance.',['back-patio'],'antibalas','rollingstone-antibalas.json'],
    ['brooklyn-bowl','Brooklyn Bowl','VENUE','Man Man, DIIV and Class Actress: three featured live performances filmed at Brooklyn Bowl.',['man-man','diiv','class-actress'],null,'overprint/projects.ts; overprint-sequence/projects.ts'],
    ['rumpus-room','The Rumpus Room','STUDIO','Philip and his brother Albert ran this Brooklyn recording studio.',['recording-parties','4000','ten-years'],null,'bedford-bowery-recording-parties.json'],
    ['4000','4,000 square feet','SPACE','The Rumpus Room was a 4,000-square-foot recording and film studio.',['rumpus-room'],null,'featured.tsx original About copy'],
    ['24-track','24-track tape','RECORDING','Recording Parties sessions were recorded live to 24-track tape.',['live-mix','recording-parties'],'recording-parties','bedford-bowery-recording-parties.json'],
    ['live-mix','A live mix','RECORDING','Several people worked the desk together, mixing live onto two-track tape.',['tape-vinyl'],'recording-parties','bedford-bowery-recording-parties.json'],
    ['tape-vinyl','Tape → vinyl','RECORDING','Josh Bonati mastered from tape before the recordings were pressed to vinyl.',['no-digital'],'recording-parties','bedford-bowery-recording-parties.json'],
    ['no-digital','No digital detour','PROCESS','The recording-to-vinyl process described in the 2014 story used no digital program.',['24-track','live-mix'],'recording-parties','bedford-bowery-recording-parties.json'],
    ['alibi','Alibi','RECORD','Miko D.T.B., Spacecamp’s first music video, accompanies a song from the debut EP Alibi.',['miko-dtb'],'miko-dtb','ifc-spacecamp.json'],
    ['mars','Mars','RECORD','Warm Spell and Runnin’ are songs from Sinkane’s Mars.',['warm-spell','runnin'],null,'dummy-warm-spell.json; pitchfork-runnin.json'],
    ['mean-love','Mean Love','RECORD','Young Trouble is a song from Sinkane’s Mean Love.',['young-trouble'],'young-trouble','fader-young-trouble.json'],
    ['coco-beware','CoCo Beware','RECORD','Old Friend is a song from Caveman’s CoCo Beware.',['old-friend'],'old-friend','paste-old-friend.json']
  ];
  facts.forEach(row=>add(...row));
  add('academy-collection','The Academy’s permanent collection','PERMANENT COLLECTION','Philip’s film Stranger: Bernie Worrell on Earth was selected for inclusion in the permanent collection of the Academy of Motion Picture Arts and Sciences.',['stranger','bernie','recognition'],'stranger','User-supplied factoid');
  notes['stranger'].tags=['academy-collection','bernie'];
  notes['recognition'].tags.push('academy-collection');
  const musicians=artistRows.map(row=>row[0]),sessionMusicians=sessionRows.map(row=>row[0]);
  add('session-players','The recording party','PEOPLE','Musicians met, socialized and improvised at the studio’s recording sessions.',sessionMusicians,'recording-parties','bedford-bowery-recording-parties.json');
  add('ten-years','Ten years','A CHAPTER','Philip founded, owned and operated a film and music recording studio in Brooklyn for ten years.',['rumpus-room','4000']);
  add('writing','Screenplays + fiction','WRITING','Philip writes screenplays and fiction. His films open other doors into time, mystery and alternate realities.',['time-folding','hotel','another-world']);
  add('editing','From first idea to final cut','PRACTICE','Philip edits all of his own videos. The collection also contains experiments with cameras, collage and performed images.',['tube-camera','playable','collage']);
  add('tools','Creative tools','PRACTICE','Philip builds tools for writing, filmmaking and the creative process.',['writing','editing','playable']);
  add('rumpus','Rumpus Productions','CREATIVE STUDIO','Philip is a partner in Rumpus Productions with his wife Lara.',['lara']);
  add('lara','Lara','PARTNERSHIP','Philip’s wife and partner in Rumpus Productions.',['rumpus']);
  add('film-index','Films','WORKS','Documentary portraits, community stories and the three Sharon Jones films.',workRows.filter(row=>row[3]==='FILM').map(row=>row[0]),null,'Featured-project categories; press snapshots');
  add('video-index','Music videos','WORKS','Caveman, Sinkane, Spacecamp, Naomi Shelton, Rival Schools and RDGLDGRN.',workRows.filter(row=>row[3]==='VIDEO').map(row=>row[0]),null,'Featured-project metadata');
  add('live-index','Live','WORKS','Performances at Brooklyn Bowl, the House of Soul and the extended ending of Save My Life.',workRows.filter(row=>row[3]==='LIVE').map(row=>row[0]),null,'Featured-project metadata; press snapshots');
  add('musicians-index','Musicians','PEOPLE','Explore the artists in the featured collection, or open the recording party to meet its session players.',[...musicians,'session-players'],null,'Featured-project metadata; recording-party captions');
  add('stories','Stories inside the work','DISCOVERY','A mysterious caller. A hotel nightmare. Another reality. A community speaking in its own voice.',['phone','hotel','another-world','no-narration'],null,'IFC, Consequence, Dummy, AP press snapshots');
  add('experiments','Unexpected ways to make an image','PROCESS','Film lenses, old television cameras, musical equipment, paint and collage.',['1964','tube-camera','playable','collage','body-paint'],null,'IFC, Fader, Dummy press snapshots');
  add('records','Records + recordings','MUSIC','Songs in the featured videos connect to these records. Recording Parties opens a different path: live sessions, tape and vinyl.',['alibi','mars','mean-love','coco-beware','24-track','tape-vinyl'],null,'Matching music-video and Recording Parties press snapshots');
  add('places','Places','LOCATIONS','Brooklyn studios and stages, a house in Claryville, and Pine Ridge in South Dakota.',['rumpus-room','brooklyn-bowl','house-of-soul','one-house','pine-ridge'],null,'Project metadata; press snapshots');
  const group=(id,note,tags)=>topics[id]={note,tags};
  group('awards','recognition',['recognition','academy-collection','buffalo-hunt']);
  group('films','film-index',['trilogy','35mm','1964','blue-note','stranger','buffalo-hunt','live-index']);
  group('stories','stories',['phone','time-folding','hotel','another-world','no-narration','pine-ridge']);
  group('experiments','experiments',['playable','unpredictable','tube-camera','collage','body-paint','oil-paint','stop-motion']);
  group('writing','writing',['time-folding','hotel','another-world','writing']);
  group('editing','editing',['one-take','tube-camera','playable','collage','stop-motion','oil-paint']);
  group('videos','video-index',workRows.filter(row=>row[3]==='VIDEO').map(row=>row[0]));
  group('music','records',['records','live-index','24-track','live-mix','tape-vinyl','no-digital']);
  group('albums','records',['alibi','mars','mean-love','coco-beware','tape-vinyl']);
  group('scores','score',['score','jason-hill','ari-ingber','buffalo-hunt']);
  group('musicians','musicians-index',[...musicians,'session-players']);
  group('studio','rumpus-room',['rumpus-room','4000','recording-parties','session-players','24-track','live-mix','no-digital']);
  group('places','places',['brooklyn-bowl','back-patio','house-of-soul','rumpus-room','one-house','pine-ridge']);
  group('decade','ten-years',['ten-years','4000','rumpus-room','recording-parties']);
  group('tools','tools',['writing','editing','playable','unpredictable','collage']);
  group('rumpus','rumpus',['rumpus','lara']);
  group('lara','lara',['lara','rumpus']);
  notes['if-you-call'].tags=['35mm','1964','blue-note'];notes['old-friend'].tags=['phone','tube-camera','one-house'];
  notes['in-the-city'].tags=['hotel'];notes['young-trouble'].tags=['playable','unpredictable'];
  notes['warm-spell'].tags=['another-world','fruit','body-paint'];notes['miko-dtb'].tags=['collage','alibi'];
  notes['runnin'].tags=['revolution','mars'];notes['buffalo-hunt'].tags=['no-narration','pine-ridge','score'];
  notes['save-my-life'].tags=['one-take','extended-ending'];notes['antibalas'].tags=['back-patio'];
  notes['recording-parties'].tags=['session-players','24-track','live-mix','tape-vinyl'];
  window.ABOUT_GRAPH={notes,topics,featuredBase:base};
})();
