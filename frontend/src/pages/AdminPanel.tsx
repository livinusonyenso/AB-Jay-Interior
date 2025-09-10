"use client"

import type React from "react"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { ProtectedRoute } from "../../components/ProtectedRoute"
import { Layout } from "../../components/Layout"
import { LoginPage } from "../pages/Admin/LoginPage"
import { DashboardPage } from "../pages/Admin/DashboardPage"
import { ProjectsPage } from "../pages/Admin/ProjectsPage"
import { SubmissionsPage } from "../pages/Admin/SubmissionsPage"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { LoadingSpinner } from "../../components/LoadingSpinner"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateProject } from "../pages/Admin/CreateProject"
import { AdminQuotes } from "./Admin/AdminQuotes"

const AdminRoutes: React.FC = () => {
  return (
    <Layout>
     <Routes>
  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
  <Route path="/dashboard" element={<DashboardPage />} />
<Route path="/projects/create" element={<CreateProject/>} />
<Route path="/projects" element={<ProjectsPage />} />
  <Route path="/quotes" element={<AdminQuotes />} />
  <Route path="/submissions" element={<SubmissionsPage />} />
  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
</Routes>

    </Layout>
  )
}

const AppContent: React.FC = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log(" Auth state changed", {
      user,
      loading,
      path: location.pathname,
    })

    if (!loading && user && location.pathname === "/admin") {
      console.log(" User authenticated and at /admin → redirecting to /admin/dashboard")
      navigate("/admin/dashboard", { replace: true })
    }

    if (!loading && user && location.pathname === "/login") {
      console.log(" User authenticated and at /login → redirecting to /admin/dashboard")
      navigate("/admin/dashboard", { replace: true })
    }
  }, [user, loading, navigate, location.pathname])

  if (loading) {
    console.log(" Still loading auth state")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    console.log(" No user detected → showing LoginPage")
    return <LoginPage />
  }

  console.log(" User authenticated → rendering AdminRoutes")
  return (
    <ProtectedRoute>
      <AdminRoutes />
    </ProtectedRoute>
  )
}

function AdminPanel() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default AdminPanel
