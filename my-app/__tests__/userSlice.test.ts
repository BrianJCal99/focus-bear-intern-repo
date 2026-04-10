import reducer, { loadUsers } from '../store/userSlice';

const MOCK_USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

const initialState = { users: [], loading: false, error: null };

describe('userSlice reducer', () => {
  it('returns the initial state when called with undefined', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('sets loading=true and clears error on pending', () => {
    const state = reducer(
      { ...initialState, error: 'old error' },
      loadUsers.pending('', undefined, undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('sets users and loading=false on fulfilled', () => {
    const state = reducer(
      { ...initialState, loading: true },
      loadUsers.fulfilled(MOCK_USERS, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.users).toEqual(MOCK_USERS);
  });

  it('sets error and loading=false on rejected', () => {
    const state = reducer(
      { ...initialState, loading: true },
      loadUsers.rejected(new Error('Network error'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('falls back to default error message when rejection has no message', () => {
    const error = new Error();
    error.message = '';

    const state = reducer(
      initialState,
      loadUsers.rejected(error, '', undefined)
    );

    expect(state.error).toBe('Failed to fetch users');
  });
});
