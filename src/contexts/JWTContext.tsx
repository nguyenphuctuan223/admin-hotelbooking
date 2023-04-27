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

export const LOGIN_URL = `/auth/login`;
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

const setSession = (accessToken?: string | null) => {
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.common.token = `Bearer ${accessToken}`;
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

  const login = async (username: string, password: string) => {
    const response = await axios.post(LOGIN_URL, { username, password });

    try {
      const { accessToken } = response.data;
      setSession(accessToken);
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
