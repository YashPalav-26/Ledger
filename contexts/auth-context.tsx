"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { apiClient, type User } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token")
      if (token) {
        const response = await apiClient.getCurrentUser()
        if (response.data) {
          setUser(response.data.user)
        } else {
          localStorage.removeItem("auth_token")
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password })
    if (response.data) {
      localStorage.setItem("auth_token", response.data.token)
      setUser(response.data.user)
      return { success: true }
    }
    return { success: false, error: response.error }
  }

  const signup = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    const response = await apiClient.signup(userData)
    if (response.data) {
      localStorage.setItem("auth_token", response.data.token)
      setUser(response.data.user)
      return { success: true }
    }
    return { success: false, error: response.error }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
