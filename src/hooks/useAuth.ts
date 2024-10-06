import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseUserLoginProps {
  userData: any;  // Replace `any` with your user data interface
  error: string | null;
  loading: boolean;
}

// Custom Hook for handling user login
export const useUserLogin = (initData: string, photoUrl: string,  referralCode?: string): UseUserLoginProps => {
  const [userData, setUserData] = useState<any>(null);  // Replace `any` with proper user data interface
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!initData) return;

    const loginUser = async () => {
      setLoading(true);
      try {
        const response = await axios.post('https://c1a2-105-113-59-239.ngrok-free.app/api/auth', {
          initData,
          photoUrl,
          referralCode,
        });
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError('Login failed');
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, [initData, photoUrl, referralCode]);

  return { userData, error, loading };
};
