const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').trim()
const CONTRACT_ADDRESS = (import.meta.env.VITE_CONTRACT_ADDRESS || '').trim()
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development'

const buildApiUrl = (pathname: string = ''): string => {
  if (!pathname) return ''
  if (!API_BASE_URL) {
    return pathname
  }
  const base = API_BASE_URL.replace(/\/$/, '')
  const normalizedPath = pathname.replace(/^\//, '')
  return `${base}/${normalizedPath}`
}

const isDevelopment = ENVIRONMENT === 'development'
const isProduction = ENVIRONMENT === 'production'

export {
  API_BASE_URL,
  CONTRACT_ADDRESS,
  GOOGLE_MAPS_API_KEY,
  ENVIRONMENT,
  buildApiUrl,
  isDevelopment,
  isProduction,
}
