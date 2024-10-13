import axios from 'axios'
import { getItemAsync } from 'expo-secure-store'

export const API_URL = `${process.env.SERVER_URL}/api`

export const getContentType = () => ({
  'Content-Type': 'application/json',
})

const CancelToken = axios.CancelToken
let cancel: any

const instance = axios.create({
  baseURL: API_URL,
  headers: getContentType(),
})

// Логирование инициализации Axios instance
console.log('Создан Axios instance с базовым URL:', API_URL)

instance.interceptors.request.use(
  async (config) => {
    // Логирование перед обработкой запроса
    console.log('Исходная конфигурация запроса:', config)

    const accessToken = await getItemAsync('accessToken')

    // Логирование полученного токена
    console.log('Полученный токен доступа:', accessToken)

    if (accessToken && accessToken.trim() !== '') {
      config.headers['Authorization'] = `Bearer ${accessToken}`
      // Логирование обновленных заголовков после добавления токена
      console.log('Заголовки после добавления Authorization:', config.headers)
    }

    if (cancel) {
      console.log('Отмена предыдущего запроса...')
      cancel('Отменено перед началом нового запроса')
    }

    config.cancelToken = new CancelToken(function executor(c) {
      cancel = c
    })

    // Логирование окончательной конфигурации перед отправкой запроса
    console.log('Окончательная конфигурация запроса:', config)

    return config
  },
  (error) => {
    // Логирование ошибок перед возвратом
    console.error('Ошибка в интерсепторе запроса:', error)
    return Promise.reject(error)
  }
)

export default instance
