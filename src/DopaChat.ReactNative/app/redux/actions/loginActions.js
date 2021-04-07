export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

export const loginSuccessAction = (user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    success: true,
    user: user,
    access_token: user.access_token
  }
});

export const logoutAction = () => ({
  type: LOG_OUT
});