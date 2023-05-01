import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const insAuthenticated = localStorage.getItem('token')

  if (!insAuthenticated) {
    return <Navigate to="/signin" />
  }
  return <>{children}</>
}

export default ProtectedRoute
