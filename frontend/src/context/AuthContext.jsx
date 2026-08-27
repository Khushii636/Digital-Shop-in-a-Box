import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('accessToken') || null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem('refreshToken') || null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('accessToken');
  });

  useEffect(() => {
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    if (access) {
      setToken(access);
      setRefreshToken(refresh);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (tokens) => {
    if (typeof tokens === 'string') {
      localStorage.setItem('accessToken', tokens);
      setToken(tokens);
    } else if (tokens && typeof tokens === 'object') {
      if (tokens.access) {
        localStorage.setItem('accessToken', tokens.access);
        setToken(tokens.access);
      }
      if (tokens.refresh) {
        localStorage.setItem('refreshToken', tokens.refresh);
        setRefreshToken(tokens.refresh);
      }
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
