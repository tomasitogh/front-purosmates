import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

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
          localStorage.removeItem('authToken'); // Por si acaso hay otro token
        } else {
          // Token válido
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error al validar token:', error);
        // Si hay error al parsear, limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      const accessToken = data.access_token;

      // Decodificar el token JWT para obtener el rol
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      
      const userData = {
        email: tokenPayload.sub,
        role: tokenPayload.role || tokenPayload.authorities?.[0]?.replace('ROLE_', '') || 'USER',
      };

      setToken(accessToken);
      setUser(userData);
      
      // Limpiar cualquier token viejo y guardar el nuevo
      localStorage.clear();
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
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
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
