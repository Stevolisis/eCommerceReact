import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import productReducer from './Admin/products';
import categoryReducer from './Admin/categories';
import userReducer from './Admin/users';
import eventReducer from './Admin/events';
import supportReducer from './Admin/supports';
import faqReducer from './Admin/supportFaqs';
import orderReducer from "./Admin/orders";
import mainRedux from "./Main/mainRedux";
import relatedProductsReducer from "./Main/relatedProducts";
import searchResultReducer from "./Main/searchResult";
import cartReducer from "./Main/cart";
import userAuthReducer from "./Auth/userAuthForm";
import customerReducer from "./UserDashboard/customerDetails";
import addressReducer from "./UserDashboard/userAddress";
import wishlistReducer from "./UserDashboard/wishlist";


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist:['cartReducer']
  }
  
const reducer = combineReducers({
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    userReducer: userReducer,
    eventReducer:eventReducer,
    supportReducer: supportReducer,
    faqReducer: faqReducer,
    orderReducer: orderReducer,
    mainReduxReducer:mainRedux,
    relatedProductsReducer:relatedProductsReducer,
    searchResultReducer:searchResultReducer,
    cartReducer:cartReducer,
    userAuthReducer:userAuthReducer,
    customerReducer:customerReducer,
    addressReducer:addressReducer,
    wishlistReducer:wishlistReducer,
})


const persistedReducer = persistReducer(persistConfig, reducer);
export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

