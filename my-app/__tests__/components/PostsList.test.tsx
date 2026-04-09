import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { PostsList } from '@/components/posts-list';
import * as api from '@/services/api';

jest.mock('@/services/api');
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const mockPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  userId: 1,
  title: `Post title ${i + 1}`,
  body: `Post body ${i + 1}`,
}));

describe('PostsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a loading indicator on mount', () => {
    (api.fetchPosts as jest.Mock).mockReturnValue(new Promise(() => {})); // never resolves
    render(<PostsList />);
    expect(screen.getByText('Loading posts…')).toBeTruthy();
  });

  it('renders posts after successful fetch', async () => {
    (api.fetchPosts as jest.Mock).mockResolvedValue(mockPosts);
    render(<PostsList />);

    await waitFor(() => {
      expect(screen.getByText('Post title 1')).toBeTruthy();
    });

    expect(screen.getByText(/Post title 10/i)).toBeTruthy();
  });

  it('shows an error message when fetch fails', async () => {
    (api.fetchPosts as jest.Mock).mockRejectedValue(new Error('Network Error'));
    render(<PostsList />);

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeTruthy();
    });
  });

  it('loads more posts when the button is pressed', async () => {
    const nextPosts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 11,
      userId: 2,
      title: `Post title ${i + 11}`,
      body: `Post body ${i + 11}`,
    }));

    (api.fetchPosts as jest.Mock)
      .mockResolvedValueOnce(mockPosts)
      .mockResolvedValueOnce(nextPosts);

    render(<PostsList />);

    await waitFor(() => {
      expect(screen.getByText('Post title 1')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Load 10 more'));

    await waitFor(() => {
      expect(screen.getByText(/Post title 11/i)).toBeTruthy();
    });

    expect(api.fetchPosts).toHaveBeenCalledTimes(2);
    expect(api.fetchPosts).toHaveBeenNthCalledWith(2, 10, 10);
  });
});
