import { PracticeSearchValues } from '@components/practice/selection/search-input/practice-search.form';
import { TestLanguage } from '@generated/graphql';
import { ActionType } from 'state/action-types';
import { Action } from 'state/actions';

export const initialState: PracticeSearchValues = {
  filterLanguage: true,
  filterPunctuated: false,
  filterWords: false,
  language: TestLanguage.English,
  punctuated: false,
  words: 20,
};

const reducer = (state: PracticeSearchValues = initialState, action: Action): PracticeSearchValues => {
  switch (action.type) {
    case ActionType.UPDATE:
      return action.payload;
    case ActionType.CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
