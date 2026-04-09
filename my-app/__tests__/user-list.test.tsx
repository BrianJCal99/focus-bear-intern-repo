import { render, screen, waitFor } from '@testing-library/react-native';
import UserList from '../components/user-list';
import { fetchUsers } from '../utils/api';

// jest.mock replaces the entire module with an auto-mocked version
jest.mock('../utils/api');

// Cast so TypeScript knows it's a jest mock
const mockFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;

const MOCK_USERS = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

describe('UserList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows a loading indicator while fetching', () => {
    // jest.fn() returns a promise that never resolves so the component stays in loading state
    mockFetchUsers.mockImplementation(() => new Promise(() => {}));

    render(<UserList />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders user names and emails after a successful fetch', async () => {
    // mockResolvedValue is shorthand for jest.fn().mockImplementation(() => Promise.resolve(...))
    mockFetchUsers.mockResolvedValue(MOCK_USERS);

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeTruthy();
      expect(screen.getByText('alice@example.com')).toBeTruthy();
      expect(screen.getByText('Bob')).toBeTruthy();
      expect(screen.getByText('bob@example.com')).toBeTruthy();
    });

    expect(mockFetchUsers).toHaveBeenCalledTimes(1);
  });

  it('displays an error message when the fetch fails', async () => {
    mockFetchUsers.mockRejectedValue(new Error('Failed to fetch users'));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeTruthy();
      expect(screen.getByText('Failed to fetch users')).toBeTruthy();
    });
  });
});
