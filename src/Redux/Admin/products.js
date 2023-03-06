import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const fetchProducts=createAsyncThunk('adminProducts/fetchProducts',async(limit)=>{
    loading(true);
    const response=await api.get(`products/getProducts?limit=${limit}`)
    return response.data.data;
});

export const fetchProduct=createAsyncThunk('adminProducts/fetchProduct',async(id)=>{
    loading(true);
    const response=await api.get(`products/getproductforedit/${id}`)
    return response.data.data;
});

export const addProduct=createAsyncThunk('adminProducts/addProducts',async(formData)=>{
    loading(true);
    const response=await api.post('products/addproduct',formData);
    return response.data;
});

export const editProduct=createAsyncThunk('adminProducts/editProduct',async(formData)=>{
    loading(true);
    const response=await api.patch('products/editproduct',formData)
        return response.data;
});

export const deleteProduct=createAsyncThunk('adminProducts/deleteProduct',async(id)=>{
    loading(true);
    const response=await api.delete(`products/deleteProduct/${id}`)
        return {data:response.data,id:id}
});




const initialState={
    products:[],
    filterBackup:[],
    product:{}
}

const productSlice=createSlice({
    name:'adminProducts',
    initialState,
    reducers:{
        searchProducts:(state,{payload})=>{
            return {...state,products:[...state.filterBackup].filter(item=>item.name.toLowerCase().includes(payload.toLowerCase()))}
        },
        filterByCategory:(state,{payload})=>{
            if(payload==='all'){
               state.products=state.filterBackup;
            }else{
                let searchData=payload.split(',');
                return {...state,products:[...state.filterBackup].filter(item=>item.category.some(arr=>searchData.includes(arr.name)))}

            }
        },
        filterProducts:(state,{payload})=>{
            if(payload==='ascend'){                
                return {...state,products:[...state.filterBackup].sort((a,b)=>a._id < b._id ? 1:-1)}
            }else if(payload==='descend'){
                return {...state,products:[...state.filterBackup].sort((a,b)=>a._id < b._id ? -1:1)}
            }else if(payload==='mostSold'){
                return {...state,products:[...state.filterBackup].sort((a,b)=>a.sold < b.sold ? 1:-1)}
            }else if(payload==='hPrice'){
                return {...state,products:[...state.filterBackup].sort((a,b)=>a.sale_price < b.sale_price ? 1:-1)}
            }else if(payload==='lPrice'){
                return {...state,products:[...state.filterBackup].sort((a,b)=>a.sale_price < b.sale_price ? -1:1)}
            }else if(payload==='active'){
                return {...state,products:[...state.filterBackup].filter(item=>item.status==='active')}
            }else if(payload==='inactive'){
                return {...state,products:[...state.filterBackup].filter(item=>item.status==='inactive')}
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
        [fetchProduct.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,product:payload}
        },
        [fetchProduct.rejected]: (state,{error})=>{
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
        [editProduct.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Product Edited Successfully',
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
        [editProduct.rejected]: (state,{error})=>{
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
            return {...state,filterBackup:[...state.filterBackup].filter(item => item._id !== payload.id),products:[...state.products].filter(item => item._id !== payload.id)}
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