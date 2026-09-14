# Rabbit Hole About concept — preservation notes

Archived for future development on September 14, 2026. This is a record of the idea, the user’s decisions, the existing implementation, and the work still needed. It is not a claim that every historical fact or connection in the saved graph has been verified.

## Current decision

Philip has put the Rabbit Hole concept aside. His assessment is that it needs substantially more work, research, and interesting factoids before it can rise above “cutesy” and become something worth exploring. Preserve it intact; do not keep treating the existing experiment as the active About/Info page.

The active replacement is **Info**, using the **Modern Noir** portrait and the four paragraphs Philip supplied on September 14. Featured remains the main site’s landing page. The Rabbit Hole is a saved direction that may return after an editorial and research phase, not a discarded idea and not the default visitor experience.

Recovery baseline supplied for this archival task:

- Main source checkout: `/Users/PD/Desktop/Phil LLM/Phils Website/design-concepts`
- Pre-Info Git revision: `e523402c0a54c9e48ef37b5b365ccfc860cfdcfc`
- Historical main live edition: **56**
- Main site origin: `https://philip-difiore-design-directions.phild101.chatgpt.site`
- Standalone About studies checkout: `/Users/PD/Desktop/Phil LLM/Phils Website/about-studies-online`
- Standalone origin: `https://philip-about-studies.phild101.chatgpt.site`

A complete pre-Info snapshot of the About source, fonts, and embedding component is saved at `archives/rabbit-hole/2026-09-14/rabbit-hole-before-info.zip` under the project workspace. Its `RESTORE.json` records the exact source revision and route variants. The same preserved pages remain in the main source tree and available at their direct routes.

## What the idea should become

The entrance starts with a handful of facts about Philip. Interesting words and phrases open into their own subjects. Those subjects offer other compelling ideas, artists, places, projects, or techniques. The visitor feels that they are swinging from vine to vine, or moving through an ocean of connections between Philip’s world and a much wider creative world.

The crucial distinction is that a click must take the reader somewhere. Clicking an artist’s name should open the artist’s world and one of its best stories, rather than merely repeating how that person knows Philip. A good branch changes the subject while retaining an intelligible connection. It should not be a sequence of slightly longer project summaries.

Philip described the concealed editorial structure as being “the magicians behind the curtain”: the visitor senses a vast freedom, while the author has carefully arranged useful paths. A node may offer an adventurous, seemingly unrelated detour, but that should be one option among grounded alternatives. At least one natural phrase or fact within the scene should be able to lead into something related to Philip’s work. This is not a visible instruction labeled **Back to Philip**. The fact itself supplies the connection.

For example, an encounter with David Fincher might offer a story about his sound or recording methods, a route through Jason Hill to the Buffalo Hunt soundtrack, and an optional wider creative detour. The visitor should discover the relationship; the page should not lecture them about its connection strategy.

The governing goal is a rewarding artwork and a revealing portrait of a creative life. The website is not a sales funnel, a collaboration pitch, or a list of commercial credentials.

## What the experiments taught us

1. **Depth is editorial before it is technical.** More nodes do not automatically create a deeper experience. An intriguing detail about a creative decision can carry a scene better than a large factual inventory.
2. **Connections must earn the click.** Each outgoing phrase should create an honest expectation, and its destination should deliver a fresh idea or story.
3. **Relevance has breadth.** Work, collaborators, instruments, filming locations, studios, creative influences, editing decisions, recording methods, and the histories of these things are all legitimate paths into Philip’s world. It is unnecessary to escape to generic trivia just to appear expansive.
4. **Some outward travel is welcome.** Philip did not ban unusual ideas from other disciplines. He wants them to be optional, with another interesting path that stays near his world and a natural one-click connection back into it.
5. **Famous and genuinely interesting creative people matter.** Philip specifically objected to making an obscure mastering engineer the attraction when the mastering process was the interesting subject. That does not prohibit lesser-known contributors; it means the editorial emphasis should follow what is compelling to a visitor.
6. **Readable text is the signal.** Interesting composition is welcome; obstruction, fragmentation, clutter, arbitrary noise, and awkward word breaks are not.
7. **The entrance needs a coherent voice.** Philip at one stage requested fragments rather than complete sentences, but rejected disjointed or awkwardly fragmented wording. Later he asked for a cohesive prose biography. Do not treat the early fragments instruction as a permanent rule for a future redesign.
8. **The experience must merit its motion.** Zooming from a bland fact to a bland fact feels like a gimmick. The stories must justify the journey.

## Research and editorial standard for a return

Develop a small number of excellent, traversable journeys before expanding the graph. For each scene, establish:

- The interesting event, creative choice, accident, contradiction, or sensory detail.
- Why a visitor would care without already knowing Philip or the subject.
- A reliable source for each public factual assertion.
- A clear distinction between a public source, Philip’s firsthand recollection, an inference, and a question still awaiting confirmation.
- Two or three outgoing phrases that lead to genuinely different next scenes, including a natural Philip-related route.
- A relevant work link when a film, performance, album, or soundtrack can actually be opened.
- A sentence or short passage whose wording carries the scene, instead of a heading that promises more than the body supplies.

Prefer firsthand interviews, credits, archived original project pages, production notes, recording accounts, and direct testimony. Press may be useful, but an entertaining claim should not be polished into certainty merely because a previous version included it. Check names, spellings, dates, roles, venues, album titles, links, and whether an anecdote belongs to the actual project being discussed. Keep claim-level provenance in the underlying content record even if the presentation shows only a compact Sources control.

Avoid invented personal connections, inferred influences presented as facts, and generic biographical trivia. Do not claim Philip worked with someone simply because that person appears two steps away in the graph. Do not use a public interview as evidence for a private studio anecdote; attribute the private anecdote to Philip.

The project should eventually support all of Philip’s music work as well as Featured films/videos. Existing or planned music project destinations must be kept in the content inventory even when the finished project page does not yet exist. Treat missing pages honestly; do not silently substitute an unrelated external link.

## Potential live AI extension — future concept, not completed functionality

Philip proposed prebuilding a substantial researched graph and then using AI to create additional branches on demand. This could permit travel well beyond a finite set of written answers while keeping occasional paths connected to his creative life.

This remains a future design/engineering idea. The preserved edition is a curated client-side graph. These notes do not assert that it includes a working live generative service, external retrieval pipeline, moderation layer, or fact-checking system.

If explored later, the curated graph should remain the trusted foundation. A generated branch should draw from retrieved or supplied evidence, preserve source attribution, and distinguish uncertain material. Prefer caching reviewed additions and promoting the strongest ones into the authored graph. The first milestone should be good authored journeys, not an unbounded stream of plausible but weak facts. Never generate private anecdotes or imply a relationship to Philip without evidence.

## Navigation and motion decisions worth preserving

- The experience should feel like moving through space, descending, or moving between ideas, not piling floating cards on top of each other.
- A visitor must always have a way back. Philip removed the explicit **My Trail** feature in favor of a clear **Back to About**. Browser history/back behavior is still useful.
- The later selected edition places bold work-opening and **Back to About** buttons beside each other, centered underneath the body text with roughly two lines of space above them. A scene with no applicable work link has a centered Back button.
- The button labels should not include the decorative diagonal arrow in **Open in Featured**.
- The selected button treatment uses a charcoal outline and light fill, inverting to charcoal fill and light text on rollover. The dark experiment reverses the surrounding palette.
- The header is consistent with Featured: Philip Di Fiore at left, Featured then About at right, no Contact or Archive. When revisiting the concept after the active replacement, do not automatically rename the new Info navigation back to About.
- Fullscreen opening of Featured video is a separate site requirement that should remain intact if this concept returns.
- Fast “zooms and slams” were tried and found too fast. A later adjustment was a little too slow, followed by a modest speed increase. Preserve the tuned implementation as a comparison rather than assuming “faster” means “better.”
- At the inspected baseline, `rabbit-hole-open/journey.js` sets flights to **765ms**, or **900ms** for portal flights, with easing `cubic-bezier(.55,0,.2,1)`. It suppresses rotation on small screens and respects reduced motion. These are recovery values, not an instruction to impose the same timing on a future design.
- Browser history stores the traversed path and each scene’s scroll position. The visible trail was removed, not the need for usable back navigation.

## Visual evolution and the latest saved editions

The concept began as draggable monochrome bio rectangles, including a movable Philip Di Fiore heading, with keyword hover tag clouds and click-released facts. It evolved toward isolated scenes and spatial travel because the card accumulation felt cluttered. Keep the original draggable mockup as a separate concept.

Later About studies explored overprint color, typographic posters, radical compositions, and quieter editorial treatments. Scarlet was briefly selected, then explicitly superseded by the charcoal direction. A Lewis Carroll quotation was added, lost and restored during experiments, and eventually explicitly removed from the selected edition. The instruction “Click through to go down the rabbit hole.” was also removed. Do not restore either by default.

The last approved light entrance was an editorial column on an off-white page with charcoal text. It had broader left/right margins resembling a typed page, more padding below the header, generous paragraph spacing, and small Courier New body text matching the header. Major terms used a heavier Archivo Black font in natural capitalization. Each paragraph began with a separate `...` prefix, with wrapped lines aligned to the first letter of the text rather than the ellipsis.

Factoid pages used a large Archivo Black heading on the left and smaller body text on the right. The subject label, such as **Stranger**, was moved directly above the body text and set to the exact font and size of the work/Back buttons. Long words such as Sarsgaard must remain intact: shrink or reflow appropriately rather than breaking a surname across arbitrary syllables.

The later dark experiment used charcoal `#30302f`, white text, and muted light gray `#c3c3c0`. Philip then requested smaller, less heavy bold keywords, only on About. The inspected `dark.css` uses the local Archivo variable font as `About Archivo`, weight 700, at 16px desktop and 14px mobile for entrance keywords. The other editions retain their prior typography.

### Exact useful preview paths

These are historical/saved direct routes, not promises that the main `#about` route will continue to show Rabbit Hole after Info is installed:

| Edition | Path/query |
|---|---|
| Selected light editorial/header edition | `/about/charcoal/?layout=editorial&type=header#bio` |
| Later dark edition | `/about/charcoal/?layout=editorial&type=header&theme=dark#bio` |
| Example factoid used for typography review | `/about/charcoal/?layout=editorial&type=header#academy-collection` |
| Earlier sans editorial comparison | `/about/charcoal/?layout=editorial&type=sans#bio` |
| Earlier colored keywords comparison | `/about/charcoal/?ink=colors#bio` |
| Colored editorial comparison | `/about/charcoal/?ink=colors&layout=editorial#bio` |
| Earlier open spatial edition | `/about/rabbit-hole-open/#bio` |
| Original spatial edition | `/about/rabbit-hole/#bio` |
| Faster-motion comparison | `/about/rabbit-hole-fast/#bio` |
| Radical studies catalog | `/about/radical-studies/` |
| First visual studies catalog | `/about/visual-studies/` |

These paths exist under the main origin, with corresponding historical copies on the standalone About origin. The optional `featured=<slug>` query in the embedded edition preserves the project selected before entering About. The pre-Info main wrapper mapped `/?about=dark#about` into the dark charcoal route; that wrapper behavior should not be confused with the permanent archive route.

## Existing content and connections to keep

### Philip’s projects and editorial scope

Philip requested branches for the Featured film/video projects, with **Save My Life** as the only LIVE project included in that specific initial research pass, and **RDGLDGRN excluded** from that pass. That scope was for the requested research pass, not a statement that these works can never appear in a future version. Useful branch categories include locations filmed, equipment, techniques, production stories, press, and archived versions of `philipdifiore.com` held in the Phil LLM material.

His film **Stranger: Bernie Worrell on Earth** was selected for inclusion in the permanent collection of the Academy of Motion Picture Arts and Sciences. Philip supplied this claim, and asked for it to take the place of Rumpus Productions on the entrance. Preserve its attribution and confirm any desired public supporting reference before expanded publication.

### Music and studios

- **Recording Parties:** gatherings at The Rumpus Room, organized and MC’d by Philip, bringing musicians from different circles together to meet, socialize, improvise, and record live music. Build a complete musician inventory from actual records supplied by Philip, rather than guessing attendance.
- **Improvisczario:** Bernie Worrell album; Philip’s credit is Producer. The original user message spelled the title “IMPROVISCARIO”; saved project data uses **Improvisczario**. Use credits to settle display spelling, not the typo in an old prompt. User-supplied starting references: `https://somethingelsereviews.com/2015/09/12/bernie-worrell-improvisczario/` and `https://www.allmusic.com/album/improvisczario-mw0000748291`.
- **Baby Elephant — Turn My Teeth Up!:** Philip’s credit is Executive Producer. Core participants include Bernie Worrell, Prince Paul, and Don Newkirk; saved research connects guests including David Byrne, George Clinton, and Nona Hendryx. User-supplied starting reference: `https://pitchfork.com/reviews/albums/10723-turn-my-teeth-up/`.
- **Hotel Edison, New York:** Philip supplied that both albums were recorded in Lenny Kravitz’s private studio there. Philip and his brother Albert, who was Lenny’s engineer, used it at night while Lenny was away. This is firsthand testimony and should remain marked that way. Hotel history is a potential branch, but relevance and interest should guide selection.
- **The Buffalo Hunt soundtrack:** recorded at Jason Hill’s private studio, the Department of Recording and Power. The saved project record credits Jason Hill and Ari Ingber as composers. Philip requested branches through Jason’s work with David Fincher. Starting reference: `https://departmentofrecordingandpower.com/`.
- Saved project routes include `/music/improvisczario/`, `/music/baby-elephant/`, and `/music/buffalo-hunt-soundtrack/`. Some project destinations were created as placeholders. Check their current behavior before describing them as completed pages.

### The Rumpus Room / Francis / Jake Schreier connection

This is an especially valuable strand because Philip supplied a specific event joining music production and editing:

- Francis and the Lights recorded **It’ll Be Better** at The Rumpus Room. Philip supplied and confirmed the album title, and said its cover image was taken in the studio.
- Jake Schreier is a musician and member of Francis and the Lights. While the band recorded there, Philip was editing Sharon Jones & the Dap-Kings’ **I Learned the Hard Way**.
- Jake sat in on an editing session and offered suggestions about improving the opening confrontation between Lee Fields and Sharon Jones.
- Francis appeared as a wolf in MGMT’s **Kids**, directed by Ray Tintori; Philip supplied that part of the video was filmed at his studio. Official video supplied by Philip: `https://www.youtube.com/watch?v=fe4EK4HSPkI`.
- This connects to Jake’s work on **Robot & Frank**, Peter Sarsgaard’s vocal performance, and Sarsgaard’s connection to Philip’s **Old Friend**. The saved factoid says Sarsgaard recorded Robot & Frank dialogue from a printed list separated from scenes; Jake’s interview was the cited public source for that recording anecdote. Do not conflate it with Philip’s private editing recollection.

`personal-connections.js` explicitly distinguishes public research from Philip’s recollections. It cites, among others, the Jake Schreier Interview magazine interview, a September 2010 EQ article, and a Fenway live performance note. The source objects are useful research leads, not a guarantee that every later paraphrase is perfect.

### Five more developed journeys already saved

The latest substantial editorial pass introduced a separate overlay with five traversable strands. Preserve this material even though Philip has judged the overall concept not ready:

1. Rumpus Room → It’ll Be Better → Jake Schreier → Peter Sarsgaard → Old Friend.
2. Stranger’s production → Bernie Worrell’s ear and synthesizer work → the layered voices in Flash Light → Talking Heads’ pulse → David Byrne → Playing the Building → Baby Elephant.
3. Hotel Edison night sessions → Lenny Kravitz recording before a song settles → Baby Elephant → Don Newkirk replaying a keyboard part → De La Soul and samples in key → Prince Paul and an accidental beat dropout.
4. Department of Recording and Power → Jason Hill → a Gone Girl trailer → Fincher’s sound prompts → Mindhunter’s accidental theme → physical tape delays → live mixing.
5. Recording Parties → Save My Life → Har Mar → Elton John and a continuous take → live mixing.

These routes were tested during earlier implementation work. This archive task did not re-research every assertion, revalidate every external link, or certify the entire graph. The content remains material for review, refinement, and selective reuse.

## Files and architecture

### Main source and preserved visual material

All paths below are relative to `/Users/PD/Desktop/Phil LLM/Phils Website/` unless stated otherwise.

| Location | What it preserves |
|---|---|
| `design-concepts/public/about/charcoal/` | Latest selected entrance, type/layout options, and dark experiment |
| `design-concepts/public/about/rabbit-hole-open/` | Shared graph, overlays, factoid scene engine, sources, and movement |
| `design-concepts/public/about/rabbit-hole/` | First spatial Rabbit Hole edition |
| `design-concepts/public/about/rabbit-hole-fast/` | Earlier faster-motion edition |
| `design-concepts/public/about/rabbit-hole-before-branches/` | Pre-branch comparison |
| `design-concepts/public/about/rabbit-hole-collection-one/` | Earlier curated collection |
| `design-concepts/public/about/rabbit-hole-fragment-edition/` | Earlier fragment entrance/content experiment |
| `design-concepts/public/about/rabbit-hole-wide-detour/` | Wider-detour experiment |
| `design-concepts/public/about/radical-studies/` | Scarlet, constellation, desktop, notebook, and receipt versions, catalog, screenshots, shared styles |
| `design-concepts/public/about/visual-studies/` | Folio, passages, cut-paper, descent, and typesetter mockups/catalog |
| `design-concepts/public/about/overprint/` | Earlier interactive About edition |
| `mockups/about-overprint/` | Original local HTML/color/draggable studies, interaction scripts, and rendered comparisons |
| `about-studies-online/dist/about/` | Standalone published About copy and studies |
| `design-concepts/app/reseda-studies/overprint-centered/interactive-about.tsx` | Pre-Info embedding of the selected About route; retain through Git/archive even if replaced |
| `mockups/portrait-studies/2026-09-14/` | Separate portrait studies; Modern Noir selected for the replacement Info page |

Modern Noir source: `mockups/portrait-studies/2026-09-14/09-modern-noir.png`. It belongs to the new Info presentation, not to the saved image-free Rabbit Hole edition.

### Graph and scene system

The selected charcoal page loads the following content scripts, in order, before its scene engine:

1. `rabbit-hole-open/graph.js` — base graph, notes, entry facts, Featured base, related metadata.
2. `passages.js` — expanded or alternative passages keyed by node ID.
3. `branches.js` — additional authored connections.
4. `detours.js` — wider subjects.
5. `worklife.js` — work/process-centered stories.
6. `music-projects.js` — music project records and project destinations.
7. `artists.js` — artist scenes.
8. `connections.js` — editorial connections/overrides.
9. `personal-connections.js` — supplied firsthand anecdotes and researched related scenes.
10. `five-journeys.js` — the later five-journey editorial overlay, kept separate to preserve earlier wording.
11. `charcoal/entrance.js` — selected bio entrance.
12. `charcoal/color.js` — visual query options and capitalization treatment.
13. `rabbit-hole-open/journey.js` — rendering, inline link handling, history, travel, heading fit, sources, and controls.

The script order matters: later records may override earlier ones. Most overlays write into both `window.ABOUT_GRAPH.notes` and `window.RABBIT_PASSAGES`. A node can include `id`, `title`, `heading`, `kind`, `body`, `layout`, `sources`, `link`, `linkLabel`, `curated`, and `related`. Inline branch markup follows `[visible phrase|node-id]`. A future content migration must preserve node IDs or maintain aliases so older deep links can still resolve.

The charcoal styles are layered over `rabbit-hole-open/journey.css` through `charcoal.css`, `editorial.css`, `header-type.css`, and `dark.css`. The selected `.page` uses `data-paired-actions`, which scopes the later subject-label and work/Back control behavior so earlier editions remain recoverable.

The standalone site has some link adaptation for work destinations on the main site. Do not copy its index or link-rewriting scripts over the main source indiscriminately. Preserve relative destinations when running inside the main site and inspect cross-origin links when serving a standalone archive.

The saved `frontiers.js` files and other historical scripts may exist without being loaded by the current charcoal entry. File presence is not the same as an active feature.

## Resuming responsibly

1. Leave the new Info page in place while developing any revival in a separate saved route.
2. Reopen the archived baseline and review a handful of real journeys with Philip. Identify where curiosity fades, where a link repeats itself, and where a relationship feels forced.
3. Obtain Philip’s fuller project, collaborator, studio, location, equipment, and firsthand story material. Turn it into a sourced content inventory before writing more branches.
4. Rewrite a limited set of outstanding scenes and verify their evidence. Test complete journeys, not merely individual factoids.
5. Make every visible branch worth choosing. Keep the return connection inside compelling prose rather than an obvious navigation trick.
6. Revisit the visual presentation after the content can stand on its own. Preserve readability, whole-word heading wrapping, motion restraint, history, keyboard access, and reduced motion.
7. Show the revived concept to Philip as an alternative. Replace Info only after a new explicit choice to do so.

The best future version will feel larger than a biography because its stories open onto other creative lives. It will still reveal Philip because the connections are real, specific, and carefully written.
