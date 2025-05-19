import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000000' : '#f5f5f5',
        },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="devices"
        options={{
          title: 'Devices',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="maps"
        options={{
          title: 'Maps',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
