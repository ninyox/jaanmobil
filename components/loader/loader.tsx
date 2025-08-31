import { Image, Modal, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from "react-native-reanimated";
const deal = require("../../assets/icon.png");
export default function Loader({ isLoading }:{isLoading:boolean}) {
  const thewidth = useSharedValue(50);
  const theheight = useSharedValue(50);

  useEffect(() => {
    const interval = setInterval(() => {
      thewidth.value = withSequence(
        withSpring(thewidth.value + 20),
        withSpring(50)
      );
      theheight.value = withSequence(
        withSpring(theheight.value + 20),
        withSpring(50)
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  const animatedStyle = {
    width: thewidth,
    height: theheight,
  };
  return (
    <>
      <Modal visible={isLoading} transparent={true} animationType="fade">
        <BlurView intensity={50} style={styles.dealers}>
          <Animated.View style={[styles.box, animatedStyle]}>
            <Image source={deal} className="w-full h-full rounded-full p-3" />
            {/* <JaanLogoSvg /> */}
          </Animated.View>
        </BlurView>
      </Modal>
    </>
  );
}

import { StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import { JaanLogoSvg, OutLoadSvg } from "@/assets/svg";
const { height, width } = Dimensions.get("window");
export const styles = StyleSheet.create({
  box: {
    backgroundColor: "#ffffff",
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  dealers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#33333380",
  },
});
