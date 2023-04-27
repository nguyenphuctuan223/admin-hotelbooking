// THIRD-PARTY
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// PROJECT IMPORTS
import menuReducer from 'store/slices/menu';
import snackbarReducer from 'store/slices/snackbar';
import userReducer from 'store/slices/user';
import loginReducer from './slices/login';
import hotelReducer from './slices/hotel';
import roomReducer from './slices/room';
import bookingReducer from './slices/booking';
import transtReducer from './slices/transt';

const reducer = combineReducers({
  snackbar: snackbarReducer,
  user: persistReducer(
    {
      key: 'user',
      storage,
      keyPrefix: 'beetsoft-'
    },
    userReducer
  ),

  menu: menuReducer,
  login: loginReducer,
  hotel: hotelReducer,
  room: roomReducer,
  booking: bookingReducer,
  transt: transtReducer
});

export default reducer;
