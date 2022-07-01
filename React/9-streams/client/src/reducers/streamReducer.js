import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      const streamsObj = _arrayToObject(action.payload);
      return { ...state, ...streamsObj };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

const _arrayToObject = (myArray) => {
  const obj = {};
  myArray.forEach((stream) => {
    obj[stream.id] = { ...stream };
  });
  return obj;
};

export default streamReducer;
