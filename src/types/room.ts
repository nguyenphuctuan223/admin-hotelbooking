// PROJECT IMPORTS

export interface RoomState {
  rooms: Room[];
  pageCount?: number;
  currentPage: number;
  error?: any;
}
export interface Payload {
  id?: string | number;
  params?: Room;
  callback?: (response: any) => void;
}

export type RoomFilter = {
  search?: string;
  currentPage: number;
  limit?: number;
};

export type Room = {
  _id?: string;
  name?: string;
  roomType?: string;
  description?: string;
  imgURL?: string;
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
