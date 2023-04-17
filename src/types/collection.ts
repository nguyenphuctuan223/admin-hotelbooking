// PROJECT IMPORTS

export interface CollectionState {
  collection: Collection[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: any;
  callback?: (response: any) => void;
}

export type CollectionFilter = {
  search?: string;
  category?: string;
  isTrust?: number | string;
  isTrending?: number | string;
  currentPage: number;
  limit?: number;
};

export type Collection = {
  _id?: string;
  owner?: any;
  name?: string;
  description?: string;
  imageURIs?: any;
  createdAt?: string;
  updatedAt?: string;
  is_trust?: string;
  is_trending?: string;
};
export type SelectProps = {
  value?: any;
  label: string;
};
