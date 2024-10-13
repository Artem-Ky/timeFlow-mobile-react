import { deleteItemAsync, setItemAsync } from 'expo-secure-store'

export const saveTokenToStorage = async (accessToken: string) => {
	await setItemAsync('accessToken', accessToken)
}

export const removeTokenFromStorage = async () => {
	await deleteItemAsync('accessToken')
}
