import clsx from 'clsx';
import React from 'react';

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoaded: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, ISkeletonProps>((props, ref) => {
  const { isLoaded, className, style, children, ...rest } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        className || '',
        !isLoaded && 'skeleton animate-pulse bg-clip-padding cursor-default bg-gray-300'
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Skeleton;
