import React from 'react';
import { Tooltip, IconButton, IconButtonProps } from '@chakra-ui/react';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { FaPlay } from '@meronex/icons/fa';

type UserPresetCardTryProps = IconButtonProps & {};

const UserPresetCardTry = React.forwardRef<any, UserPresetCardTryProps>((props, ref) => {
  const { ...rest } = props;
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');

  return (
    <Tooltip label="Try" aria-label="Try Preset" fontSize="md" isDisabled={isMediumOrMore}>
      <IconButton as="a" colorScheme="purple" icon={<FaPlay />} m={2} {...rest} />
    </Tooltip>
  );
});

UserPresetCardTry.displayName = 'UserPresetCardTry';

export default UserPresetCardTry;
