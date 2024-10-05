import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the user object (you can extend this as needed)
interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  balance: number;
  // Add other fields as needed
}

// Define the context value types
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (telegramInitData: string) => Promise<void>;
  logout: () => void;
}

// Define props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // Store the authenticated user
  const [token, setToken] = useState<string | null>(null); // Store the JWT token
  const [loading, setLoading] = useState<boolean>(true); // Loading state for authentication check

  // Automatically fetch user info if there's a token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false); // No token, no need to load user
    }
  }, []);

  // Function to login and store the JWT token
  const login = async (telegramInitData: string) => {
    try {
      const response = await axios.post('/api/auth/telegram', {
        initData: telegramInitData,
      });
      const { token, user } = response.data;

      // Store token in local storage
      localStorage.setItem('token', token);

      // Update state
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to logout the user
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // Fetch the authenticated user's profile
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false); // Done loading after fetching the user
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth context in components
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
