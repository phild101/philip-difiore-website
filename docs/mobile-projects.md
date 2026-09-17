# Mobile Film and Music — September 17, 2026

The current main overprint site uses Embla's continuous, looping carousel on phones. It replaces the earlier custom pointer/swipe hook, which Philip still found sticky and image-dependent. Adjacent artwork stays mounted, drag inertia can be interrupted, and short flicks use the carousel's standard gesture handling. The same frame size is reserved for every project in a category so press-link differences cannot resize the carousel during a gesture. The start index is mount-only; external history changes synchronize without restarting ordinary swipe motion.

A viewport grid reserves room for the header, category, artwork, 56px-high controls, and press/platform links. Previous/next chevrons are larger and thicker with 60×56px tap targets. Press buttons remain below artwork, stacked on taller phones and in a compact row on short screens. Apple Music and Spotify remain side by side. Artwork keeps its 4:5 ratio. The persistent audio player receives reserved space when present.

Mobile includes widths up to 760px and short coarse-pointer landscape screens up to 1024px. Desktop and archived design studies keep their existing layout and navigation. Offscreen slides are inert; artwork taps still open the appropriate film or listening destination. Reduced-motion users snap immediately on release.

Validation: Next production and Sites builds passed. Native Chromium touch checks traversed all 20 films, wrapped the sequence, checked short flicks, immediate reverse, arrow backup, history navigation, tap-to-watch, six Music swipes, post-drag click suppression, and reduced-motion snapping. Layout checks covered 320×568, 375×667, 390×844, 430×932 and 844×390, with links inside the viewport. WebKit engine checks covered mobile layout and arrow taps. These are browser-based checks, not a physical iPhone test.

Superseded attempts: the original single-slide CSS/pointer gesture implementation and its release-position/interruptible-animation follow-up were removed in this pass. Do not restore those alongside Embla or bind a second swipe handler.
