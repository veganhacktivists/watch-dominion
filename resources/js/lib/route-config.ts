import { createContext } from 'react';
import type { Config } from 'ziggy-js';

export const RouteConfigContext = createContext<Config>({
  routes: {},
  url: '',
  defaults: {},
});
