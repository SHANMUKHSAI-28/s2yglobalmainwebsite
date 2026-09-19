import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);
const USER_STORAGE_KEY = 's2y-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    // Verify session in background if user is saved or cookie is active
    async function checkSession() {
      const activeUser = await getCurrentUser();
      if (activeUser) {
        setUser(activeUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(activeUser));
      }
    }
    checkSession();
  }, []);

  const setAuth = (userData) => {
    if (userData) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    }
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setAuth,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
