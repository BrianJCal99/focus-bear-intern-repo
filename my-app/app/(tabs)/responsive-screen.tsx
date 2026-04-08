import { Dimensions, Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

// Dimensions API — snapshot at module load time (does NOT update on rotation)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Derive simple breakpoints from the snapshot
const isTablet = SCREEN_WIDTH >= 768;
const numColumns = isTablet ? 3 : 2;

// ─── Component 1: Grid that adapts column count to screen width ───────────────
function AdaptiveGrid() {
  const items = ['Red', 'Green', 'Blue', 'Purple', 'Orange', 'Teal'];
  const tileSize = (SCREEN_WIDTH - 48) / numColumns; // 48 = padding (16×2) + gap (16×(cols-1))

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Dimensions API</Text>
      <Text style={styles.sectionMeta}>
        Screen: {Math.round(SCREEN_WIDTH)} × {Math.round(SCREEN_HEIGHT)}px
        {'  ·  '}
        {numColumns} columns ({isTablet ? 'tablet' : 'phone'})
      </Text>
      <View style={styles.grid}>
        {items.map((label) => (
          <View
            key={label}
            style={[
              styles.tile,
              { width: tileSize, height: tileSize, backgroundColor: colorMap[label] },
            ]}>
            <Text style={styles.tileLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Component 2: Live dimensions + platform info via hooks ──────────────────
function LiveInfo() {
  // useWindowDimensions re-renders on rotation/resize — Dimensions.get() does not
  const { width, height, fontScale, scale } = useWindowDimensions();

  const isLandscape = width > height;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>useWindowDimensions + Platform</Text>

      <View style={[styles.infoCard, isLandscape ? styles.infoCardLandscape : styles.infoCardPortrait]}>
        <Row label="Orientation" value={isLandscape ? 'Landscape' : 'Portrait'} />
        <Row label="Window width" value={`${Math.round(width)}px`} />
        <Row label="Window height" value={`${Math.round(height)}px`} />
        <Row label="Pixel ratio" value={String(scale)} />
        <Row label="Font scale" value={String(fontScale)} />
        <Row label="Platform OS" value={Platform.OS} />
        <Row label="Platform version" value={String(Platform.Version)} />
        <Row
          label="Select example"
          value={Platform.select({ ios: 'iOS value', android: 'Android value', default: 'Other' })!}
        />
      </View>

      <Text style={styles.hint}>
        Rotate the device (or resize the web window) — only this card updates live.
        The grid above uses the static Dimensions snapshot and stays fixed.
      </Text>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function ResponsiveScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Responsiveness Utilities</Text>
      <AdaptiveGrid />
      <LiveInfo />
    </ScrollView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const colorMap: Record<string, string> = {
  Red: '#f87171',
  Green: '#4ade80',
  Blue: '#60a5fa',
  Purple: '#c084fc',
  Orange: '#fb923c',
  Teal: '#2dd4bf',
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    gap: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a202c',
    marginTop: 8,
  },

  // Section wrapper
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3748',
  },
  sectionMeta: {
    fontSize: 12,
    color: '#718096',
  },

  // Grid (Component 1)
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tile: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  // Info card (Component 2)
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  // Landscape: two-column layout for the info rows
  infoCardPortrait: {},
  infoCardLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 6,
    minWidth: '45%', // lets rows sit side-by-side in landscape
  },
  rowLabel: {
    fontSize: 13,
    color: '#4a5568',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d3748',
  },
  hint: {
    fontSize: 12,
    color: '#a0aec0',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
