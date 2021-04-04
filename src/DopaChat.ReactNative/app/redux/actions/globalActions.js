export const SET_LOADING = 'SET_LOADING';
export const SET_TAB_SCREEN_NAME = 'SET_TAB_SCREEN_NAME';

export const setLoadingAction = (bool) => ({
  type: SET_LOADING,
  loading: bool
});

export const setTabScreenNameAction = (screen) => ({
  type: SET_TAB_SCREEN_NAME,
  tabScreen: screen
});