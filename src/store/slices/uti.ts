/* eslint-disable no-underscore-dangle */
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { Payload, UtiFilter } from 'types/uti';

export const UTI_URL = {
  getUti: `uti/findAll`,
  postUti: `uti/addUti`,
  putUti: (id: any) => `uti/${id}`,
  detailUti: (id: any) => `uti/${id}`,
  delUti: (id: any) => `uti/${id}`
};

const initialState: DefaultRootStateProps['uti'] = {
  utis: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'uti',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getUtiListSuccess(state, action) {
      state.utis = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postUtiSuccess(state, action) {
      state.utis.unshift(action.payload);
    },
    putUtiSuccess(state, action) {
      state.utis = state.utis.map((uti) => {
        if (uti._id === action.payload.id) {
          return action.payload;
        }
        return uti;
      });
    },
    delUtiSuccess(state, action) {
      state.utis = state.utis.filter((uti) => uti._id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getUtiList(filter?: UtiFilter) {
  const params = `${filter?.search !== '' ? `&search=${filter?.search}` : ''}&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${UTI_URL.getUti}?${params}`);
      dispatch(slice.actions.getUtiListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addUti(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(UTI_URL.postUti, params)
      .then((result) => {
        dispatch(slice.actions.postUtiSuccess(result.data));
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
export function editUti(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(UTI_URL.putUti(id), params)
      .then((result) => {
        dispatch(slice.actions.putUtiSuccess(result.data));
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

export function delUti(payload: Payload) {
  const { id, callback } = payload;
  return async () => {
    try {
      const resp = await axios.delete(UTI_URL.detailUti(id));
      dispatch(slice.actions.delUtiSuccess(resp.data));
      if (callback) {
        callback(resp);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
