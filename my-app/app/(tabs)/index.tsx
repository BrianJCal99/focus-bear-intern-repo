import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PostsList } from '@/components/posts-list';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.heading}>
          Posts
        </ThemedText>
        <ThemedText style={styles.sub}>JSONPlaceholder · Axios</ThemedText>
      </View>
      <PostsList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 2,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 13,
    opacity: 0.45,
    marginTop: 2,
  },
});
