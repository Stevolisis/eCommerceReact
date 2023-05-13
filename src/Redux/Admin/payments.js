import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const editPayments=createAsyncThunk('orders/placeOrder',async(data)=>{
    loading(true);
    console.log('data',data)
    const response=await api.patch('payments/edit_payment_methods',data,{withCredentials:true});
    return response.data;
});

const paymentSlice=createSlice({
    name:'payments',
    initialState:{
        payment_methods:[],
        method:{}
    },
    extraReducers:{
        [editPayments.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status!=='success'){
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
           }
        },
        [editPayments.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
    }
});





export default paymentSlice.reducer;