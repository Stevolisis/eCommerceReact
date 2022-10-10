import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products/productList';

export const store=configureStore({
    reducer:{productReducer}
});