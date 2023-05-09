"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../../../Types";
import axios from "axios";
import apiClient from "@/config/axios.config";

type AuthContextType = {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: AuthContextType = {
  user: null,
  isLogin: false,
  isLoading: false,
  setUser: () => {},
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(
  authContextDefaultValues
);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // initialize isLoading to true

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      const accessToken = sessionStorage.getItem("accessToken");
      const userData = sessionStorage.getItem("userData");
      if (!accessToken || !userData) {
        axios
          .post(
            `${apiClient.defaults.baseURL}auth/token/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          )
          .then((response) => {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );
            setUser(response.data.user);
            setIsLogin(true);
          })
          .catch(() => {
            setIsLogin(false); // set isLogin to false when authentication fails
          })
          .finally(() => {
            setIsLoading(false); // set isLoading to false when authentication request is completed
          });
      } else {
        setUser(JSON.parse(userData));
        setIsLogin(true);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);
  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userData");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLogin(false);
  };

  const value = {
    user,
    setUser,
    isLogin,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
