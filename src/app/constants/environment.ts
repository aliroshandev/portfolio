/**
 * Environment contract for the whole app.
 *
 * SECURITY: this file and `src/environments/*` define the SHAPE of the environment only.
 * Real credential values (Google client id, API key, calendar id) are injected at build time
 * by `scripts/set-env.mjs` from Vercel env vars or a local (gitignored) `.env` file.
 * NEVER hard-code secrets here or in any committed file.
 */
export interface GoogleCredentials {
  /** OAuth 2.0 browser client id (public by design; no client secret is ever used). */
  clientId: string;
  /** Google Cloud API key, restricted to your domain via HTTP referrers. */
  apiKey: string;
  /** Google Calendar id to query, e.g. 'primary'. */
  calendarId: string;
}

export interface EnvironmentInterface {
  production: boolean;
  deployTarget: 'local' | 'production';
  google: GoogleCredentials;
}