import TypingGame from '@modules/game/components/typing-game';
import Layout from '@modules/layouts/core/components/layout';
import React from 'react';

const Practice: React.FC = ({}) => {
  return (
    <Layout
      headProps={{
        title: 'Practice | Mecha Type',
      }}
    >
      <h1 className="text-4xl font-semibold text-accent underline">Typing Test</h1>
      <TypingGame />
    </Layout>
  );
};

export default Practice;
