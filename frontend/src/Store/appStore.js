import {configureStore} from '@reduxjs/toolkit'
import CartReducer from './CartReducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import UserReducer from './UserReducer';

const persistConfig  = {
    key : 'root',
    version : 1,
    storage
}

const reducer = combineReducers({
    cart : CartReducer,
    user : UserReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

const appStore = configureStore({
    reducer : persistedReducer
});


export default appStore;