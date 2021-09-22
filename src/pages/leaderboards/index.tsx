import React, { useState } from 'react';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useFilterUsersQuery, useMeQuery, UserFilterBy } from 'generated/graphql';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Button, Container, Flex, Heading, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';
import withApollo from '@lib/apollo';
import { Leaderboards } from '@components/leaderboards/leaderboards';
import { NextSeo } from 'next-seo';
import { __URI__ } from '@utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface LeaderboardsPageProps {
  locale: string;
}

const LeaderboardsPage: React.FC<LeaderboardsPageProps> = ({ locale }) => {
  const [filterBy, setFilterBy] = useState<UserFilterBy>(UserFilterBy.Accuracy);
  const [page, setPage] = useState(0);
  const { data: userData, loading } = useMeQuery({});

  const {
    data: filteredUsers,
    loading: dataLoading,
    fetchMore,
    refetch: refetchFilteredUsers,
  } = useFilterUsersQuery({
    variables: {
      page: page,
      filterBy,
    },
  });

  const switchFilterBy = (filterBy: UserFilterBy) => {
    setFilterBy(filterBy);
    refetchFilteredUsers();
  };

  return (
    <PageWrapper user={userData?.me?.user!}>
      <NextSeo
        title={`Leaderboards | Mecha Type`}
        description={`Leaderboards of Mecha Type, see who is the best at typing!`}
        canonical={`${__URI__}/leaderboards`}
        openGraph={{
          type: 'website',
          images: [{ url: '/favicon.ico' }],
          locale: locale,
          url: `${__URI__}/leaderboards`,
          site_name: 'Mecha Type',
        }}
      />
      <Container
        maxW={['1xl', '2xl', '3xl', '4xl']}
        paddingTop="1rem"
        paddingBottom="1rem"
        minHeight="calc(100vh - 10rem)"
      >
        <VStack>
          {/* Heading */}
          <Flex
            flexDir="column"
            rounded="lg"
            alignContent="center"
            alignItems="center"
            backgroundColor={useColorModeValue('gray.300', 'gray.900')}
            borderRadius="15px"
            width="100%"
            m={4}
            p={4}
          >
            <Heading as="h1" fontSize="4xl" fontWeight={700}>
              Leaderboards
            </Heading>
          </Flex>
          {/* Controls */}
          <Flex flexDir={['column', 'column', 'row', 'row']} justifyContent="center" marginLeft="auto" width="100%">
            <Button
              variant="outline"
              my={[2, 2, 0, 0]}
              mx={2}
              onClick={() => {
                switchFilterBy(UserFilterBy.Accuracy);
              }}
            >
              Accuracy
            </Button>
            <Button
              variant="outline"
              my={[2, 2, 0, 0]}
              mx={2}
              onClick={() => {
                switchFilterBy(UserFilterBy.Wpm);
              }}
            >
              Words Per Minute
            </Button>
            <Button
              variant="outline"
              my={[2, 2, 0, 0]}
              mx={2}
              onClick={() => {
                switchFilterBy(UserFilterBy.Cpm);
              }}
            >
              Chars Per Minute
            </Button>
            <Button
              variant="outline"
              my={[2, 2, 0, 0]}
              mx={2}
              onClick={() => {
                switchFilterBy(UserFilterBy.Keystrokes);
              }}
            >
              Keystrokes
            </Button>
            <Button
              variant="outline"
              my={[2, 2, 0, 0]}
              mx={2}
              onClick={() => {
                switchFilterBy(UserFilterBy.Testscompleted);
              }}
            >
              Tests Completed
            </Button>
          </Flex>
          {/* Table */}
          <Skeleton isLoaded={!dataLoading} width="100%">
            <Leaderboards usersData={filteredUsers?.filterUsers?.nodes!} filterBy={filterBy} />
          </Skeleton>
          {filteredUsers?.filterUsers && filteredUsers.filterUsers.hasMore && (
            <Button
              variant="solid"
              onClick={() => {
                setPage(page + 1);
                fetchMore({
                  variables: {
                    page: page + 1,
                  },
                });
              }}
            >
              Load More
            </Button>
          )}
        </VStack>
      </Container>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['sidebar'])) } };
};

export default withApollo({ ssr: false })(LeaderboardsPage);
