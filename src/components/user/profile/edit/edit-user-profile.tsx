import React, { useState } from 'react';
import { UserFragment, UserSettings } from 'generated/graphql';
import { Flex, GridItem, VStack, useColorModeValue, Container, HStack } from '@chakra-ui/react';
import { UserAvatar } from '../page/user/user-avatar';
import { EditUserProfileForm } from './edit-user-profile-form';
import { generateAvatarURl } from '@modules/core/user/user';
import EditUserProfileSelection from './edit-user-edit-selection';
import { EditUserPracticeForm } from './edit-user-practice-form';
import { CountryEntry } from '@typings/user.types';

export enum SettingsEdit {
  UNSET,
  PROFILE,
  PRACTICE,
}

interface EditUserProfileProps {
  /** User to perform the edits */
  user: UserFragment;
  /** Wether content is loading or not */
  loading: boolean;
  /** Countries data */
  countries: CountryEntry[];
  userSettings: UserSettings;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, loading, countries, userSettings }) => {
  return (
    <Container centerContent>
      <VStack spacing={4}>
        {/* Profile settings. */}
        <Flex
          flexDir="column"
          padding="1rem"
          borderRadius="2xl"
          boxShadow="xl"
          width="full"
          bg={useColorModeValue('gray.100', 'gray.700')}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <EditUserProfileForm user={user} countries={countries} />
        </Flex>

        {/* Practice settings */}
        <Flex
          flexDir="column"
          padding="1rem"
          borderRadius="2xl"
          boxShadow="xl"
          width="full"
          bg={useColorModeValue('gray.100', 'gray.700')}
          color={useColorModeValue('gray.700', 'gray.200')}
        >
          <EditUserPracticeForm userSettings={userSettings} userId={user.id} />
        </Flex>
      </VStack>
    </Container>
  );
};

export default EditUserProfile;
