
import { createSlice } from "@reduxjs/toolkit";

const initialState = {user:{},reRun:true}

const profileSlice = new createSlice({
    name:'profileSlice',
    initialState,
    reducers:{
        setUser:(state,action)=>{state.user=action.payload},
        setReRun:(state)=>{state.reRun = !state.reRun}
    }
})

export default profileSlice
export const profileAction = profileSlice.actions