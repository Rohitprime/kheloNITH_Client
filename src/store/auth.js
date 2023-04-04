import { createSlice } from "@reduxjs/toolkit";

const initialState = {authorize:false}
if(localStorage.getItem('token')){
    initialState.authorize=true
}

const authSlice = new createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        setAuthorizetion:(state,action)=>{state.authorize = action.payload},
    }
})

export default authSlice
export const authAction = authSlice.actions
