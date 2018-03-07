import { combineReducers } from 'redux';
import repairReducer from './repair';
import checkReducer from './check';
import userReducer from './user';
import menuReducer from './menu';
import checkParmasReducer from './checkParmas';
import partsReducer from './parts';
import sessionReducer from './session';
const reducer = combineReducers({
  repairReducer,
  checkReducer,
  userReducer,
  menuReducer,
  checkParmasReducer,
  partsReducer,
  sessionReducer
})

export default reducer;