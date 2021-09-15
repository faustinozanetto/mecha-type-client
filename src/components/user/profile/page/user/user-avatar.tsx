import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { SkeletonCircle } from '@chakra-ui/skeleton';

const AvatarContainer = styled.div`
  & > div {
    align-items: center;
    justify-content: center !important;
  }

  * > img {
    border-radius: 15px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

interface UserAvatarProps {
  /** Url of the avatar */
  imageUrl: string;
  /** Size of the image */
  size: number;
  /** Wether data is loading or not. */
  loading: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, size = 150, loading }) => {
  return (
    <AvatarContainer>
      <SkeletonCircle isLoaded={!loading} size={size.toFixed(0)}>
        {!loading && imageUrl && <Image src={imageUrl} alt="User avatar" width={size} height={size} quality={50} />}
      </SkeletonCircle>
    </AvatarContainer>
  );
};
