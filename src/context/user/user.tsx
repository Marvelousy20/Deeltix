"use client";
import {
  useContext,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface UserProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserProps | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  console.log(isLoggedIn);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
