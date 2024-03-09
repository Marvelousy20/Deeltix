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
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  id: string;
}

export interface UserData {
  email: string;
  phoneNumber: string;
  fullName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  otp: null;
  otpExpiresIn: null;
  lastLogin: string;
  id: string;
}

export interface MenuType {
  available: boolean;
  category: { name: string; available: boolean; id: string };
  createdAt: Date | undefined | string;
  deleted: boolean;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  restaurant: string;
  updatedAt: Date | undefined | string;
}

export interface IRestaurantReservation {
  time: string;
  date: Date | undefined | string;
  email: string;
  numberOfPeople: string;
  specialRequest?: string;
}

export interface IAllGuestResponse {
  data: IAllGuestData;
  status: string;
}

export interface IAllGuestData {
  message: string;
  data: IAllGuest;
}

export interface IAllGuest {
  guests: Guest[] | undefined;
  total: number;
}

export interface Guest {
  _id: string;
  phoneNumber: null | string;
  fullName: null | string;
  email: string;
}

// upcoming reservation
export interface UpcomingReservationDetails {
  data: UpcomingData;
  status: string;
}

export interface UpcomingData {
  message: string;
  data: DataData;
}

export interface DataData {
  reservations: UpcomingReservation[];
  total: number;
}

export interface UpcomingReservation {
  date: Date;
  time: string;
  dateAndTime: Date;
  numberOfPeople: number;
  email: string;
  specialRequest: string;
  confirmationStatus: string;
  reference: string;
  restaurant: UpcomingRestaurant;
  approvalTime: Date;
  approvedBy: string;
  paymentRequired: boolean;
  paymentStatus: string;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  id: string;
  user?: UpcomingUser;
  fullName?: string;
  phoneNumber?: string;
}

export interface UpcomingRestaurant {
  name: string;
  manager: string;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  id: string;
  description?: string;
  address?: string;
  averagePrice?: number;
  country?: string;
  openingDays?: string;
  openingHours?: string;
  state?: string;
  displayPicture?: string;
  pictures?: string[];
}

export interface UpcomingUser {
  profile: UpcomingProfile;
  email: string;
  id: string;
}

export interface UpcomingProfile {
  name: string;
  phoneNumber: string;
  profilePicture?: string;
  dob?: string;
}
// end of upcoming reservation

// profile update
export interface IProfileUpdate {
  fullName: string;
  phoneNumber: string;
}

// password update
export interface IPasswordUpdate {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// update restaurant profile
export interface IUpdateRestaurantProfile {
  address: string;
  country: string;
  state: string;
  openingDays: string;
  openingHours: string;
  displayPicture: string;
  averagePrice: string;
  description: string;
  pictures: Array<string> | undefined;
}
