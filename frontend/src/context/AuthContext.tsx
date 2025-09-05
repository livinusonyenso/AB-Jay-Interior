"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Admin, AuthContextType } from "../types"
import { authAPI, tokenStorage } from "../lib/api"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(tokenStorage.get())
  const [loading, setLoading] = useState(true)

  // Init auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = tokenStorage.get()
      console.log("[v0] initAuth → savedToken:", savedToken)

      if (savedToken) {
        try {
          const response = await authAPI.me() // { admin: {...} }
          console.log("[v0] authAPI.me response:", response)

          setUser(response.admin) // ✅ normalize backend "admin" → context "user"
          setToken(savedToken)
        } catch (error) {
          console.error("[v0] initAuth error:", error)
          tokenStorage.remove()
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await authAPI.login(email, password)
      // { token, admin }

      console.log("[v0] login response:", response)

      tokenStorage.set(response.token)
      setToken(response.token)
      setUser(response.admin) // ✅ normalize backend "admin" → context "user"

      return true
    } catch (error) {
      console.error("[v0] Login failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    tokenStorage.remove()
    setToken(null)
    setUser(null)
  }

  const value: AuthContextType = {
    user, // ✅ matches types.ts
    token,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
