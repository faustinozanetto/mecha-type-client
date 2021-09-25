import { LeaderboardStateType } from '../leaderboards-reducer';

export const wpm = (state: LeaderboardStateType): LeaderboardStateType => {
  let { users } = state;

  return {
    ...state,
  };
};
