import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fetchPosts, Post } from '@/services/api';

const PAGE_SIZE = 10;
const TOTAL_POSTS = 100;
const brand = '#635BFF';

const PostCard = React.memo(function PostCard({ post }: { post: Post }) {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, { backgroundColor: brand }]}>
          <Text style={styles.avatarText}>U{post.userId}</Text>
        </View>
        <View style={styles.metaColumn}>
          <Text style={[styles.userId, { color: brand }]}>User {post.userId}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: brand + '22' }]}>
              <Text style={[styles.badgeText, { color: brand }]}>#{post.id}</Text>
            </View>
          </View>
        </View>
      </View>

      <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
        {post.title}
      </ThemedText>

      <View style={[styles.divider, { backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0' }]} />

      <ThemedText style={styles.body} numberOfLines={3}>
        {post.body}
      </ThemedText>
    </View>
  );
});

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scheme = useColorScheme() ?? 'light';
  const tint = Colors[scheme].tint;

  const load = useCallback(async (start: number, append: boolean) => {
    try {
      const data = await fetchPosts(start, PAGE_SIZE);
      setPosts(prev => (append ? [...prev, ...data] : data));
      setError(null);
    } catch (err: any) {
      setError(err.message ?? 'Failed to fetch posts');
    }
  }, []);

  useEffect(() => {
    load(0, false).finally(() => setLoading(false));
  }, [load]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await load(posts.length, true);
    setLoadingMore(false);
  };

  const hasMore = posts.length < TOTAL_POSTS;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={tint} />
        <ThemedText style={styles.loadingText}>Loading posts…</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <ThemedText type="defaultSemiBold" style={styles.errorText}>{error}</ThemedText>
        <Pressable
          onPress={() => { setError(null); setLoading(true); load(0, false).finally(() => setLoading(false)); }}
          style={[styles.loadMoreBtn, { backgroundColor: tint, paddingHorizontal: 24 }]}>
          <Text style={styles.loadMoreText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.countRow}>
        <ThemedText style={styles.countText}>
          Showing <Text style={[styles.countBold, { color: tint }]}>{posts.length}</Text> of{' '}
          <Text style={styles.countBold}>{TOTAL_POSTS}</Text> posts
        </ThemedText>
      </View>

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasMore && (
        <Pressable
          onPress={handleLoadMore}
          disabled={loadingMore}
          style={({ pressed }) => [
            styles.loadMoreBtn,
            { backgroundColor: tint, opacity: pressed || loadingMore ? 0.75 : 1 },
          ]}>
          {loadingMore ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.loadMoreText}>Load 10 more</Text>
          )}
        </Pressable>
      )}

      {!hasMore && (
        <ThemedText style={styles.endText}>All {TOTAL_POSTS} posts loaded</ThemedText>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 32,
  },
  loadingText: {
    opacity: 0.5,
    fontSize: 14,
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: 36,
  },
  errorText: {
    color: '#E53935',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },
  countText: {
    fontSize: 13,
    opacity: 0.55,
  },
  countBold: {
    fontWeight: '700',
    opacity: 1,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardLight: {
    backgroundColor: '#ffffff',
  },
  cardDark: {
    backgroundColor: '#1e2025',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  metaColumn: {
    gap: 4,
  },
  userId: {
    fontWeight: '600',
    fontSize: 13,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 15,
    lineHeight: 22,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.65,
  },
  loadMoreBtn: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  endText: {
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.45,
    fontSize: 13,
  },
});
