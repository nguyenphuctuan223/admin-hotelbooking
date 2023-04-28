/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Payload, ReviewFilter } from 'types/comment';

export const REVIEW_URL = {
  getReview: `review/findAll`,
  postReview: `review/addReview`,
  putReview: (id: any) => `review/${id}`,
  detailReview: (id: any) => `review/${id}`,
  delReview: (id: any) => `review/${id}`
};

const initialState: DefaultRootStateProps['review'] = {
  reviews: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getReviewListSuccess(state, action) {
      state.reviews = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postReviewSuccess(state, action) {
      state.reviews.unshift(action.payload);
    },
    putReviewSuccess(state, action) {
      state.reviews = state.reviews.map((review) => {
        if (review._id === action.payload.id) {
          return action.payload;
        }
        return review;
      });
    },
    delReviewSuccess(state, action) {
      state.reviews = state.reviews.filter((review) => review._id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getReviewList(filter?: ReviewFilter) {
  const params = `${filter?.search !== '' ? `&search=${filter?.search}` : ''}&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${REVIEW_URL.getReview}?${params}`);
      dispatch(slice.actions.getReviewListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addReview(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(REVIEW_URL.postReview, params)
      .then((result) => {
        dispatch(slice.actions.postReviewSuccess(result.data));
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
export function editReview(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(REVIEW_URL.putReview(id), params)
      .then((result) => {
        dispatch(slice.actions.putReviewSuccess(result.data));
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

export function delReview(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.delete(REVIEW_URL.detailReview(id));
      dispatch(slice.actions.delReviewSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
