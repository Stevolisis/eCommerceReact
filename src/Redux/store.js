import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from './Admin/products';
import categoryReducer from './Admin/categories';
import userReducer from './Admin/users';
import eventReducer from './Admin/events';
import supportReducer from './Admin/supports';
import faqReducer from './Admin/supportFaqs';
import mainRedux from "./Main/mainRedux";



const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    userReducer: userReducer,
    eventReducer:eventReducer,
    supportReducer: supportReducer,
    faqReducer: faqReducer,
    mainReduxReducer:mainRedux
})

export const store=configureStore({reducer});

