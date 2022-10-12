import { User } from '@prisma/client';
import { ActionMap, UserStats } from '@typedefs/mecha-types';

export type UserProfile = {
  user: User;
  userStats: UserStats;
  userLoading: boolean;
};

export enum ActionType {
  SET_USER,
  SET_USER_LOADING,
  SET_USER_STATS
}

type UserProfilePayload = {
  [ActionType.SET_USER]: {
    user: User;
  };
  [ActionType.SET_USER_LOADING]: {
    userLoading: boolean;
  };
  [ActionType.SET_USER_STATS]: {
    userStats:UserStats;
  }
};

export type UserProfileActions = ActionMap<UserProfilePayload>[keyof ActionMap<UserProfilePayload>];
