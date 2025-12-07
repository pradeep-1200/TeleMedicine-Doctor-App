import { Stack } from 'expo-router';
import { AppointmentProvider } from '../contexts/AppointmentContext';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function AuthNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null;
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <AuthNavigator />
      </AppointmentProvider>
    </AuthProvider>
  );
}