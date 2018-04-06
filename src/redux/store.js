import { createStore as _createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducer from './modules';

export default function createStore(history, data) {
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [thunkMiddleware, reduxRouterMiddleware];

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);
  const store = finalCreateStore(reducer, data);

  return store;
}
