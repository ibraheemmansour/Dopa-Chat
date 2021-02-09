import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import globalReducer from './globalReducer';

export default combineReducers({
  loginReducer: loginReducer,
  globalReducer: globalReducer
});