import { cookieStorage } from "@ibnlanre/portal";
import axios from "axios";
import { toast } from "react-toastify";
import { UserProfile } from "./types";

export const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const rest = cookieStorage.getItem("restaurant");
    if (rest) {
      const token = JSON.parse(rest as string);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Something went wrong");
    Promise.reject(error);
  }
);

auth.interceptors.request.use(
  (req) => {
    let token = cookieStorage.getItem("user");
    if (token) {
      token = JSON.parse(token)?.token;
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    toast.error("Something went wrong");
    Promise.reject(error);
  }
);
