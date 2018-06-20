import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
