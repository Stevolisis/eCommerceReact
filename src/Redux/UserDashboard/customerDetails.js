import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";
import { setRedirectPath } from "../Auth/userAuthForm";



export const getCustomer=createAsyncThunk('userAuth/getCustomer',async ()=>{
    loading(true);
    const response=await api.get('/users/getCustomer',{withCredentials:true});
    return response.data;
})



const customerSlice=createSlice({
    name:'customer',
    initialState:{
        customer:{}
    },
    extraReducers:{
        [getCustomer.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                state.customer=payload.data;
           }else{
               setRedirectPath('/login')
           }
        },[getCustomer.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
    }
})



export const getCustomerdetails=(state)=>state.customerReducer.customer;
export default customerSlice.reducer;