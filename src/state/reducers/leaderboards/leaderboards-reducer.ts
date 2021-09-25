import { UserFragment } from '@generated/graphql';
import { ActionItemType, ActionType, WPM } from './actions';

export interface LeaderboardStateType {
  users: UserFragment[];
}

const reducer = (
  state: LeaderboardStateType = {
    users: [],
  },
  action: ActionItemType
) => {
  if (state) {
    switch (action.type) {
      case ActionType.WPM:
        return WPM(state);
      default: {
        return state;
      }
    }
  }
};

export default reducer;
