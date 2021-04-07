import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer } from 'redux-persist';

import { LOGIN_SUCCESS, LOG_OUT } from '../actions/loginActions';
import Utils from '../../config/utils';

const initialState = {
  access_token: null,
  expiry: null,
  user: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, user: action.payload.user, access_token: action.payload.user.access_token, expiry: Utils.GetExpireDate() }
    }
    case LOG_OUT: {
      return { ...state, user: null, access_token: null, expiry: null }
    }
    default: { return state }
  }
};

const persistConfig = {
  key: 'login',
  storage: AsyncStorage
};

export default persistReducer(persistConfig, LoginReducer);