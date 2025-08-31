"use client";

import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Log } from "./log.js";
import { Modal, Pressable, TextCheckbox,View,Text, TextInput, ScrollView, KeyboardAvoidingView} from "react-native";
import Checkbox from "expo-checkbox";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  gestureHandlerRootHOC
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";


export default function Reportmodal({ close, value }) {
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("malicious");
  const [context, setContext] = useState("");
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };
  const closeDown = () => {
    console.log("called me")
    close();
  
};
  const pan = Gesture.Pan()
  .runOnJS(true)
    .onBegin(() => {
      'worklet';
      pressed.value = true;
      console.log("done oo");
    })
    .onChange((event) => {
      'worklet';
      offset.value = event.translationY;
      console.log(event.translationY)
     
    })
    .onEnd(() => { 
      'worklet';
      offset.value = withSpring(0);
      pressed.value = false;
      if(offset.value > 200){
        try{
          closeDown()
        }
        catch(error){
          console.error("error while closing",error)
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  
  const handleSubmit = async () => {
    if (value === "" || value === undefined || value === null) {
      alert("Unable to report!");
      return;
    }
    try {
      const response = await Log(value, sorts, context);
      alert(response.message);
    } catch (error) {
      alert("Currently unable to report!");
    }
  };

  return (
    <>
      <Modal transparent={true} animationType="slide">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Pressable
          ref={modalRef}
          onPress={(event) => closeUp(event)}
          className="fixed inset-0 backdrop-blur-sm bg-setgray bg-opacity-50 w-screen h-screen flex flex-col justify-end sm:justify-center items-center"
        >
          
          <Animated.View
            className="bg-white h-auto w-screen flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between lol:bg-gray-900 sm:rounded-[30px]"
            style={[animatedStyle]}
          >
            <GestureDetector gesture={pan}>
            <View className="w-full h-8 py-1">
              <View className="w-full h-auto px-2 flex items-center justify-center">
                <View className="w-16 h-[6px] bg-mycolor rounded-full"></View>
              </View>
            </View>
            </GestureDetector>
           
            <ScrollView>
            <View className="w-full h-auto pb-10">
              <View className="w-full h-auto mb-3">
                <Text className="font-interbold text-lg">Reason?</Text>
                <View className="w-full border-slate-300 rounded-md h-auto">
                  <View className="w-full flex items-center justify-between px-2 my-3 flex-row">
                    <Text className="text-sm font-intermedium">Malicious Ad</Text>
                    <Checkbox
                      onValueChange={() => setSort("malicious")}
                      value={sorts === "malicious"}
                      className=" w-4 h-4"
                    />
                  </View>
                  <View className="w-full flex items-center justify-between px-2 my-3 flex-row">
                    <Text className="text-sm font-intermedium">Fake Listing</Text>
                    <Checkbox
                    onValueChange={() => setSort("fake")}
                    value={sorts === "fake"}
                      className="w-4 h-4"
                    />
                  </View>
                  <View className="w-full flex items-center justify-between px-2 my-3 flex-row">
                    <Text className="text-sm font-intermedium">
                      Sensitive or Disturbing Media
                    </Text>
                    <Checkbox
                      onValueChange={() => setSort("sensitive")}
                      value={sorts === "sensitive"}
                      className="w-4 h-4"
                    />
                  </View>
                  <View className="w-full flex items-center justify-between px-2 my-3 flex-row">
                    <Text className="text-sm font-intermedium">
                      Violent % hateful entity
                    </Text>
                    <Checkbox
                      onValueChange={() => setSort("violent")}
                      value={sorts === "violent"}
                      className="w-4 h-4"
                    />
                  </View>
                  <View className="w-full flex items-center justify-between px-2 my-3 flex-row">
                    <Text className="text-sm font-intermedium">Child Safety</Text>
                    <Checkbox
                      onValueChange={() => setSort("child")}
                      value={sorts === "child"}
                      className="w-4 h-4"
                    />
                  </View>
                </View>

              </View>
              <View className="w-full bg-slate-100 lol:bg-gray-700 h-1 my-8 flex"></View>
              <View className="w-full h-auto mb-3">
                <Text className="font-intermedium text-md text-slate-900 lol:text-gray-200">
                  Additional Context:
                </Text>
                <KeyboardAvoidingView>
                <View className="w-full h-auto flex justify-around">
                  <TextInput
                    className="w-full h-20 border rounded-md lol:bg-gray-900 bg-transparent p-2 outline-mycolor"
                    type="number"
                    value={context}
                    onChangeText={(e) => setContext(e)}
                  />
                </View>
                </KeyboardAvoidingView>
                
              </View>
            </View>

            <View className="mt-5 w-full h-auto flex items-center justify-around py-2 mb-3 flex-row">
              <Pressable
                onPress={() => close()}
                className="w-auto px-7 h-8 bg-slate-300 text-sm font-interbold rounded-full py-1"
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => handleSubmit()}
                className="w-half h-10 bg-mycolor text-white font-interbold text-sm rounded-full py-1 flex flex-row items-center justify-center"
              >
               <Text className="text-white font-interbold">Submit</Text>
              </Pressable>
            </View>
            </ScrollView>
          </Animated.View>
          
        </Pressable>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
}