# Production and design previews

Production target: Netlify project `philipdifiore-redesign` (`45c7e4db-695d-4ca8-8e71-da8e1b56fc05`), serving `philipdifiore.com` and `www.philipdifiore.com` after the September 17 migration.

Design previews: the existing Sites project `appgprj_6aa167c7b3848191b862ad31b8d92ef6` at `https://philip-difiore-design-directions.phild101.chatgpt.site`. Austere remains an unlisted/noindex preview edition at `/editions/austere#index`; it is not an authenticated private site.

## One source, two builds

Edit this `design-concepts` checkout for both hosts. Do not modify the archived `../Phil Website` build. Netlify production uses the same source, not a separately maintained design copy.

- Sites: `npm run dev`, `npm run build`; existing Vinext/Workers workflow.
- Netlify: `npm run dev:netlify`, `npm run build:netlify`; standard Next.js with Netlify's OpenNext adapter. Node 24.
- `tsconfig.next.json` excludes Sites runtime types and build configuration from Next's type check.
- Vite resolves the relative `./recording-environment` import to the Workers binding module. Next uses the Node environment module. Both feed the same recording catalog and signing helper.
- `SUPABASE_SERVICE_ROLE_KEY` stays server-only. Never prefix it with `NEXT_PUBLIC_`, add it to Next `env` configuration, embed it in assets, or commit it. Local `.dev.vars` is ignored; hosted values are configured separately.
- Supabase project, private audio bucket, catalog and four-hour signed playback URLs are unchanged. Netlify does not store copies of the recordings.

## Release workflow

Publish visual experiments to Sites first. A Sites deployment does not update the production domain. Only release approved changes to Netlify.

Netlify's production Git branch is `codex/netlify-production` in the existing `phild101/philip-difiore-website` repository, preserving its old `main` branch and previous deploy. This branch receives approved source commits from this checkout. Verify current Netlify settings before release.

Before switching production, validate a draft Netlify deployment: Info, Film, Music, films, press, original asset redirects, archived pages, desktop/mobile layout, recording catalog, actual audio playback and seeking, and the persistent player. Keep the previous deployment and domain snapshot.

## Migration record

Configuration/DNS backup: `../archives/netlify-migration-2026-09-17/`. The previous Sites domain routing and Netlify deployment are recorded there. Restore the old routing records and previous deployment if needed; nameservers and email records are not part of this change.
