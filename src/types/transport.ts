// PROJECT IMPORTS
export interface TranstState {
  transts: Transt[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Transt;
  callback?: (response: any) => void;
}

export type TranstFilter = {
  search?: string;
  currentPage: number;
  limit?: number;
};

export type Transt = {
  _id?: string;
  type?: string;
  price?: number;
  hotel?: any;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export type SelectProps = {
  value?: any;
  label: string;
};
