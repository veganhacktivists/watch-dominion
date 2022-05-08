import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function JetButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={classNames(
        'bg-gray-800 border-transparent hover:bg-gray-700 active:bg-gray-900 focus:border-gray-900 focus:ring-gray-300 inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition focus:outline-none focus:ring disabled:opacity-25',
        props.className,
      )}
    >
      {children}
    </button>
  );
}
