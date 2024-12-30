import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers'; // Ensure this path is correct
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
