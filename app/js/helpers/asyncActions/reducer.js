import * as actions from './actions';
import { createReducer } from '../redux';

const initialState = {
  actions: {},
};

function editActionState(state, actionName, data) {
  const stateActions = state.actions || {};
  return {
    ...state,
    actions: {
      ...stateActions,
      [actionName]: {
        ...stateActions[actionName],
        ...data,
      },
    },
  };
}

function setIsLoading(isLoading, state, { actionName }) {
  return editActionState(state, actionName,
    {
      isLoading,
      displayMessage: (!isLoading ? true : undefined),
    },
  );
}

function fetchStart(state, { actionName }) {
  return editActionState(state, actionName,
    {
      isLoading: true,
      displayMessage: false,
    },
  );
}

function fetchSuccess(state, { actionName, data }) {
  return editActionState(state, actionName,
    {
      isLoading: false,
      displayMessage: true,
      data,
      error: null,
    },
  );
}

function fetchError(state, { actionName, error }) {
  return editActionState(state, actionName,
    {
      isLoading: false,
      displayMessage: true,
      data: null,
      error,
    },
  );
}

function fetchHideMessage(state, { actionName }) {
  return editActionState(state, actionName,
    {
      displayMessage: false,
    },
  );
}

function reset(state, { actionName }) {
  const newState = { ...state };
  if (newState.actions) {
    delete newState.actions[actionName];
  }
  return newState;
}

export default createReducer(initialState, {
  [actions.ASYNC_START_LOADING]: setIsLoading.bind(null, true),
  [actions.ASYNC_STOP_LOADING]: setIsLoading.bind(null, false),
  [actions.ASYNC_FETCH_START]: fetchStart,
  [actions.ASYNC_FETCH_SUCCESS]: fetchSuccess,
  [actions.ASYNC_FETCH_ERROR]: fetchError,
  [actions.ASYNC_FETCH_END_MESSAGE]: fetchHideMessage,
  [actions.ASYNC_RESET_ACTION]: reset,
});
