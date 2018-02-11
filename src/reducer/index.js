import { combineReducers } from 'redux';
import repairReducer from './repair';
import checkReducer from './check';

const reducer = combineReducers({
  repairReducer,
  checkReducer
})

export default reducer;