import { isArray, get } from 'lodash';

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action = {}) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export function selectProperty(path, defaultValue) {
  let stringPath = path;
  if (isArray(stringPath)) {
    stringPath = stringPath.join('.');
  }
  return state => get(state, stringPath, defaultValue);
}

export function editInArray(array, props, index) {
  return [
    ...array.slice(0, index),
    { ...array[index], ...props },
    ...array.slice(index + 1),
  ];
}
