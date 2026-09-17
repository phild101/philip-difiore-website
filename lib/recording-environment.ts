// Node/Netlify runtime. This module is imported only by server route handlers.
export function recordingServiceKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}
