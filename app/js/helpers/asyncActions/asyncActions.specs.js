import { expect } from 'chai';
import { ASYNC_STATE_KEY, AsyncActions, asyncReducer, getAsyncState } from './index';
import { asyncSelector, asyncDataSelector, asyncIsLoadingSelector, asyncErrorSelector } from './selectors';

describe('asyncActions helper', () => {
  describe('asyncActions reducer', () => {
    const initialState = {
      actions: {},
    };

    it('creates empty state', () => {
      expect(asyncReducer()).to.eql(initialState);
    });

    it('starts loading', () => {
      const action = {
        type: AsyncActions.ASYNC_START_LOADING,
        actionName: 'act',
      };
      expect(asyncReducer(undefined, action)).to.eql({
        actions: {
          act: {
            isLoading: true,
          },
        },
      });
    });

    it('stops loading', () => {
      const action = {
        type: AsyncActions.ASYNC_STOP_LOADING,
        actionName: 'act',
      };
      expect(asyncReducer(undefined, action)).to.eql({
        actions: {
          act: {
            isLoading: false,
          },
        },
      });
    });

    it('starts fetch', () => {
      const action = {
        type: AsyncActions.ASYNC_FETCH_START,
        actionName: 'act',
      };
      expect(asyncReducer(undefined, action)).to.eql({
        actions: {
          act: {
            isLoading: true,
          },
        },
      });
    });

    it('success fetch', () => {
      const action = {
        type: AsyncActions.ASYNC_FETCH_SUCCESS,
        actionName: 'act',
        data: 'dat',
      };
      expect(asyncReducer(undefined, action)).to.eql({
        actions: {
          act: {
            isLoading: false,
            data: 'dat',
            error: null,
          },
        },
      });
    });

    it('error fetch', () => {
      const action = {
        type: AsyncActions.ASYNC_FETCH_ERROR,
        actionName: 'act',
        error: 'err',
      };
      expect(asyncReducer(undefined, action)).to.eql({
        actions: {
          act: {
            isLoading: false,
            error: 'err',
            data: null,
          },
        },
      });
    });

    it('action on existing state', () => {
      const state = {
        actions: {
          exact: {
            isLoading: true,
            error: 'exerr',
            data: null,
          },
        },
      };

      const action = {
        type: AsyncActions.ASYNC_FETCH_ERROR,
        actionName: 'act',
        error: 'err',
      };

      expect(asyncReducer(state, action)).to.eql({
        actions: {
          exact: {
            isLoading: true,
            error: 'exerr',
            data: null,
          },
          act: {
            isLoading: false,
            error: 'err',
            data: null,
          },
        },
      });
    });
  });

  describe('asyncActions selectors', () => {
    it('asyncSelector', () => {
      const state = {
        [ASYNC_STATE_KEY]: {
          actions: {
            exact: {
              isLoading: true,
              error: 'exerr',
            },
            act: {
              isLoading: false,
              error: 'err',
            },
          },
        },
      };

      expect(asyncSelector('exact')(state)).to.equal(state[ASYNC_STATE_KEY].actions.exact);
      expect(asyncSelector('act')(state)).to.equal(state[ASYNC_STATE_KEY].actions.act);
    });

    it('gets async state', () => {
      const state = {
        [ASYNC_STATE_KEY]: {
          actions: {
            exact: {
              isLoading: true,
              error: 'exerr',
            },
            act: {
              isLoading: false,
              error: 'err',
            },
          },
        },
      };

      expect(getAsyncState(state, 'exact')).to.equal(state[ASYNC_STATE_KEY].actions.exact);
      expect(getAsyncState(state, 'act')).to.equal(state[ASYNC_STATE_KEY].actions.act);
    });

    it('gets data, error, isloading selectors', () => {
      const state = {
        [ASYNC_STATE_KEY]: {
          actions: {
            exact: {
              data: 'data',
              isLoading: true,
              error: 'exerr',
            },
          },
        },
      };

      expect(asyncDataSelector('exact')(state)).to.equal(state[ASYNC_STATE_KEY].actions.exact.data);
      expect(asyncErrorSelector('exact')(state)).to.equal(state[ASYNC_STATE_KEY].actions.exact.error);
      expect(asyncIsLoadingSelector('exact')(state)).to.equal(state[ASYNC_STATE_KEY].actions.exact.isLoading);
    });
  });
});
