import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';

export const store=configureStore({
    reducer:{productReducer}
});