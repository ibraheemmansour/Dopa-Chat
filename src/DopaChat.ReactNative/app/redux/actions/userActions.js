export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const createUserSuccessAction = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: {
    success: true,
    user: user
  }
});

export const updateUserSuccessAction = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    success: true,
    user: user
  }
});