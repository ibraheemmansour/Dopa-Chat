import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer } from 'redux-persist';

import { LOGIN_SUCCESS, LOG_OUT } from '../actions/loginActions';
import Utils from '../../config/utils'

const initialState = {
  access_token: null,
  expiry: null
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, access_token: action.payload.access_token, expiry: Utils.GetExpireDate() }
    }
    case LOG_OUT: {
      return { ...state, access_token: null, expiry: null }
    }
    default: { return state }
  }
};

const persistConfig = {
  key: 'login',
  storage: AsyncStorage
};

export default persistReducer(persistConfig, LoginReducer);