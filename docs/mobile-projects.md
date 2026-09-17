# Mobile Film and Music — September 17, 2026

The main overprint site now uses a single-column project layout on phones: horizontal category label, full-width 4:5 artwork, compact previous/next controls with a swipe cue and position, then press links. Press buttons stack vertically; Apple Music and Spotify stay together. Short landscape screens limit artwork height to keep navigation reachable.

Touch users can drag the artwork left or right to navigate within Film or Music. The poster follows the finger; completed gestures reuse existing project ordering, looping, URL history and announcements. Partial drags settle back. Horizontal gestures suppress the artwork's click; taps still open films/listening destinations. Vertical scrolling and pinch zoom remain available. Reduced-motion preferences are respected. Desktop and archived design studies keep their layouts.

Validated with real browser touch events in Chromium at 320×568, 375×667, 390×844, 430×932 and 844×390; checked desktop at 1440×1000. Checks cover forward/back, wrapping, history, canceled drags, tap-to-watch, external music links, vertical scrolling, reduced motion and all project artwork/link placement.

## Swipe reliability follow-up

Fixed missed flicks by measuring the final release position, accepting short fast gestures, and allowing slight diagonal drift before deciding scroll direction. A new swipe can take over an in-flight slide instead of being discarded during the 320 ms animation. Exiting slides receive a fresh animation key on each navigation. Capturing still begins only after horizontal intent so ordinary taps reach the artwork button/link.

Browser gesture checks cover 28px quick flicks, three successive swipes without waiting for the animation, immediate reverse, an initially diagonal swipe, coalesced move events, tiny canceled drags and tap-to-watch; vertical scrolling, wraparound, reduced motion and desktop remain verified.
