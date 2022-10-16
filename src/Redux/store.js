import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';
import loaderReducer, { setLoader } from './loader';



const reducer = combineReducers({
    products: productReducer,
    loader:loaderReducer
})

export const store=configureStore({reducer});

export const loading=()=>{
    store.dispatch(setLoader());
}