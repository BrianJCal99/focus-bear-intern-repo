/**
 * InteractionManagerDemo
 *
 * Demonstrates React Native's InteractionManager — a scheduler that lets you
 * defer expensive work until after animations and interactions have completed.
 *
 * The problem it solves:
 *   React Native has a single JS thread. If you kick off a heavy computation
 *   (e.g. parsing a large JSON, rendering a big list, running a sync algorithm)
 *   at the same time a navigation transition or animation is playing, the JS
 *   thread gets blocked, causing the animation to stutter or freeze.
 *
 * The solution:
 *   InteractionManager.runAfterInteractions(task)
 *   Queues the task to run *after* all currently-registered interactions finish.
 *   Navigation libraries (React Navigation) register interactions during screen
 *   transitions, so your heavy work automatically waits until the transition ends.
 *
 * Returned handle:
 *   runAfterInteractions returns a cancellable promise-like handle. Call
 *   handle.cancel() inside a useEffect cleanup to avoid running deferred work
 *   after the component has unmounted.
 *
 * createInteractionHandle() / clearInteractionHandle(handle):
 *   You can manually signal the start/end of an interaction (e.g. your own
 *   custom animation) so that InteractionManager knows to wait for it.
 *
 * Practical tip:
 *   Wrap route components' initial data-fetch or heavy computation in
 *   runAfterInteractions to keep screen transitions silky smooth.
 */

import { useEffect, useRef, useState } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Simulated expensive work — counts up to a large number.
function heavyComputation(): number {
  let result = 0;
  for (let i = 0; i < 5_000_000; i++) {
    result += Math.sqrt(i);
  }
  return Math.round(result);
}

type RunMode = 'immediate' | 'deferred' | null;

export function InteractionManagerDemo() {
  const [status, setStatus] = useState<string>('Press a button to start.');
  const [elapsed, setElapsed] = useState<number | null>(null);
  const interactionHandle = useRef<ReturnType<typeof InteractionManager.runAfterInteractions> | null>(null);

  // A looping animation to visualise whether the JS thread is blocked.
  // If the bar freezes when you press "Run immediately", the JS thread is busy.
  const progress = useSharedValue(0);
  const barStyle = useAnimatedStyle(() => ({
    width: `${(progress.value % 1) * 100}%`,
  }));

  useEffect(() => {
    // Start a continuous animation so we can see if the JS thread gets blocked.
    progress.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1,
      false,
    );

    return () => {
      // Clean up any pending deferred task on unmount.
      interactionHandle.current?.cancel();
    };
  }, []);

  function runImmediately() {
    setStatus('Running on JS thread now...');
    setElapsed(null);

    // Use setTimeout(0) so the status text re-renders before we block the thread.
    setTimeout(() => {
      const start = Date.now();
      const result = heavyComputation();
      const ms = Date.now() - start;
      setStatus(`Done (immediate). Result: ${result}`);
      setElapsed(ms);
    }, 0);
  }

  function runDeferred() {
    setStatus('Waiting for interactions to finish...');
    setElapsed(null);

    interactionHandle.current = InteractionManager.runAfterInteractions(() => {
      const start = Date.now();
      const result = heavyComputation();
      const ms = Date.now() - start;
      setStatus(`Done (deferred). Result: ${result}`);
      setElapsed(ms);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        The animated bar runs continuously on the <Text style={styles.bold}>UI thread</Text>{' '}
        (Reanimated worklet). The heavy computation runs on the <Text style={styles.bold}>JS thread</Text>.{'\n\n'}
        Press <Text style={styles.bold}>Run immediately</Text> — notice the bar may hitch.{'\n'}
        Press <Text style={styles.bold}>Run deferred</Text> — InteractionManager delays the work
        until animations settle, keeping the UI smooth.
      </Text>

      {/* ── Animation health bar ──────────────────────────────────────── */}
      <Text style={styles.heading}>UI Thread Activity</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.bar, barStyle]} />
      </View>

      {/* ── Buttons ───────────────────────────────────────────────────── */}
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.btn, styles.btnRed]} onPress={runImmediately}>
          <Text style={styles.btnText}>Run immediately</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnBlue]} onPress={runDeferred}>
          <Text style={styles.btnText}>Run deferred</Text>
        </TouchableOpacity>
      </View>

      {/* ── Status ────────────────────────────────────────────────────── */}
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{status}</Text>
        {elapsed !== null && (
          <Text style={styles.elapsedText}>Elapsed: {elapsed} ms</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  heading: { fontSize: 15, fontWeight: '700', color: '#0a7ea4' },
  description: { fontSize: 13, color: '#555', lineHeight: 19 },
  bold: { fontWeight: '700' },

  track: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
  },

  buttons: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnRed: { backgroundColor: '#e74c3c' },
  btnBlue: { backgroundColor: '#0a7ea4' },
  btnText: { color: '#fff', fontWeight: '700' },

  statusBox: {
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    padding: 14,
    gap: 4,
  },
  statusText: { fontSize: 13, color: '#333' },
  elapsedText: { fontSize: 13, fontWeight: '700', color: '#0a7ea4' },
});
