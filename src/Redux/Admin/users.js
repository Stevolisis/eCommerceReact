import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";




export const fetchUsers=createAsyncThunk('adminUsers/fetchUsers',async(limit)=>{
    loading(true)
    const response=await axios.get(`${baseUrl}/users/getUsers?limit=${limit}`)
    return response.data.data;
});

export const fetchUser=createAsyncThunk('adminUsers/fetchUser',async(id)=>{
    loading(true);
    const response=await axios.get(`${baseUrl}/users/getUser/${id}`)
    return response.data.data;
});


export const editUser=createAsyncThunk('adminUsers/editUser',async(formData)=>{
    loading(true);
    const response=await axios.put(`${baseUrl}/users/editUser`,formData)
        return response.data;
});
export const deleteUser=createAsyncThunk('adminUsers/deleteUser',async(id)=>{
    loading(true)
    const response=await axios.delete(`${baseUrl}/users/deleteUser/${id}`)
        return {response:response.data,id:id};
});




const initialState={
    users:[],
    filterBackup:[],
    user:{}
}

const userSlice=createSlice({
    name:'adminUsers',
    initialState,
    reducers:{
        searchUsers:(state,{payload})=>{
            return {...state,users:[...state.filterBackup].filter(item=>item.first_name.toLowerCase().includes(payload.toLowerCase())||item.last_name.toLowerCase().includes(payload.toLowerCase()))}
        },
        filterUsers:(state,{payload})=>{
            if(payload==='ascend'){                
                return {...state,users:[...state.filterBackup].sort((a,b)=>a._id < b._id ? 1:-1)}
            }else if(payload==='descend'){
                return {...state,users:[...state.filterBackup].sort((a,b)=>a._id < b._id ? -1:1)}
            }else if(payload==='mostOrders'){
                return {...state,users:[...state.filterBackup].sort((a,b)=>a.orders.length < b.orders.length ? 1:-1)}
            }else if(payload==='mostWishlist'){
                return {...state,users:[...state.filterBackup].sort((a,b)=>a.wishlist.length < b.wishlist.length ? 1:-1)}
            }else if(payload==='verified'){
                return {...state,users:[...state.filterBackup].filter(item=>item.verified===true)}
            }else if(payload==='unverified'){
                return {...state,users:[...state.filterBackup].filter(item=>item.verified===false)}
            }else if(payload==='active'){
                return {...state,users:[...state.filterBackup].filter(item=>item.status==='active')}
            }else if(payload==='inactive'){
                return {...state,users:[...state.filterBackup].filter(item=>item.status==='inactive')}
            }else{
                return;
            }
        }
    },
    extraReducers:{
        [fetchUsers.fulfilled]: (state,{payload})=>{
            loading(false)
            return {...state,users:payload,filterBackup:payload}
        },
        [fetchUsers.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchUser.fulfilled]: (state,{payload})=>{
            loading(false);
            return {...state,user:payload}
        },
        [fetchUser.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [editUser.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(status==='success'){
                Swal.fire(
                   'Successful!',
                   'User Edited Successfully',
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
        [editUser.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [deleteUser.fulfilled]: (state,{payload})=>{
            loading(false);
            Swal.fire(
                "Deleted!",
                'User Delete Successful',
                'success'
            )
            return {...state,filterBackup:[...state.filterBackup].filter(item => item._id !== payload.id),users:[...state.users].filter(item => item._id !== payload.id)}
        },
        [deleteUser.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})







export const {searchUsers,filterUsers}=userSlice.actions;
export const getAllUsers=(state)=>state.userReducer.users;
export default userSlice.reducer;