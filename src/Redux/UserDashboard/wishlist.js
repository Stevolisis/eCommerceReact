import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";




export const fetchWishlists=createAsyncThunk('wishlist/fetchWishlists',async()=>{
    loading(true);
    const response=await api.get('/users/getWishlists',{withCredentials:true});
    return response.data;
});

export const fetchWishlist=createAsyncThunk('wishlist/fetchWishlist',async(id)=>{
    loading(true);
    const response=await api.get(`/users/getWishlist/${id}`,{withCredentials:true});
    return response.data;
});

export const addWishlist=createAsyncThunk('wishlist/addWishlist',async(data)=>{
    loading(true);
    const response=await api.post('/users/addWishlist',data,{withCredentials:true});
    return response.data;
});


export const removeWishlist=createAsyncThunk('wishlist/deleteWishlist',async(id)=>{
    loading(true);
    const response=await api.get(`/users/deleteWishlist/${id}`,{withCredentials:true});
    return {id:id,data:response.data};
})



const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1100,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})






const wishlistSlice=createSlice({
    name:'wishlist',
    initialState:{
        wishlists:[],
        wishlist:{}
    },
    extraReducers:{
        [fetchWishlists.fulfilled]:(state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(state==='success'){
                let data=payload.data;
                state.wishlists=data;
            }
        },[fetchWishlists.rejected]:(state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchWishlist.fulfilled]:(state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(state==='success'){
                let data=payload.data.wishlist[0];
                state.wishlist=data;
            }
        },[fetchWishlist.rejected]:(state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [addWishlist.fulfilled]:(state,{payload})=>{
            loading(false);
            let status=payload.status;

            if(state==='success'){
                let data=payload.data;
                state.wishlists=data;
                Toast.fire({
                    icon: 'success',
                    title: 'Product added to your wishlist'
                })
            }
        },[addWishlist.rejected]:(state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [removeWishlist.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.data.status;
            let id=payload.id;

            if(status==='success'){
                Toast.fire({
                    icon: 'success',
                    title: 'Product removed from your wishlist'
                })
                return {...state,wishlists:[...state.wishlists].filter(item => item._id !== id)}   
            }
            
        },[removeWishlist.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        
        
        }
    }
});





export default wishlistSlice.reducer;