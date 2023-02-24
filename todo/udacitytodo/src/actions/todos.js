import API from "goals-todos-api";

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

export function handleAddTodo(todoName, callback) {
  return (dispatch) => {
    API.saveTodo(todoName)
      .then((todo) => {
        dispatch(addTodo(todo));
        callback();
      })
      .catch(() => {
        return alert("an error occured, please try again later!");
      });
  };
}

export function handleToggleTodo(todoId) {
  return (dispatch) => {
    dispatch(toggleTodo(todoId));
    return API.saveTodoToggle(todoId).catch(() => {
      dispatch(toggleTodo(todoId));
      return alert("error happened toggling the state");
    });
  };
}

export function handleDeleteTodo(todo) {
  return (dispatch) => {
    dispatch(removeTodo(todo.id));
    return API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodo(todo));
      alert("An error occurred. Try again.");
    });
  };
}
