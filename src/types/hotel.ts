// PROJECT IMPORTS

export interface HotelState {
  hotels: Hotel[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Hotel;
  callback?: (response: any) => void;
}

export type HotelFilter = {
  search?: string;
  currentPage: number;
  limit?: number;
};

export type Hotel = {
  _id?: string;
  name?: string;
  address?: string;
  description?: string;
  imgURL?: string;
  area?: string;
  rooms?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export type SelectProps = {
  value?: any;
  label: string;
};
