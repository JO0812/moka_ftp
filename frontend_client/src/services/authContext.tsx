import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  ftpSession: {
    host: string;
    port: number;
    username: string;
  } | null;
  setFtpSession: (session: { host: string; port: number; username: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('ftp_token'));
  const [ftpSession, setFtpSessionState] = useState<{
    host: string;
    port: number;
    username: string;
  } | null>(null);

  // Load saved FTP session from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem('ftp_session');
    if (savedSession) {
      try {
        setFtpSessionState(JSON.parse(savedSession));
      } catch (e) {
        console.error('Failed to parse saved FTP session', e);
        localStorage.removeItem('ftp_session');
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('ftp_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('ftp_token');
    localStorage.removeItem('ftp_session');
    setToken(null);
    setFtpSessionState(null);
  };

  const setFtpSession = (session: { host: string; port: number; username: string }) => {
    localStorage.setItem('ftp_session', JSON.stringify(session));
    setFtpSessionState(session);
  };

  const value = {
    isAuthenticated: !!token,
    token,
    login,
    logout,
    ftpSession,
    setFtpSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
