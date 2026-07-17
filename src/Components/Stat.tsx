import { animate } from "motion";
import { useEffect, useReducer, useRef } from "react";

type Props = {
  className?: string;
  value: number;
};

const formatter = new Intl.NumberFormat("en-US");

export default function Stat({ className, value }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [seen, setSeen] = useReducer(() => true, false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
    if (!seen) return;

    const controls = animate(0, value, {
      duration: 3,
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = formatter.format(Math.floor(latest));
        }
      },
    });

    return () => {
      controls.stop();
    };
  }, [seen, value]);

  return (
    <span
      className={`text-4xl font-black tabular-nums text-accent ${className}`}
      ref={ref}
    >
      {formatter.format(value)}
    </span>
  );
}
