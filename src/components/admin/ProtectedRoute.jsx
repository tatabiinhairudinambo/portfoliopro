import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/admin/login" replace />
  }

  // Render child routes if user is authenticated
  return <Outlet />
}
