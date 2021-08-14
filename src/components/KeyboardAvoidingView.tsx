import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useKeyboardInset } from "../context/KeyboardContext";

type KeyboardAvoidingViewProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const KeyboardAvoidingView = ({ style = {}, children }: KeyboardAvoidingViewProps) => {
  const animatedInset = useSharedValue(0);
  const { inset, duration } = useKeyboardInset();

  const tabBarHeight = useBottomTabBarHeight();
  const { bottom: safeAreaHeight } = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: animatedInset.value,
    };
  });

  useEffect(() => {
    if (inset === 0) {
      animatedInset.value = withTiming(0, {
        duration,
      });
    } else {
      const offset = tabBarHeight ? tabBarHeight : safeAreaHeight;
      animatedInset.value = withTiming(inset - offset, {
        duration,
      });
    }
  }, [inset]);

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default KeyboardAvoidingView;
