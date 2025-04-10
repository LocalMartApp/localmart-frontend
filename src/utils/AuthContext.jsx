import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { config } from "../env-services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => {
      return localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null;
    });

    const [userData, setUserData] = useState(null); // Global user data

    useEffect(() => {
        if (authToken) {
            getProfileData(authToken);
        }
    }, [authToken]); // Fetch user details when authToken changes

    const login = (token) => {
      localStorage.setItem("authToken", JSON.stringify(token));
      setAuthToken(token);
    };

    const logout = () => {
      localStorage.removeItem("authToken");
      setAuthToken(null);
      setUserData(null);
    };

    const getProfileData = async (token) => {
        try {
            const response = await axios.get(`${config.api}auth/user-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
            });
            setUserData(response?.data?.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout, userData, setUserData, getProfileData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);