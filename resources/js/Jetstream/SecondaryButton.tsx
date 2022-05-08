import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function JetSecondaryButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={classNames(
        'border-gray-300 text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 inline-flex items-center rounded-md border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest shadow-sm transition focus:outline-none focus:ring disabled:opacity-25',
        props.className,
      )}
    >
      {children}
    </button>
  );
}
