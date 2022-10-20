import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import Swal from "sweetalert2";
import { loading, store } from "../store";
import { setLoader } from "../loader";



export const fetchCategories=createAsyncThunk('adminCategories/fetchCategories',async(limit)=>{
    // store.dispatch(setLoader(true));
    const response=await axios.get(`${baseUrl}/categories/getcategories?limit=${limit}`)
    return response.data.data;
});

export const deleteCategory=createAsyncThunk('adminCategories/deleteCategories',async(id)=>{
    const response=await axios.delete(`${baseUrl}/categories/deleteCategory/${id}`)
        return {response:response.data,id:id};
});




const initialState={
    categories:[],
    filterBackups:[]
}

const categorySlice=createSlice({
    name:'adminCategories',
    initialState,
    reducers:{
        searchCategories:(state,{payload})=>{
            return {...state,categories:{...state.categories,data:[...state.filterBackups.data].filter(item=>item.name.toLowerCase().includes(payload.toLowerCase()))}}
        },
        filterByCategory:(state,{payload})=>{
            if(payload==='all'){
               state.categories=state.filterBackups;
            }else{
                let searchData=payload.split(',');
                return {...state,categories:{...state.categories,data:[...state.filterBackups.data].filter(item=>item.category.some(arr=>searchData.includes(arr.name)))}}

            }
        },
        filterCategories:(state,{payload})=>{
            if(payload==='ascend'){
                
                return {...state,categories:{...state.categories,data:[...state.filterBackups.data].sort((a,b)=>a._id < b._id ? 1:-1)}}
            }else if(payload==='descend'){
                return {...state,categories:{...state.categories,data:[...state.filterBackups.data].sort((a,b)=>a._id < b._id ? -1:1)}}
            }else if(payload==='mostSold'){
                return {...state,categories:{...state.categories,data:[...state.filterBackups.data].sort((a,b)=>a.sold < b.sold ? 1:-1)}}
            }else if(payload==='hPrice'){
                return {...state,categories:{...state.categories,data:[...state.filterBackups.data].sort((a,b)=>a.sale_price < b.sale_price ? 1:-1)}}
            }else if(payload==='lPrice'){
                return {...state,categories:{...state.categories,data:[...state.filterBackups.data].sort((a,b)=>a.sale_price < b.sale_price ? -1:1)}}
            }else{
                return;
            }
        }
    },
    extraReducers:{
        [fetchCategories.fulfilled]: (state,{payload})=>{
            return {...state,categories:payload,filterBackups:payload}
        },
        [fetchCategories.rejected]: (state,{error})=>{
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [deleteCategory.fulfilled]: (state,{payload})=>{
            Swal.fire(
                "Deleted!",
                'Producted Delete Successful',
                'success'
            )
            state.categories=state.categories.filter(item => item.id !== payload.id)
            state.filterBackups=state.filterBackups.filter(item => item.id !== payload.id)
        },
        [deleteCategory.rejected]: (state,{error})=>{
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})







export const {searchCategories,filterByCategory,filterCategories}=categorySlice.actions;
export const getAllcategories=(state)=>state.categoryReducer.categories;
export default categorySlice.reducer;