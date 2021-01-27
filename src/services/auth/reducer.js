import {
  LOGIN,
  LOGOUT,
  FETCH_USER,
  SHOW_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
} from "./constants";

export const authInitialState = {
  isAuthenticated: false,
  isLoading: false,
  token: null,
  user: null,
  error: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = authInitialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      const user = localStorage.getItem("getir-user")
        ? JSON.parse(localStorage.getItem("getir-user"))
        : null;
      const token = localStorage.getItem("getir-token")
        ? JSON.parse(localStorage.getItem("getir-token"))
        : null;

      return {
        ...state,
        isAuthenticated: !!token,
        user: user,
        token: token,
      };
    case LOGIN:
      localStorage.setItem("getir-user", JSON.stringify(action.payload.user));
      localStorage.setItem("getir-token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SHOW_ERROR:
      return {
        ...state,
        error: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: "",
      };
    default:
      return state;
  }
};
