import { createContext } from 'react'
import { AuthContextType } from '../types/user'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext
