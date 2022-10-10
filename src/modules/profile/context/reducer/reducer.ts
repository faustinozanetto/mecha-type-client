import { ActionType, UserProfile, UserProfileActions } from './types';

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
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;
