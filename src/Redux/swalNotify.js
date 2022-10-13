import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./Admin/products/productList";


const initialState={
    confirmStatus:{},
    confirmState:false,
    alertStatus:{},
    topCornerStatus:{}
}

// const rel=fetchProducts;


const swalNotify=createSlice({
    name:'swalNotify',
    initialState,
    reducers:{
        setAlert:(state,{payload})=>{
            state.alertStatus=payload;
            console.log(state)
            // console.log('pppp',rel)
        }
    }
});



// const setConfirm=(state)=>state.productReducer.products;
// const setAlert=(state)=>state.productReducer.products;
// const setCornerAlert=(state)=>state.productReducer.products;

export const {setAlert}=swalNotify.actions;
export default swalNotify.reducer;