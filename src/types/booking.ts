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
  customer?: string;
  trans?: string;
  status?: string;
  endDate?: string;
  startDate?: string;
  hotel?: any;
  rooms?: any;
  __v?: number;
};
export type SelectProps = {
  value?: any;
  label: string;
};
