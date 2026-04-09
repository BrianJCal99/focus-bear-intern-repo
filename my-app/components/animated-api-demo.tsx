/**
 * AnimatedApiDemo
 *
 * Demonstrates React Native's built-in Animated API — the original animation
 * system included in core React Native (no extra package required).
 *
 * How it differs from react-native-reanimated:
 *   - Animated uses the JS thread by default, which means complex animations
 *     can drop frames when the JS thread is busy.
 *   - useNativeDriver: true offloads *transform* and *opacity* properties to
 *     the native thread. For those properties it matches Reanimated performance;
 *     for layout properties (width, height, top, left, etc.) it cannot be used.
 *   - Reanimated runs ALL animations on the UI thread via worklets, making it
 *     generally preferred for smooth, complex animations.
 *
 * Key Animated API building blocks shown here:
 *
 * Animated.Value(initial)
 *   Mutable value. Similar to useSharedValue in Reanimated.
 *
 * Animated.timing(value, config)
 *   Drives a value from its current position to a target over a duration.
 *   Config: { toValue, duration, easing, useNativeDriver }
 *
 * Animated.spring(value, config)
 *   Physics-based spring — same concept as withSpring in Reanimated.
 *
 * Animated.sequence([...animations])
 *   Runs animations in order. Equivalent to withSequence.
 *
 * Animated.parallel([...animations])
 *   Runs multiple animations at the same time. Equivalent to using multiple
 *   withSpring/withTiming calls on different shared values simultaneously.
 *
 * animation.start(callback?)
 *   Kicks off the animation. Optional callback fires when it completes.
 *
 * Animated.View / Animated.Text / Animated.Image
 *   Special wrappers that accept Animated.Value in their style prop.
 *   You can also create custom animatable components with Animated.createAnimatedComponent().
 */

import { useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function AnimatedApiDemo() {
  // ─── Fade in/out ──────────────────────────────────────────────────────────
  const opacity = useRef(new Animated.Value(1)).current;
  // useRef keeps the Animated.Value stable across renders — same as useState
  // but without triggering a re-render when the value changes.

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true, // opacity can be driven natively
    }).start(({ finished }) => {
      if (finished) fadeIn();
    });
  }

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  // ─── Scale bounce (sequence) ──────────────────────────────────────────────
  const scale = useRef(new Animated.Value(1)).current;

  function triggerScale() {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 1.4,
        useNativeDriver: true,
        speed: 20,
        bounciness: 12,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 12,
      }),
    ]).start();
  }

  // ─── Parallel: move + rotate ──────────────────────────────────────────────
  const translateX = useRef(new Animated.Value(0)).current;
  const rotateVal = useRef(new Animated.Value(0)).current;

  // Interpolate 0→1 → '0deg'→'360deg' for the rotate transform.
  // Animated.Value can't hold a string, so we map a number to a string.
  const rotate = rotateVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  function triggerParallel() {
    // Reset first, then animate
    translateX.setValue(0);
    rotateVal.setValue(0);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 80,
        duration: 700,
        easing: Easing.out(Easing.back(2)),
        useNativeDriver: true,
      }),
      Animated.timing(rotateVal, {
        toValue: 1,
        duration: 700,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Return to start
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(rotateVal, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Built into React Native — no extra package needed. Use{' '}
        <Text style={styles.code}>useNativeDriver: true</Text> for transform/opacity
        to keep animations off the JS thread.
      </Text>

      {/* ── Fade ──────────────────────────────────────────────────────── */}
      <Text style={styles.heading}>Animated.timing — fade</Text>
      <View style={styles.row}>
        <Animated.View style={[styles.box, styles.boxGreen, { opacity }]} />
        <TouchableOpacity style={styles.btn} onPress={fadeOut}>
          <Text style={styles.btnText}>Fade</Text>
        </TouchableOpacity>
      </View>

      {/* ── Scale ─────────────────────────────────────────────────────── */}
      <Text style={styles.heading}>Animated.spring — scale bounce</Text>
      <View style={styles.row}>
        <Animated.View style={[styles.box, styles.boxPurple, { transform: [{ scale }] }]} />
        <TouchableOpacity style={styles.btn} onPress={triggerScale}>
          <Text style={styles.btnText}>Bounce</Text>
        </TouchableOpacity>
      </View>

      {/* ── Parallel ──────────────────────────────────────────────────── */}
      <Text style={styles.heading}>Animated.parallel — move + rotate</Text>
      <View style={styles.row}>
        <Animated.View
          style={[
            styles.box,
            styles.boxRed,
            { transform: [{ translateX }, { rotate }] },
          ]}
        />
        <TouchableOpacity style={styles.btn} onPress={triggerParallel}>
          <Text style={styles.btnText}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  heading: { fontSize: 15, fontWeight: '700', color: '#0a7ea4', marginBottom: 4 },
  description: { fontSize: 13, color: '#555', lineHeight: 18, marginBottom: 4 },
  code: { fontFamily: 'monospace', backgroundColor: '#eee', color: '#c0392b' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
  },
  box: { width: 50, height: 50, borderRadius: 8 },
  boxGreen: { backgroundColor: '#27ae60' },
  boxPurple: { backgroundColor: '#8e44ad' },
  boxRed: { backgroundColor: '#e74c3c' },

  btn: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
