
import { useState, useEffect } from 'react';
import { getAuthToken, loginUser } from '../services/auth/authService';


export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      setToken(data.token);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return {
    token,
    loading,
    error,
    login,
  };
};
