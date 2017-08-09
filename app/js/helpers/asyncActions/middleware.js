import * as actions from './actions';

const asyncActionsMiddleware = () => next => (action) => {
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
  next(action);
};

export default asyncActionsMiddleware;
