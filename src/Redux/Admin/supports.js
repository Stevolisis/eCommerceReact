import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";



export const fetchSupport=createAsyncThunk('adminSupports/fetchSupport',async()=>{
    loading(true);
    const response=await api.get('support/get-support')
    return response.data.data;
});


export const editSupport=createAsyncThunk('adminSupports/editSupport',async(formData)=>{
    loading(true);
    const response=await api.patch('support/edit-support',formData)
        return response.data;
});



const initialState={
    support:{}
}

const supportSlice=createSlice({
    name:'adminSupports',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchSupport.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,support:payload}
        },
        [fetchSupport.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [editSupport.fulfilled]: (state,{payload})=>{
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
        [editSupport.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})







export default supportSlice.reducer;