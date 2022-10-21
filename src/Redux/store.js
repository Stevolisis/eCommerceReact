import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';
import categoryReducer from './Admin/categories';
import userReducer from './Admin/users';



const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    userReducer: userReducer,
})

export const store=configureStore({reducer});

