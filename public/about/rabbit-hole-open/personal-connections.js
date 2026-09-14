// Public research and Philip's firsthand recollections remain separately attributed.
(() => {
const notes=window.ABOUT_GRAPH.notes, passages=window.RABBIT_PASSAGES;
const memory={title:'Philip Di Fiore — firsthand recollections supplied September 13, 2026'};
const jake={title:'Interview — Jake Schreier on Robot & Frank, August 15, 2012',url:'https://www.interviewmagazine.com/film/jake-schreier-robot-frank'};
const eq={title:'EQ — Francis and the Lights: Frighteningly Simple, Richard Thomas, September 2010',url:'https://www.worldradiohistory.com/Archive-All-Audio/EQ-Magazine/EQ-2010-09.pdf'};
const light={title:'Fenway Recordings — Darling, It’s Alright live performance, August 19, 2010',url:'https://www.fenwayrecordings.com/news/darling-its-alright-by-francis-and-the-lights-live-performance'};
function put(id,entry){const n={...notes[id],...passages[id],...entry,curated:true,related:[]};notes[id]=n;passages[id]=n;}
put('artist-schreier',{
 title:'Jake Schreier',heading:'JAKE\nSCHREIER',kind:'FILM / MUSIC / THE EDITING ROOM',layout:'stack',
 body:'Jake Schreier and [Francis|francis-and-lights] have known each other since they were thirteen. Jake played keyboards in the band; Francis scored Jake’s student films and, later, [Robot & Frank|artist-sarsgaard].\n\nWhile Francis and the Lights recorded [It’ll Be Better|itll-be-better] at The Rumpus Room, Jake sat in on Philip’s edit of [I Learned the Hard Way|i-learned-the-hard-way]. He offered suggestions for the opening confrontation between Lee Fields and Sharon Jones. A recording session in one room became an editing collaboration in another.',
 sources:[jake,memory],link:window.ABOUT_GRAPH.featuredBase+'i-learned-the-hard-way',linkLabel:'Watch I Learned the Hard Way'
});
put('francis-and-lights',{
 title:'Francis and the Lights',heading:'FRANCIS\nAND THE\nLIGHTS',kind:'MUSIC / MOVING IMAGES',layout:'stack',
 body:'One of Francis’s strongest influences is a writing manual his mother gave him: The Elements of Style. Its instruction to “omit needless words” offers a way into the spare arrangements of [It’ll Be Better|itll-be-better].\n\nSimplicity takes unusual forms in his work: a performance [edited with light|francis-light-cut], a drum kit [built from separate performances|francis-drum-pieces]. In MGMT’s [Kids|mgmt-kids], Francis took on a different role entirely: a wolf. Part of that video was filmed in [Philip’s studio|rumpus-room].',
 sources:[{title:'MVRemix — Francis interview, September 6, 2010',url:'https://mvremix.com/rock_blogs/2010/09/06/francis-of-francis-and-the-lights-interview/'},eq,light,memory]
});
put('itll-be-better',{
 title:'It’ll Be Better',heading:'IT’LL BE\nBETTER',kind:'FRANCIS AND THE LIGHTS / 2010',layout:'stack',
 body:'Francis and the Lights recorded It’ll Be Better at [The Rumpus Room|rumpus-room]. The cover photograph was taken there, too: the room where the music was made also became its public face.\n\n[Jake Schreier|artist-schreier] co-produced the record. Its rhythm tracks were painstakingly [assembled from individual drum performances|francis-drum-pieces]. For Darling, It’s Alright, he and Francis then made a live-performance video with a different kind of edit: [the lights did the cutting|francis-light-cut].',
 sources:[memory,eq,light],link:'https://music.apple.com/ca/album/itll-be-better/1848255253',linkLabel:'Listen to It’ll Be Better'
});
put('francis-drum-pieces',{
 title:'A drum kit, in pieces',heading:'A KIT\nIN PIECES',kind:'IT’LL BE BETTER / RECORDING',layout:'stack',
 body:'The piano came first. Francis recorded its feel before building the rhythm around it. Then he played the drum kit one instrument at a time against looped sections of the songs: hi-hat, snare, toms. Hundreds of performances were edited and reassembled in Pro Tools.\n\nFrancis and [Jake Schreier|artist-schreier] built [It’ll Be Better|itll-be-better] through those choices. Nearby, Philip was shaping another performance through the cut: [Lee Fields confronting Sharon Jones|i-learned-the-hard-way].',
 sources:[eq,memory],link:window.ABOUT_GRAPH.featuredBase+'i-learned-the-hard-way',linkLabel:'Watch I Learned the Hard Way'
});
put('francis-light-cut',{
 title:'Edited with light',heading:'EDITED\nWITH LIGHT',kind:'DARLING, IT’S ALRIGHT / LIVE PERFORMANCE',layout:'stack',
 body:'For Darling, It’s Alright, [Jake Schreier|artist-schreier] directed a single-take live performance described as “edited with light.” The camera keeps recording; changes in illumination determine what the viewer sees.\n\nThe song comes from [It’ll Be Better|itll-be-better], recorded at Philip’s Rumpus Room. Philip explored the pressure of staying with a performance in [Save My Life|one-take]: another way of asking what happens when a cut never arrives.',
 sources:[light,memory,{title:'Baeble Music — Save My Life',url:'https://philipdifiore.com/press/baeble-save-my-life/'}],link:window.ABOUT_GRAPH.featuredBase+'save-my-life',linkLabel:'Watch Save My Life'
});
put('mgmt-kids',{
 title:'MGMT — Kids',heading:'MGMT\nKIDS',kind:'RAY TINTORI / FRANCIS / THE RUMPUS ROOM',layout:'stack',
 body:'In Ray Tintori’s video for Kids, [Francis|francis-and-lights] appears as a wolf. Part of the video was filmed in [The Rumpus Room|rumpus-room]—the same studio where his band recorded [It’ll Be Better|itll-be-better] and photographed its cover.\n\nThe video also moves into animation, directed by Christy Karacas, with animators Lizzi Akana and Henry Thurlow. Music, performance and drawn images collide; the link to Philip’s world is an actual room, shared by the people making them.',
 sources:[memory,{title:'Lizzi Akana — MGMT, Kids production and animation credits',url:'https://www.lizziakana.com/mgmt-kids-music-video'},{title:'MGMT — Kids, official video',url:'https://www.youtube.com/watch?v=fe4EK4HSPkI'}],link:'https://www.youtube.com/watch?v=fe4EK4HSPkI',linkLabel:'Watch MGMT — Kids'
});
const sarsgaard={...notes['artist-sarsgaard'],...passages['artist-sarsgaard']};
put('artist-sarsgaard',{body:sarsgaard.body.replace('Director Jake Schreier','Director [Jake Schreier|artist-schreier]'),link:window.ABOUT_GRAPH.featuredBase+'old-friend',linkLabel:'Watch Old Friend'});
const room={...notes['rumpus-room'],...passages['rumpus-room']};
put('rumpus-room',{body:room.body+'\n\n[Francis and the Lights|francis-and-lights] recorded [It’ll Be Better|itll-be-better] here; its cover was photographed here, too. The studio also became a location for Ray Tintori’s [MGMT video, Kids|mgmt-kids].',sources:[...room.sources,memory]});
const hard={...notes['i-learned-the-hard-way'],...passages['i-learned-the-hard-way']};
put('i-learned-the-hard-way',{body:hard.body+'\n\nThe opening confrontation puts Lee Fields opposite Sharon Jones. While Philip edited that scene at The Rumpus Room, [Jake Schreier|artist-schreier] sat in and suggested ways to improve the cut. Jake was there with [Francis and the Lights|francis-and-lights], recording an album in the studio.',sources:[...hard.sources,memory],linkLabel:'Watch I Learned the Hard Way'});
const edit={...notes.editing,...passages.editing};
put('editing',{body:edit.body+'\n\nSometimes another set of eyes changes the cut: [Jake Schreier joined an editing session|artist-schreier] for I Learned the Hard Way while recording with Francis and the Lights in Philip’s studio.',sources:[...edit.sources,memory]});
})();
