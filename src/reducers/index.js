import { combineReducers } from 'redux';
import { authReducer } from '../State/Auth/Reducer'; // Ensure this path is correct

const rootReducer = combineReducers({
  auth: authReducer,
  // ...other reducers
});

export default rootReducer;
