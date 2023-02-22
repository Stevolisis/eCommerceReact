import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const customerLogin=createAsyncThunk('userAuth/customerLogin',async (data)=>{
    loading(true);
    const response=await api.post('/auth/customerLogin',data,{withCredentials:true});
    return response.data;
})

export const customerSignUp=createAsyncThunk('userAuth/customerSignUp',async (data)=>{
    loading(true);
    const response=await api.post('/auth/customerSignup',data);
    return response.data;
})

export const verifyCustomer=createAsyncThunk('userAuth/verifyCustomer',async (data)=>{
    loading(true);
    const response=await api.post('/auth/verifyCustomer',data);
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
                state.trigger=false;             
            }else if(status==='Account not verified'){
               Swal.fire(
               'Verification',
               'Account not verified',
               'warning'
            );   
            state.inview={view:'passcode',type:'static'};
            state.trigger=true;              
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
        },
        [customerSignUp.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Please verify your account',
                   'success'
               ); 
               state.inview={view:'passcode',type:'static'};
               state.trigger=true;              
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
               state.inview={view:'signin'};
               state.trigger=true;  
           }
        },
        [customerSignUp.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [verifyCustomer.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Account Verified',
                   'success'
               ); 
               state.inview={view:'signin'};
               state.trigger=true;             
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );

           }
        },
        [verifyCustomer.rejected]: (state,{error})=>{
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