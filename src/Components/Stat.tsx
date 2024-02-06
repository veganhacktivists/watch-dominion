import { animate } from 'motion';
import { useEffect, useReducer, useRef } from 'react';

type Props = {
  className?: String;
  value: number;
};

export default function Stat({ className, value }: Props) {
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
        if (ref.current) {
          ref.current.innerHTML = formatter.format(
            Math.floor(progress * value),
          );
        }
      },
      { duration: 3 },
    );
  }, [seen, value]);

  return (
    <span
      className={`text-4xl font-black tabular-nums text-accent ${className}`}
      ref={ref}
    >
      {value}
    </span>
  );
}
