import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

const rootReducers = combineReducers({

})

export const store = legacy_createStore(rootReducers , applyMiddleware(thunk))

