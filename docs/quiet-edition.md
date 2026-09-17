# Quiet edition — September 16, 2026

Philip requested a secret backup direction that completely follows the Info page: simple, austere, clean. He clarified that Overprint does not belong in this edition and that the main font must be the one used on Info.

Preview route: `/editions/quiet-7d62a9/`. It is unlisted, has noindex/nofollow/noarchive metadata, and `/editions/` is excluded in robots.txt. It is not password-protected: anyone given the URL can open it. No link is added to the public site's navigation. The root site remains the approved Overprint edition, with Info as home.

The alternate also starts on Info. Film and Music open compact text-only indexes, with each title immediately followed by its artist on the same line, separated by a dash. There are no thumbnails, distant columns, or individual row dividers. Each project has a restrained detail page with original imagery in its natural colors, Play film or listening links, relevant press/references, and previous/next navigation. Recording Parties keeps the full catalog, Party 2 default, slideshow, attendees, inline transport, and persistent playback, all restyled to the Info scale. Apple Music and Spotify links remain available on the two album pages.

Typography is DM Sans 700, 13px body and 12px at narrower widths, matching the approved Info page. Small headers, plain links, generous margins, fine rules, white ground and black text replace oversized signs, colored fields, overprint layers, and collage. An initial grayscale preview was superseded: photographs and original album covers now retain their normal colors, including on the listening page and in Info hover previews. The Modern Noir biography portrait remains the already-approved black-and-white source. The underlying source bytes and public art selections are preserved.

Film data and order come from the existing centered project catalog. The Trilogy and Antibalas use preserved photographic source derivatives in `public/images/quiet-edition/`; Buffalo Hunt uses the original NYT film still. The two album entries use their pre-overprint covers. The biography component has an optional display-image resolver so this edition's hover previews also use original imagery, without changing normal Info previews.

All edition-specific style changes are scoped under `.quiet-site`, or a matching body :has selector for portaled dialogs. The primary site must retain its own imagery, typography, playback, and routes. Do not promote this edition to the homepage unless Philip explicitly selects it.
