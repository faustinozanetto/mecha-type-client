import { UserFilterBy } from '@generated/graphql';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import create from 'zustand';
import reducers from './reducers';

interface LeaderboardStoreState {
  leaderboardFilterBy: UserFilterBy;
  setLeaderboardFilterBy: (filterBy: UserFilterBy) => void;
}

export const useLeaderboardState = create<LeaderboardStoreState>((set) => ({
  leaderboardFilterBy: UserFilterBy.Wpm,
  setLeaderboardFilterBy: (filterBy: UserFilterBy) => set(() => ({ leaderboardFilterBy: filterBy })),
}));

export const store = createStore(reducers, {}, applyMiddleware(thunk));
