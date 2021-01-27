import { useAPI } from "../../utils/useApi";
import {
  fetchUserAction,
  loginAction,
  showErrorAction,
  clearErrorAction,
  logoutAction,
  setLoadingAction,
} from "./actions";

const { post } = useAPI();

export const usesrService = () => {
  return async (dispatch) => {
    dispatch(fetchUserAction());
  };
};

export const loginService = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
    dispatch(setLoadingAction(true));
    const endpoint = "authorization/login";
    post({
      endpoint,
      body: {
        username,
        password,
      },
    })
      .then(async (response) => {
        if (response?.status) {
          dispatch(loginAction(response.user, response.user.token));
        }
      })
      .catch((error) => {
        dispatch(showErrorAction(error));
      })
      .finally(() => {
        dispatch(setLoadingAction(false));
      });
  };
};

export const logoutService = () => {
  return async (dispatch) => {
    dispatch(logoutAction());
  };
};

export const clearErrorService = () => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
  };
};
