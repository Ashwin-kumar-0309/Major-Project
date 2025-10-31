import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL } from '../config'

const resolvedBaseUrl = API_BASE_URL || 'http://localhost:5000'

const apiClient: AxiosInstance = axios.create({
  baseURL: resolvedBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = localStorage.getItem('auth')
    if (auth) {
      try {
        const authData = JSON.parse(auth)
        if (authData.token) {
          config.headers.Authorization = `Bearer ${authData.token}`
        }
      } catch (error) {
        console.error('Error parsing auth token:', error)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
