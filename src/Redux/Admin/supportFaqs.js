import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";




export const fetchFaqs=createAsyncThunk('adminFaqs/fetchFaqs',async(limit)=>{
    loading(true)
    const response=await axios.get(`${baseUrl}/faqs/getfaqs?limit=${limit}`)
    return response.data.data;
});

export const fetchFaq=createAsyncThunk('adminFaqs/fetchFaq',async(id)=>{
    loading(true);
    const response=await axios.get(`${baseUrl}/faqs/getfaqforedit/${id}`)
    return response.data.data;
});

export const addFaq=createAsyncThunk('adminFaqs/addFaq',async(formData)=>{
    loading(true);
    const response=await axios.post(`${baseUrl}/faqs/addFaq`,formData);
    return response.data;
});

export const editFaq=createAsyncThunk('adminFaqs/editFaq',async(formData)=>{
    loading(true);
    const response=await axios.put(`${baseUrl}/faqs/editFaq`,formData)
        return response.data;
});
export const deleteFaq=createAsyncThunk('adminFaqs/deleteFaq',async(id)=>{
    loading(true)
    const response=await axios.delete(`${baseUrl}/faqs/deleteFaq/${id}`)
        return {response:response.data,id:id};
});




const initialState={
    faqs:[],
    faq:{}
}

const faqSlice=createSlice({
    name:'adminFaqs',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchFaqs.fulfilled]: (state,{payload})=>{
            loading(false)
            return {...state,faqs:payload}
        },
        [fetchFaqs.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchFaq.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,faq:payload}
        },
        [fetchFaq.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [addFaq.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'F.A.Q Inserted Successfully',
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
        [addFaq.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [editFaq.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'F.A.Q Edited Successfully',
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
        [editFaq.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [deleteFaq.fulfilled]: (state,{payload})=>{
            loading(false);
            Swal.fire(
                "Deleted!",
                'F.A.Q Delete Successful',
                'success'
            )
            return {...state,filterBackup:[...state.filterBackup].filter(item => item._id !== payload.id),faqs:[...state.faqs].filter(item => item._id !== payload.id)}
        },
        [deleteFaq.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})







export const getAllfaqs=(state)=>state.faqReducer.faqs;
export default faqSlice.reducer;