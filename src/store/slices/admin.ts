// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { AdminFilter, Payload } from 'types/admin';

export const ADMIN_URL = {
  getUser: `${process.env.REACT_APP_API_URL}admin/users/page`,
  updateUser: `${process.env.REACT_APP_API_URL}users/update-profile`
};

const initialState: DefaultRootStateProps['admin'] = {
  admin: [],
  currentPage: 1
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    getUserListSuccess(state, action) {
      state.admin = action.payload;
      // state.pageCount = action.payload.pages;
      // state.currentPage = action.payload.current;
    },
    addPerMissionUserSuccess(state, action) {
      state.admin.unshift(action.payload);
    }
  }
});

export default slice.reducer;
export const { getUserListSuccess } = slice.actions;

export function getAdminList(filter: AdminFilter) {
  const filters = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') +
    (filter?.isTrust !== '' ? `&trust=${filter?.isTrust}` : '') +
    (filter?.isMint !== '' ? `&mint=${filter?.isMint}` : '') +
    (filter?.isLogin !== '' ? `&login=${filter?.isLogin}` : '')
  }`;

  const params = `${filter?.currentPage}`;

  return async () => {
    try {
      const resp = await axios.get(`${ADMIN_URL.getUser}/${params}?${filters}`);
      dispatch(slice.actions.getUserListSuccess(resp.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPerMission(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(`${ADMIN_URL.updateUser}`, params)
      .then((result) => {
        dispatch(slice.actions.addPerMissionUserSuccess(result.data));
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
