import { useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

function Custommodal({ close, visible, children }) {
  const inset = useSafeAreaInsets();
  const modalRef = useRef();
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };
  const closeDown = () => {
    console.log("called me");
    close();
  };

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      "worklet";
      pressed.value = true;
      console.log("done oo");
    })
    .onChange((event) => {
      "worklet";
      offset.value = event.translationY;
      console.log(event.translationY);
    })
    .onEnd(() => {
      "worklet";
      offset.value = withSpring(0);
      pressed.value = false;
      if (offset.value > 200) {
        try {
          closeDown();
        } catch (error) {
          console.error("error while closing", error);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <>
      <Modal
        style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}
        visible={visible}
        animationType="slide"
        transparent={true}
      >
        <BlurView style={styles.dealers} intensity={30}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Pressable
              ref={modalRef}
              onPress={closeUp}
              className="flex flex-col justify-end items-center bg-s w-screen h-full"
            >
              <Animated.View
                style={[animatedStyle]}
                className="bg-white max-h-[83.333333%] h-auto w-full flex flex-col items-center pt-4 px3 pb-10 sm:pb-0 rounded-t-[20px] relative dark:bg-dark"
              >
                <View className="w-full h-13 py-1 bordr-b-[0.2px] absolute top-0 overflow-y-contain">
                  <GestureDetector gesture={pan}>
                    <View className="w-full h-auto">
                      <View className="w-full h-auto px-2 flex items-center justify-center">
                        <View className="w-16 h-[6px] bg-mycolor rounded-full focus:bg-red-600"></View>
                      </View>
                    </View>
                  </GestureDetector>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  className="w-full h-auto mt-6 overflow-y-auto overflow-auto flex flex-col"
                >
                  {children}
                </ScrollView>
              </Animated.View>
            </Pressable>
          </GestureHandlerRootView>
        </BlurView>
      </Modal>
    </>
  );
}

export default gestureHandlerRootHOC(Custommodal);

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
    backgroundColor: "#00000090",
  },
});
