import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const customerLogin=createAsyncThunk('userAuth/customerLogin',async (data)=>{
    loading(true);
    const response=api.post('/auth/customerLogin',data,{withCredentials:true});
    return response.data;
})

const userAuthSlice=createSlice({
    name:'userAuth',
    initialState:{
        trigger:false,
        inview:{view:'',type:''}
    },
    reducers:{
        setTrigger:(state,{payload})=>{
            state.trigger=payload
        },
        setInview:(state,{payload})=>{
            state.inview={view:payload.view,type:payload.type}
        }
    },
    extraReducers:{
        [customerLogin.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Supports Edited Successfully',
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
        [customerLogin.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})



export const{setTrigger, setInview}=userAuthSlice.actions;
export const getTrigger=(state)=>state.userAuthReducer.trigger;
export const getInview=(state)=>state.userAuthReducer.inview;
export default userAuthSlice.reducer;