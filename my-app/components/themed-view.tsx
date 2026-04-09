import React, { useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = React.memo(function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const viewStyle = useMemo(() => [{ backgroundColor }, style], [backgroundColor, style]);

  return <View style={viewStyle} {...otherProps} />;
});
