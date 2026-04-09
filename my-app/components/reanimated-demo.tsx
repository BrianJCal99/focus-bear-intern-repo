/**
 * ReanimatedDemo
 *
 * Demonstrates react-native-reanimated v4 — the recommended animation library
 * for React Native because it runs animations on the UI thread (via worklets),
 * avoiding frame drops caused by the JS ↔ native bridge.
 *
 * Key concepts shown:
 *
 * useSharedValue(initial)
 *   A value that lives on the UI thread. Mutating `.value` inside a worklet
 *   (or from JS) triggers re-renders only of the Animated.View that consumes
 *   it via useAnimatedStyle — not the whole component tree.
 *
 * useAnimatedStyle(() => ({ ... }))
 *   A worklet that maps shared values → style object. Runs on the UI thread,
 *   so style updates are synchronous with the frame — no JS round-trip.
 *
 * withSpring(toValue, config?)
 *   Physics-based spring animation. Great for natural, bouncy motion.
 *
 * withTiming(toValue, { duration, easing }?)
 *   Linear or eased animation over a fixed duration.
 *
 * withSequence(...animations)
 *   Runs animations one after another on the same value.
 *
 * withRepeat(animation, numberOfReps, reverse?)
 *   Loops an animation. Pass -1 for infinite.
 */

import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

export function ReanimatedDemo() {
  // ─── Spring bounce ────────────────────────────────────────────────────────
  const bounceY = useSharedValue(0);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }],
  }));

  function triggerBounce() {
    // Jump up (-60), then spring back to 0 with overshoot.
    bounceY.value = withSequence(
      withTiming(-60, { duration: 200, easing: Easing.out(Easing.quad) }),
      withSpring(0, { damping: 6, stiffness: 150 }),
    );
  }

  // ─── Rotation (infinite spin) ─────────────────────────────────────────────
  const rotation = useSharedValue(0);
  const [spinning, setSpinning] = useState(false);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  function toggleSpin() {
    if (!spinning) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,       // repeat infinitely
        false,    // don't reverse direction
      );
    } else {
      // Cancel by animating to the nearest multiple of 360 to avoid a jump.
      rotation.value = withTiming(Math.ceil(rotation.value / 360) * 360, { duration: 300 });
    }
    setSpinning((s) => !s);
  }

  // ─── Colour pulse ─────────────────────────────────────────────────────────
  // useAnimatedStyle can also animate colours via interpolateColor.
  const pulse = useSharedValue(0);

  const pulseStyle = useAnimatedStyle(() => {
    // Interpolate 0→1 for opacity to create a pulsing effect.
    const opacity = 0.4 + pulse.value * 0.6;
    return { opacity };
  });

  function triggerPulse() {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0, { duration: 500 }),
      ),
      4,     // repeat 4 times
      false,
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        All animations run on the <Text style={styles.bold}>UI thread</Text> via worklets —
        no JS bridge bottleneck.
      </Text>

      {/* ── Spring bounce ─────────────────────────────────────────────── */}
      <Text style={styles.heading}>withSpring + withSequence</Text>
      <View style={styles.demoArea}>
        <Animated.View style={[styles.ball, styles.ballBlue, bounceStyle]} />
        <TouchableOpacity style={styles.btn} onPress={triggerBounce}>
          <Text style={styles.btnText}>Bounce</Text>
        </TouchableOpacity>
      </View>

      {/* ── Rotation ──────────────────────────────────────────────────── */}
      <Text style={styles.heading}>withRepeat + withTiming (spin)</Text>
      <View style={styles.demoArea}>
        <Animated.View style={[styles.square, spinStyle]}>
          <Text style={{ fontSize: 24 }}>⚙️</Text>
        </Animated.View>
        <TouchableOpacity style={styles.btn} onPress={toggleSpin}>
          <Text style={styles.btnText}>{spinning ? 'Stop' : 'Spin'}</Text>
        </TouchableOpacity>
      </View>

      {/* ── Opacity pulse ─────────────────────────────────────────────── */}
      <Text style={styles.heading}>withRepeat + withSequence (pulse)</Text>
      <View style={styles.demoArea}>
        <Animated.View style={[styles.ball, styles.ballOrange, pulseStyle]} />
        <TouchableOpacity style={styles.btn} onPress={triggerPulse}>
          <Text style={styles.btnText}>Pulse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  heading: { fontSize: 15, fontWeight: '700', color: '#0a7ea4', marginBottom: 4 },
  description: { fontSize: 13, color: '#555', lineHeight: 18 },
  bold: { fontWeight: '700' },

  demoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    minHeight: 90,
  },
  ball: { width: 56, height: 56, borderRadius: 28 },
  ballBlue: { backgroundColor: '#0a7ea4' },
  ballOrange: { backgroundColor: '#e67e22' },
  square: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
