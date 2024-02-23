"use client";
import { createContext, useContext, useState } from "react";
import { api } from "@/axios-config";
import { useQuery } from "@tanstack/react-query";

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
    queryFn: async () => await api.get("/api/restaurant-manager/profile"),
    queryKey: ["user, restuarant"],
  });

  return (
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
