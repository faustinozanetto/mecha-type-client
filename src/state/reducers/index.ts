import { combineReducers } from 'redux';
import searchTestPresetsReducer from './search-test-presets-reducer';

const reducers = combineReducers({
  searchTestPresets: searchTestPresetsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
