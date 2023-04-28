// PROJECT IMPORTS
export interface ReviewState {
  reviews: Review[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Review;
  callback?: (response: any) => void;
}

export type ReviewFilter = {
  search?: string;
  currentPage: number;
  limit?: number;
};

export type Review = {
  _id?: string;
  name?: string;
  email?: string;
  customer?: string;
  hotel?: any;
  comment?: string;
  rate?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export type SelectProps = {
  value?: any;
  label: string;
};
