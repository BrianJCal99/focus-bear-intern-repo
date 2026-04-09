import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerActiveTintColor: colors.tint,
          headerShown: true,
          // Use Ionicons instead of the default PNG toggle icon,
          // which Metro can't resolve from node_modules in Expo SDK 55.
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 16 }}>
              <Ionicons name="menu" size={24} color={colors.text} />
            </Pressable>
          ),
        })}>
        <Drawer.Screen
          name="(tabs)"
          options={{ drawerLabel: 'Home', title: 'Home' }}
        />
        <Drawer.Screen
          name="settings"
          options={{ drawerLabel: 'Settings', title: 'Settings' }}
        />
        <Drawer.Screen
          name="profile"
          options={{ drawerLabel: 'Profile', title: 'Profile' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
