// THIRD-PARTY
// import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';

// PROJECT IMPORTS
import accountReducer from 'store/accountReducer';
import axios from 'utils/axios';
import Loader from 'ui-component/Loader';
import { InitialLoginContextProps, JWTContextType } from 'types/auth';
// import { KeyedObject } from 'types';
import { LOGIN, LOGOUT } from 'store/actions';
import { openSnackbar } from 'store/slices/snackbar';

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}admin/auth/login`;
export const ME_URL = `${process.env.REACT_APP_API_URL}/v1/me`;

const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// const verifyToken: (st: string) => boolean = (serviceToken) => {
//   if (!serviceToken) {
//     return false;
//   }
//   const decoded: KeyedObject = jwtDecode(serviceToken);
//   return decoded.exp > Date.now() / 1000;
// };

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('access_token', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('access_token');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('access_token');
        if (serviceToken) {
          setSession(serviceToken);

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        dispatch({
          type: LOGOUT
        });
      }
    };
    init();
  }, []);

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post(LOGIN_URL, { email, password });
    try {
      const { access_token } = response.data;
      setSession(access_token);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
