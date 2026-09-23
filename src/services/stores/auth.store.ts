import { defineStore } from 'pinia'
import { tokenStorage } from '../api/token'
import { authService } from '../auth/auth.service'
import type { User } from '../user/user.type'
import type { LoginPayload, RegisterPayload } from '../auth/auth.types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoading: false,
    isInitialized: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(payload: LoginPayload) {
      this.isLoading = true
      try {
        await authService.login(payload)
        await this.fetchMe()
      } finally {
        this.isLoading = false
      }
    },

    async register(payload: RegisterPayload) {
      this.isLoading = true
      try {
        await authService.register(payload)
        await this.fetchMe()
      } finally {
        this.isLoading = false
      }
    },

    async fetchMe() {
      try {
        this.user = await authService.me()
      } catch {
        this.user = null
        tokenStorage.remove()
      }
    },

    async initialize() {
      if (this.isInitialized) return

      if (tokenStorage.get()) {
        await this.fetchMe()
      }

      this.isInitialized = true
    },

    logout() {
      this.user = null
      authService.logout()
    },
  },
})
