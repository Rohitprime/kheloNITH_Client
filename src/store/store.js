import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth'
import eventsSlice from './event'
import notificationSlice from './notfications'
import profileSlice from './profile'
import sportsSlice from './sports'

const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        notification:notificationSlice.reducer,
        profile:profileSlice.reducer,
        teams:sportsSlice.reducer,
        events:eventsSlice.reducer,
    }
})


export default store