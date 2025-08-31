import React from "react";
import { View, Text } from "react-native";
import Customview from "../customview/index";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
const Skeleton = () => {
  const card = [1, 2, 3, 4];
  const opacity = useSharedValue(1);

  opacity.value = withRepeat( 
    withTiming(opacity.value === 1 ? 0.3 : 1, {
    duration: 1000,
    easing: Easing.linear,
  }),
  -1,
  true
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  return (
    <>
      <Customview>
        <View className="flex-1 w-screen h-screen justify-around flex flex-col px-3">
          {card.map((item, indexe) => (
            <Animated.View
              key={indexe}
              className="h-1/5 gap-0 flex flex-col pb-2 my-1 border-slate-300 rounded-md relative cursor-pointer w-full px-3 justify-between"
            >
              <Animated.View className="h-1/2 w-full flex flex-row justify-between items-center">
                <Animated.View
                  style={[animatedStyle]}
                  className="w-12 h-12 rounded-[50px] skeleton-loading  mx-2"
                />
                <Animated.View
                  style={[animatedStyle]}
                  className="w-auto flex-grow h-full rounded-lg skeleton-loading "
                />
              </Animated.View>
              <Animated.View
                style={[animatedStyle]}
                className="skeleton-loading  w-full rounded-lg"
              ></Animated.View>
              <Animated.View
                style={[animatedStyle]}
                className="skeleton-loading h-[15px] w-full rounded-md"
              ></Animated.View>
              <Animated.View
                style={[animatedStyle]}
                className="skeleton-loading h-[15px] w-full rounded-md"
              />
              <Animated.View
                style={[animatedStyle]}
                className="skeleton-loading h-[15px] w-full rounded-md"
              />
            </Animated.View>
          ))}
        </View>
      </Customview>
    </>
  );
};

export default Skeleton;
