import { View, Text } from 'react-native';
import React, { FC } from 'react';


export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
  testID?: string;
}

const Container: FC<ContainerProps> = ({children}) => {
  return <View className="flex flex-1 p-6">{children}</View>;
};

export default Container;
