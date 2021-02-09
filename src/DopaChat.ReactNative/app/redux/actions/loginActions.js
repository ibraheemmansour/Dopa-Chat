export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const loginSuccessAction = (access_token) => ({
  type: LOGIN_SUCCESS,
  payload: {
    success: true,
    access_token: access_token
  }
});

export const logoutAction = () => ({
  type: LOG_OUT
});