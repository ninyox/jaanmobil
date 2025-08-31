import { useColorScheme } from 'react-native';

export const usePlaceholderColor = () => {
  const colorScheme = useColorScheme();
  
  return {
    primary: colorScheme === 'dark' ? '#888888' : '#666666',
    secondary: colorScheme === 'dark' ? '#999999' : '#777777',
    light: colorScheme === 'dark' ? '#AAAAAA' : '#999999',
    muted: colorScheme === 'dark' ? '#555555' : '#CCCCCC',
  };
};

export const getPlaceholderColor = (isDark: boolean, variant: 'primary' | 'secondary' | 'light' | 'muted' = 'primary') => {
  const colors = {
    primary: isDark ? '#888888' : '#666666',
    secondary: isDark ? '#999999' : '#777777',
    light: isDark ? '#AAAAAA' : '#999999',
    muted: isDark ? '#555555' : '#CCCCCC',
  };
  
  return colors[variant];
};

export const placeholderColors = {
  light: {
    primary: '#666666',
    secondary: '#777777',
    light: '#999999',
    muted: '#CCCCCC',
  },
  dark: {
    primary: '#888888',
    secondary: '#999999',
    light: '#AAAAAA',
    muted: '#555555',
  },
};