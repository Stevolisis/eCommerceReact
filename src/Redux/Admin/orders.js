import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const getOrder=createAsyncThunk('orders/placeOrder',async(id)=>{
    loading(true);
    const response=await api.get(`users/getOrder/${id}`,{withCredentials:true});
    return response.data;
});

export const placeOrder=createAsyncThunk('orders/placeOrder',async(formData)=>{
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
    extraReducers:{
        [getOrder.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;
            let order=payload.data;

            if(status==='success'){
               state.order=order;            
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
           }
        },
        [getOrder.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
    }
});


export const orderDetails=(state)=>state.orderReducer.order;
export default orderSlice.reducer;