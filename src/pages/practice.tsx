import React from 'react';
import Layout from '@modules/layouts/core/components/layout';
import TypingGame from '@modules/game/components/typing-game';
import { usePreferencesContext } from '@modules/preferences/context/preferences-context';
import Button from '@modules/ui/components/button/button';
import { ActionType } from '@modules/preferences/context/reducer/types';

const Practice: React.FC = ({}) => {
  const { dispatch } = usePreferencesContext();
  return (
    <Layout
      headProps={{
        title: 'Practice | Mecha Type',
      }}
    >
      <Button
        onClick={() => {
          dispatch({
            type: ActionType.SET_ACCENT_COLORS,
            payload: {
              accentColors: 'vintage',
            },
          });
        }}
      >
        Vintage
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: ActionType.SET_ACCENT_COLORS,
            payload: {
              accentColors: 'plain',
            },
          });
        }}
      >
        Plain
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: ActionType.SET_ACCENT_COLORS,
            payload: {
              accentColors: 'orange',
            },
          });
        }}
      >
        Orange
      </Button>
      <TypingGame />
    </Layout>
  );
};

export default Practice;
