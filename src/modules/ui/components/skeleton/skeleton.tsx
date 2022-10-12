import clsx from 'clsx';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import React from 'react';

interface ISkeletonProps extends HTMLMotionProps<'div'> {
  isLoaded: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, ISkeletonProps>((props, ref) => {
  const { isLoaded, className, children, ...rest } = props;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: isLoaded ? 1 : 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={clsx(
        className || '',
        !isLoaded && 'skeleton animate-blink cursor-default bg-gray-300 bg-clip-padding'
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
