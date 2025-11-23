import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, setAuthFromStorage, loginUser } from '../redux/authSlice';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, loading: authLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Cargar usuario y token desde localStorage al iniciar
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      // Verificar si el token está expirado
      try {
        const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000; // Convertir a milisegundos
        
        if (Date.now() >= expirationTime) {
          // Token expirado, limpiar localStorage
          console.log('Token expirado, limpiando localStorage...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
          dispatch(logoutAction());
        } else {
          // Token válido, restaurar desde localStorage
          dispatch(setAuthFromStorage({
            user: JSON.parse(storedUser),
            token: storedToken
          }));
        }
      } catch (error) {
        console.error('Error al validar token:', error);
        // Si hay error al parsear, limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        dispatch(logoutAction());
      }
    }
  }, [dispatch]);

  const login = async (email, password) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      return { success: true, user: result };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message || 'Credenciales inválidas' };
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAdmin,
    loading: authLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
