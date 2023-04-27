/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Payload, TranstFilter } from 'types/transport';

export const TRANST_URL = {
  getTranst: `trans/findAll`,
  postTranst: `trans/addTrans`,
  putTranst: (id: any) => `trans/${id}`,
  detailTranst: (id: any) => `trans/${id}`,
  delTranst: (id: any) => `trans/${id}`
};

const initialState: DefaultRootStateProps['transt'] = {
  transts: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'transt',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getTranstListSuccess(state, action) {
      state.transts = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postTranstSuccess(state, action) {
      state.transts.unshift(action.payload);
    },
    putTranstSuccess(state, action) {
      state.transts = state.transts.map((transt) => {
        if (transt._id === action.payload.id) {
          return action.payload;
        }
        return transt;
      });
    },
    delTranstSuccess(state, action) {
      state.transts = state.transts.filter((transt) => transt._id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getTranstList(filter?: TranstFilter) {
  const params = `${filter?.search !== '' ? `&search=${filter?.search}` : ''}&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${TRANST_URL.getTranst}?${params}`);
      dispatch(slice.actions.getTranstListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addTranst(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(TRANST_URL.postTranst, params)
      .then((result) => {
        dispatch(slice.actions.postTranstSuccess(result.data));
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
export function editTranst(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(TRANST_URL.putTranst(id), params)
      .then((result) => {
        dispatch(slice.actions.putTranstSuccess(result.data));
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

export function delTranst(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.delete(TRANST_URL.detailTranst(id));
      dispatch(slice.actions.delTranstSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
