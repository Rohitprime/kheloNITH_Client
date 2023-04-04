
import { createSlice } from "@reduxjs/toolkit";

const initialState = {available:false,type:'',message:'',functioning:false,functionMessage:''}

const notificationSlice = new createSlice({
    name:'notificationBar',
    initialState,
    reducers:{
        setNotification:(state,action)=>{
            state.available=true,
            state.type=action.payload.type,
            state.message=action.payload.message
        },
        setNotiToFalse:(state)=>{
            state.available=false
        },
        setFunction:(state,action)=>{
          state.functioning=true,
          state.functionMessage =action.payload.functionMessage
        },
        setDontFunction:(state)=>{
            state.functioning=false
        }

    }
})

export default notificationSlice
export const notificationAction = notificationSlice.actions