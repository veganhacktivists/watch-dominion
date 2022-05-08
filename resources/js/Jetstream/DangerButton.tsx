import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function JetDangerButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={classNames(
        'bg-red-600 border-transparent hover:bg-red-500 focus:border-red-700 focus:ring-red-200 active:bg-red-600 inline-flex items-center justify-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition focus:outline-none focus:ring disabled:opacity-25',
        props.className,
      )}
    >
      {children}
    </button>
  );
}
