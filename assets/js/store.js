import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
State

{
  users: [], // List of User
  tasks: [], // List of Task
  session: null, // { token, user_id }
  redirect: null, // String or null
}
*/

// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASK_LIST':
    return action.data;
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
  case 'NEW_SESSION':
    return action.data;
  case 'DELETE_SESSION':
    return null;
  default:
    return state;
  }
}

function redirect(state = null, action) {
  switch (action.type) {
  case 'REDIRECT':
    return action.data;
  default:
    return state;
  }
}

function root_reducer(state0, action) {

  let reducer = combineReducers({tasks, users, session, redirect});
  let state1 = reducer(state0, action);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
