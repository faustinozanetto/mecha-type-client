import React from 'react';
import { __SERVER__ } from '@utils/constants';
import { StatCard } from './stats';
// import { IPositionEntry } from 'pages/dashboard';
import { User } from 'generated/graphql';
import { Flex } from '@chakra-ui/react';

interface DashboardProps {
  user: User;
  // userStats: IPositionEntry[];
}

export const UserDashboard: React.FC<DashboardProps> = ({ user }) => {
  /**
   *
   * @param filterBy Filter by parameter used to sort the stats.
   * @returns Returns the data corresponding to the filtered param.
   */
  // const filterUserStats = (filterBy: FilterBy) => {
  //   let data = userStats.filter((stat) => {
  //     if (stat.fieldType === filterBy) {
  //       return stat;
  //     }
  //   });
  //   return data[0];
  // };

  return <Flex></Flex>;
};
