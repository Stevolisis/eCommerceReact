import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';
import categoryReducer from './Admin/categories';



const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer,
})

export const store=configureStore({reducer});

