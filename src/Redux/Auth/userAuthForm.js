import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";


export const customerLogin=createAsyncThunk('userAuth/customerLogin',async (data)=>{
    loading(true);
    const response=await api.post('/auth/customerLogin',data.data,{withCredentials:true});
    return {next:data.next,data:response.data};
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


export const sendPasswordResetLink=createAsyncThunk('userAuth/sendPasswordResetLink',async (data)=>{
    loading(true);
    const response=await api.post('/auth/passwordResetLink',data,{withCredentials:true});
    return response.data;
})


export const resetPassword=createAsyncThunk('userAuth/resetPassword',async (data)=>{
    loading(true);
    const response=await api.post('/auth/resetPassword',data);
    return response.data;
})


export const customerAuthStatus=createAsyncThunk('userAuth/customerAuthStatus',async ()=>{
    loading(true);
    const response=await api.get('/auth/isCustomerAuth',{withCredentials:true});
    return response.data;
})



const userAuthSlice=createSlice({
    name:'userAuth',
    initialState:{
        trigger:false,
        inview:{view:'',type:''},
        redirectPath:''
    },
    reducers:{
        setTrigger:(state,{payload})=>{
            state.trigger=payload
        },
        setInview:(state,{payload})=>{
            state.inview={view:payload.view,type:payload.type}
        },
        setRedirectPath:(state,{payload})=>{
            state.redirectPath=payload
        }
    },
    extraReducers:{
        [customerLogin.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.data.status;
            let next=payload.next;

            if(status==='success'){
                state.redirectPath=next;             
            }else if(status==='Account not verified'){
               Swal.fire(
               'Verification',
               'Account not verified',
               'warning'
            );   
            state.redirectPath='/auth/passcode'            
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
               state.redirectPath='/auth/passcode'             
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );
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
               state.redirectPath='/auth/login'            
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
        },
        [sendPasswordResetLink.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Link sent to email',
                   'success'
               ); 
               state.redirectPath='/auth/login';           
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );

           }
        },
        [sendPasswordResetLink.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [resetPassword.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Your Password has been updated',
                   'success'
               ); 
               state.redirectPath='/'           
           }else{
               Swal.fire(
                   'Error Occured!',
                   `${status}`,
                   'warning'
               );

           }
        },
        [resetPassword.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [customerAuthStatus.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status!=='success'){
                state.inview={view:'signin'};
                state.trigger=true;     
           }
        },
        [customerAuthStatus.rejected]: (state,{error})=>{
            loading(false);
            state.inview={view:'signin'};
            state.trigger=true; 
        }
    }
})



export const{setTrigger, setInview, setRedirectPath}=userAuthSlice.actions;
export const getTrigger=(state)=>state.userAuthReducer.trigger;
export const getInview=(state)=>state.userAuthReducer.inview;
export const getRedirectPath=(state)=>state.userAuthReducer.redirectPath;
export default userAuthSlice.reducer;