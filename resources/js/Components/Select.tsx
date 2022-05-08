import { cx } from '@/lib/cx';
import * as RadixSelect from '@radix-ui/react-select';
import React from 'react';

type SelectProps = RadixSelect.SelectProps & {
  children: React.ReactNode;
  label: string;
};
export const Select = React.forwardRef(
  (
    { children, label, ...props }: SelectProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => (
    <Root {...props}>
      <Trigger className="flex space-x-2" aria-label={label} ref={ref}>
        <Value />
        <Icon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16.5" cy="16.5" r="16.5" fill="#F4C41A" />
            <path
              d="M15.5859 21.2891C15.9375 21.6406 16.5234 21.6406 16.875 21.2891L22.1875 15.9766C22.5781 15.5859 22.5781 15 22.1875 14.6484L21.3281 13.75C20.9375 13.3984 20.3516 13.3984 20 13.75L16.2109 17.5391L12.4609 13.75C12.1094 13.3984 11.5234 13.3984 11.1328 13.75L10.2734 14.6484C9.88281 15 9.88281 15.5859 10.2734 15.9766L15.5859 21.2891Z"
              fill="#171716"
            />
          </svg>
        </Icon>
      </Trigger>
      <Content>
        <Viewport>
          <Group>
            <Label>{label}</Label>
            {children}
          </Group>
        </Viewport>
      </Content>
    </Root>
  ),
);

type SelectOptionProps = {
  children: React.ReactNode;
  value: string;
};
export const Option = ({ children, value }: SelectOptionProps) => {
  return (
    <Item value={value}>
      <ItemText>{children}</ItemText>
    </Item>
  );
};

// Styled versions of the primitives provided by Radix UI.
export const Content = ({
  className,
  ...props
}: RadixSelect.SelectContentProps) => (
  <RadixSelect.Content
    className={cx('rounded-md bg-white p-0.5 shadow-lg', className)}
    {...props}
  />
);

export const Item = React.forwardRef(
  (
    { className, ...props }: RadixSelect.SelectItemProps,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <RadixSelect.Item
      className={cx(
        'cursor-default rounded-md py-1 px-2 text-black outline-none focus:bg-accent',
        className,
      )}
      {...props}
      ref={ref}
    />
  ),
);

export const Label = ({
  className,
  ...props
}: RadixSelect.SelectLabelProps) => (
  <RadixSelect.Label
    className={cx('py-1 px-2 text-xs text-gray', className)}
    {...props}
  />
);

// Reexport everything else.
export const Group = RadixSelect.Group;
export const Icon = RadixSelect.Icon;
export const ItemIndicator = RadixSelect.ItemIndicator;
export const ItemText = RadixSelect.ItemText;
export const Root = RadixSelect.Root;
export const ScrollDownButton = RadixSelect.ScrollDownButton;
export const ScrollUpButton = RadixSelect.ScrollUpButton;
export const Separator = RadixSelect.Separator;
export const Trigger = RadixSelect.Trigger;
export const Value = RadixSelect.Value;
export const Viewport = RadixSelect.Viewport;
