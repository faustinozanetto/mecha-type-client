import { Flex, Button } from '@chakra-ui/react';
import { UserFilterBy } from '@generated/graphql';
import React from 'react';
import { useLeaderboardState } from 'state';

interface LeaderboardCategoriesProps {}

export const LeaderboardCategories: React.FC<LeaderboardCategoriesProps> = ({}) => {
  const setLeaderboardFilterBy = useLeaderboardState((state) => state.setLeaderboardFilterBy);
  return (
    <Flex flexDir={['column', 'column', 'row', 'row']} justifyContent="center" marginLeft="auto" width="100%">
      <Button
        variant="outline"
        my={[2, 2, 0, 0]}
        mx={2}
        onClick={() => {
          setLeaderboardFilterBy(UserFilterBy.Accuracy);
        }}
      >
        Accuracy
      </Button>
      <Button
        variant="outline"
        my={[2, 2, 0, 0]}
        mx={2}
        onClick={() => {
          setLeaderboardFilterBy(UserFilterBy.Wpm);
        }}
      >
        Words Per Minute
      </Button>
      <Button
        variant="outline"
        my={[2, 2, 0, 0]}
        mx={2}
        onClick={() => {
          setLeaderboardFilterBy(UserFilterBy.Cpm);
        }}
      >
        Chars Per Minute
      </Button>
      <Button
        variant="outline"
        my={[2, 2, 0, 0]}
        mx={2}
        onClick={() => {
          setLeaderboardFilterBy(UserFilterBy.Keystrokes);
        }}
      >
        Keystrokes
      </Button>
      <Button
        variant="outline"
        my={[2, 2, 0, 0]}
        mx={2}
        onClick={() => {
          setLeaderboardFilterBy(UserFilterBy.Testscompleted);
        }}
      >
        Tests Completed
      </Button>
    </Flex>
  );
};
