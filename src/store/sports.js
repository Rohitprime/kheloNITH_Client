import { createSlice } from "@reduxjs/toolkit";

const initialState = {sportsTeams:[]}

const sportsSlice = new createSlice({
    name:'sportsSlice',
    initialState,
    reducers:{
        setSportsTeams:(state,action)=>{ state.sportsTeams=action.payload}
    }
})

export default sportsSlice
export const sportsAction = sportsSlice.actions 