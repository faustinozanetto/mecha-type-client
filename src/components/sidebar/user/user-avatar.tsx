import React from 'react';
import styled from 'styled-components';
import Image, { ImageProps } from 'next/image';

const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  * > img {
    border-radius: 100%;
  }
`;

interface UserAvatarProps {
  src: string;
  alt: string;
  objectFit: ImageProps['objectFit'];
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, objectFit }) => {
  return (
    <Wrapper>
      <Image src={src} alt={alt} width={50} height={50} objectFit={objectFit} />
    </Wrapper>
  );
};
