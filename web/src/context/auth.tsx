import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../service/api';

interface SignInProps {
  email: string;
  password: string;
}
interface AuthContextData {
  signed: boolean;
  signIn(data: SignInProps): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  useEffect(() => {
    const storageToken = localStorage.getItem('token');

    if (storageToken) {
      setSigned(true);

      api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
    }
  }, []);

  const [signed, setSigned] = useState(false);
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('auth', { email, password });

      localStorage.setItem('token', response.data);

      setSigned(true);

      api.defaults.headers['Authorization'] = `Bearer ${response.data}`;
    } catch (err) {
      console.log(err);
    }
  }

  function signOut() {
    localStorage.removeItem('token');
    setSigned(false);
  }

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
