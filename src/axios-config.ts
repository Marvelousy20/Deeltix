import { cookieStorage } from "@ibnlanre/portal";
import axios from "axios";
import { toast } from "react-toastify";

console.log("baseurl: ", process.env.NEXT_PUBLIC_BASE_URL as string);

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
  (req) => {
    // let token = cookieStorage.getItem("restaurant");
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDY4ZTI4YTJiOGFlM2RlNjIxYjUyYiIsImVtYWlsIjoibWFydmVsbWVkaWE5NUBnbWFpbC5jb20iLCJ0eXBlIjoiTE9HSU5fVE9LRU4iLCJ0aW1lIjoiMjAyNC0wMi0yMlQwMDoyNjo0NS40NTVaIiwidXNlclR5cGUiOiJSRVNUQVVSQU5UIE1BTkFHRVIiLCJpYXQiOjE3MDg1NjE2MDUsImV4cCI6MTcwODY0ODAwNX0.svncMjQivo1Y5zLKYMi64kMB7nJt78pCFwUPW9NXaNQ";
    if (token) {
      // token = JSON.parse(token)?.token;
      req.headers.Authorization = `bearer ${token}`;
    }
    return req;
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
      req.headers.Authorization = `bearer ${token}`;
    }
    return req;
  },
  (error) => {
    toast.error("Something went wrong");
    Promise.reject(error);
  }
);

// API.interceptors.request.use(
//   (req) => {
//     let token = cookieStorage.getItem("bms-auth");
//     if (token) {
//       token = JSON.parse(token)?.access_token;
//       req.headers.Authorization = `bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => {
//     toast.error("something went wrong");
//     Promise.reject(error);
//   }
// );
