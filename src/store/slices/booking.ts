/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { BookingFilter, Payload } from 'types/booking';

export const BOOKING_URL = {
  getBooking: `booking/findAll`,
  postBooking: `booking/addbooking`,
  putBooking: (id: any) => `booking/${id}`,
  detailBooking: (id: any) => `booking/${id}`,
  delBooking: (id: any) => `booking/${id}`
};

const initialState: DefaultRootStateProps['booking'] = {
  bookings: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getBookingListSuccess(state, action) {
      state.bookings = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postBookingSuccess(state, action) {
      state.bookings.unshift(action.payload);
    },
    putBookingSuccess(state, action) {
      state.bookings = state.bookings.map((booking) => {
        if (booking._id === action.payload.id) {
          return action.payload;
        }
        return booking;
      });
    },
    delBookingSuccess(state, action) {
      state.bookings = state.bookings.filter((booking) => booking._id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getBookingList(filter?: BookingFilter) {
  const params = `${filter?.search !== '' ? `&search=${filter?.search}` : ''}&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${BOOKING_URL.getBooking}?${params}`);
      dispatch(slice.actions.getBookingListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addBooking(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(BOOKING_URL.postBooking, params)
      .then((result) => {
        dispatch(slice.actions.postBookingSuccess(result.data));
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
export function editBooking(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(BOOKING_URL.putBooking(id), params)
      .then((result) => {
        dispatch(slice.actions.putBookingSuccess(result.data));
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

export function delBooking(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.delete(BOOKING_URL.detailBooking(id));
      dispatch(slice.actions.delBookingSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
