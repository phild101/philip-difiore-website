# Landing studies — second set, 21 September 2026

Requested change: preserve the first five, then create five genuinely new openings whose bodies do not duplicate the header navigation.

The first set remains at `/landing-studies` (archival source a9ac5997f92339b4ba137ca852c6a5e6969cd940). Its five designs are unchanged; the review page now links to this set.

New comparison: `/landing-studies/round-two`.

1. **Under the ink** (`reveal`): keyboard/touch/pointer range reveals the approved If You Call overprint beside its source image. Same supplied source subject; the image treatment is an interpretation, not a pixel-perfect printing simulation.
2. **In the room** (`room`): real Recording Party 2, Tape 1 playback, scrubbing, three original Party 2 photos with a cyan display wash. Sound starts only on request. Uses the live site's stable public audio route, which redirects to a signed media URL; no credentials or signed links are stored here. The test player stops and releases media on navigation. This standalone mockup does not replace the site's persistent player.
3. **Opening titles** (`titles`): four compositions play once, ending on Philip's name. Pause, replay and manual next controls. Reduced-motion preference starts at the static final title.
4. **The composition** (`compose`): three approved artworks move by pointer or keyboard. Rearrange, rotate and reset controls. Movement stays inside a bounded stage with its own stacking context.
5. **A shared room** (`story`): the user's firsthand account of Jake Schreier joining Philip's I Learned the Hard Way edit while Francis and the Lights recorded at The Rumpus Room. It is narrated factually, not presented as an invented quotation. The supporting Philip photograph is explicitly identified as a later Recording Party 2 image, not that editing session.

All section links live in the shared header. The pages' body controls reveal, listen, watch, compose or read. No production routes or approved images were replaced. Both sets are marked noindex.

QA: full desktop visual checks; 390px layout checks for all five (no horizontal overflow, broken images or duplicate body navigation). Verified reveal keyboard input, actual tape playback/time, pause and photo change, title-sequence completion, pointer and keyboard composition, reset/rearrange, and story image toggle. Source typecheck passed using a temporary config excluding stale generated Next validators; production Sites build passed.
