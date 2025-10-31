export type UserRole = 'admin' | 'manufacturer' | 'retailer' | 'consumer' | 'supplier'

export interface User {
  username: string
  role: UserRole
  email?: string
  name?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token?: string
}

export interface AuthContextType {
  auth: AuthState
  setAuth: (auth: AuthState) => void
  clearAuth: () => void
  isLoading: boolean
  login: (username: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}
