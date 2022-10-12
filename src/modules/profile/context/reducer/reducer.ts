import type { UserProfile, UserProfileActions } from './types';
import { ActionType } from './types';

const reducer = (state: UserProfile, action: UserProfileActions): UserProfile => {
  switch (action.type) {
    case ActionType.SET_USER: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case ActionType.SET_USER_LOADING: {
      return {
        ...state,
        userLoading: action.payload.userLoading,
      };
    }
    case ActionType.SET_USER_STATS: {
      return {
        ...state,
        userStats: action.payload.userStats,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
