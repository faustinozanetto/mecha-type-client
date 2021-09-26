import React, { useState } from 'react';
import { User } from 'generated/graphql';
import { Flex, Text, GridItem, Grid, useColorModeValue } from '@chakra-ui/react';
import { UserAvatar } from '../page/user/user-avatar';
import { EditUserProfileForm } from './edit-user-profile-form';
import { CountryEntry } from '@pages/user/[id]';
import { generateAvatarURl } from '@lib/user/userHelper';
import EditUserProfileSelection from './edit-user-edit-selection';
import { EditUserPracticeForm } from './edit-user-practice-form';

export enum SettingsEdit {
  UNSET,
  PROFILE,
  PRACTICE,
}

interface EditUserProfileProps {
  /** User to perform the edits */
  user: User;
  /** Wether content is loading or not */
  loading: boolean;
  /** Method to call when data was updated */
  onUpdatedCallback: () => void;
  /** Countries data */
  countries: CountryEntry[];
}

export const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, loading, onUpdatedCallback, countries }) => {
  const topBg = useColorModeValue('gray.300', 'gray.700');
  const [settingsType, setSettingsType] = useState<SettingsEdit>(SettingsEdit.UNSET);

  return (
    <>
      {settingsType === SettingsEdit.UNSET && (
        <EditUserProfileSelection
          onProfileSelected={() => {
            setSettingsType(SettingsEdit.PROFILE);
          }}
          onPracticeSelected={() => {
            setSettingsType(SettingsEdit.PRACTICE);
          }}
          onGoBackCallback={onUpdatedCallback}
        />
      )}
      {settingsType === SettingsEdit.PROFILE && (
        <Grid
          templateRows="1fr"
          templateColumns="1fr auto"
          padding="1rem"
          borderRadius="2xl"
          boxShadow="xl"
          justifyContent="space-between"
          backgroundColor={topBg}
        >
          <GridItem rowSpan={2} pr={4}>
            <Flex flexDir="column" maxWidth="3xl">
              <EditUserProfileForm user={user} onUpdatedCallback={onUpdatedCallback} countries={countries} />
            </Flex>
          </GridItem>
          <GridItem display="flex">
            <UserAvatar imageUrl={generateAvatarURl(user)} size={150} loading={loading} />
          </GridItem>
        </Grid>
      )}
      {settingsType === SettingsEdit.PRACTICE && (
        <Flex
          flexDir="column"
          padding="1rem"
          borderRadius="2xl"
          boxShadow="xl"
          justifyContent="space-between"
          backgroundColor={topBg}
          width="lg"
        >
          <EditUserPracticeForm onUpdatedCallback={onUpdatedCallback} />
        </Flex>
      )}
    </>
  );
};
