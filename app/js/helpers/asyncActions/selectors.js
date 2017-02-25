import{ ASYNC_STATE_KEY } from'./index';
import{ selectProperty } from'../redux';

export function getAsyncState(state, actionName) {
  return selectProperty(
    [ASYNC_STATE_KEY, 'actions', actionName],
    {},
  )(state);
}
