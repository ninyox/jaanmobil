import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "../store/authstore";
import AuthState from "../store/authstate"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const deal = require("@/assets/images/logos.jpeg");

export default function Preview() {
  const { authValue } = useAuth();

  const scale = useSharedValue(0.3);
  const handletime = async () => {
    scale.value = withSpring(1, {
      damping: 3,
      stiffness: 100,
    });
    setTimeout(async () => {
      // router.push("onboarding/one");
      const fact = await AsyncStorage.getItem("token");
      if (fact) {
        router.push("home");
      } else {
        router.push("signup/verification");
        const auth = await AuthState.checkState()
        switch (auth) {
          case "none":
            router.push("onboarding/one");
            break;
          case "verification":
            router.push("signup/verification");
            break;
          case "password":
            router.push("signup/password");
            break;
          case "kyc":
            router.push("signup/kyc");
            break;
          case "pin":
            router.push("signup/pin");
            break;
          default:
            router.push("onboarding/one");
            break;
        }

      }
    }, 4000);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    // handleLogin()
    handletime();
  }, []);
  return (
    <>
      <View
        style={{ width: "100%", height: "100%", justifyContent: "center" }}
        className="flex-1 items-center justify-center w-screen h-screen bg-mycolor"
      >
        <Animated.Image
          style={[animatedStyle]}
          source={deal}
          className="h-1/3 bg-cover w-4/5"
        />
      </View>
    </>
  );
}
