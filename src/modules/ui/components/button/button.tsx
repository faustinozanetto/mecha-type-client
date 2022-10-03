import clsx from 'clsx';
import React from 'react';

export type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
};

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const { children, size = 'md', variant = 'solid', ...rest } = props;

  const buttonSizeVariants = (): string => {
    switch (size) {
      case 'sm':
        return 'py-2.5 px-3 text-base';
      case 'md':
        return 'px-5 py-2.5 text-md';
      case 'lg':
        return 'px-10 py-3.5 text-lg';
      default:
        return 'py-3 px-2.5 text-bas';
    }
  };

  const buttonVariants = (): string => {
    switch (variant) {
      case 'outline':
        return 'text-primary-800 border border-2 border-primary-700 focus:ring-primary-300 hover:bg-primary-800 hover:text-white';
      case 'solid':
      default:
        return 'bg-primary-200 text-primary-800 hover:bg-primary-300 focus:ring-primary-300';
    }
  };

  const buttonStyles = clsx(
    'rounded-lg text-base font-semibold focus:outline-none focus:ring-4 ',
    buttonSizeVariants(),
    buttonVariants()
  );

  return (
    <button className={buttonStyles} ref={ref} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
