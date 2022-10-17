import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';
import categoryReducer from './Admin/categories';
import loaderReducer, { setLoader } from './loader';



const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    loaderReducer:loaderReducer
})

export const store=configureStore({reducer});

export let loading2=false;
export const loading=(status)=>{
     loading2=status;
    return loading2;
}