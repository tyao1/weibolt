import { combineReducers } from 'redux';
import todos from './todos';
import followers from './followers';

export default combineReducers({
  todos,
  followers,
});
