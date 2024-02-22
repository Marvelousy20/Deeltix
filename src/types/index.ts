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
