import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, useGetMe } from '@workspace/api-client-react';

// Global fetch interceptor to inject token for generated Orval hooks
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const token = localStorage.getItem('asav_token');
  if (token) {
    init = init || {};
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`
    };
  }
  return originalFetch(input, init);
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('asav_token'));
  const [localUser, setLocalUser] = useState<User | null>(null);
  
  const { data: serverUser, isLoading, isError } = useGetMe({
    query: {
      enabled: !!token,
      retry: false
    }
  });

  useEffect(() => {
    if (serverUser) {
      setLocalUser(serverUser);
    } else if (isError) {
      logoutAction();
    }
  }, [serverUser, isError]);

  const setAuth = (newUser: User, newToken: string) => {
    localStorage.setItem('asav_token', newToken);
    setToken(newToken);
    setLocalUser(newUser);
  };

  const logoutAction = () => {
    localStorage.removeItem('asav_token');
    setToken(null);
    setLocalUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user: localUser, 
      token, 
      setAuth, 
      logout: logoutAction, 
      isLoading: isLoading && !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
