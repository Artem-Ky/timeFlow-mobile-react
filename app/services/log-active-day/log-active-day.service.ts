import instance from '@/services/api/interceptors'

import { IStatisticsResponse } from './log-active-day.interface'

export const LogActiveDayService = {
	async getStatistics() {
		return instance.get<IStatisticsResponse[]>('/log-active-day/statistics')
	},

	async createOrUpdate(sessionCount: number) {
		return instance.post('/log-active-day', { sessionCount })
	}
}
