import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loading } from "../../Loaders/setMainLoader";
import api from "../../Utils/axiosConfig";
import Swal from "sweetalert2";




export const fetchSearchResult=createAsyncThunk('searchResult/fetchSearchResult',async(value)=>{
    const response=await api.get(`search/get-search-result?key=${value}`);
    return response.data.data;
})

const initialState={
    result:[],
}

const searchResultSlice=createSlice({
    name:'searchResult',
    initialState,
    extraReducers:{
        [fetchSearchResult.fulfilled]:(state,{payload})=>{
            return {...state,result:payload}
        },
        [fetchSearchResult.rejected]:(state,{error})=>{
            console.log(error)
            Swal.fire(
                "Error Occured",
                error.message,
                'error'
            )
        }
    }
})

export const getSearchResult=(state)=>state.searchResultReducer.result;
export default searchResultSlice.reducer;