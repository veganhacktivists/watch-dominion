require('./bootstrap');

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText ||
  'Watch Dominion';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => require(`./Pages/${name}.tsx`),
  setup({ el, App, props }) {
    const root = createRoot(el);
    return root.render(<App {...props} />);
  },
});

InertiaProgress.init({ color: '#4B5563' });
