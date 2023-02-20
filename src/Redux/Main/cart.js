import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";






const initialState={
    products_in_cart:[],
}

const cartReduxSlice=createSlice({
    name:'cartRedux',
    initialState
})



export const getProducts_in_cart=(state)=>state.cartReducer.products_in_cart;
export default cartReduxSlice.reducer;