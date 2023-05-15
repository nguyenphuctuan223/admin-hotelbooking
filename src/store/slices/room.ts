/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Payload, RoomFilter } from 'types/room';

export const ROOM_URL = {
  getRoom: `room/findAll`,
  postRoom: `room/addroom`,
  putRoom: (id: any) => `room/${id}`,
  detailRoom: (id: any) => `room/${id}`,
  detailRoomInHotel: (id: any) => `room/findRoom/${id}`,
  delRoom: (id: any) => `room/${id}`
};

const initialState: DefaultRootStateProps['room'] = {
  rooms: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getRoomListSuccess(state, action) {
      state.rooms = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postRoomSuccess(state, action) {
      state.rooms.unshift(action.payload);
    },
    putRoomSuccess(state, action) {
      state.rooms = state.rooms.map((room) => {
        if (room._id === action.payload.id) {
          return action.payload;
        }
        return room;
      });
    },
    delRoomSuccess(state, action) {
      state.rooms = state.rooms.filter((user) => user._id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getRoomList(filter?: RoomFilter) {
  const params = `${filter?.search !== '' ? `&search=${filter?.search}` : ''}&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${ROOM_URL.getRoom}?${params}`);
      dispatch(slice.actions.getRoomListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addRoom(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(ROOM_URL.postRoom, params)
      .then((result) => {
        dispatch(slice.actions.postRoomSuccess(result.data));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(resp);
    }
  };
}
export function editRoom(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(ROOM_URL.putRoom(id), params)
      .then((result) => {
        dispatch(slice.actions.putRoomSuccess(result.data));
        return result;
      })
      .catch((error) => {
        dispatch(slice.actions.hasError(error));
        return error;
      });
    if (callback) {
      callback(resp);
    }
  };
}
export function RoomInHotel(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.get(ROOM_URL.detailRoomInHotel(id));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function delRoom(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.delete(ROOM_URL.delRoom(id));
      dispatch(slice.actions.delRoomSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
