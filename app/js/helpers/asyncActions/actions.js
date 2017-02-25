export const ASYNC_START_LOADING = 'async-action:start-loading';
export const ASYNC_STOP_LOADING = 'async-action:stop-loading';
export const ASYNC_FETCH_START = 'async-action:fetch-start';
export const ASYNC_FETCH_SUCCESS = 'async-action:fetch-success';
export const ASYNC_FETCH_ERROR = 'async-action:fetch-error';
/**
 * Start the specified async action
 *
 * @param {String} actionName of the action to start
 *
 * @returns {Object}
 */
export function startLoading(actionName) {
  return {
    type: ASYNC_START_LOADING,
    actionName,
  };
}


/**
 * Stop the specified async action
 *
 * @param {String} actionName of the action to stop
 *
 * @returns {Object}
 */
export function stopLoading(actionName) {
  return {
    type: ASYNC_STOP_LOADING,
    actionName,
  };
}


export function startFetch(actionName) {
  return {
    type: ASYNC_FETCH_START,
    actionName,
  };
}

export function successFetch(actionName, data) {
  return {
    type: ASYNC_FETCH_SUCCESS,
    actionName,
    data,
  };
}
export function errorFetch(actionName, error) {
  return {
    type: ASYNC_FETCH_ERROR,
    actionName,
    error,
  };
}

