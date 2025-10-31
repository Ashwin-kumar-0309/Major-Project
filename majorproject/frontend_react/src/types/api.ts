// Auth Types
export interface AuthResponse {
  username: string
  role: 'admin' | 'manufacturer' | 'retailer' | 'consumer' | 'supplier'
  token?: string
  message?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  role: 'admin' | 'manufacturer' | 'retailer' | 'consumer' | 'supplier'
}

// User/Profile Types
export interface UserProfile {
  username: string
  name?: string
  email?: string
  role: 'admin' | 'manufacturer' | 'retailer' | 'consumer' | 'supplier'
  description?: string
  website?: string
  location?: string
  image?: string
  approved?: boolean
  createdAt?: string
}

// Product Types
export interface Product {
  id?: string
  serialNumber: string
  name: string
  brand: string
  description?: string
  manufacturerUsername: string
  image?: string
  expiryDate?: string
  createdAt?: string
  blockchainAddress?: string
  blockchainTxHash?: string
  verified?: boolean
}

export interface AddProductRequest {
  serialNumber: string
  name: string
  brand: string
  description?: string
  image?: string
  expiryDate?: string
  manufacturerUsername?: string
}

// Complaint Types
export interface Complaint {
  id?: string
  productId: string
  complainant: string
  complaintType: 'counterfeit' | 'defective' | 'other'
  description: string
  status: 'open' | 'in_progress' | 'resolved'
  location?: string
  evidence?: string
  createdAt?: string
}

export interface AddComplaintRequest {
  productId: string
  complaintType: 'counterfeit' | 'defective' | 'other'
  description: string
  location?: string
  evidence?: string
}

// Manufacturer Types
export interface Manufacturer {
  username: string
  companyName: string
  email: string
  status: 'pending' | 'approved' | 'rejected'
  productsCount: number
  joinedDate: string
  description?: string
}

// Admin Types
export interface AdminStats {
  totalUsers: number
  totalProducts: number
  pendingApprovals: number
  openComplaints: number
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Pagination
export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
