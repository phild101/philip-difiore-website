# The Buffalo Hunt photo gallery

September 20, 2026: Philip requested every photo from https://thebuffalohuntmovie.com/#gallery on the Buffalo Hunt film project page.

All 17 unique gallery photographs are retained in their source slideshow order. The untouched 1800×946 JPEG originals, source HTML, URL manifest and optimization report are archived outside the web bundle in `../imports/buffalo-hunt-gallery-2026-09-20/`. The source supplies no photo captions or individual credits. The manifest has neutral descriptions based on visual inspection; no unverified identities are added.

Web assets live in `public/images/buffalo-hunt-gallery/`: 17 faithful WebP images, 17 smaller thumbnails, and `photos.json`. Photographs are shown uncropped in their natural colors. The images and thumbnails total about 3MB; the gallery manifest/photos are requested only after opening the viewer.

A Photo gallery button appears beneath the Buffalo Hunt film artwork alongside existing press links, before Letterboxd. It opens a white, full-screen viewer using the Info typography. Controls include swipe/drag, previous/next arrows, keyboard arrows, a counter, clickable thumbnails, Escape and a close button. Closing restores focus to the project button. Source order loops from last to first.

Mobile uses two rows of two project links on taller phones and one compact row on short/landscape phones, retaining the existing artwork area and keeping links within the viewport. Existing film navigation is unchanged.

Validation: Next production build and TypeScript check; Chromium and WebKit at 1440×1000, 390×844, 320×568 and 844×390; all 17 photographs, arrows, thumbnail selection, wraparound, Escape/close, focus return and overflow checks. Native touch-event swipe verified in Chromium. All image assets decode. Browser checks use emulation rather than physical phones.
