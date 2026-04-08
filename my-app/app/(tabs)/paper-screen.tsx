import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, PaperProvider, Switch, Text } from 'react-native-paper';

// Component 1: A profile card built with react-native-paper Card
function PaperCard() {
  return (
    <Card style={styles.card} elevation={3}>
      <Card.Title
        title="Alice Nguyen"
        subtitle="Product Designer"
        left={() => (
          <View style={styles.avatar}>
            <Text variant="titleMedium" style={styles.avatarText}>AN</Text>
          </View>
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.bio}>
          Crafting beautiful mobile experiences with React Native Paper.
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined">Message</Button>
        <Button mode="contained">Follow</Button>
      </Card.Actions>
    </Card>
  );
}

// Component 2: A settings row built with react-native-paper Switch + Text
function PaperToggle() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Card style={styles.card} elevation={3}>
      <Card.Title title="Settings" />
      <Card.Content style={styles.settingsContent}>
        <View style={styles.settingRow}>
          <Text variant="bodyLarge">Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.settingRow}>
          <Text variant="bodyLarge">Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </Card.Content>
    </Card>
  );
}

export default function PaperScreen() {
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.heading}>
          react-native-paper
        </Text>
        <PaperCard />
        <PaperToggle />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  heading: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6750a4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  bio: {
    color: '#49454f',
  },
  settingsContent: {
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
