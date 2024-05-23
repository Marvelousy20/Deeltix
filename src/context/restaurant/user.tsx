"use client";
import { createContext, useContext, useState } from "react";
import { api } from "@/axios-config";
import { useQuery } from "@tanstack/react-query";
import { Restaurant, UserData } from "@/types";

type UserProps = {
  restaurantId: number;
  firstName: string;
};

interface userStoreContextProps {
  user: UserProps | null;
  fetchUser: () => void;
  restaurantId: number | null;
  restuarantName: string | null;
  managerName: string | null;
}

const UserContext = createContext<userStoreContextProps | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restuarantName, setResuarantName] = useState(null);
  const [managerName, setManagerName] = useState(null);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/restaurant-manager/profile");
      const restaurant = data.data.data.restaurant;
      const manager = data.data.data.manager;
      setUser(data);
      setResuarantName(restaurant.name);
      setRestaurantId(restaurant.id);
      setManagerName(manager.fullName);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const { data } = useQuery({
    queryFn: fetchUser,
    queryKey: ["manager-restaurant-profile"],
  });

  return (
    <UserContext.Provider
      value={{ user, fetchUser, restaurantId, restuarantName, managerName }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("dashboard's useUser must be used within a UsersProvider");
  }

  return context;
};

export { UserProvider, useUser };
