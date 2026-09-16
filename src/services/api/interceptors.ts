import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { ApiError } from './errors'
import { tokenStorage } from './token'
import router from '@/router'

export const requestInterceptor = {
  onFulfilled(config: InternalAxiosRequestConfig) {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  onRejected(error: unknown) {
    return Promise.reject(error)
  },
}

export const responseInterceptor = {
  onFulfilled(response: AxiosResponse) {
    return response
  },

  onRejected(error: unknown) {
    if (axios.isAxiosError(error)) {
      const response = error.response

      if (response?.status === 401) {
        tokenStorage.remove()
      }

      if (router.currentRoute.value.name !== 'login') {
        router.push({ name: 'login' })
      }

      throw new ApiError({
        status: response?.status || 500,
        message: response?.data?.message || 'An error occurred while processing the request.',
        code: response?.data?.code,
        details: response?.data?.details,
      })
    }

    return Promise.reject(error)
  },
}
