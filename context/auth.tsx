import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      apiClient.defaults.headers['Authorization'] = `Bearer ${storedToken}`;
      apiClient
        .get('/users/find')
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch user:', error);
          logout();
        });
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    apiClient.defaults.headers['Authorization'] = `Bearer ${newToken}`;
    apiClient
      .get('/users/find')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user after login:', error);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Authorizationヘッダーを削除する
    delete apiClient.defaults.headers['Authorization'];
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
