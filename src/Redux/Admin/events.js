import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";




export const fetchEvents=createAsyncThunk('adminEvents/fetchEvents',async()=>{
    loading(true)
    const response=await api.get(`events/get-events`)
    return response.data.data;
});

export const fetchEvent=createAsyncThunk('adminEvents/fetchEvent',async(id)=>{
    loading(true);
    const response=await api.get(`events/get-event/${id}`)
    return response.data.data;
});

export const addEvent=createAsyncThunk('adminEvents/addEvent',async(formData)=>{
    loading(true);
    const response=await api.post('events/add-event',formData);
    return response.data;
});

export const editEvent=createAsyncThunk('adminEvents/editEvent',async(formData)=>{
    loading(true);
    const response=await api.patch(`events/edit-event`,formData)
        return response.data;
});

export const deleteEvent=createAsyncThunk('adminEvents/deleteEvent',async(id)=>{
    loading(true)
    const response=await api.delete(`events/delete-event`,{id:id})
        return {response:response.data,id:id};
});

export const reorderEvent=createAsyncThunk('adminEvents/redorderEvent',async(order)=>{
    loading(true)
    const response=await api.post(`events/reorder-events`,{order:order})
        return response.data;
});





const initialState={
    events:[],
    filterBackup:[],
    event:{}
}

const eventSlice=createSlice({
    name:'adminEvents',
    initialState,
    extraReducers:{
        [fetchEvents.fulfilled]: (state,{payload})=>{
            loading(false)
            return {...state,events:payload,filterBackup:payload}
        },
        [fetchEvents.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchEvent.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,event:payload}
        },
        [fetchEvent.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [addEvent.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Event Inserted Successfully',
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
        [addEvent.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [editEvent.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Event Edited Successfully',
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
        [editEvent.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [deleteEvent.fulfilled]: (state,{payload})=>{
            loading(false);
            Swal.fire(
                "Deleted!",
                'Event Delete Successful',
                'success'
            )
            console.log('show',{filterBackup:[...state.filterBackup].filter(item => item.id !=='636e1d967e76a9f77911c60b')});
            
            return {...state,filterBackup:[...state.filterBackup].filter(item => item._id !== payload.id),events:[...state.events].filter(item => item._id !== payload.id)}
        },
        [deleteEvent.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [reorderEvent.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'Event Inserted Successfully',
                   'success'
               );               
           }else{
               Swal.fire(
                   'Error Occuredfg!',
                   `${payload}`,
                   'warning'
               );
               console.log(payload)
           }
        },
        [reorderEvent.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
    }

});


export const getEvents=(state)=>state.eventReducer.events;
export default eventSlice.reducer;