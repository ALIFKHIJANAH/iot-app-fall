import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

const Menu : React.FC<IconProps> = (props)=>{
  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M3 7h18M9.49 12H21M3 12h2.99M3 17h18"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default Menu;
