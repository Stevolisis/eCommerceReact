import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[]
}

const productSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{
        loadProducts:(state,{payload})=>{
           state.products=payload;
        }
    }
})

export const {loadProducts}=productSlice.actions;
// console.log(state)
export const getAllProducts=(state)=>state.productReducer.products;
export default productSlice.reducer;