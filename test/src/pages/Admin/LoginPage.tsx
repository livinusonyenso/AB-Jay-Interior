"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "../../context/AuthContext"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import type { LoginFormData } from "../../types"
import { Shield } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const LoginPage: React.FC = () => {
  const { login } = useAuth()
  const [loginError, setLoginError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    console.log(" Login form submitted with:", data)
    setIsLoading(true)
    setLoginError("")

    try {
      const success = await login(data.email, data.password)
      console.log(" login() returned:", success)

      if (!success) {
        console.log(" Login failed → invalid credentials")
        setLoginError("Invalid email or password")
      } else {
        console.log(" Login successful → expecting redirect/navigation")
      }
    } catch (error) {
      console.error(" Login threw error:", error)
      setLoginError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
      console.log(" Login request finished, loading state:", false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{loginError}</div>
            )}

            <Input
              label="Email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="admin@example.com"
            />

            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Enter your password"
            />

            <Button type="submit" className="w-full" loading={isLoading}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
