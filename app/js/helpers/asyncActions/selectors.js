import { ASYNC_STATE_KEY } from './index';
import { selectProperty } from '../redux';

export const asyncSelector = actionName =>
  selectProperty(
    [ASYNC_STATE_KEY, 'actions', actionName],
    {},
  );

export const asyncDataSelector = actionName =>
  selectProperty(
    [ASYNC_STATE_KEY, 'actions', actionName, 'data'],
    null,
  );
export const asyncIsLoadingSelector = actionName =>
  selectProperty(
    [ASYNC_STATE_KEY, 'actions', actionName, 'isLoading'],
    false,
  );
export const asyncErrorSelector = actionName =>
  selectProperty(
    [ASYNC_STATE_KEY, 'actions', actionName, 'error'],
    null,
  );

export const getAsyncState = (state, actionName) =>
  asyncSelector(actionName)(state);

export const asyncSelectorObject = actionName => ({
  data: asyncDataSelector(actionName),
  isLoading: asyncIsLoadingSelector(actionName),
  error: asyncErrorSelector(actionName),
});
