import { animate } from 'motion';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  className?: String;
  value: number;
};

export default function Stat({ className, value }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const formatter = new Intl.NumberFormat('en-EN');
    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if ('seen' in ref.current!.dataset === false && entry.isIntersecting) {
          ref.current!.dataset.seen = '';

          animate(
            progress => {
              ref.current!.innerHTML = formatter.format(
                Math.floor(progress * value),
              );
            },
            { duration: 3 },
          );
        }
      });
    });

    intersectionObserver.observe(ref.current!);

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <span
      className={`text-4xl font-black tabular-nums text-accent ${className}`}
      ref={ref}
    >
      {value}
    </span>
  );
}
