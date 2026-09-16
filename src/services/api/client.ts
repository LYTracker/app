import axios from 'axios'
import { requestInterceptor, responseInterceptor } from './interceptors'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(requestInterceptor.onFulfilled, requestInterceptor.onRejected)

api.interceptors.response.use(responseInterceptor.onFulfilled, responseInterceptor.onRejected)
