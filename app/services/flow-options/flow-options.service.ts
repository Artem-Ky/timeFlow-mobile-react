import instance from '@/services/api/interceptors'

import { IFlowOptionsResponse } from './flow-options.interface'

export const FlowOptionsService = {
	async getOptions() {
		return instance.get<IFlowOptionsResponse>('/flow-options')
	},

	async updateOptions(body: IFlowOptionsResponse) {
		return instance.put('/flow-options', body)
	}
}
