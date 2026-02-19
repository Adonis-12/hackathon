"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { User, Tenant } from "./types"

interface AuthState {
  user: User | null
  tenants: Tenant[]
  currentTenant: Tenant | null
}

interface AuthContextType extends AuthState {
  setAuth: (user: User, tenants: Tenant[]) => void
  setCurrentTenant: (tenant: Tenant) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    tenants: [],
    currentTenant: null,
  })

  const setAuth = useCallback((user: User, tenants: Tenant[]) => {
    setState((prev) => ({ ...prev, user, tenants }))
  }, [])

  const setCurrentTenant = useCallback((tenant: Tenant) => {
    setState((prev) => ({ ...prev, currentTenant: tenant }))
  }, [])

  const clearAuth = useCallback(() => {
    setState({ user: null, tenants: [], currentTenant: null })
  }, [])

  return (
    <AuthContext.Provider
      value={{ ...state, setAuth, setCurrentTenant, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
