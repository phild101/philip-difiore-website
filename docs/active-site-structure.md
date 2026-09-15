# Active site — September 14, 2026

- Landing section: Film, previously Featured.
- Shared header order: FILM, MUSIC, INFO.
- Film contains all 19 projects previously categorized FILM, VIDEO, or LIVE, retaining their established order and artwork. All their visible category headings read FILM.
- Music contains Recording Parties. Clicking its existing artwork opens a spare black-and-white archive: party selector, manual viewer with all 22 Bedford + Bowery photographs assigned to Party 2 and a cyan wash, seven recordings across three parties, 15 confirmed Party 2 attendees, and a compact Bedford + Bowery press link. Party choices have shareable `?party=2` URLs; photo browsing preserves playback.
- Info: white background, black text, Modern Noir portrait with the revised bio wrapping beside and underneath it. Philip’s September 15 margin reference is matched by a centered 460px desktop column, portrait at 37.5% width, and 24px image/text gap; the column scales to 425px at the existing smaller-font breakpoint. This gives wide outer margins, with the Academy paragraph flowing below the portrait and subsequent paragraphs using the full column. Mobile retains comfortable side margins. Header, font sizes, line height and paragraph spacing stay as approved.
- Canonical hashes: `#film/<slug>`, `#music/recording-parties`, `#music/recording-parties/listen`, `#info`. Old `#featured/<slug>` URLs remain supported.
- Historical study routes retain their earlier category labels and menus.
- Rabbit Hole remains preserved and inactive; see [full concept archive](rabbit-hole-concept-archive.md).
- Optional header comparison: `?header=bold#info` uses DM Sans 700 for the name and navigation only, across Film, Music and Info. Existing font sizes, spacing and colors remain. Philip likes the bolder header; the original remains available at the default link for comparison.
- Optional matching Info text: `?header=bold&info=bold#info` applies that same DM Sans 700 to the biography, retaining its font size, black color, line height, margins and portrait. Omit `info=bold` to keep the original biography type.
- Latest approved Info copy after the Academy paragraph consists of three paragraphs: music projects and film scores with luminaries of modern music; founding the Rumpus Room and organizing/MC’ing Recording Parties (italicized), with gatherings recorded and archived; building tools for writing, filmmaking and the creative process. Preserve Philip’s supplied wording in `info.tsx`.

Verified locally: all 19 Film links and labels; Film carousel skips Recording Parties and wraps correctly; Music opens Recording Parties; Info links preserve last Film; browser back/forward; old deep links; mobile wrapping without overflow; historical horizontal menu remains intact.
