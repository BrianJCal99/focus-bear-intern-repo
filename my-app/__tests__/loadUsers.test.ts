import { configureStore } from '@reduxjs/toolkit';
import { fetchUsers } from '../utils/api';
import userReducer, { loadUsers } from '../store/userSlice';

jest.mock('../utils/api');
const mockFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;

const MOCK_USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Use a fresh store per test to avoid state leaking between tests
function makeStore() {
  return configureStore({ reducer: { users: userReducer } });
}

describe('loadUsers async thunk', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sets loading=true while the request is in flight', async () => {
    let resolve!: (value: typeof MOCK_USERS) => void;
    mockFetchUsers.mockImplementation(() => new Promise((r) => (resolve = r)));

    const store = makeStore();
    const promise = store.dispatch(loadUsers());

    expect(store.getState().users.loading).toBe(true);

    resolve(MOCK_USERS);
    await promise;
  });

  it('populates users and clears loading on success', async () => {
    mockFetchUsers.mockResolvedValue(MOCK_USERS);

    const store = makeStore();
    await store.dispatch(loadUsers());

    const { users, loading, error } = store.getState().users;
    expect(users).toEqual(MOCK_USERS);
    expect(loading).toBe(false);
    expect(error).toBeNull();
  });

  it('sets error and clears loading on failure', async () => {
    mockFetchUsers.mockRejectedValue(new Error('Network error'));

    const store = makeStore();
    await store.dispatch(loadUsers());

    const { users, loading, error } = store.getState().users;
    expect(error).toBe('Network error');
    expect(loading).toBe(false);
    expect(users).toEqual([]);
  });
});
