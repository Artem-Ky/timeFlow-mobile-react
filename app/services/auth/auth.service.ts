import instance from '@/services/api/interceptors'

import { IAuthResponse } from './auth-service.interface'
import { removeTokenFromStorage, saveTokenToStorage } from './auth.helper'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await instance.post<IAuthResponse>('/auth/login', {
			email,
			password
		})

		if (response.data.accessToken)
			await saveTokenToStorage(response.data.accessToken)

		return response.data
	},

	async register(email: string, password: string) {
		const response = await instance.post<IAuthResponse>('/auth/register', {
			email,
			password
		})

		if (response.data.accessToken)
			await saveTokenToStorage(response.data.accessToken)

		return response.data
	},

	async logout() {
		await removeTokenFromStorage()
	}
}
