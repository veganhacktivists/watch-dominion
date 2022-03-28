import { InertiaLink, InertiaLinkProps } from '@inertiajs/inertia-react';
import React from 'react';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as: 'button';
  };

type ButtonAsExternal = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'externalLink';
  };

type ButtonAsLink = BaseProps &
  Omit<InertiaLinkProps, keyof BaseProps> & {
    as: 'link';
  };

type Props = ButtonAsButton | ButtonAsExternal | ButtonAsLink;

export default function Button(props: Props) {
  const buttonClassName = `flex items-center rounded-lg h-11 px-8 font-bold ${
    props.variant === 'primary'
      ? 'bg-accent text-dark'
      : 'border-2 border-accent'
  } ${props.className || ''}`;

  if (props.as === 'externalLink') {
    const { className, as, ...rest } = props;
    return (
      <a className={buttonClassName} {...rest}>
        {props.children}
      </a>
    );
  } else if (props.as === 'link') {
    const { className, as, ...rest } = props;
    return (
      <InertiaLink className={buttonClassName} {...rest}>
        {props.children}
      </InertiaLink>
    );
  } else {
    const { className, as, ...rest } = props;
    return (
      <button className={buttonClassName} {...rest}>
        {props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  variant: 'primary',
};
