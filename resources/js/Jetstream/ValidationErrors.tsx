import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default function JetValidationErrors({
  className,
}: {
  className?: string;
}) {
  const { props } = usePage();
  const { errors } = props;
  const hasErrors = Object.keys(errors).length > 0;

  if (!hasErrors) {
    return null;
  }

  return (
    <div className={className}>
      <div className="text-red-600 font-medium">
        Whoops! Something went wrong.
      </div>

      <ul className="text-red-600 mt-3 list-inside list-disc text-sm">
        {Object.keys(errors).map(key => (
          <li key={key}>{errors[key]}</li>
        ))}
      </ul>
    </div>
  );
}
