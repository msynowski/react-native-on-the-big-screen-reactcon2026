import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { scaled } from '../scaled';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ScrollSnapScreen() {
  return (
    <ScrollView snapToAlignment="item" contentContainerStyle={styles.container}>
      <View scrollSnapOffset={scaled(40)}>
        <Text style={styles.title}>Default</Text>
        <ScrollView horizontal>
          {cards.map((card) => (
            <Pressable key={card} style={({ focused }) => [styles.card, focused && styles.focused]}>
              <Text style={styles.text}>{card}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View scrollSnapOffset={scaled(40)}>
        <Text style={styles.title}>scrollSnapAlign: start</Text>
        <ScrollView horizontal snapToAlignment="item" snapToItemPadding={scaled(40)}>
          {cards.map((card) => (
            <Pressable
              key={card}
              scrollSnapAlign="start"
              style={({ focused }) => [styles.card, focused && styles.focused]}>
              <Text style={styles.text}>{card}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View scrollSnapOffset={scaled(40)}>
        <Text style={styles.title}>scrollSnapAlign: center</Text>
        <ScrollView horizontal snapToAlignment="item">
          {cards.map((card) => (
            <Pressable
              key={card}
              scrollSnapAlign="center"
              style={({ focused }) => [styles.card, focused && styles.focused]}>
              <Text style={styles.text}>{card}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View scrollSnapOffset={scaled(40)}>
        <Text style={styles.title}>scrollSnapAlign: end</Text>
        <ScrollView horizontal snapToAlignment="item" snapToItemPadding={scaled(40)}>
          {cards.map((card) => (
            <Pressable
              key={card}
              scrollSnapAlign="end"
              style={({ focused }) => [styles.card, focused && styles.focused]}>
              <Text style={styles.text}>{card}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scaled(80),
    paddingBottom: scaled(800),
    gap: scaled(60),
  },
  title: {
    color: 'white',
    fontSize: scaled(32),
    marginBottom: scaled(16),
  },
  card: {
    width: scaled(320),
    height: scaled(180),
    marginRight: scaled(32),
    borderRadius: scaled(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  focused: {
    backgroundColor: '#4C8DFF',
    transform: [{ scale: 1.1 }],
  },
  text: {
    color: 'white',
    fontSize: scaled(56),
  },
});
