import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import React, { useState } from 'react';

import Skeleton from '../skeleton/skeleton';

interface IImageProps extends ImageProps {
  isImageLoading: boolean;
}

const Image: React.FC<IImageProps> = (props) => {
  const { isImageLoading, src, width, height, alt, className, layout, ...rest } = props;
  const [imageLoaded, setImageLoaded] = useState(isImageLoading);

  const handleImagedLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Skeleton className={className} isLoaded={imageLoaded}>
      {src && (
        <NextImage
          className={className}
          src={src}
          alt={alt}
          height={height}
          width={width}
          layout={layout || 'responsive'}
          onLoadingComplete={handleImagedLoaded}
          {...rest}
        />
      )}
    </Skeleton>
  );
};

export default Image;
