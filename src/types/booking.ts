// PROJECT IMPORTS

export interface BookingState {
  bookings: Booking[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Booking;
  callback?: (response: any) => void;
}

export type BookingFilter = {
  search?: string;
  currentPage: number;
  limit?: number;
};

export type Booking = {
  _id?: string;
  email?: string;
  Note?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export type SelectProps = {
  value?: any;
  label: string;
};
