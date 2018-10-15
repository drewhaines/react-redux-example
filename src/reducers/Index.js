import {combineReducers} from 'redux';
import userReducer from './User';
import bookReducer from './Book';

export const allReducers = combineReducers({
  user: userReducer,
  book: bookReducer
});

export default allReducers;
