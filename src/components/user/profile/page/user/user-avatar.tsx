import React from 'react';

import { SkeletonCircle, Image } from '@chakra-ui/react';

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
    <SkeletonCircle isLoaded={!loading} size={size.toFixed(0)}>
      {!loading && imageUrl && (
        <Image src={imageUrl} alt="User avatar" rounded="2xl" width={size} height={size} quality={50} />
      )}
    </SkeletonCircle>
  );
};
