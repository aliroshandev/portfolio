import {EnvironmentInterface} from '../app/constants/environment';

// Local development defaults. Values are overwritten from `.env` when present
// (see `npm run setenv` → scripts/set-env.mjs) so secrets never live in git.
export const environment: EnvironmentInterface = {
  production: false,
  deployTarget: 'local',
  google: {
    clientId: '',
    apiKey: '',
    calendarId: '',
  },
};