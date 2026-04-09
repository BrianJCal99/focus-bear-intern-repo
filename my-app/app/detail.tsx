import { Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Detail Screen</ThemedText>
      <ThemedText>Pushed onto the Stack navigator from Home.</ThemedText>
      {id ? <ThemedText>Item ID: {id}</ThemedText> : null}
      <Pressable style={styles.button} onPress={() => router.back()}>
        <ThemedText style={styles.buttonText}>Go Back</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
