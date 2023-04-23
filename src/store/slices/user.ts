import { Administrator, Payload, UserFilter } from '../../types/user';
// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';

// PROJECT IMPORTS
import axios from 'utils/axios';
import { DefaultRootStateProps } from 'types';
import { dispatch } from 'store';
import { UserProfile } from 'types/user-profile';

export const ADMINISTRATOR_URL = {
  getAdmin: `user/findAll`,
  postAdmin: `auth/register`,
  putAdmin: (id: any) => `user/${id}`,
  detailAdmin: (id: any) => `users/find/${id}`,
  delAdmin: (id: any) => `user/${id}`
};

const initialState: DefaultRootStateProps['user'] = {
  users: [],
  pageCount: 0,
  currentPage: 1,
  error: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    getAdministratorListSuccess(state, action) {
      state.users = action.payload;
      state.pageCount = action.payload.last_page;
      state.currentPage = action.payload.current_page;
    },
    postAdministratorSuccess(state, action) {
      state.users.unshift(action.payload);
    },
    putAdministratorSuccess(state, action) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    delAdministratorSuccess(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    }
  }
});

export default slice.reducer;

export function getAdministratorList(filter?: UserFilter) {
  const params = `${
    (filter?.search !== '' ? `&search=${filter?.search}` : '') + (filter?.status !== '' ? `&status=${filter?.status}` : '')
  }&page=${filter?.currentPage}`;
  return async () => {
    try {
      const resp = await axios.get(`${ADMINISTRATOR_URL.getAdmin}?${params}`);
      dispatch(slice.actions.getAdministratorListSuccess(resp.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addAdministrator(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    const resp = await axios
      .post(ADMINISTRATOR_URL.postAdmin, params)
      .then((result) => {
        dispatch(slice.actions.postAdministratorSuccess(result.data));
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
export function editAdministrator(payload: Payload) {
  return async () => {
    const { id, params, callback } = payload;
    const resp = await axios
      .put(ADMINISTRATOR_URL.putAdmin(id), params)
      .then((result) => {
        dispatch(slice.actions.putAdministratorSuccess(result.data));
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

export function delAdministrator(user: UserProfile) {
  return async () => {
    try {
      const resp = await axios.delete(`${process.env.REACT_APP_API_URL}/v1/operator/users/${user.id}`);
      dispatch(slice.actions.delAdministratorSuccess(resp.data.success.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
