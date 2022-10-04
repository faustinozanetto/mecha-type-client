import clsx from 'clsx';
import React, { useMemo } from 'react';

export type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  /** Size of the button, defaults to md */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Variant of the button, defaults to solid */
  variant?: 'solid' | 'outline';
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const { children, leftIcon, rightIcon, size = 'md', variant = 'solid', ...rest } = props;

  const buttonSizeVariants = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'py-1.5 px-2 text-sm';
      case 'sm':
        return 'py-2.5 px-3 text-base';
      case 'md':
        return 'px-5 py-2.5 text-md';
      case 'lg':
        return 'px-10 py-3.5 text-lg';
      default:
        return 'py-3 px-2.5 text-bas';
    }
  }, [size]);

  const buttonVariants = useMemo(() => {
    switch (variant) {
      case 'outline':
        return 'text-primary-800 border border-2 border-primary-700 focus:ring-primary-300 hover:bg-primary-800 hover:border-primary-500 hover:text-white';
      case 'solid':
      default:
        return 'bg-primary-200 text-primary-800 hover:bg-primary-300 focus:ring-primary-300';
    }
  }, [variant]);

  const buttonStyles = clsx(
    'rounded-lg inline-flex space-x-2 items-center text-base font-semibold focus:outline-none focus:ring-4 ',
    buttonSizeVariants,
    buttonVariants
  );

  return (
    <button className={buttonStyles} ref={ref} {...rest}>
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
