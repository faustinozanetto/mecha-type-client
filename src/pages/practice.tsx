import React from 'react';
import Layout from '@modules/layouts/core/components/layout';
import TypingGame from '@modules/game/components/typing-game';

const Practice: React.FC = ({}) => {
  return (
    <Layout
      headProps={{
        title: 'Practice | Mecha Type',
      }}
    >
      <TypingGame />
    </Layout>
  );
};

export default Practice;
