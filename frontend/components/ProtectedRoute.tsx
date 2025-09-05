"use client"

import type React from "react"
import { useAuth } from "../src/context/AuthContext"
import { LoadingSpinner } from "./LoadingSpinner"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  console.log("[v0] ProtectedRoute check →", { loading, user })

  if (loading) {
    console.log("[v0] Still loading user in ProtectedRoute")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    console.log("[v0] No user → redirecting to /login")
    window.location.href = "/login"
    return null
  }

  console.log("[v0] User is authenticated → rendering protected content")
  return <>{children}</>
}
