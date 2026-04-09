/**
 * GestureDemo
 *
 * Demonstrates two common gesture types using react-native-gesture-handler v2:
 *
 * 1. Pan gesture  — drag the box around; it springs back to centre on release.
 *    Key API: Gesture.Pan() with onUpdate / onEnd callbacks.
 *    `translationX / Y` is the delta from where the drag *started*, so we can
 *    assign it directly to a shared value and let Reanimated drive the transform.
 *
 * 2. LongPress gesture — hold the circle for 600 ms to scale it up.
 *    Key API: Gesture.LongPress() with minDuration / onStart / onFinalize.
 *
 * Both gestures are composed with Gesture.Simultaneous() so they can coexist
 * on the same GestureDetector if needed (here they're on separate views).
 *
 * GestureDetector is the modern replacement for the old PanResponder-based
 * components (PanGestureHandler, LongPressGestureHandler, etc.).
 *
 * IMPORTANT: GestureHandlerRootView must wrap the entire app (already done in
 * app/(drawer)/_layout.tsx) for gestures to work correctly on Android.
 */

import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useState } from 'react';

export function GestureDemo() {
  // ─── Pan gesture state ────────────────────────────────────────────────────
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [swipeLabel, setSwipeLabel] = useState('Drag me!');

  function updateSwipeLabel(x: number, y: number) {
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    if (absX < 10 && absY < 10) {
      setSwipeLabel('Drag me!');
    } else if (absX > absY) {
      setSwipeLabel(x > 0 ? 'Swiping right →' : '← Swiping left');
    } else {
      setSwipeLabel(y > 0 ? 'Swiping down ↓' : '↑ Swiping up');
    }
  }

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      // runOnJS bridges the worklet thread back to the JS thread so we can
      // call setState (which is not allowed inside a worklet directly).
      runOnJS(updateSwipeLabel)(e.translationX, e.translationY);
    })
    .onEnd(() => {
      // withSpring returns the box to its resting position with a bounce feel.
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      runOnJS(setSwipeLabel)('Drag me!');
    });

  const panStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // ─── LongPress gesture state ──────────────────────────────────────────────
  const scale = useSharedValue(1);
  const [pressLabel, setPressLabel] = useState('Hold me!');

  const longPressGesture = Gesture.LongPress()
    .minDuration(600) // ms before the gesture activates
    .onStart(() => {
      scale.value = withSpring(1.3);
      runOnJS(setPressLabel)('Activated!');
    })
    .onFinalize(() => {
      // onFinalize fires when the finger lifts or the gesture is cancelled.
      scale.value = withSpring(1);
      runOnJS(setPressLabel)('Hold me!');
    });

  const longPressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* ── Pan demo ─────────────────────────────────────────────────── */}
      <Text style={styles.heading}>Pan Gesture</Text>
      <Text style={styles.description}>
        Drag the box in any direction. It springs back on release.
        {'\n'}Uses <Text style={styles.code}>Gesture.Pan()</Text> +{' '}
        <Text style={styles.code}>withSpring()</Text>.
      </Text>

      <View style={styles.panArea}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.draggable, panStyle]}>
            <Text style={styles.boxLabel}>{swipeLabel}</Text>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* ── LongPress demo ────────────────────────────────────────────── */}
      <Text style={styles.heading}>Long Press Gesture</Text>
      <Text style={styles.description}>
        Hold the circle for 600 ms. It scales up while held.
        {'\n'}Uses <Text style={styles.code}>Gesture.LongPress()</Text>.
      </Text>

      <View style={styles.pressArea}>
        <GestureDetector gesture={longPressGesture}>
          <Animated.View style={[styles.circle, longPressStyle]}>
            <Text style={styles.boxLabel}>{pressLabel}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  heading: { fontSize: 16, fontWeight: '700', color: '#0a7ea4' },
  description: { fontSize: 13, color: '#555', lineHeight: 18 },
  code: { fontFamily: 'monospace', backgroundColor: '#eee', color: '#c0392b' },

  panArea: {
    height: 160,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  draggable: {
    width: 110,
    height: 60,
    backgroundColor: '#0a7ea4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLabel: { color: '#fff', fontWeight: '600', fontSize: 13, textAlign: 'center', paddingHorizontal: 4 },

  pressArea: {
    height: 130,
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
