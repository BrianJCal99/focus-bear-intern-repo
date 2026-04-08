import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
<Tabs.Screen
        name="stylesheet-screen"
        options={{
          title: 'StyleSheet',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet.rectangle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inline-screen"
        options={{
          title: 'Inline',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.alignleft" color={color} />,
        }}
      />
      <Tabs.Screen
        name="paper-screen"
        options={{
          title: 'Paper',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rneui-screen"
        options={{
          title: 'RNEUI',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2" color={color} />,
        }}
      />
      <Tabs.Screen
        name="responsive-screen"
        options={{
          title: 'Responsive',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.up.left.and.arrow.down.right" color={color} />,
        }}
      />
    </Tabs>
  );
}
