// PROJECT IMPORTS

export interface AdminState {
  admin: Admin[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Admin;
  callback?: (response: any) => void;
}

export type AdminFilter = {
  search?: string;
  isTrust?: number | string;
  isMint?: number | string;
  isLogin?: number | string;
  currentPage: number;
  limit?: number;
};

export type Admin = {
  _id?: string;
  publicAddress?: string;
  nonce?: string;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  image?: string;
  name?: string;
  bio?: string;
  __v?: number;
  status?: number;
  is_login?: string;
  is_trust?: string;
  is_mint?: string;
};
export type SelectProps = {
  value?: any;
  label: string;
};
