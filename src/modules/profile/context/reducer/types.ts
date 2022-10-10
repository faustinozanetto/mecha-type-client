import { User } from '@prisma/client';
import { ActionMap } from '@typedefs/mecha-types';

export type UserProfile = {
  user: User;
  userLoading: boolean;
};

export enum ActionType {
  SET_USER,
  SET_USER_LOADING,
}

type UserProfilePayload = {
  [ActionType.SET_USER]: {
    user: User;
  };
  [ActionType.SET_USER_LOADING]: {
    userLoading: boolean;
  };
};

export type UserProfileActions = ActionMap<UserProfilePayload>[keyof ActionMap<UserProfilePayload>];
