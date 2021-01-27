import { useAPI } from "../../utils/useApi";
import {
  fetchTodosAction,
  createTodoAction,
  updateTodoAction,
  deleteTodoAction,
  showErrorAction,
  clearErrorAction,
} from "./actions";

const { post, get, put, del } = useAPI();

export const fetchTodosService = () => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
    const token = localStorage.getItem("getir-token")
      ? JSON.parse(localStorage.getItem("getir-token"))
      : null;
    const endpoint = "todo";
    get({
      endpoint,
      token,
    })
      .then(async (response) => {
        if (response?.status) {
          dispatch(fetchTodosAction(response.todos));
        }
      })
      .catch((error) => {
        dispatch(showErrorAction(error));
      });
  };
};
export const createTodoService = ({ content }) => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
    const endpoint = "todo";
    post({
      endpoint,
      body: {
        content,
      },
    })
      .then(async (response) => {
        if (response?.status) {
          dispatch(createTodoAction(response.todo));
        }
      })
      .catch((error) => {
        dispatch(showErrorAction(error));
      });
  };
};

export const updateTodoService = ({ todoId, content, status }) => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
    const endpoint = "todo";
    put({
      endpoint,
      id: todoId,
      body: {
        content,
        status,
      },
    })
      .then(async (response) => {
        if (response?.status) {
          dispatch(updateTodoAction(response.todo));
        }
      })
      .catch((error) => {
        dispatch(showErrorAction(error));
      });
  };
};

export const deleteTodoService = ({ todoId }) => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
    const endpoint = "todo";
    del({
      endpoint,
      id: todoId,
    })
      .then(async (response) => {
        if (response?.status) {
          dispatch(deleteTodoAction(todoId));
        }
      })
      .catch((error) => {
        dispatch(showErrorAction(error));
      });
  };
};

export const clearErrorService = () => {
  return async (dispatch) => {
    dispatch(clearErrorAction());
  };
};
