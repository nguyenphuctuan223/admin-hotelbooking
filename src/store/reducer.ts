// THIRD-PARTY
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// PROJECT IMPORTS
import menuReducer from 'store/slices/menu';
import snackbarReducer from 'store/slices/snackbar';
import userReducer from 'store/slices/user';
import loginReducer from './slices/login';
import adminReducer from './slices/admin';
import collectionReducer from './slices/collection';

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
  admin: adminReducer,
  collection: collectionReducer
});

export default reducer;
