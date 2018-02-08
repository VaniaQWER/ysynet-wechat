import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import repairReducer from './repair'

const reducer = combineReducers({
  routerReducer, repairReducer
})

export default reducer;