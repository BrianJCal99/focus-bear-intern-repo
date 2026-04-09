import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Stack Navigation</ThemedText>
        <ThemedText>Push a new screen onto the stack navigator.</ThemedText>
        <Pressable style={styles.button} onPress={() => router.push('/detail?id=42')}>
          <ThemedText style={styles.buttonText}>Open Detail Screen</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tab Navigation</ThemedText>
        <ThemedText>Use the bottom tab bar to switch between Home and Explore.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Drawer Navigation</ThemedText>
        <ThemedText>Swipe from the left edge or tap the menu icon to open the drawer.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Modal</ThemedText>
        <Pressable style={styles.button} onPress={() => router.push('/modal')}>
          <ThemedText style={styles.buttonText}>Open Modal</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Gestures & Animations</ThemedText>
        <ThemedText>
          Explore gesture handling, Reanimated, the Animated API, and InteractionManager.
        </ThemedText>
        <Pressable style={styles.button} onPress={() => router.push('/gestures')}>
          <ThemedText style={styles.buttonText}>Open Gestures & Animations</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
