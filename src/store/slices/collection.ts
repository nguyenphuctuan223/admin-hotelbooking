// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { CollectionFilter, Payload } from 'types/collection';

export const COLLECTION_URL = {
  getCollection: `${process.env.REACT_APP_API_URL}collection/page`,
  updateCollection: `${process.env.REACT_APP_API_URL}collection/update`
};

const initialState: DefaultRootStateProps['collection'] = {
  collection: [],
  currentPage: 1
};

const slice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getCollectionListSuccess(state, action) {
      state.collection = action.payload.collections;
      state.pageCount = action.payload.pages;
      state.currentPage = action.payload.current;
    },
    addPermissionCollectionSuccess(state, action) {
      state.collection.unshift(action.payload);
    }
  }
});

export default slice.reducer;
export const { getCollectionListSuccess } = slice.actions;

export function getCollectionList(filter: CollectionFilter) {
  const params = `${filter?.currentPage}`;

  const filters = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') +
    (filter?.isTrust !== '' ? `&trust=${filter?.isTrust}` : '') +
    (filter?.isTrending !== '' ? `&trending=${filter?.isTrending}` : '') +
    (filter?.category !== '' ? `&category=${filter?.category}` : '')
  }`;

  //   const params = `${
  //     (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
  //   }&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${COLLECTION_URL.getCollection}/${params}?${filters}`);
      dispatch(slice.actions.getCollectionListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPermissionForCollection(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(`${COLLECTION_URL.updateCollection}`, params)
      .then((result) => {
        dispatch(slice.actions.addPermissionCollectionSuccess(result.data));
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
