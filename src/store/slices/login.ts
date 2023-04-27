import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { dispatch } from 'store';
import { LoginState, Payload } from 'types/login';

// import { connectWallet } from '@utils/wallet';

export const LOGIN_URL = {
  login: `${process.env.REACT_APP_API_URL}admin/auth/login`
};

const initialState: LoginState = {
  data: {},
  error: null
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },
    Login(state, action) {
      state.data = action.payload;
    }
  }
});

export const actions = { ...slice.actions };

export default slice.reducer;

export function LoginAccount(payload: Payload) {
  return async () => {
    const { params, callback } = payload;
    try {
      const response = await axios.post(`${LOGIN_URL.login}`, params);
      dispatch(slice.actions.Login(response.data.access_token));
      // console.log(response.data.access_token);
      // console.log(response.status);
      localStorage.setItem('access_token', response.data.access_token);
      if (callback) {
        callback(response);
      }
    } catch (error) {
      // eslint-disable-next-line
      const { store } = require('../../store');
      store.dispatch(slice.actions.hasError(error));
    }
  };
}
