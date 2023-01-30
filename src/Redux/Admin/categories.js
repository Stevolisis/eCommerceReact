import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";




export const fetchCategories=createAsyncThunk('adminCategories/fetchCategories',async(limit)=>{
    loading(true)
    const response=await api.get(`categories/getcategories?limit=${limit}`)
    return response.data.data;
});

export const fetchCategory=createAsyncThunk('adminCategories/fetchCategory',async(id)=>{
    loading(true);
    const response=await api.get(`categories/getcategoryforedit/${id}`)
    return response.data.data;
});

export const addCategory=createAsyncThunk('adminCategories/addCategory',async(formData)=>{
    loading(true);
    const response=await api.post('categories/addCategory',formData);
    return response.data;
});

export const editCategory=createAsyncThunk('adminCategories/editCategory',async(formData)=>{
    loading(true);
    const response=await api.put('categories/editCategory',formData)
        return response.data;
});
export const deleteCategory=createAsyncThunk('adminCategories/deleteCategory',async(id)=>{
    loading(true)
    const response=await api.delete(`categories/deleteCategory/${id}`)
        return {response:response.data,id:id};
});




const initialState={
    categories:[],
    filterBackup:[],
    category:{}
}

const categorySlice=createSlice({
    name:'adminCategories',
    initialState,
    reducers:{
        searchCategories:(state,{payload})=>{
            return {...state,categories:[...state.filterBackup].filter(item=>item.name.toLowerCase().includes(payload.toLowerCase()))}
        },
        filterCategories:(state,{payload})=>{
            if(payload==='ascend'){                
                return {...state,categories:[...state.filterBackup].sort((a,b)=>a._id < b._id ? 1:-1)}
            }else if(payload==='descend'){
                return {...state,categories:[...state.filterBackup].sort((a,b)=>a._id < b._id ? -1:1)}
            }else if(payload==='mostProduct'){
                return {...state,categories:[...state.filterBackup].sort((a,b)=>a.products < b.products ? 1:-1)}
            }else if(payload==='active'){
                return {...state,categories:[...state.filterBackup].filter(item=>item.status==='active')}
            }else if(payload==='inactive'){
                return {...state,categories:[...state.filterBackup].filter(item=>item.status==='inactive')}
            }else{
                return;
            }
        }
    },
    extraReducers:{
        [fetchCategories.fulfilled]: (state,{payload})=>{
            loading(false)
            return {...state,categories:payload,filterBackup:payload}
        },
        [fetchCategories.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchCategory.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,category:payload}
        },
        [fetchCategory.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [addCategory.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Category Inserted Successfully',
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
        [addCategory.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [editCategory.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Category Edited Successfully',
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
        [editCategory.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [deleteCategory.fulfilled]: (state,{payload})=>{
            loading(false);
            Swal.fire(
                "Deleted!",
                'Category Delete Successful',
                'success'
            )
            console.log('shooww',{filterBackup:[...state.filterBackup].filter(item => item._id !== payload.id),categories:[...state.categories].filter(item => item._id !== payload.id)})
            return {...state,filterBackup:[...state.filterBackup].filter(item => item._id !== payload.id),categories:[...state.categories].filter(item => item._id !== payload.id)}
        },
        [deleteCategory.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})







export const {searchCategories,filterByCategory,filterCategories}=categorySlice.actions;
export const getAllCategories=(state)=>state.categoryReducer.categories;
export default categorySlice.reducer;