"use client";

import { createContext, useContext, useState } from "react";
import { api } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { ErrorType, handleError } from "@/lib/handle-error";
import { cookieStorage } from "@ibnlanre/portal";

type UserProps = {
  restaurantId: number;
  firstName: string;
};

interface userStoreContextProps {
  user: UserProps | null;
  getUser: () => void;
}

const UserContext = createContext<userStoreContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  //   let token = cookieStorage.getItem("user");
  //   if (token) {
  //     token = JSON.parse(token)?.token;
  //     console.log(token);
  //   }

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await api.get("/api/restaurant-manager/profile");
      const token = cookieStorage.getItem("user");
      console.log(token);
    },
    mutationKey: ["user, restuarant"],
    onSuccess(data, variables, context) {
      //   setUser(data);
      console.log(data);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const getUser = () => {
    mutate();
  };

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UsersProvider");
  }

  return context;
};

export { UserProvider, useUser };
