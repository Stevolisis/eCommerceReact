import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const getAddresses=createAsyncThunk('address/getAddresses',async ()=>{
    loading(true);
    const response=await api.get('/users/getAddresses',{withCredentials:true});
    return response.data;
});

export const getAddress=createAsyncThunk('address/getAddress',async (id)=>{
    loading(true);
    const response=await api.get(`/users/getAddress/${id}`,{withCredentials:true});
    return response.data;
});

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
        addresses:[],
        address:{}
    },
    extraReducers:{
        [getAddresses.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                let data=payload.data.addresses;
                state.addresses=data;        
            }
            
        },[getAddresses.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [getAddress.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                let data=payload.data.addresses[0];
                state.address=data;        
            }
            
        },[getAddress.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [addAddress.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                    'Successful',
                    'Address Added',
                    'success'
                  )         
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



export const fetchAddresses=(state)=>state.addressReducer.addresses;
export const fetchAddress=(state)=>state.addressReducer.address;
export default addressSlice.reducer;