import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/leaderboards/leaderboards-reducer';

export const initStore = (initialState: any) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};
