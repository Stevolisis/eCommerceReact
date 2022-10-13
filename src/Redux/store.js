import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products/productList';
import swalNotifyReducer from './swalNotify';

export const store=configureStore({
    reducer:{productReducer,swalNotifyReducer}
});