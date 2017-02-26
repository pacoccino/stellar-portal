import * as actions from './actions';

const MESSAGE_DELAY = 2000;

const asyncActionsMiddleware = store => next => (action) => {
  switch (action.type) {
    case actions.ASYNC_FETCH_ERROR:
    case actions.ASYNC_FETCH_START:
    case actions.ASYNC_FETCH_SUCCESS:
    case actions.ASYNC_START_LOADING:
    case actions.ASYNC_STOP_LOADING: {
      const { actionName } = action;

      if (!actionName) {
        throw 'Async action launched without action name';
      }
    }
  }
  if (action.hide) {
    switch (action.type) {
      case actions.ASYNC_STOP_LOADING:
      case actions.ASYNC_FETCH_SUCCESS: {
        setTimeout(() => {
          store.dispatch(actions.hideFetchMessage(action.actionName));
        }, action.delay || MESSAGE_DELAY);
      }
    }
  }
  next(action);
};

export default asyncActionsMiddleware;
