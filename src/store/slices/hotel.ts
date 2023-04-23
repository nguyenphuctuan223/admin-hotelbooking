/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { HotelFilter, Payload } from 'types/hotel';

export const HOTEL_URL = {
  getHotel: `hotel/findAll`,
  postHotel: `hotel/addHotel`,
  putHotel: (id: any) => `hotel/${id}`,
  detailHotel: (id: any) => `hotel/find/${id}`,
  delHotel: (id: any) => `hotel/${id}`
};

const initialState: DefaultRootStateProps['hotel'] = {
  hotels: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getHotelListSuccess(state, action) {
      state.hotels = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postHotelSuccess(state, action) {
      state.hotels.unshift(action.payload);
    },
    putHotelSuccess(state, action) {
      state.hotels = state.hotels.map((hotel) => {
        if (hotel._id === action.payload.id) {
          return action.payload;
        }
        return hotel;
      });
    },
    delHotelSuccess(state, action) {
      state.hotels = state.hotels.filter((user) => user._id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getHotelList(filter?: HotelFilter) {
  const params = `${filter?.search !== '' ? `&search=${filter?.search}` : ''}&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${HOTEL_URL.getHotel}?${params}`);
      dispatch(slice.actions.getHotelListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addHotel(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(HOTEL_URL.postHotel, params)
      .then((result) => {
        dispatch(slice.actions.postHotelSuccess(result.data));
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
export function editHotel(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(HOTEL_URL.putHotel(id), params)
      .then((result) => {
        dispatch(slice.actions.putHotelSuccess(result.data));
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

export function getDetailHotel(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.get(HOTEL_URL.detailHotel(id));
      dispatch(slice.actions.getHotelListSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function delHotel(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.delete(HOTEL_URL.delHotel(id));
      dispatch(slice.actions.delHotelSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
