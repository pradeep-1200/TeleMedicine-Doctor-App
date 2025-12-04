import { Stack } from 'expo-router';
import { AppointmentProvider } from '../contexts/AppointmentContext';

export default function RootLayout() {
  return (
    <AppointmentProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
    </AppointmentProvider>
  );
}