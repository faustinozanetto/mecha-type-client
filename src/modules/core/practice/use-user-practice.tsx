import React from 'react';
import userPracticeContext, { UserPracticeContext } from './user-practice-context';

export type UserPractice = UserPracticeContext;

/**
 * Hook to access the user practice config
 *
 * Uses userPracticeContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of userPracticeContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 */
const useUserPractice = (): UserPractice => {
  return React.useContext(userPracticeContext);
};

export default useUserPractice;
