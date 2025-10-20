import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (!user) {
    // Si no hay usuario, redirigir a home (donde puede hacer login desde el navbar)
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin()) {
    // Si requiere admin pero no es admin, redirigir a home
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
