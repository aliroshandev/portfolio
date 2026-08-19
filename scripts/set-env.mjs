#!/usr/bin/env node
/**
 * Injects Google credentials into the Angular environment files at build/dev time.
 *
 * Reads values from (in order of precedence):
 *   1. Real environment variables (Vercel build env: GOOGLE_CLIENT_ID, GOOGLE_API_KEY, GOOGLE_CALENDAR_ID)
 *   2. A gitignored local `.env` file at the repo root (KEY=VALUE lines)
 *
 * Only writes the PRODUCTION file during CI/build. The DEV file is written only when a
 * local `.env` exists, so `ng serve` picks up local values without exposing them on GitHub.
 *
 * SECURITY: this script never reads anything from git. Secret values live only in
 * Vercel env vars or your local .env, both outside version control.
 */
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const envPath = join(root, '.env');
const devOut = join(root, 'src/environments/environment.ts');
const prodOut = join(root, 'src/environments/environment.production.ts');

function loadDotEnv() {
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return out;
}

function resolve(envVars) {
  return {
    clientId: envVars.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '',
    apiKey: envVars.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY || '',
    calendarId: envVars.GOOGLE_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID || '',
  };
}

function render(production, deployTarget, google) {
  return `import {EnvironmentInterface} from '../app/constants/environment';

export const environment: EnvironmentInterface = {
  production: ${production},
  deployTarget: '${deployTarget}',
  google: {
    clientId: '${google.clientId}',
    apiKey: '${google.apiKey}',
    calendarId: '${google.calendarId}',
  },
};
`;
}

const envVars = loadDotEnv();
const google = resolve(envVars);
const hasLocalEnv = existsSync(envPath);

// Always write the production file (used by `ng build` / CI).
writeFileSync(prodOut, render(true, 'production', google), 'utf8');

// Write the dev file only when a local .env is present (so committed defaults stay clean).
if (hasLocalEnv) {
  writeFileSync(devOut, render(false, 'local', google), 'utf8');
}

console.log('[set-env] environment.production.ts written'
  + (hasLocalEnv ? ' (+ environment.ts from .env)' : ' (environment.ts left at committed defaults)'));