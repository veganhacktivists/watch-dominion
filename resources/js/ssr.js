import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/inertia-react';
import createServer from '@inertiajs/server';
import { RouteConfigContext } from './lib/route-config';

createServer(page =>
  createInertiaApp({
    page,
    render: (...args) => ReactDOMServer.renderToString(...args),
    resolve: name => require(`./Pages/${name}`),
    setup: ({ App, props }) => {
      const ziggyConfig = {
        ...props.initialPage.props.ziggy,
        location: new URL(props.initialPage.props.ziggy.url),
      };

      return (
        <RouteConfigContext.Provider value={ziggyConfig}>
          <App {...props} />
        </RouteConfigContext.Provider>
      );
    },
  }),
);
