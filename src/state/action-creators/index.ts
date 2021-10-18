import { PracticeSearchValues } from '@components/practice/selection/search-input/practice-search.form';
import { Dispatch } from 'redux';
import { ActionType } from 'state/action-types';
import { Action } from 'state/actions';
import { initialState } from 'state/reducers/search-test-presets-reducer';

export const updateSearchValues = (values: PracticeSearchValues) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE,
      payload: values,
    });
  };
};

export const clearSearchValues = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CLEAR,
      payload: initialState,
    });
  };
};
