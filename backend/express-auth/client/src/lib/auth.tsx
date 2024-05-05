import { createContext, useCallback, useContext, useState } from 'react'
import Cookies from 'js-cookie'

export type AuthContext = {
  user: string | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContext | null>(null)
const AUTH_KEY = 'demo.auth.user'

const getStoredUser = () => localStorage.getItem(AUTH_KEY)
const setStoredUser = (username: string | null) => {
  username ? localStorage.setItem(AUTH_KEY, username) : localStorage.removeItem(AUTH_KEY)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(getStoredUser())
  const isAuthenticated = !!user

  const login = useCallback((username: string) => {
    setStoredUser(username)
    setUser(username)

    // expire after 30 mins...
  }, [])

  const logout = useCallback(() => {
    setStoredUser(null)
    setUser(null)
    Cookies.remove('jwt')
  }, [])

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
