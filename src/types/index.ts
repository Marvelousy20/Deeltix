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
