import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';
import categoryReducer from './Admin/categories';
import userReducer from './Admin/users';
import eventReducer from './Admin/events';
import supportReducer from './Admin/supports';
import faqReducer from './Admin/supportFaqs';
import mainRedux from "./Main/mainRedux";
import relatedProductsReducer from "./Main/relatedProducts";
import searchResultReducer from "./Main/searchResult";
import cartReducer from "./Main/cart";



const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    userReducer: userReducer,
    eventReducer:eventReducer,
    supportReducer: supportReducer,
    faqReducer: faqReducer,
    mainReduxReducer:mainRedux,
    relatedProductsReducer:relatedProductsReducer,
    searchResultReducer:searchResultReducer,
    cartReducer:cartReducer
})

export const store=configureStore({reducer});

