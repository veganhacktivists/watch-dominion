import React, { PropsWithChildren } from 'react';

interface Props {
  value?: string;
  htmlFor?: string;
}

export default function JetLabel({
  value,
  htmlFor,
  children,
}: PropsWithChildren<Props>) {
  return (
    <label
      className="text-gray-700 block text-sm font-medium"
      htmlFor={htmlFor}
    >
      {value || children}
    </label>
  );
}
