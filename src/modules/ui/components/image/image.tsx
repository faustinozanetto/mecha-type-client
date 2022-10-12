import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import React from 'react';

interface IImageProps extends ImageProps {}

const Image: React.FC<IImageProps> = (props) => {
  const { src, width, height, alt, className, layout, ...rest } = props;

  return (
    <NextImage
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
      layout={layout || 'responsive'}
      {...rest}
    />
  );
};

export default Image;
