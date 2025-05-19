export interface Icon {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}