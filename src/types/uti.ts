// PROJECT IMPORTS
export interface UtiState {
  utis: Uti[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Uti;
  callback?: (response: any) => void;
}

export type UtiFilter = {
  search?: string;
  currentPage: number;
  limit?: number;
};

export type Uti = {
  _id?: string;
  type?: string;
  price?: number;
  imgURL?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export type SelectProps = {
  value?: any;
  label: string;
};
