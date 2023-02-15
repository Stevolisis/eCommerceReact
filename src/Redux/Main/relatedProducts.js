import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";
import Swal from "sweetalert2";




export const fetchProducts=createAsyncThunk('relatedProducts/fetchProducts',async(category)=>{
    loading(true)
    const response=await api.post(`products/get-related-products?category`,{category:category,limit:20});
    return response.data.data;
})

const initialState={
    products:[],
}

const relatedProductsSlice=createSlice({
    name:'relatedProducts',
    initialState,
    extraReducers:{
        [fetchProducts.fulfilled]:(state,{payload})=>{
            loading(false)
            return {...state,products:payload}
        },
        [fetchProducts.rejected]:(state,{error})=>{
            loading(false)
            console.log(error)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})

export const getRelProducts=(state)=>state.relatedProductsReducer.products;
export default relatedProductsSlice.reducer;