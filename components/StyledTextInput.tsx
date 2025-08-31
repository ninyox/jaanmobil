import React from 'react';
import { TextInput, TextInputProps, useColorScheme } from 'react-native';
import { getPlaceholderColor } from '../utils/placeholderStyles';

interface StyledTextInputProps extends TextInputProps {
  placeholderVariant?: 'primary' | 'secondary' | 'light' | 'muted';
  customPlaceholderColor?: string;
}

export const StyledTextInput: React.FC<StyledTextInputProps> = ({
  placeholderVariant = 'primary',
  customPlaceholderColor,
  className = '',
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const placeholderColor = customPlaceholderColor || getPlaceholderColor(isDark, placeholderVariant);
  
  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderColor}
      className={`${className} ${isDark ? 'text-white' : 'text-black'}`}
    />
  );
};

export default StyledTextInput;