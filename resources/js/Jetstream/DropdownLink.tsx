import { InertiaLink } from '@inertiajs/inertia-react';
import React, { PropsWithChildren } from 'react';

interface Props {
  as?: string;
  href?: string;
}

export default function JetDropdownLink({
  as,
  href,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div>
      {(() => {
        switch (as) {
          case 'button':
            return (
              <button
                type="submit"
                className="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 block w-full px-4 py-2 text-left text-sm leading-5 transition focus:outline-none"
              >
                {children}
              </button>
            );
          case 'a':
            return (
              <a
                href={href}
                className="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 block px-4 py-2 text-sm leading-5 transition focus:outline-none"
              >
                {children}
              </a>
            );
          default:
            return (
              <InertiaLink
                href={href || ''}
                className="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 block px-4 py-2 text-sm leading-5 transition focus:outline-none"
              >
                {children}
              </InertiaLink>
            );
        }
      })()}
    </div>
  );
}
