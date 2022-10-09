import React from 'react';
import Layout from '@modules/layouts/core/components/layout';
import TypingGame from '@modules/game/components/typing-game';
import { usePreferencesContext } from '@modules/preferences/context/preferences-context';
import Button from '@modules/ui/components/button/button';
import clsx from 'clsx';

const Practice: React.FC = ({}) => {
  const { dispatch, state } = usePreferencesContext();
  return (
    <Layout
      headProps={{
        title: 'Practice | Mecha Type',
      }}
    >
      <Button
        onClick={() => {
          dispatch({ type: 'SET_ACCENT_COLORS', payload: 'vintage' });
        }}
      >
        Vintage
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: 'SET_ACCENT_COLORS', payload: 'plain' });
        }}
      >
        Plain
      </Button>
      <Button
        onClick={() => {
          dispatch({ type: 'SET_ACCENT_COLORS', payload: 'orange' });
        }}
      >
        Orange
      </Button>
      <TypingGame />
    </Layout>
  );
};

export default Practice;
