
import { createSlice } from "@reduxjs/toolkit";

const initialState = {events:[]}
const eventsSlice = createSlice({
    name:'eventsSlice',
    initialState,
    reducers:{
        setEvents:(state,action)=>{state.events=action.payload}
    }
})


export default eventsSlice
export const eventsAction = eventsSlice.actions