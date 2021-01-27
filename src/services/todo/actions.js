import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SHOW_ERROR,
  CLEAR_ERROR,
} from "./constants";

export const fetchTodosAction = (todos) => ({
  type: GET_TODOS,
  payload: {
    todos,
  },
});

export const createTodoAction = (todo) => ({
  type: CREATE_TODO,
  payload: {
    todo,
  },
});

export const updateTodoAction = (todo) => ({
  type: UPDATE_TODO,
  payload: {
    todo,
  },
});

export const deleteTodoAction = (todoId) => ({
  type: DELETE_TODO,
  payload: {
    todoId,
  },
});

export const showErrorAction = () => ({
  type: SHOW_ERROR,
});

export const clearErrorAction = () => ({
  type: CLEAR_ERROR,
});
