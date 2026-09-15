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

## Archive expansion

Philip anticipates adding 25 more parties and potentially taking the project worldwide. The current interface shows one selected party at a time, with a native party selector, shareable `?party=2` URLs, and a large manual slideshow with previous/next arrows and counter. Photo browsing does not interrupt audio. Philip has now confirmed the entire Bedford + Bowery gallery belongs to Party 2; the active archive assigns it only to that party. Do not fabricate dates, titles, attendance, or photo associations. Remove slogan-like editorial copy; Philip specifically rejected “Put a party on vinyl.” Future import must extend the current party-number database constraints, initial query validation and server path validation, not only the UI. Keep this archive within Philip's site for now; its data and presentation can support an independent domain later. No separate site has been created.

## Musicians and attendees

Each party has its own Musicians & attendees section in the listening panel, supporting names and optional instruments/roles. Party 2 now has Philip’s supplied list, with names checked against the original article captions: 15 attendees including additionally pictured Gregory Richardson and Andrea Gomis. Darwin is Darwin Smith, Emma is Emma Gomis, and Andy is captioned Andrew Borger. Lists for Parties 1 and 3 remain pending. Their photographs are also pending; never use Party 2 photographs as if they documented another party.

## Photo balance comparison

Philip felt the strongest treatments might lose the sensation of being in the room. `?photos=room#music/recording-parties/listen` previews a gentler treatment of the main trumpet photograph only, preserving studio detail and lighting. Remaining photographs retain their graphic treatments for now. Original photos, first duotone treatments and stronger Film treatments remain preserved in `../imports/recording-parties/`; do not regenerate every image before he reviews the single-photo comparison.

## Black-and-white page / signature party washes

Current default: charcoal and white page with unchanged original press photographs, tinted at render time with a single color per selected party. Party 1 cobalt `#365dcb`, Party 2 cyan `#00b8d4` (replacing raspberry at Philip’s request), Party 3 amber `#bf8730`. A CSS color blend preserves photographic luminosity, faces and studio details rather than generating replacements. Page furniture and player controls remain black and white. The complete 22-photo Bedford + Bowery collection is now confirmed as Party 2 imagery and assigned accordingly.

The September 14 spare pass removes the tilted Rumpus Room sign, reduces display typography, groups the recordings beside one large photo viewer, and replaces the large press section with a compact Press control. Original photographs fit completely within the viewer. The preceding B&W gallery version is preserved at `?layout=gallery#music/recording-parties/listen` (version 61 / commit `eb7c710fad4756d2938004b483a128e6a9338b24`). Verified party selection, URL history, actual audio playback while changing photographs, slideshow wraparound, press modal, and mobile overflow.

Approved spare-layout refinements: Recording Parties uses Archivo Black (the saved Peter Sarsgaard headline face); the party select inherits the adjacent text size. Tape labels are bold, with a single progress slider immediately beneath the selected tape, including when paused. No empty Choose a recording prompt or bottom Back to Music link. Photo navigation uses short solid triangles. The archive bar reads “Location: The Rumpus Room, Brooklyn, New York.” Its values come from `locations.ts` keyed by selected party, so future parties can have their own venue/city. Philip confirmed all three existing parties share this location. Playback, seeking, selected-row placement, slide changes during audio and desktop/mobile typography were checked.

Saved prior graphic/turquoise version: `?look=overprint#music/recording-parties/listen`. Gentler previous main-photo comparison remains `?photos=room#music/recording-parties/listen`. Prior source is version 60 / commit `bac2365c4db223df4778b372bdae930ffff2848f`. Desktop checks passed for all three washes and track lists, mobile has no horizontal overflow, and the prior Overprint view remains reachable.


## Complete Party 2 gallery

Imported all 22 unique original photographs, including Philip drawing words from a hat (original item 3), missing from Philip’s mirrored article and recovered from Wayback. Excluded only the duplicate lead photograph with its SLIDESHOW badge. All source JPEG bytes, dimensions and hashes were verified and preserved. Provenance: `../imports/recording-parties/party-2-complete/manifest.json`. Website copies: `public/images/music/recording-parties/originals/party-2/`. The first slide stays James Richardson on trumpet; remaining photographs follow the original gallery order. `photographs.ts` defines per-party collections, reset on party changes. Original archived source captions are preserved in the import manifest; short factual captions keep the active page spare. Historical gallery design URLs retain their archived compositions.

Verification: 22 distinct slideshow images decoded, wraparound and audio independence passed; 15 attendees checked, cyan wash confirmed, mobile without horizontal overflow, no Party 2 images or attendee list leaking into Parties 1/3.

Attendee lists are alphabetized by full surname, then given name. Compound surnames De Vore and Di Fiore sort under D. The two-column presentation reads down the left column, then down the right.

September 15 typography: Philip approved the DM Sans 700 used in the header/Info comparison for all small Courier-style text on the active spare archive. This includes header, Press, party selector/location, photo captions/counter, tape names/durations, playback status/timing, attendees, credits and conditional notices. Existing responsive sizes and line heights remain. Keep the Archivo Black title, existing Arial section headings and Play/Pause labels; historical gallery typography remains preserved. Header and Info comparison parameters continue to work across navigation.

The Recording Parties masthead now reads RECORDING PARTIES: the same Archivo Black 400 font file, -.045em tracking, uppercase and .92 line height as the original PETER SARSGAARD factoid screenshot. Retain the archive's existing heading size instead of enlarging it to the old full-page factoid scale.
