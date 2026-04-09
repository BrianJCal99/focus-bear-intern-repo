import { fetchPosts } from '@/services/api';

jest.mock('axios-retry', () => ({
  __esModule: true,
  default: jest.fn(),
  exponentialDelay: jest.fn(),
  isNetworkOrIdempotentRequestError: jest.fn(),
}));

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  }),
}));

// Retrieve the mock instance created when api.ts loaded
const mockAxios = jest.requireMock('axios') as any;
const mockGet = mockAxios.create.mock.results[0].value.get as jest.Mock;

describe('fetchPosts', () => {
  beforeEach(() => {
    mockGet.mockClear();
  });

  it('calls the API with correct start and limit params', async () => {
    mockGet.mockResolvedValueOnce({ data: [] });

    await fetchPosts(0, 10);

    expect(mockGet).toHaveBeenCalledWith('/posts', {
      params: { _start: 0, _limit: 10 },
    });
  });

  it('returns the posts from the response', async () => {
    const mockPosts = [
      { id: 1, userId: 1, title: 'Post one', body: 'Body one' },
      { id: 2, userId: 1, title: 'Post two', body: 'Body two' },
    ];
    mockGet.mockResolvedValueOnce({ data: mockPosts });

    const posts = await fetchPosts(0, 2);

    expect(posts).toEqual(mockPosts);
  });

  it('throws when the request fails', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchPosts(0, 10)).rejects.toThrow('Network Error');
  });
});
