import { combineReducers } from 'redux';
import todos from './todos';
import followers from './followers';
import settings from './settings';

export default combineReducers({
  todos,
  followers,
  settings,
});
