/**
 * Auth Context (Módulo 4). Estado de autenticación con useReducer.
 * Uso: <AuthProvider><App /></AuthProvider>, luego useAuth() en hijos.
 */
import React, { createContext, useContext, useReducer, type ReactNode } from 'react'

export interface User {
  id: number
  email: string
  name: string
  role: 'customer' | 'admin'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      }
    case 'UPDATE_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_START' })
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error('Login failed')
      const { user, token } = await response.json()
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : 'Login failed',
      })
    }
  }

  const logout = () => dispatch({ type: 'LOGOUT' })

  const updateUser = (user: User) => dispatch({ type: 'UPDATE_USER', payload: user })

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
