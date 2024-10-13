import { combineReducers } from '@reduxjs/toolkit'

import { authSlice } from '@/store/auth/auth.slice'
import { timerSlice } from '@/store/timer/timer.slice'

export const rootReducer = combineReducers({
	auth: authSlice.reducer,
	timer: timerSlice.reducer
})
