import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";






const initialState={
    cartItems: [],
    totalCount: 0,
    tax: 0,
    subAmount: 0,
    totalAmount: 0
}

const cartReduxSlice=createSlice({
    name:'cartRedux',
    initialState
})



export const getCartItems=(state)=>state.cartReducer.cartItems;
export default cartReduxSlice.reducer;