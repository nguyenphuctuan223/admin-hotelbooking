// PROJECT IMPORTS
import { UserProfile } from 'types/user-profile';

export interface UserStateProps {
  users: UserProfile[];
  pageCount: number;
  currentPage: number;
  error: object | string | null;
}

export type UserFilter = {
  search?: string;
  status?: number | string;
  currentPage: number;
  limit?: number;
};

export type SortStatusProps = {
  value?: string;
  label: string;
};

export interface Payload {
  id?: string | number;
  params?: Administrator;
  callback?: (response: any) => void;
}

export type Administrator = {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};
export type SelectProps = {
  value?: any;
  label: string;
};
