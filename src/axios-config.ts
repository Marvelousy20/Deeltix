import { cookieStorage } from "@ibnlanre/portal";
import axios from "axios";

console.log("baseurl: ", process.env.NEXT_PUBLIC_BASE_URL as string);

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((req) => {
//   let token = cookieStorage.getItem("user");
//   if (token) {
//     token = JSON.parse(token)?.
//   }
// });

export default auth;

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
