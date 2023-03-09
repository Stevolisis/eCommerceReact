import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const placeOrder=createAsyncThunk('adminCategories/addCategory',async(formData)=>{
    loading(true);
    const response=await api.post('users/placeOrder',formData,{withCredentials:true});
    return response.data;
});



const orderSlice=createSlice({
    name:'orders',
    initialState:{
        orders:[],
        filterBackup:[],
        order:{}
    },
});


export default orderSlice.reducer;