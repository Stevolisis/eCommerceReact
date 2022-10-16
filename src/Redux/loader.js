import { createSlice } from "@reduxjs/toolkit";


const initialState={
    loaderStatus:true,
}

const loaderSlice=createSlice({
    name:'loader',
    initialState,
    reducers:{
    setLoader:(state,{payload})=>{
        state.loaderStatus=payload;
    },
    }
})







export const {setLoader}=loaderSlice.actions;
export default loaderSlice.reducer;