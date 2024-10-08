import { useEffect, useState } from "react";
import axios from "axios";
import userEventEmitter from "../utils/eventEmitter";

// Define the shape of the user object (you can extend this as needed)
interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photo_url: string;
  balance: number;
  totalSpins: number;
  freeSpins: number;
  referralCount: number;
  totalBets: number;
  totalWins: number;
  totalLosses: number;
  slotGameWins: number;
  slots: number;
  spinningWheelWins: number;
  createdAt: string;
}

interface UpdateUserProfileData {
  username?: string;
  firstName?: string;
  lastName?: string;
  photo_url?: string;
  totalWins?: Number;
  totalLosses?: Number;
  spinningWheelWins?: Number;
  balance?: Number;
  totalSpins?: Number;
  slots? : Number;
  // Add other fields as needed
}

export const useUserAPI = (userId: string, token?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    userEventEmitter.emit('userUpdated', user);
  }, [user])

  // Get user profile
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User>(
        `https://c1a2-105-113-59-239.ngrok-free.app/api/profile/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            "ngrok-skip-browser-warning":  true,
          },
        
        }
      );
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: UpdateUserProfileData) => {
    setLoading(true);
    try {
      const response = await axios.put<User>(
        `https://c1a2-105-113-59-239.ngrok-free.app/api/profile/${userId}`,
        data
      );
      console.log("user gotten from userapi after updating", response.data);
      setUser(response.data);
      
      setError(null);
    } catch (err) {
      setError("Failed to update user profile");
    } finally {
      setLoading(false);
    }
  };

  // Update user balance (add or subtract)
  const updateUserBalance = async (amount: number) => {
    setLoading(true);
    try {
      const response = await axios.put<User>(
        `https://c1a2-105-113-59-239.ngrok-free.app/api/balance/${userId}`,
        { amount }
      );
      setUser(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to update user balance");
    } finally {
      setLoading(false);
    }
  };

  // Get all users (for admin)
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<any>(
        `https://c1a2-105-113-59-239.ngrok-free.app/api/users`, {
          headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning":  true,
            'Authorization': `Bearer ${token}`,
          },
        
        }
      );
      setError(null);
      return response.data; // Return the list of users for further use
    } catch (err) {
      setError("Failed to fetch users");
      return [];
    } finally {
      setLoading(false);
    }
  };

 const fetchRefferals = async () => {
  setLoading(true);
  try {
    const response = await axios.get<any>(
      `https://c1a2-105-113-59-239.ngrok-free.app/api/users/${userId}`, // API URL with userId for fetching referrals
      {
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": true,
          'Authorization': `Bearer ${token}`, // Use token for authorization if required
        },
      }
    );
    
    setError(null);
    console.log(response.data)
    return response.data; // Return the list of referred users
  } catch (err) {
    setError("Failed to fetch referrals");
    return [];
  } finally {
    setLoading(false);
  }
};


  return {
    user,
    loading,
    error,
    fetchUserProfile,
    updateUserProfile,
    updateUserBalance,
    fetchAllUsers,
    fetchRefferals
  };
};
