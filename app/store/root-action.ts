import * as authActions from './auth/auth.actions'
import { timerSlice } from './timer/timer.slice'

const taxiActions = timerSlice.actions

export const rootAction = {
	...authActions,
	...taxiActions
}
