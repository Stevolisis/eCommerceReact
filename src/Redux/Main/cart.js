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
    initialState,
    reducers:{
        addCartProduct:(state,{payload})=>{
            let cartIndex=state.cartItems.findIndex(item=>item._id===payload._id);
            if(cartIndex >= 0){
                state.cartItems[cartIndex].quantity += 1
            }else{
                let product = { ...payload, quantity: 1 }
                state.cartItems.push(product);
            }
        },
        clearCart:(state,{payload})=>{
            return {...state,cartItems:[]}
        }
    }
})


export const {addCartProduct, clearCart}=cartReduxSlice.actions;
export const getCartItems=(state)=>state.cartReducer.cartItems;
export default cartReduxSlice.reducer;