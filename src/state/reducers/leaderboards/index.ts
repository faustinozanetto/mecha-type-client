import { combineReducers } from 'redux';
import leaderboardsReducer from './leaderboards-reducer';

const reducers = combineReducers({
  leaderboards: leaderboardsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
