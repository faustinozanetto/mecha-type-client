import React from 'react';
import { Flex, useColorModeValue, Button, ButtonGroup } from '@chakra-ui/react';
import { UserFilterBy } from '@generated/graphql';
import { useLeaderboardState } from 'state';

interface LeaderboardCategoriesProps {}

export const LeaderboardCategories: React.FC<LeaderboardCategoriesProps> = ({}) => {
  const setLeaderboardFilterBy = useLeaderboardState((state) => state.setLeaderboardFilterBy);
  return (
    <Flex
      flexDir={['column', 'column', 'row', 'row']}
      rounded="lg"
      alignContent="center"
      alignItems="center"
      backgroundColor={useColorModeValue('gray.300', 'gray.900')}
      borderRadius="15px"
      justifyContent="center"
      padding={4}
      width="100%"
    >
      <ButtonGroup variant="outline" my={[2, 2, 0, 0]} mx={2} colorScheme="teal">
        <Button
          onClick={() => {
            setLeaderboardFilterBy(UserFilterBy.Accuracy);
          }}
        >
          Accuracy
        </Button>
        <Button
          onClick={() => {
            setLeaderboardFilterBy(UserFilterBy.Wpm);
          }}
        >
          Words Per Minute
        </Button>
        <Button
          onClick={() => {
            setLeaderboardFilterBy(UserFilterBy.Cpm);
          }}
        >
          Chars Per Minute
        </Button>
        <Button
          onClick={() => {
            setLeaderboardFilterBy(UserFilterBy.Keystrokes);
          }}
        >
          Keystrokes
        </Button>
        <Button
          onClick={() => {
            setLeaderboardFilterBy(UserFilterBy.Testscompleted);
          }}
        >
          Tests Completed
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
