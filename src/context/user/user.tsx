"use client";
import { auth } from "@/axios-config";
import {
  useContext,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { ISignIn } from "@/types";
import { cookieStorage } from "@ibnlanre/portal";

type UserProps = {
  restaurantId: number;
  firstName: string | null;
};

interface UserPropsContextPrps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  signIn: (data: ISignIn) => Promise<void>;
}

const UserContext = createContext<UserPropsContextPrps | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const signIn = async (data: ISignIn) => {
    try {
      const response = await auth.post(`/api/auth/login`, data);
      const values = await response.data?.data?.data;
      cookieStorage.setItem("user", JSON.stringify(values));
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error sigin in", error);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking localStorage)
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("user's useUser must be used within a UserProvider");
  }

  return context;
};

export { UserProvider, useUser };
