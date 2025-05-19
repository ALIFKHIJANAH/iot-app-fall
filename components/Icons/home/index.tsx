import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface Icon {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

const HomeIcon: React.FC<Icon> = ({ width, height, fill, stroke }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        opacity={0.34}
        d="M12 18v-3"
        stroke={stroke || '#292D32'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.07 2.82L3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01z"
        stroke={stroke || '#292D32'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
