import { Stack } from 'expo-router';
import { TVEventControl } from 'react-native';
import { LogBox } from 'react-native';

TVEventControl.enableTVMenuKey();
LogBox.ignoreAllLogs();

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#111' },
      }}
    />
  );
}
