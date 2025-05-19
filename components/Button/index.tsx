import React, { FC } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'full';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: string;
  textStyle?: object;
  testID?: string;
}

const Button: FC<ButtonProps> = ({ variant, title, size, style, onPress }) => {
  const buttonStyles = {
    primary: {
      container: 'text-primary bg-primary',
      text: 'text-white',
    },
    secondary: {
      container: 'text-primary bg-primary',
      text: 'text-primary',
    },
  };

  const buttonSizeStyles = {
    small: 'px-2 py-1',
    medium: 'px-4 py-2',
    large: 'px-6 py-3',
    full: 'w-full px-4 py-6',
  };
  return (
    <TouchableHighlight
      underlayColor="#7383F7"
      className={`rounded-full bg-primary px-4 py-5 ${buttonStyles[variant || 'primary'].container} ${buttonSizeStyles[size || 'full']} ${style}`}
      onPress={() => {
        onPress ? onPress() : null;
      }}>
      <Text className={`${buttonStyles[variant || 'primary'].text} text-[15px] font-medium`}>
        {title}
      </Text>
    </TouchableHighlight>
  );
};

export default Button;
