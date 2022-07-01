import { combineReducers } from "redux";

//Action types
const INCREMENT_VALUE = 'INCREMENT_VALUE';
const DECREMENT_VALUE = 'DECREMENT_VALUE';

const counterReducer = (counter = 0, action) => {
  if (action.type === INCREMENT_VALUE) {
    return counter + 1;
  }
  if (action.type === DECREMENT_VALUE) {
    return counter - 1;
  }
  return counter;
};

const reducers = combineReducers({
  counter: counterReducer,
});

export default reducers;
