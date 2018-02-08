import { createStore, applyMiddleware, compose } from 'redux';//compose
import reducer from '../reducer';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
// //if (process.env.NODE_ENV !== 'production') {
//   //middlewares.push(require('redux-immutable-state-invariant')());
// //}

const storeEnhancers = compose(
  applyMiddleware(...middlewares, routerMiddleware()),
  //win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);
export default createStore(reducer, {}, storeEnhancers);