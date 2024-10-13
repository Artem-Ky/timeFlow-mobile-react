import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EnumStatus, ITimerOptions } from './timer.interface'

const initialState: ITimerOptions = {
	isPlaying: false,
	status: EnumStatus.WORK,
	currentSession: 1,
	key: 0
}

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		completeSession: state => {
			const { currentSession, key } = state

			state.status = currentSession % 2 ? EnumStatus.REST : EnumStatus.WORK
			state.currentSession = currentSession + 1
			state.isPlaying = false
			state.key = key + 1
		},
		changeSession: (state, { payload }: PayloadAction<'prev' | 'next'>) => {
			const { currentSession, key } = state

			const isPrev = payload === 'prev'

			state.currentSession = isPrev ? currentSession - 1 : currentSession + 1
			state.key = isPrev ? key - 1 : key + 1
			state.isPlaying = false
			state.status = currentSession % 2 ? EnumStatus.REST : EnumStatus.WORK
		},
		toggle: state => {
			state.isPlaying = !state.isPlaying
		},
		completeDay: state => {
			state.status = EnumStatus.COMPLETED
		},
		reset: () => initialState
	}
})
