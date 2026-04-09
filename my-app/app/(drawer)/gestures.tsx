/**
 * Gestures & Animations screen
 *
 * A single scrollable screen that combines four demo components:
 *   1. GestureDemo          — react-native-gesture-handler (Pan + LongPress)
 *   2. ReanimatedDemo       — react-native-reanimated v4 (useSharedValue, withSpring, etc.)
 *   3. AnimatedApiDemo      — built-in Animated API (timing, spring, parallel, sequence)
 *   4. InteractionManagerDemo — InteractionManager.runAfterInteractions
 *
 * Each section has a collapsible so you can focus on one topic at a time.
 */

import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Collapsible } from '@/components/ui/collapsible';
import { ThemedText } from '@/components/themed-text';
import { GestureDemo } from '@/components/gesture-demo';
import { ReanimatedDemo } from '@/components/reanimated-demo';
import { AnimatedApiDemo } from '@/components/animated-api-demo';
import { InteractionManagerDemo } from '@/components/interaction-manager-demo';

export default function GesturesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <ThemedText type="title" style={styles.pageTitle}>
          Gestures & Animations
        </ThemedText>
        <ThemedText style={styles.intro}>
          Tap a section to expand it and interact with each demo.
        </ThemedText>

        {/* ── 1. Gesture Handler ──────────────────────────────────────── */}
        <View style={styles.section}>
          <Collapsible title="1 · react-native-gesture-handler">
            <GestureDemo />
          </Collapsible>
        </View>

        {/* ── 2. Reanimated ───────────────────────────────────────────── */}
        <View style={styles.section}>
          <Collapsible title="2 · react-native-reanimated">
            <ReanimatedDemo />
          </Collapsible>
        </View>

        {/* ── 3. Animated API ─────────────────────────────────────────── */}
        <View style={styles.section}>
          <Collapsible title="3 · Animated API (built-in)">
            <AnimatedApiDemo />
          </Collapsible>
        </View>

        {/* ── 4. InteractionManager ───────────────────────────────────── */}
        <View style={styles.section}>
          <Collapsible title="4 · InteractionManager">
            <InteractionManagerDemo />
          </Collapsible>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, gap: 4, paddingBottom: 40 },
  pageTitle: { marginBottom: 4 },
  intro: { marginBottom: 12, opacity: 0.6 },
  section: { marginBottom: 8 },
});
