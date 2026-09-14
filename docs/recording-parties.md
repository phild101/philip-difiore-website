# Recording Parties listening page

Added September 14, 2026. Music retains its existing Recording Parties cover; clicking it opens `#music/recording-parties/listen`. The page continues the established Overprint style. Every photograph has its own treatment, as Philip requested. Following his first preview, photographs occupy more of the page, a bordered cream panel groups party selection and explicit Play/Pause buttons, and the press story has its own full-width section. Keep clear section boundaries and favor artwork over empty turquoise background.

## Recordings

The seven original MP3 recordings are organized as Party 1 (Tapes 3 and 4), Party 2 (Tapes 1, 2 and 3), and Party 3 (Tapes 2 and 3). These are the source file numbers; do not renumber or invent track titles. Playback uses one audio element, seeking, pause/resume, and automatic progression through the current party. Changing parties stops playback.

Supabase project `gjvvbofpkxuicrpshxun`, project record 9. Metadata comes from `recording_party_tracks`; originals remain in the private `recording-parties-audio` bucket. The import, SHA-256 verification, SQL and source recordings are preserved outside the Site checkout in `../imports/recording-parties/`.

`GET /api/recording-parties` returns the public-facing catalog. `GET /api/recording-parties/<party>-<tape>-<version>/audio` validates the registered track and redirects to a four-hour signed storage URL. This lets Supabase serve audio with Range support rather than buffering it through the website. No bucket policies were made public. `SUPABASE_SERVICE_ROLE_KEY` is a server-only Sites environment secret; local development reads the ignored `.dev.vars` file. Never put the key in client code or checked-in files.

## Photographs and press

Photographs by Chris J Lytwn / Bedford + Bowery, from the existing Recording Parties press archive. The in-site article and a link to the original story are included:

https://bedfordandbowery.com/2014/06/watch-members-of-mgmt-louis-xiv-and-more-put-a-party-on-vinyl/

- James Richardson, trumpet: magenta, ochre and plum.
- Philip Di Fiore, master of ceremonies: turquoise, coral and ink.
- Emma Gomis, bass: saffron, violet and black.
- Albert Di Fiore, console: cobalt, chartreuse and near-black.

Source selections, captions and URLs: `../imports/recording-parties/photo-selection.json`. Generated treatment provenance: `../imports/recording-parties/photos-treated-film/treatment-prompts.json`. The Site ships WebP derivatives in `public/images/music/recording-parties/`; original photographs and full-resolution treated files are preserved outside the checkout.

## Verification

Desktop and mobile visual review; all three party track lists; actual audio playback and pause; switching parties; press modal and Escape; return to Music and re-entry from the cover; no horizontal overflow at 390px; no browser page errors. Production build and TypeScript check are required before publication.

## Proposed expansion, awaiting direction

Philip anticipates adding 25 more parties and asked how to include more photographs. Proposed: one party at a time, an index opened by a Choose a party control, a shareable party URL, and a large manual slideshow with previous/next arrows, counter, and optional thumbnail overview. Photo browsing must not interrupt audio. Keep photos as a shared collection until their party associations are confirmed. Do not fabricate dates, titles, attendance, or photo associations. Remove slogan-like editorial copy; Philip specifically rejected “Put a party on vinyl.” Current listening UI remains three-party pending a decision on this structure. Future import must extend the current party-number database constraints and server path validation, not only the UI.

## Musicians and attendees

Each party has its own Musicians & attendees section in the listening panel, supporting names and optional instruments/roles. Confirmed lists have not been supplied; `app/music/recording-parties/attendees.ts` deliberately contains three empty lists. Populate only confirmed associations; a person appearing in press photographs does not prove which party they attended. The page shows a simple pending-list label until names are provided.

## Photo balance comparison

Philip felt the strongest treatments might lose the sensation of being in the room. `?photos=room#music/recording-parties/listen` previews a gentler treatment of the main trumpet photograph only, preserving studio detail and lighting. Remaining photographs retain their graphic treatments for now. Original photos, first duotone treatments and stronger Film treatments remain preserved in `../imports/recording-parties/`; do not regenerate every image before he reviews the single-photo comparison.
