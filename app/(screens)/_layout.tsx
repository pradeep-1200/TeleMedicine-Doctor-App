import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="appointment-details/[id]" />
      <Stack.Screen name="call/[id]" />
      <Stack.Screen name="call-summary/[id]" />
      <Stack.Screen name="prescription/[id]" />
      <Stack.Screen name="incoming-call/[id]" />
    </Stack>
  );
}