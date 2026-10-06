import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useTVEventHandler,
  View,
  type HWEvent,
} from "react-native";

import { scaled } from "../scaled";

export default function TVEventsScreen() {
  const [lastEvent, setLastEvent] = useState<HWEvent | null>(null);

  useTVEventHandler((event) => setLastEvent(event));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last TV event</Text>
      <Pressable hasTVPreferredFocus>
        <Text style={styles.code}>
          {lastEvent
            ? JSON.stringify(lastEvent, null, 2)
            : "Press any button on the remote"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: scaled(32),
  },
  title: {
    color: "white",
    fontSize: scaled(48),
  },
  code: {
    color: "#4C8DFF",
    fontSize: scaled(32),
    fontFamily: "Menlo",
  },
});
