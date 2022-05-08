import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import JetSectionTitle from '@/Jetstream/SectionTitle';

interface Props {
  title: string;
  description: string;
  renderActions?(): JSX.Element;
  onSubmit(): void;
}

export default function JetFormSection({
  onSubmit,
  renderActions,
  title,
  description,
  children,
}: PropsWithChildren<Props>) {
  const hasActions = !!renderActions;

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <JetSectionTitle title={title} description={description} />

      <div className="mt-5 md:col-span-2 md:mt-0">
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div
            className={classNames(
              'bg-white px-4 py-5 shadow sm:p-6',
              hasActions
                ? 'sm:rounded-tl-md sm:rounded-tr-md'
                : 'sm:rounded-md',
            )}
          >
            <div className="grid grid-cols-6 gap-6">{children}</div>
          </div>

          {hasActions && (
            <div className="bg-gray-50 flex items-center justify-end px-4 py-3 text-right shadow sm:rounded-bl-md sm:rounded-br-md sm:px-6">
              {renderActions?.()}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
