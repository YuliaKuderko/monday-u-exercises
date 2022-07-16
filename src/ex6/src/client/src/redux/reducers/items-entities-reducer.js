const initialState = {
  todos: []
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case "GET_TODOS":
      return { ...state, todos: (action.payload) };

    case "ADD_TODO":
      return { ...state, todos: action.payload };

    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };

    case "CLEAR_ALL_TODOS":
      return { ...state, todos: [] };

    case "DONE_TODOS":
      return {
        ...state, todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.status = true
          }
          return todo;
        })
      };

    case "UNDONE_TODOS":
      return {
        ...state, todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            todo.status = false
          }
          return todo;
        })
      };
  }
};

export default itemsEntitiesReducer;