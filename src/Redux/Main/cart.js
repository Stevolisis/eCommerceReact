import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import uuid4 from "uuid4";



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1100,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


const initialState={
    cartId:'',
    cartItems: [],
    totalCount: 0,
    subAmount: 0,
    shipping: 0,
    totalAmount: 0
}

const cartReduxSlice=createSlice({
    name:'cartRedux',
    initialState,
    reducers:{
        addCartProduct:(state,{payload})=>{
            let cartIndex=state.cartItems.findIndex(item=>item._id===payload.product._id);
            if(!state.cartId) state.cartId=uuid4().toString().replace(/-/gi,"");
            //not creating unique cart Id Why?
            if(cartIndex >= 0){

                if(state.cartItems[cartIndex].quantity+payload.quantity>state.cartItems[cartIndex].stock){
                    Swal.fire(
                        'Limit Exceeded',
                        `product quantity is more than is in stock`,
                        'warning'
                    );

                }else {
                    state.cartItems[cartIndex].quantity += payload.quantity;
                    Toast.fire({
                        icon: 'success',
                        title: 'Product added to cart'
                    })
                }
            }else{
                let product = { ...payload.product, quantity: payload.quantity, product_details:'' }
                state.cartItems.push(product);
                Toast.fire({
                    icon: 'success',
                    title: 'Product added to cart'
                })            
            }
        },
        increment:(state,{payload})=>{
            const cartIndex=state.cartItems.findIndex(item=>item._id===payload);
            if(state.cartItems[cartIndex].quantity+1>state.cartItems[cartIndex].stock){
                Swal.fire(
                    'Limit Exceeded',
                    `product quantity is more than is in stock`,
                    'warning'
                );

            }else{
            state.cartItems[cartIndex].quantity += 1;                
            }

        },
        decrement:(state,{payload})=>{
            const cartIndex=state.cartItems.findIndex(item=>item._id===payload);
            if (state.cartItems[cartIndex].quantity < 2) {
                state.cartItems[cartIndex].quantity=1; 
            }else state.cartItems[cartIndex].quantity-=1; 
        },
        deleteCartProduct:(state,{payload})=>{
            state.cartItems=state.cartItems.filter(item=>item._id!==payload);
            Swal.fire(
                'Removed!',
                'Product removed from cart.',
                'success'
            )
        },
        getCartTotal:(state)=>{
            state.totalCount=state.cartItems.reduce((total,item)=>{return total+item.quantity},0)
            state.subAmount=state.cartItems.reduce((total,item)=>{return total+item.sale_price*item.quantity},0)
        },
        clearCart:(state)=>{
            state.cartItems=[];
        }
    }
})


export const {addCartProduct, getCartCount, increment, decrement, deleteCartProduct, clearCart, getCartTotal}=cartReduxSlice.actions;
export const getCartItems=(state)=>state.cartReducer.cartItems;
export const getCartId=(state)=>state.cartReducer.cartId;
export const getCartcount=(state)=>state.cartReducer.totalCount;
export const getSubAmount=(state)=>state.cartReducer.subAmount;
export const getTotalAmount=(state)=>state.cartReducer.totalAmount;
export const getShipping=(state)=>state.cartReducer.shipping;
export default cartReduxSlice.reducer;