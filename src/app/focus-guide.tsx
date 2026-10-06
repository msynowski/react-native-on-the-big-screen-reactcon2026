import { useState } from "react";
import {
  findNodeHandle,
  Pressable,
  StyleSheet,
  Text,
  TVFocusGuideView,
  View,
} from "react-native";

import { scaled } from "../scaled";

export default function FocusGuideScreen() {
  const [targetTop, setTargetTop] =
    useState<ReturnType<typeof findNodeHandle>>(null);
  const [targetBottom, setTargetBottom] =
    useState<ReturnType<typeof findNodeHandle>>(null);
  const [guideOn, setGuideOn] = useState(false);
  const [trapOn, setTrapOn] = useState(false);

  return (
    <View style={styles.container}>
      {/* 1. Guide: pressing down from A/B/C redirects focus to "Target" */}
      <Pressable
        hasTVPreferredFocus
        onPress={() => setGuideOn(!guideOn)}
        style={({ focused }) => [styles.button, focused && styles.focused]}
      >
        <Text style={styles.text}>Guide: {guideOn ? "ON" : "OFF"}</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable
          style={({ focused }) => [styles.button, focused && styles.focused]}
        >
          <Text style={styles.text}>A</Text>
        </Pressable>
        <Pressable
          style={({ focused }) => [styles.button, focused && styles.focused]}
        >
          <Text style={styles.text}>B</Text>
        </Pressable>
        <Pressable
          style={({ focused }) => [styles.button, focused && styles.focused]}
          ref={(ref) => {
            setTargetBottom(findNodeHandle(ref));
          }}
        >
          <Text style={styles.text}>C</Text>
        </Pressable>
      </View>

      <TVFocusGuideView
        destinations={guideOn && targetTop ? [targetTop] : []}
        style={styles.guide}
      >
        <Text style={styles.text}>Guiding to Target</Text>
      </TVFocusGuideView>
      <TVFocusGuideView
        destinations={guideOn && targetBottom ? [targetBottom] : []}
        style={styles.guide}
      >
        <Text style={styles.text}>Guiding to C</Text>
      </TVFocusGuideView>

      <View style={[styles.row, { justifyContent: "flex-end" }]}>
        <Pressable
          ref={(ref) => {
            setTargetTop(findNodeHandle(ref));
          }}
          style={({ focused }) => [styles.button, focused && styles.focused]}
        >
          <Text style={styles.text}>Target</Text>
        </Pressable>
      </View>

      {/* 2. Trap: left/right can't leave the box, autoFocus remembers the last item */}
      <Pressable
        onPress={() => setTrapOn(!trapOn)}
        style={({ focused }) => [styles.button, focused && styles.focused]}
      >
        <Text style={styles.text}>Trap: {trapOn ? "ON" : "OFF"}</Text>
      </Pressable>

      <View style={styles.row}>
        <Pressable
          style={({ focused }) => [styles.button, focused && styles.focused]}
        >
          <Text style={styles.text}>Outside</Text>
        </Pressable>

        <TVFocusGuideView
          autoFocus
          trapFocusLeft={trapOn}
          trapFocusRight={trapOn}
          style={[styles.row, styles.trap]}
        >
          <Pressable
            style={({ focused }) => [styles.button, focused && styles.focused]}
          >
            <Text style={styles.text}>1</Text>
          </Pressable>
          <Pressable
            style={({ focused }) => [styles.button, focused && styles.focused]}
          >
            <Text style={styles.text}>2</Text>
          </Pressable>
          <Pressable
            style={({ focused }) => [styles.button, focused && styles.focused]}
          >
            <Text style={styles.text}>3</Text>
          </Pressable>
        </TVFocusGuideView>

        <Pressable
          style={({ focused }) => [styles.button, focused && styles.focused]}
        >
          <Text style={styles.text}>Outside</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaled(80),
    gap: scaled(24),
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    gap: scaled(24),
  },
  button: {
    paddingVertical: scaled(16),
    paddingHorizontal: scaled(32),
    borderRadius: scaled(12),
    backgroundColor: "#333",
  },
  focused: {
    backgroundColor: "#4C8DFF",
    transform: [{ scale: 1.1 }],
  },
  text: {
    color: "white",
    fontSize: scaled(28),
  },
  guide: {
    width: "100%",
    height: "25%",
    borderWidth: scaled(2),
    borderStyle: "dashed",
    borderColor: "#4C8DFF",
    justifyContent: "center",
    alignItems: "center",
  },
  trap: {
    alignSelf: "auto",
    padding: scaled(16),
    borderWidth: scaled(2),
    borderColor: "#4C8DFF",
  },
});
