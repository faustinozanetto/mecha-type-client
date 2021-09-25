import { useCallback } from 'react';
import { ActionType } from '../actions';
import { Dispatch } from 'redux';

export interface LeaderboardsActionType {
  getWPM: () => number;
}

export const getWPM = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.WPM,
    });
  };
};
