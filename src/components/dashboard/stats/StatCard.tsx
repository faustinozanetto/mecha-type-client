import React from 'react';
import styled from 'styled-components';
import { IPositionEntry } from 'pages/dashboard';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: hsla(0, 0%, 96%, 1);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  align-content: center;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;
  border-radius: 15px;
  transition: all 200ms ease-out;

  :hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
`;

const Number = styled.h2`
  font-size: 3rem;
  color: #264653;
  font-weight: 600;
  margin: 0;
`;

const LeaderboardPosition = styled.div``;

interface StatCardProps {
  statData: IPositionEntry;
}

// TODO: Continue working on dashboard stat card
export const StatCard: React.FC<StatCardProps> = ({ statData }) => {
  // const parseFieldType = (filterBy: FilterBy) => {
  //   switch (filterBy) {
  //     case FilterBy.AverageWpm:
  //       return 'Average WPM';
  //     case FilterBy.Keystrokes:
  //       return 'Keystrokes';
  //     case FilterBy.TestsCompleted:
  //       return 'Tests Completed';
  //     case FilterBy.WordsWritten:
  //       return 'Words Written';
  //   }
  // };

  if (!statData) {
    return <h3>Error</h3>;
  }

  return (
    <Card>
      {/* Title */}
      {/* <Title>{parseFieldType(statData?.fieldType)}</Title> */}

      {/* Number */}
      <Number>{statData?.amount}</Number>
      {/* Leaderboard Position */}
      <LeaderboardPosition>
        You are {statData.position} out of {statData?.total}!
      </LeaderboardPosition>
    </Card>
  );
};
