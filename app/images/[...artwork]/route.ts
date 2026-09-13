// Preserve existing artwork links after lossless delivery optimization.
const artworkRedirects: Record<string, string> = {
  "/images/buffalo-hunt.png": "/images/buffalo-hunt.webp",
  "/images/chromatic/if-you-call.png": "/images/chromatic/if-you-call.webp",
  "/images/chromatic/buffalo-hunt.png": "/images/chromatic/buffalo-hunt.webp",
  "/images/chromatic/in-the-city.png": "/images/chromatic/in-the-city.webp",
  "/images/chromatic/man-man.png": "/images/chromatic/man-man.webp",
  "/images/chromatic/miko-dtb.png": "/images/chromatic/miko-dtb.webp",
  "/images/chromatic/old-friend.png": "/images/chromatic/old-friend.webp",
  "/images/chromatic/recording-parties.png": "/images/chromatic/recording-parties.webp",
  "/images/chromatic/naomi-shelton.png": "/images/chromatic/naomi-shelton.webp",
  "/images/chromatic/stranger.png": "/images/chromatic/stranger.webp",
  "/images/chromatic/runnin.png": "/images/chromatic/runnin.webp",
  "/images/chromatic/warm-spell.png": "/images/chromatic/warm-spell.webp",
  "/images/overprint/if-you-call.png": "/images/overprint/if-you-call.webp",
  "/images/overprint/buffalo-hunt.png": "/images/overprint/buffalo-hunt.webp",
  "/images/chromatic/young-trouble.png": "/images/chromatic/young-trouble.webp",
  "/images/overprint/in-the-city.png": "/images/overprint/in-the-city.webp",
  "/images/overprint/miko-dtb.png": "/images/overprint/miko-dtb.webp",
  "/images/overprint/man-man.png": "/images/overprint/man-man.webp",
  "/images/overprint/naomi-shelton.png": "/images/overprint/naomi-shelton.webp",
  "/images/overprint/old-friend.png": "/images/overprint/old-friend.webp",
  "/images/overprint/philip.png": "/images/overprint/philip.webp",
  "/images/overprint/stranger.png": "/images/overprint/stranger.webp",
  "/images/overprint/recording-parties.png": "/images/overprint/recording-parties.webp",
  "/images/overprint/runnin.png": "/images/overprint/runnin.webp",
  "/images/sequence/antibalas-overprint.png": "/images/sequence/antibalas-overprint.webp",
  "/images/overprint/warm-spell.png": "/images/overprint/warm-spell.webp",
  "/images/overprint/young-trouble.png": "/images/overprint/young-trouble.webp",
  "/images/sequence/diiv-overprint.png": "/images/sequence/diiv-overprint.webp",
  "/images/sequence/class-actress-overprint.png": "/images/sequence/class-actress-overprint.webp",
  "/images/sequence/game-gets-old-overprint.png": "/images/sequence/game-gets-old-overprint.webp",
  "/images/sequence/in-the-city-night-glass.png": "/images/sequence/in-the-city-night-glass.webp",
  "/images/sequence/i-learned-the-hard-way-overprint.png": "/images/sequence/i-learned-the-hard-way-overprint.webp",
  "/images/sequence/in-the-city-vertigo-v2.png": "/images/sequence/in-the-city-vertigo-v2.webp",
  "/images/sequence/in-the-city-vertigo.png": "/images/sequence/in-the-city-vertigo.webp",
  "/images/sequence/recording-parties-turquoise.png": "/images/sequence/recording-parties-turquoise.webp",
  "/images/sequence/rdgldgrn-overprint.png": "/images/sequence/rdgldgrn-overprint.webp",
  "/images/sequence/rival-schools-overprint.png": "/images/sequence/rival-schools-overprint.webp",
  "/images/sequence/recording-parties-v3.png": "/images/sequence/recording-parties-v3.webp",
  "/images/sequence/recording-parties.png": "/images/sequence/recording-parties.webp",
  "/images/sequence/runnin-v2.png": "/images/sequence/runnin-v2.webp",
  "/images/sequence/rival-schools-vivid.png": "/images/sequence/rival-schools-vivid.webp",
  "/images/sequence/rival-schools-uganda.png": "/images/sequence/rival-schools-uganda.webp",
  "/images/sequence/save-my-life-overprint.png": "/images/sequence/save-my-life-overprint.webp",
  "/images/sequence/runnin-v3.png": "/images/sequence/runnin-v3.webp",
  "/images/sequence/young-trouble-v2.png": "/images/sequence/young-trouble-v2.webp"
};

export function GET(request: Request) {
  const url = new URL(request.url);
  const destination = artworkRedirects[url.pathname];
  if (!destination) return new Response('Not found', { status: 404 });
  return Response.redirect(new URL(destination, url.origin), 308);
}
