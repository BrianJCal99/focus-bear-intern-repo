import {
  Button,
  Card,
  createTheme,
  ListItem,
  Switch,
  Text,
  ThemeProvider,
} from "@rneui/themed";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const theme = createTheme({
  lightColors: {
    primary: "#2563eb",
    secondary: "#7c3aed",
  },
});

// Component 1: A profile card built with @rneui/themed Card + Button
function RneuiCard() {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Bob Martinez</Card.Title>
      <Card.Divider />
      <Text style={styles.bio}>
        Building cross-platform apps with RNEUIs pre-styled component library.
      </Text>
      <View style={styles.role}>
        <Text style={styles.roleText}>Full-Stack Engineer</Text>
      </View>
      <View style={styles.buttonRow}>
        <Button type="outline" containerStyle={styles.btn}>
          Message
        </Button>
        <Button containerStyle={styles.btn}>Follow</Button>
      </View>
    </Card>
  );
}

// Component 2: A settings list built with @rneui/themed ListItem + Switch
function RneuiList() {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);

  return (
    <Card containerStyle={styles.card}>
      <Card.Title>Connectivity</Card.Title>
      <Card.Divider />
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Wi-Fi</ListItem.Title>
          <ListItem.Subtitle>Connected to HomeNetwork</ListItem.Subtitle>
        </ListItem.Content>
        <Switch value={wifi} onValueChange={setWifi} />
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Bluetooth</ListItem.Title>
          <ListItem.Subtitle>No devices paired</ListItem.Subtitle>
        </ListItem.Content>
        <Switch value={bluetooth} onValueChange={setBluetooth} />
      </ListItem>
    </Card>
  );
}

export default function RneuiScreen() {
  return (
    <ThemeProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text h4 h4Style={styles.heading}>
          @rneui/themed
        </Text>
        <RneuiCard />
        <RneuiList />
      </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  heading: {
    textAlign: "center",
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    margin: 0,
  },
  bio: {
    color: "#4b5563",
    marginBottom: 12,
    textAlign: "center",
  },
  role: {
    backgroundColor: "#ede9fe",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginBottom: 16,
  },
  roleText: {
    color: "#7c3aed",
    fontWeight: "600",
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  btn: {
    flex: 1,
  },
});
