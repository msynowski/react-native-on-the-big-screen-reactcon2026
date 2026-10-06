import { Image, StyleSheet, Text, TVFocusGuideView, View } from 'react-native';

import { Focusable } from '../focus/focusable';
import { useFocusedModel, useFocusStore, type FocusableModel } from '../focus/store';
import { scaled } from '../scaled';

const tiles: FocusableModel[] = [
  { id: '1', title: 'Golden Gate', image: require('../../assets/tiles/1.jpg') },
  { id: '2', title: 'Stairs', image: require('../../assets/tiles/2.jpg') },
  { id: '3', title: 'Meadow', image: require('../../assets/tiles/3.jpg') },
  { id: '4', title: 'Coastline', image: require('../../assets/tiles/4.jpg') },
  { id: '5', title: 'Night River', image: require('../../assets/tiles/5.jpg') },
];

function Hero() {
  const model = useFocusedModel();

  if (!model) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Image source={model.image} style={styles.heroImage} />
      <View style={styles.heroShade} />
      <Text style={styles.heroTitle}>{model.title}</Text>
    </View>
  );
}

export default function FocusManagerScreen() {
  const first = useFocusStore((state) => state.focusables[tiles[0].id]);

  return (
    <View style={styles.container}>
      <Hero />

      <View style={styles.row}>
        {tiles.map((tile, index) => (
          <Focusable
            key={tile.id}
            model={tile}
            hasTVPreferredFocus={index === 0}
            style={({ focused }) => [styles.tile, focused && styles.focused]}>
            <Image source={tile.image} style={styles.tileImage} />
            <Text style={styles.tileTitle}>{tile.title}</Text>
          </Focusable>
        ))}

        {/* Pressing right on the last tile jumps back to the first one */}
        <TVFocusGuideView
          destinations={first?.nodeHandle ? [first.nodeHandle] : []}
          style={styles.guide}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: scaled(80),
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '70%',
    height: '70%',
  },
  heroShade: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(17, 17, 17, 0.4)',
  },
  heroTitle: {
    marginTop: scaled(160),
    marginLeft: scaled(80),
    color: 'white',
    fontSize: scaled(96),
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: scaled(32),
  },
  tile: {
    width: scaled(320),
    borderRadius: scaled(16),
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  focused: {
    transform: [{ scale: 1.1 }],
  },
  guide: {
    width: scaled(40),
    borderWidth: scaled(2),
    borderStyle: 'dashed',
    borderColor: '#4C8DFF',
  },
  tileImage: {
    width: scaled(320),
    height: scaled(180),
  },
  tileTitle: {
    padding: scaled(16),
    color: 'white',
    fontSize: scaled(28),
  },
});
