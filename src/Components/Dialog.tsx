import * as RadixDialog from '@radix-ui/react-dialog';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from './Button';
import { videos } from '@/data/videos';
import { useLang } from '@/data/langs';

type Props = RadixDialog.DialogProps & {
  trigger?: React.ReactNode;
};

export function Dialog({ trigger, ...props }: Props) {
  const [lang] = useLang();
  const embed = `<div style="width: 100%; aspect-ratio: 16 / 9;">
  <iframe
    width="100%"
    height="100%"
    src="${videos[lang].embedUrl}"
    frameborder="0"
    allow="autoplay; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>`;

  const contentRef = useRef<HTMLDivElement>(null);
  const embedRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  // Scroll the dialog in view or back.
  useEffect(() => {
    if (props.open) setPrevScrollY(window.scrollY);

    window.requestAnimationFrame(() => {
      if (props.open) {
        contentRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else {
        window.scrollTo({ top: prevScrollY, behavior: 'smooth' });
      }
    });
  }, [props.open]);

  // Event listeners
  const copy = useCallback((event: React.FormEvent) => {
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
      <RadixDialog.Overlay className="fixed inset-0 !m-0 bg-dark bg-opacity-20 motion-safe:animate-fadein" />
      <RadixDialog.Content
        className={[
          'absolute right-0 top-9 z-20 !m-0 rounded-lg bg-white text-dark',
          'tablet:motion-safe:animate-fadein motion-safe:animate-dialog',
        ].join(' ')}
        ref={contentRef}
      >
        <div className="flex border-b border-dark border-opacity-20 px-5 py-4 font-bold">
          <RadixDialog.Title className="flex-1">
            Embed, share, make a change!
          </RadixDialog.Title>
          <RadixDialog.Close
            className="text-gray-dark absolute top-0 right-0 aspect-square py-3 px-4"
            data-click="embed-close"
          >
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
          <p className="max-w-sm">
            Copy and paste the below code into your website or blog. If you wish
            to customize the main color or poster, you can embed our{' '}
            <a
              className="underline underline-offset-2"
              href={videos[lang].embedUrl}
              rel="noopener noreferrer"
              data-click="embed-player"
            >
              player
            </a>{' '}
            directly instead.
          </p>
          <textarea
            className="select-all overflow-x-scroll rounded-md border-none text-gray selection:bg-accent/50 focus:ring-accent"
            value={embed}
            ref={embedRef}
            rows={3}
            wrap="off"
            readOnly
          />
          <Button
            as="button"
            className="mt-6 self-end"
            type="submit"
            data-click="embed-copy"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </form>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
}
