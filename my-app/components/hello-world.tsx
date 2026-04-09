import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HelloWorld() {
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello World</Text>
      <TouchableOpacity style={styles.button} onPress={() => setPressed(true)}>
        <Text style={styles.buttonText}>Click me!</Text>
      </TouchableOpacity>
      {pressed && <Text style={styles.feedback}>Button was pressed!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    letterSpacing: 1,
  },
  feedback: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
  },
});
