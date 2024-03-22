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

//reservation stat
export interface ReservationStat {
  data: StatData;
  status: string;
}

export interface StatData {
  message: string;
  data: ReservationStatData;
}

export interface ReservationStatData {
  totalReservations: number;
  totalUpcomingReservations: number;
  totalGuests: number;
}

// upcoming reservation
export interface UpcomingReservationDetails {
  data: ReservationData;
  status: string;
}

export interface ReservationData {
  message: string;
  data: DataData;
}

export interface DataData {
  reservations: ReservationStatus[];
  total: number;
}

export interface ReservationStatus {
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
  user?: ReservationUser;
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

export interface ReservationUser {
  profile: ReservationProfile;
  email: string;
  id: string;
}

export interface ReservationProfile {
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

// update user pofile
export interface IUpdateUserProfile {
  phoneNumber: string;
  name: string;
  dob: string;
}

// update user address (post)
export interface IUpdateUserAddress {
  address: string;
  country: string;
  state: string;
}

// update user address (Get)
export interface UserAddressDetails {
  data: UserAddressData;
  status: string;
}

export interface UserAddressData {
  message: string;
  data: UserAddressInfo;
}

export interface UserAddressInfo {
  addresses: UserAddress[];
  total: number;
}

export interface UserAddress {
  address: string;
  state: string;
  country: string;
  user: string;
  default: boolean;
  deleted: boolean;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  id: string;
}

// user reservation
export interface IUserReservation {
  time: string;
  date: Date | undefined | string;
  numberOfPeople: string;
  specialRequest?: string;
}

// all restaurant
export interface RestaurantDetails {
  data: RestaurantData | undefined;
  status?: string;
}

export interface RestaurantInfo {
  data: RestaurantData;
  message: string;
}

export interface RestaurantData {
  // restaurants: Restaurant[];
  data: NewRestaurant;
  total: number;
}

export interface NewRestaurant {
  restaurants: Restaurant[];
}

export interface Restaurant {
  name: string;
  // manager: RestaurantManager | string;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  address?: string;
  averagePrice?: number;
  country?: string;
  description?: string;
  displayPicture?: string;
  openingDays?: string;
  openingHours?: string;
  state?: string;
  id: string;
  pictures?: string[];
}

// export interface RestaurantManager {
//   email: string;
//   fullName: string;
//   id: string;
// }

// single restaurant
export interface UserSingleRestaurant {
  data: NewSingleData;
  status: string;
}

export interface NewSingleData {
  message: string;
  data: SingleRestaurantData;
}

export interface SingleRestaurantData {
  restaurant: SingleRestaurant;
}

export interface SingleRestaurant {
  name: string;
  // manager: Manager;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  address?: string;
  averagePrice?: number;
  country?: string;
  description?: string;
  displayPicture?: string;
  openingDays?: string;
  openingHours?: string;
  pictures?: string[];
  state?: string;
  id: string;
}

// export interface Manager {
//   email: string;
//   fullName: string;
//   id: string;
// }

// Rating
export interface Rating {
  rating: number;
  feedback: string;
}

// user review
export interface ReviewDetails {
  data: ReviewInfo;
  status: string;
}

export interface ReviewInfo {
  message: string;
  data: ReviewData;
}

export interface ReviewData {
  reviews: Review[];
  total: number;
}

export interface Review {
  feedback: string;
  rating: number;
  likeCount: number;
  user: UserReview;
  restaurant: RestaurantReview;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  id: string;
}

export interface RestaurantReview {
  name: string;
  description?: string;
  displayPicture?: string;
  id: string;
}

export interface UserReview {
  profile: ProfileReview;
  email: string;
  id: string;
}

export interface ProfileReview {
  name: string;
}

// Bookmark
export interface BookmarkDetails {
  data: BookmarkInfo;
  status: string;
}

export interface BookmarkInfo {
  message: string;
  data: BookmarkData;
}

export interface BookmarkData {
  bookmarks: Bookmark[];
  total: number;
}

export interface Bookmark {
  user: string;
  restaurant: RestaurantBookmark;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
  id: string;
}

export interface RestaurantBookmark {
  name: string;
  manager: string;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
  id: string;
  address?: string;
  averagePrice?: number;
  country?: string;
  description?: string;
  displayPicture?: string;
  openingDays?: string;
  openingHours?: string;
  pictures?: string[];
  state?: string;
}

// Pending Reservation
export interface PendingReservationDetails {
  data: ReservationData;
  status: string;
}

export interface ReservationData {
  message: string;
  data: DataData;
}

export interface DataData {
  // data: NewPendingReservation;
  total: number;

  reservations: ReservationStatus[];
}

// export interface NewPendingReservation {
//   reservation: ReservationStatus[];
// }

export interface ReservationStatus {
  date: Date;
  time: string;
  dateAndTime: Date;
  numberOfPeople: number;
  user?: ReservationUser;
  fullName?: string;
  email: string;
  phoneNumber?: string;
  specialRequest: string;
  confirmationStatus: string;
  reference: string;
  restaurant: ReservationRestaurant;
  paymentRequired: boolean;
  paymentStatus: string;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
  id: string;
}

export interface ReservationRestaurant {
  name: string;
  manager: string;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: Date | undefined | string;
  updatedAt: Date | undefined | string;
  address?: string;
  averagePrice?: number;
  country?: string;
  description?: string;
  displayPicture?: string;
  openingDays?: string;
  openingHours?: string;
  state?: string;
  id: string;
  pictures?: string[];
}

export interface ReservationUser {
  profile: ReservationProfile;
  email: string;
  id: string;
}

export interface ReservationProfile {
  name: string;
  phoneNumber: string;
  dob?: string;
}

// Single reservation
export interface SingleReservationDetails {
  data: SingleReservationInfo;
  status: string;
}

export interface SingleReservationInfo {
  message: string;
  data: SingleData;
}

export interface SingleData {
  reservation: SingleReservation;
}

export interface SingleReservation {
  date: Date;
  time: string;
  dateAndTime: Date;
  numberOfPeople: number;
  user: SingleUser;
  fullName: string;
  email: string;
  phoneNumber: string;
  specialRequest: string;
  confirmationStatus: string;
  reference: string;
  restaurant: SingleRestaurant;
  paymentRequired: boolean;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface SingleRestaurant {
  name: string;
  manager: string;
  reservationCharge: boolean;
  averageRating: number;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
  address?: string;
  averagePrice?: number;
  country?: string;
  description?: string;
  displayPicture?: string;
  openingDays?: string;
  openingHours?: string;
  state?: string;
  id: string;
}

export interface SingleUser {
  profile: SingleProfile;
  email: string;
  id: string;
}

export interface SingleProfile {
  name: string;
  phoneNumber: string;
  dob: string;
}
