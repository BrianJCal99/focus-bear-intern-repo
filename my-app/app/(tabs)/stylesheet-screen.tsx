import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function ProfileCard() {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <View>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.role}>React Native Developer</Text>
      </View>
    </View>
  );
}

function ActionButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Follow</Text>
    </TouchableOpacity>
  );
}

export default function StyleSheetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>StyleSheet.create()</Text>
      <ProfileCard />
      <ActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
    gap: 16,
    padding: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a202c',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4f86f7',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
  },
  role: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#4f86f7',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
