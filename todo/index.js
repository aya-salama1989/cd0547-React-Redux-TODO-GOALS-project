function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state => through a reducer function that takes state and action then return state

  let state;
  const listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
const TOGGLE_GOAL = "TOGGLE_GOAL";

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

function toggleGoalAction(id) {
  return {
    type: TOGGLE_GOAL,
    id,
  };
}

function todosReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.todo.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.todo.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goalsReducer(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.goal.id);
    case TOGGLE_GOAL:
      return state.map((goal) =>
        goal.id !== action.goal.id
          ? goal
          : Object.assign({}, goal, { done: !action.goal.done })
      );
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todosReducer(state.todos, action),
    goals: goalsReducer(state.goals, action),
  };
}

const store = createStore(app);
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch(
  addTodoAction({
    id: 0,
    name: "Learn Redux",
    complete: false,
  })
);

store.dispatch(addTodoAction({
  id: 1,
  name: "learn react native",
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 2,
  name: "Learn spanish",
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 3,
  name: "Learn Italian",
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 4,
  name: "Stay Healthy",
  complete: false,
}));

store.dispatch(removeTodoAction(0));

store.dispatch(toggleTodoAction(4));

store.dispatch(addGoalAction({
  id: 0,
  name: "Stay Healthy",
  done: true,
}));

store.dispatch(toggleGoalAction(0));
