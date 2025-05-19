import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { FC, useEffect } from 'react';
import { View, Text, Pressable, Dimensions, PixelRatio, Platform } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const TabsBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const TAB_BAR_HEIGHT = Dimensions.get('window').height * 0.06;
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const TAB_BAR_WIDTH = SCREEN_WIDTH / 3;
  const HEIGHT = TAB_BAR_HEIGHT;
  const WIDTH = 90;
  const GAP = (TAB_BAR_WIDTH - WIDTH) / 2;
  const translateX = useSharedValue(0);

  useEffect(() => {
    const newOffset = (() => {
      switch (state.index) {
        case 0:
          return GAP;
        case 1:
          return TAB_BAR_WIDTH + GAP;
        case 2:
          return TAB_BAR_WIDTH * 2 + GAP;
        default:
          return -TAB_BAR_WIDTH + GAP;
      }
    })();

    translateX.value = withTiming(newOffset, { duration: 100, easing: Easing.ease });
  }, [state.index]);
  const animatedTabs = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: 60,
        },
      ],
    };
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 0,
        padding: 0,
        paddingTop: 16,
        paddingBottom: 16,
        marginBottom: 16,
      }}
      key={state.index}
      className="relative flex w-full items-center justify-between rounded-full bg-white">
      <Animated.View
        className="tranform bg-primary-300 absolute left-1/2 -translate-x-1/2 rounded-[30px] px-6 py-2"
        style={[
          // animatedTabs,
          {
            height: 90,
            width: WIDTH,
            top: 0,
          },
        ]}
      />
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            className="">
            <View className="flex items-center justify-center" style={{ height: TAB_BAR_HEIGHT }}>
              <View className={`rounded-full ${false ? 'bg-[#B3C8FF]' : ''} px-6 py-2`}>
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    color: isFocused ? '#14D358' : '#292D32',
                    size: 30,
                    focused: isFocused,
                  })}
              </View>
              {/* <Text style={{ color: isFocused ? '#1D1B20' : '#9297A4' }}>{options.title}</Text> */}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabsBar;
