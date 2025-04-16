import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UseContext'

function ProtectedRoute({ children }) {
  const { usuario } = useUser()

  // Si no hay usuario, redirige al login
  if (!usuario) return <Navigate to="/login" replace />

  // Si hay usuario, renderiza el contenido protegido
  return children
}

export default ProtectedRoute
