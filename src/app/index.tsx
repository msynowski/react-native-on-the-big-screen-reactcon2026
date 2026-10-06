import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { scaled } from '../scaled';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Pressable
        hasTVPreferredFocus
        onPress={() => router.push('/focus-guide')}
        style={({ focused }) => [styles.button, focused && styles.focused]}>
        <Text style={styles.text}>TVFocusGuideView</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/tv-events')}
        style={({ focused }) => [styles.button, focused && styles.focused]}>
        <Text style={styles.text}>useTVEventHandler</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/scroll-snap')}
        style={({ focused }) => [styles.button, focused && styles.focused]}>
        <Text style={styles.text}>Scroll snapping</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push('/focus-manager')}
        style={({ focused }) => [styles.button, focused && styles.focused]}>
        <Text style={styles.text}>Focus manager</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scaled(40),
  },
  button: {
    padding: scaled(40),
    borderRadius: scaled(20),
    backgroundColor: '#333',
  },
  focused: {
    backgroundColor: '#4C8DFF',
    transform: [{ scale: 1.1 }],
  },
  text: {
    color: 'white',
    fontSize: scaled(36),
  },
});
