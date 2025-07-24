// Components/ProfileScreens/DeleteAccount/DeleteAccount.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../../env-services';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const parsed = JSON.parse(authToken);
      setToken(parsed);
    }
  }, []);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action is permanent.'
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${config.api}auth/delete-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Account deleted successfully');
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Failed to delete account.'
      );
      console.error(err);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-xl font-bold mb-4">Delete Account</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        This will permanently delete your account and all data. This action
        cannot be undone.
      </p>
      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        disabled={!token}
      >
        Confirm Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
