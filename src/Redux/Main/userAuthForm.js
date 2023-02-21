import { createSlice } from "@reduxjs/toolkit";




const userAuthSlice=createSlice({
    name:'userAuth',
    initialState:{
        trigger:false,
        inview:''
    },
    reducers:{
        setTrigger:(state,{payload})=>{
            state.trigger=payload
        },
        setInview:(state,{payload})=>{
            state.inview=payload
        }
    }
})



export const{setTrigger, setInview}=userAuthSlice.actions;
export const getTrigger=(state)=>state.userAuthReducer.trigger;
export const getInview=(state)=>state.userAuthReducer.inview;
export default userAuthSlice.reducer;