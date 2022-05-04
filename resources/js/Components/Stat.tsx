import { animate } from 'motion';
import React, { useEffect, useReducer, useRef } from 'react';

type Props = {
  className?: String;
  initialValue: number;
  value: number;
};

export default function Stat({ className, initialValue, value }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useReducer(() => true, false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setSeen();
        }
      });
    });

    intersectionObserver.observe(ref.current!);

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const formatter = new Intl.NumberFormat('en-EN');
    animate(
      progress => {
        ref.current!.innerHTML = formatter.format(
          Math.floor(initialValue + progress * value),
        );
      },
      { duration: 3 },
    );
  }, [seen, initialValue, value]);

  return (
    <span
      className={`text-4xl font-black tabular-nums text-accent ${className}`}
      ref={ref}
    >
      {value}
    </span>
  );
}
