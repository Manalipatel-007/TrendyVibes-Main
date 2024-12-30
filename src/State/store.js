import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { customerProducerReducer } from "./Product/Reducer";

const rootReducers = combineReducers({
    auth:authReducer,
    product: customerProducerReducer,
})


export const store = legacy_createStore(rootReducers , applyMiddleware(thunk))

