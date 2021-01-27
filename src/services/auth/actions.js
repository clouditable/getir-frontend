import {
  FETCH_USER,
  LOGIN,
  LOGOUT,
  SHOW_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "./constants";

export const fetchUserAction = () => ({
  type: FETCH_USER,
});

export const loginAction = (user, token) => ({
  type: LOGIN,
  payload: {
    user,
    token,
  },
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const showErrorAction = () => ({
  type: SHOW_ERROR,
});

export const clearErrorAction = () => ({
  type: CLEAR_ERROR,
});

export const setLoadingAction = (isLoading) => ({
  type: SET_LOADING,
  payload: {
    isLoading,
  },
});
