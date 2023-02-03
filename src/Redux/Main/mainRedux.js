import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";




export const fetchEvents=createAsyncThunk('mainRedux/fetchEvents',async()=>{
    loading(true)
    const response=await api.get(`events/get-events2`)
    return response.data.data;
});

export const fetchEvent=createAsyncThunk('mainRedux/fetchEvent',async(slug)=>{
    loading(true);
    const response=await api.get(`events/get-event-bySlug/${slug}`)
    return response.data;
});

export const fetchCategory=createAsyncThunk('mainRedux/fetchCategory',async(slug)=>{
    loading(true);
    const response=await api.get(`categories/getcategory/${slug}`)
    return response.data;
});

export const fetchProduct=createAsyncThunk('mainRedux/fetchProduct',async(slug)=>{
    loading(true);
    const response=await api.get(`products/getProduct/${slug}`)
    return response.data;
});






const initialState={
    events:[],
    category:{},
    product:{},
    productsListing:[],
    filterBackup:[]
}

const mainReduxSlice=createSlice({
    name:'mainRedux',
    initialState,
    reducers:{
        filterProducts:(state,{payload})=>{
            if(payload==='popularity'){
                return {...state,productsListing:[...state.filterBackup].sort((a,b)=>a.sold < b.sold ? 1:-1)}
            }else if(payload==='new in'){
                return {...state,productsListing:[...state.filterBackup].sort((a,b)=>a.createdAt < b.createdAt ? -1:1)}
            }else if(payload==='rating'){
                return {...state,productsListing:[...state.filterBackup].sort((a,b)=>a.rating < b.rating ? -1:1)}
            }else if(payload==='lowest price'){
                return {...state,productsListing:[...state.filterBackup].sort((a,b)=>a.sale_price < b.sale_price ? -1:1)}
            }else if(payload==='highest price'){
                return {...state,productsListing:[...state.filterBackup].sort((a,b)=>a.sale_price < b.sale_price ? 1:-1)}
            }else{
                return;
            }
        },
        priceRange:(state,{payload})=>{
            console.log('priceRange',payload);
            let min=payload.split('***')[0];
            let max=payload.split('***')[1];
            return {...state,productsListing:[...state.filterBackup].filter(product=>product.sale_price>=min&&product.sale_price<=max)}
        },
        filterRatings:(state,{payload})=>{
                return {...state,productsListing:[...state.filterBackup].filter(product=>product.rating===parseInt(payload))}
        }
    },
    extraReducers:{
        [fetchEvents.fulfilled]: (state,{payload})=>{
            loading(false)
            return {...state,events:payload}
        },
        [fetchEvents.rejected]: (state,{error})=>{
            loading(false)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchCategory.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;
            let data=payload.data;

            if(status!=='success' || data==null){
                Swal.fire(
                    'Error Occured!',
                    `${status}`,
                    'warning'
                );
            }

            return {...state,category:payload.data,productsListing:payload.data.products,filterBackup:payload.data.products}
        },
        [fetchCategory.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchEvent.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;
            let data=payload.data;

            if(status!=='success' || data==null){
                Swal.fire(
                    'Error Occured!',
                    `${status}`,
                    'warning'
                );
            }

            return {...state,category:payload.data,productsListing:payload.data.product_component.products,filterBackup:payload.data.product_component.products}
        },
        [fetchEvent.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
        [fetchProduct.fulfilled]: (state,{payload})=>{
            loading(false);
            let status=payload.status;
            let data=payload.data;

            if(status!=='success' || data==null){
                Swal.fire(
                    'Error Occured!',
                    `${status}`,
                    'warning'
                );
            }

            return {...state,product:payload.data}
        },
        [fetchProduct.rejected]: (state,{error})=>{
            loading(false);
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        },
    }
})







export const {filterProducts,priceRange,filterRatings}=mainReduxSlice.actions;
export const getEvents=(state)=>state.mainReduxReducer.events;
export const getProducts=(state)=>state.mainReduxReducer.productsListing;
export const getCategory=(state)=>state.mainReduxReducer.category;
export const getProduct=(state)=>state.mainReduxReducer.product;
export default mainReduxSlice.reducer;