import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/Users';

const rootReducer = combineReducers({ userReducer })

export const Store = createStore(rootReducer, applyMiddleware(thunk));