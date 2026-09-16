import { api } from '@/services/api/client'
import { tokenStorage } from '@/services/api/token'
import type { AuthResponse, LoginPayload, RegisterPayload } from './auth.types'
import type { User } from '../user/user.type'

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload)
    tokenStorage.set(data.accessToken)
    return data
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', payload)
    tokenStorage.set(data.accessToken)
    return data
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>('/auth/me')
    return data
  },

  logout(): void {
    tokenStorage.remove()
  },
}
