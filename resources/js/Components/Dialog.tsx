import * as RadixDialog from '@radix-ui/react-dialog';
import React, { useCallback, useRef, useState } from 'react';
import Button from './Button';

// FIXME Update embed video URL based on selected language
const embed = `<video width="100%" poster="https://watchdominion.org/posters/default.png" controls>
  <source src="https://watchdominion.org/watch-dominion/en" type="video/mp4">
  Your browser does not support the video tag.
</video>`;

type Props = RadixDialog.DialogProps & {
  trigger?: React.ReactNode;
};

export function Dialog({ trigger, ...props }: Props) {
  // State
  const embedRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  // Event listeners
  const copy = useCallback(event => {
    event.preventDefault();

    embedRef.current?.focus();
    embedRef.current?.select();
    const selection = window.getSelection();

    if (selection) {
      navigator.clipboard.writeText(selection.toString());
    }

    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, []);

  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed inset-0 bg-dark bg-opacity-20 motion-safe:animate-fadein" />
      <RadixDialog.Content
        className={[
          'absolute right-0 z-20 rounded-lg bg-white text-dark',
          'motion-safe:animate-dialog tablet:motion-safe:animate-fadein',
        ].join(' ')}
      >
        <div className="flex border-b border-dark border-opacity-20 px-5 py-4 font-bold">
          <RadixDialog.Title className="flex-1">
            Embed, share, make a change!
          </RadixDialog.Title>
          <RadixDialog.Close className="absolute top-0 right-0 py-3 px-4 text-gray-dark">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </RadixDialog.Close>
        </div>
        <form className="flex flex-col space-y-5 p-5" onSubmit={copy}>
          <p>Copy and paste this code into your website or blog.</p>
          <textarea
            className="select-all rounded-md border-none text-gray selection:bg-accent/50 focus:ring-accent"
            value={embed}
            ref={embedRef}
            rows={3}
            readOnly
          />
          <Button as="button" className="mt-6 self-end" type="submit">
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </form>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
}
