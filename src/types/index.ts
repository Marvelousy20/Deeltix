export interface IRestaurent {
  img: any;
  name: string;
  price: number;
  location: string;
  rating: number;
}

export interface IMenu {
  img: any;
  name: string;
  price: number;
  description: string;
  category:
    | "rice"
    | "chicken"
    | "pastries"
    | "burger"
    | "deserts"
    | "hotdog"
    | "salads";
}

export interface ILoggedinUser {
  name: string;
  icon: React.ReactNode;
  chevron: React.ReactNode;
  route: string;
}

export interface Isidebar {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IVerifyEmail {
  email: string | null;
  otp: string;
}

export interface IReVerifyEmail {
  email: string | null;
}

export interface IVerifyCategory {
  name: string;
}

export interface ForgotPassword {
  email: string;
}

export interface IResetPassword {
  email: string | null;
  password: string;
  confirmPassword: string;
  otp: string;
}

export interface IRestaurantSignUp {
  name: string;
  restaurantName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IMenus {
  name: string;
  description: string;
  category: string;
  price: string;
  image: string | null;
}

//user sign data
interface restaurantDetails {
  user: UserData;
  restaurant: Restaurant;
  token: string;
}
interface newData {
  data: restaurantDetails;
}

export interface UserProfile {
  message: string;
  data: newData;
}

// export interface RestaurantData {
//   user: UserData;
//   restaurant: Restaurant;
//   token: string;
// }

export interface Restaurant {
  name: string;
  manager: string;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface UserData {
  email: string;
  phoneNumber: string;
  fullName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  otp: null;
  otpExpiresIn: null;
  lastLogin: string;
  id: string;
}

export interface MenuType {
  available: boolean;
  category: { name: string; available: boolean; id: string };
  createdAt: string;
  deleted: boolean;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  restaurant: string;
  updatedAt: string;
}
