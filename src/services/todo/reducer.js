import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "./constants";

export const todoInitialState = {
  data: [],
  isLoading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = todoInitialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        data: action.payload.todos || [],
        isLoading: false,
      };
    case CREATE_TODO:
      return {
        ...state,
        data: [...state.data, action.payload.todo],
      };
    case UPDATE_TODO:
      return {
        ...state,
        data: state.data.map((todo) => {
          if (todo._id === action.payload.todo._id) {
            todo = action.payload.todo;
          }
          return todo;
        }),
      };
    case DELETE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo._id !== action.payload.todoId),
      };

    default:
      return state;
  }
};
