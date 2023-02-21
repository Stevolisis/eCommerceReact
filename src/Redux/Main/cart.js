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
            let cartIndex=state.cartItems.findIndex(item=>item._id===payload.product._id);
            if(cartIndex >= 0){
                console.log(state.cartItems[cartIndex].quantity+payload.quantity>state.cartItems[cartIndex].stock)
                if(state.cartItems[cartIndex].quantity+payload.quantity>state.cartItems[cartIndex].stock){
                    Swal.fire(
                        'Limit Exceeded',
                        `product quantity is more than is in stock`,
                        'warning'
                    );
                    alert('Limit Exceeded')

                }else state.cartItems[cartIndex].quantity += payload.quantity;
                
            }else{
                let product = { ...payload.product, quantity: payload.quantity }
                state.cartItems.push(product);
            }
        },
        clearCart:(state)=>{
            return {...state,cartItems:[]}
        }
    }
})


export const {addCartProduct, clearCart}=cartReduxSlice.actions;
export const getCartItems=(state)=>state.cartReducer.cartItems;
export default cartReduxSlice.reducer;