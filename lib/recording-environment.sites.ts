import { env } from 'cloudflare:workers';

// Sites previews use the same private Supabase catalog through Workers bindings.
export function recordingServiceKey(): string | undefined {
  return (env as unknown as Record<string, string>).SUPABASE_SERVICE_ROLE_KEY;
}
