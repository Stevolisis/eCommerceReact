import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const getOrder=createAsyncThunk('orders/getOrder',async(id)=>{
    loading(true);
    const response=await api.get(`order/getOrder/${id}`,{withCredentials:true});
    return response.data;
});

export const placeOrder=createAsyncThunk('orders/placeOrder',async(formData)=>{
    loading(true);
    const response=await api.post('order/placeOrder',formData,{withCredentials:true});
    return response.data;
});

export const completeOrder=createAsyncThunk('orders/completeOrder',async({id,payment_gateway,delivery_note})=>{
    loading(true);
    console.log(id,payment_gateway)
    const response=await api.post('order/completeOrder',{orderId:id,payment_gateway:payment_gateway,delivery_note:delivery_note},{withCredentials:true});
    return response.data;
});

export const verifyOrder=createAsyncThunk('orders/verifyOrder',async(res)=>{
    loading(true);
    const response=await api.post('order/verifyOrder',{tx_ref:res.tx_ref,status:res.status,transaction_id:res.transaction_id},{withCredentials:true});
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
        [completeOrder.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                    'Order Completed!!',
                    `${status}`,
                    'warning'
                );                          
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
           }
        },
        [completeOrder.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        // [completeOrder.fulfilled]: (state,{payload})=>{
        //     loading(false);
        //     let status=payload.status;

        //     if(status!=='success'){
        //        Swal.fire(
        //            'Error Occured!',
        //            `${status}`,
        //            'warning'
        //        );
        //    }
        // },
        // [completeOrder.rejected]: (state,{error})=>{
        //     loading(false);
        //     Swal.fire(
        //         "Error Occured",
        //         error.message,
        //         'error'
        //     )
        // },
        [verifyOrder.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                    'Order Completed!!',
                    `${status}`,
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
        [verifyOrder.rejected]: (state,{error})=>{
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