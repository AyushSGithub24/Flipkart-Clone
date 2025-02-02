import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import getProductReducer from './reducers/productReducer'; 
import {thunk} from 'redux-thunk'; 
const reducer = combineReducers({
    getProducts: getProductReducer
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
