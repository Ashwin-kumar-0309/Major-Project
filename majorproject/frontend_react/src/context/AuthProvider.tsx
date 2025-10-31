import { ReactNode, useState, useEffect } from 'react'
import AuthContext from './AuthContext'
import { AuthState, AuthContextType, UserRole } from '../types/user'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: undefined,
  })

  // Load auth state from localStorage on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth)
        setAuthState({
          user: parsedAuth.user || null,
          isAuthenticated: !!parsedAuth.user,
          isLoading: false,
          token: parsedAuth.token,
        })
      } catch (error) {
        console.error('Error parsing saved auth:', error)
        localStorage.removeItem('auth')
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  }, [])

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (auth.user && auth.isAuthenticated) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: auth.user,
          token: auth.token,
        })
      )
    } else {
      localStorage.removeItem('auth')
    }
  }, [auth])

  const setAuth = (authData: AuthState) => {
    setAuthState(authData)
  }

  const clearAuth = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: undefined,
    })
    localStorage.removeItem('auth')
  }

  const login = async (username: string, password: string, role: UserRole) => {
    // This is a placeholder - actual login logic will be handled by pages
    setAuthState({
      user: { username, role },
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const logout = () => {
    clearAuth()
  }

  const value: AuthContextType = {
    auth,
    setAuth,
    clearAuth,
    isLoading: auth.isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
