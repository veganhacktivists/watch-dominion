// @ts-ignore
import { InertiaLink, useForm, Head } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import JetAuthenticationCard from '@/Jetstream/AuthenticationCard';
import JetButton from '@/Jetstream/Button';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'));
  }

  return (
    <JetAuthenticationCard>
      <Head title="Email Verification" />

      <div className="text-gray-600 mb-4 text-sm">
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn't receive the email, we will gladly send you another.
      </div>

      {verificationLinkSent && (
        <div className="text-green-600 mb-4 text-sm font-medium">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mt-4 flex items-center justify-between">
          <JetButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Resend Verification Email
          </JetButton>

          <InertiaLink
            href={route('logout')}
            method="post"
            as="button"
            className="text-gray-600 hover:text-gray-900 text-sm underline"
          >
            Log Out
          </InertiaLink>
        </div>
      </form>
    </JetAuthenticationCard>
  );
}
