import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";


export const fetchProducts=createAsyncThunk('adminProducts/fetchProducts',async(limit)=>{
    loading(true);
    const response=await axios.get(`${baseUrl}/products/getProducts?limit=${limit}`)
    return response.data;
});

export const addProduct=createAsyncThunk('adminProducts/fetchProducts',async(formData)=>{
    loading(true);
    const response=await axios.post(`${baseUrl}/products/addproduct`,formData);
    return response.data;
});

export const deleteProduct=createAsyncThunk('adminProducts/deleteProduct',async(id)=>{
    loading(true);
    const response=await axios.delete(`${baseUrl}/products/deleteProduct/${id}`)
        return {response:response.data,id:id};
});




const initialState={
    products:{},
    filterBackup:{}
}

const productSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{
        searchProducts:(state,{payload})=>{
            return {...state,products:{...state.products,data:[...state.filterBackup.data].filter(item=>item.name.toLowerCase().includes(payload.toLowerCase()))}}
        },
        filterByCategory:(state,{payload})=>{
            if(payload==='all'){
               state.products=state.filterBackup;
            }else{
                let searchData=payload.split(',');
                return {...state,products:{...state.products,data:[...state.filterBackup.data].filter(item=>item.category.some(arr=>searchData.includes(arr.name)))}}

            }
        },
        filterProducts:(state,{payload})=>{
            if(payload==='ascend'){                
                return {...state,products:{...state.products,data:[...state.filterBackup.data].sort((a,b)=>a._id < b._id ? 1:-1)}}
            }else if(payload==='descend'){
                return {...state,products:{...state.products,data:[...state.filterBackup.data].sort((a,b)=>a._id < b._id ? -1:1)}}
            }else if(payload==='mostSold'){
                return {...state,products:{...state.products,data:[...state.filterBackup.data].sort((a,b)=>a.sold < b.sold ? 1:-1)}}
            }else if(payload==='hPrice'){
                return {...state,products:{...state.products,data:[...state.filterBackup.data].sort((a,b)=>a.sale_price < b.sale_price ? 1:-1)}}
            }else if(payload==='lPrice'){
                return {...state,products:{...state.products,data:[...state.filterBackup.data].sort((a,b)=>a.sale_price < b.sale_price ? -1:1)}}
            }else{
                return;
            }
        }
    },
    extraReducers:{
        [fetchProducts.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,products:payload,filterBackup:payload}
        },
        [fetchProducts.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [addProduct.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Product Inserted Successfully',
                   'success'
               );               
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
           }
        },
        [addProduct.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [deleteProduct.fulfilled]: (state,{payload})=>{
            loading(false);
            Swal.fire(
                "Deleted!",
                'Producted Delete Successful',
                'success'
            )
            state.products=state.products.filter(item => item.id !== payload.id)
            state.filterBackup=state.filterBackup.filter(item => item.id !== payload.id)
        },
        [deleteProduct.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})







export const {searchProducts,filterByCategory,filterProducts}=productSlice.actions;
export const getAllProducts=(state)=>state.productReducer.products;
export default productSlice.reducer;