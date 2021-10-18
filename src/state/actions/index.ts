import { PracticeSearchValues } from '@components/practice/selection/search-input/practice-search.form';
import { ActionType } from 'state/action-types';

interface UpdateAction {
  type: ActionType.UPDATE;
  payload: PracticeSearchValues;
}

interface ClearAction {
  type: ActionType.CLEAR;
}

export type Action = UpdateAction | ClearAction;
