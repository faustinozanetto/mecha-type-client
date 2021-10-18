import React, { useState } from 'react';
import { UserFragment, useUserSettingsQuery } from 'generated/graphql';
import { Flex, GridItem, Grid, useColorModeValue } from '@chakra-ui/react';
import { UserAvatar } from '../page/user/user-avatar';
import { EditUserProfileForm } from './edit-user-profile-form';
import { generateAvatarURl } from '@modules/core/user/user';
import EditUserProfileSelection from './edit-user-edit-selection';
import { EditUserPracticeForm } from './edit-user-practice-form';
import { CountryEntry } from 'typings/user';

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
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ user, loading, countries }) => {
  const topBg = useColorModeValue('gray.300', 'gray.700');
  const { data: userSettings, loading: userSettingsLoading } = useUserSettingsQuery({
    variables: { input: { userId: user?.id } },
  });

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
              <EditUserProfileForm
                user={user}
                countries={countries}
                onCancelCallback={() => setSettingsType(SettingsEdit.UNSET)}
              />
            </Flex>
          </GridItem>
          <GridItem display="flex">
            <UserAvatar imageUrl={generateAvatarURl(user)} size={150} loading={loading} />
          </GridItem>
        </Grid>
      )}
      {userSettings?.userSettings?.userSettings && settingsType === SettingsEdit.PRACTICE && (
        <Flex
          flexDir="column"
          padding="1rem"
          borderRadius="2xl"
          boxShadow="xl"
          justifyContent="space-between"
          backgroundColor={topBg}
          width="lg"
        >
          <EditUserPracticeForm
            userSettings={userSettings?.userSettings?.userSettings}
            userId={user.id}
            onCancelCallback={() => setSettingsType(SettingsEdit.UNSET)}
          />
        </Flex>
      )}
    </>
  );
};

export default EditUserProfile;
