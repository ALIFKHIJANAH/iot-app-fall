import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Icon } from '../icon.d';

const ProfileIcon : React.FC<Icon> = ({
  width,
  height,
  stroke,
  fill
})=>{
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12a5 5 0 100-10 5 5 0 000 10z"
        stroke={stroke || '#292D32'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        opacity={0.4}
        d="M20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
        stroke={stroke || '#292D32'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ProfileIcon;
