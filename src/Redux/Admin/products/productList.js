import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { baseUrl } from "../../../Utils/baseUrl";
import { setAlert } from "../../swalNotify";


export const fetchProducts=createAsyncThunk('adminProducts/fetchProducts',async(limit)=>{
    const response=await axios.get(`${baseUrl}/products/getProducts?limit=${limit}`)
        return response.data;
});

export const deleteProduct=createAsyncThunk('adminProducts/deleteProduct',async(id)=>{
  
    const response=await axios.delete(`${baseUrl}/products/deleteProduct/${id}`)
        return response.data;
});





const initialState={
    products:{},
    filterBackup:{}
}

const productSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{
        filterProducts:(state,{payload})=>{
            return {...state,products:{...state.products,['data']:[...state.filterBackup.data].filter(item=>item.name.toLowerCase().includes(payload.toLowerCase()))}}
        },
        filterByCategory:(state,{payload})=>{
            console.log(payload)
            if(payload==='all'){
               state.products=state.filterBackup;
            }else{
                let searchData=payload.split(',');
                return {...state,products:{...state.products,['data']:[...state.filterBackup.data].filter(item=>item.category.some(arr=>searchData.includes(arr.name)))}}

            }
        }
    },
    extraReducers:{
        [fetchProducts.fulfilled]: (state,{payload})=>{
            return {...state,products:payload,filterBackup:payload}
        },
        [deleteProduct.fulfilled]: ()=>{
            return fetchProducts(10);
        }
    }
})







export const {filterProducts,filterByCategory}=productSlice.actions;
export const getAllProducts=(state)=>state.productReducer.products;
export default productSlice.reducer;