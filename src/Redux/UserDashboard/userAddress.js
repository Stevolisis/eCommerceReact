import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";



export const addAddress=createAsyncThunk('address/addAddress',async (data)=>{
    loading(true);
    const response=await api.post('/users/addAddress',data,{withCredentials:true});
    return response.data;
});

export const setDefaultAddress=createAsyncThunk('address/setDefaultAdress',async (id)=>{
    loading(true);
    const response=await api.post('/users/setDefaultAdress',{id:id},{withCredentials:true});
    return response.data;
});



const addressSlice=createSlice({
    name:'address',
    initialState:{
        defaultAddress:{}
    },
    extraReducers:{
        [addAddress.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                    'Default Address!',
                    'This is set as your default address.',
                    'success'
                  )         
            }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
           }
        },[addAddress.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
    }
})



export default addressSlice.reducer;