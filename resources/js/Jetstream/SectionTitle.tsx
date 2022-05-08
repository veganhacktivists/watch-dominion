import React from 'react';

interface Props {
  title: string;
  description: string;
}

export default function JetSectionTitle({ title, description }: Props) {
  return (
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-gray-900 text-lg font-medium">{title}</h3>

        <p className="text-gray-600 mt-1 text-sm">{description}</p>
      </div>
    </div>
  );
}
