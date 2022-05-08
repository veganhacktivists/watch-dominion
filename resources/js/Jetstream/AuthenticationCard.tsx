import React, { PropsWithChildren } from 'react';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';

export default function JetAuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
      <div>
        <JetAuthenticationCardLogo />
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
