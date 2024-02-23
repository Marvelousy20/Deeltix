"use client";

import { createContext, useContext, useState } from "react";
import { api } from "@/axios-config";
import { useQuery } from "@tanstack/react-query";
import { ErrorType, handleError } from "@/lib/handle-error";
import { cookieStorage } from "@ibnlanre/portal";

type UserProps = {
  restaurantId: number;
  firstName: string;
};

interface userStoreContextProps {
  user: UserProps | null;
  // getUser: () => void;
}

const UserContext = createContext<userStoreContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  const { data } = useQuery({
    queryFn: async () => {
      await api.get("/api/restaurant-manager/profile");
    },
    queryKey: ["user, restuarant"],
    onSuccess() {
      //   setUser(data);
      // console.log(data);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  // console.log({ data });

  return (
    // getUser
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
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
