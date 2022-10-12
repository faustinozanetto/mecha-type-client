import clsx from 'clsx';
import React from 'react';

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoaded: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, ISkeletonProps>((props, ref) => {
  const { isLoaded, className, children, ...rest } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        className || '',
        !isLoaded && 'skeleton animate-pulse cursor-default bg-gray-300 bg-clip-padding'
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
