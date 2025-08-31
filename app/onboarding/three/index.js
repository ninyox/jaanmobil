import { View, Text, Image, Pressable, StatusBar } from "react-native";
import React from "react";
import { router } from "expo-router";
import Customview from "../../../components/customview";
const deal = require("../../../assets/images/iconalone.png");
const deale = require("../../../assets/images/JAAN.png");
const backshape = require("../../../assets/images/display3back.png");
const pana = require("../../../assets/images/pana3.png");
import { FireJaanSvg } from "../../../assets/svg/index"
export default function DisplayTwo() {
  return (
    <>
      <Customview>

        <View className="w-screen h-screen flex flex-col justify-between items-center bg-white dark:bg-gray-950">
          <View className="w-11/12 bg-transparent rounded-md h-1/6 py-3 justify-start flex-col items-center">
            <View className="w-full bg-transparent justify-center items-center h-auto bg-red-500 flex flex-row">
              <FireJaanSvg />

            </View>

          </View>

          <View className="w-5/6 justify-between flex flex-col items-center h-2/5">
            <View className="w-full bg-transparent justify-center items-center h-full relative">
              <Image source={backshape} className="fixed top-[15%] z-[-0] h-ful bg-cover" />
              <Image source={pana} className="w-auto h-auto bg-cover absolute -top-3" />
            </View>
          </View>



          <View className="w-full px-2 bg-blue-00 rounded-md h-2/6 justify-start flex-col items-center flex">
            <View className="w-24 bg-transparent justify-around flex items-center rounded-full flex-row py-1">
              <Pressable onPress={() => router.push("/onboarding/one")} className="w-2 bg-gray-300 h-2 rounded-full" />
              <Pressable onPress={() => router.push("/onboarding/two")} className="w-2 bg-gray-300 h-2 rounded-full" />
              <View className="w-10 bg-mycolor h-2 rounded-full" />
              <Pressable onPress={() => router.push("/onboarding/four")} className="w-2 bg-gray-300 h-2 rounded-full" />
            </View>
            <View id="welcome Text" className="w-full h-auto my-5">
              <Text className="text-xl font-interbold text-black dark:text-white">
                Pay Bills Securely
              </Text>
              <Text className="text-sm font-intermedium mt-2 leading-6 text-black dark:text-white">
                Effortlessly pay your bills with secure and reliable transactions. Say goodbye to long queues
              </Text>
            </View>
            <View className="w-full h-auto items-center justify-between flex flex-row px-2">
              <Pressable
                className="w-auto h-11 rounded-[25px] items-center justify-center"
                onPress={() => router.push("/signup/email")}
              >
                <Text className="font-intermedium text-md text-mycolor">skip</Text>
              </Pressable>
              <Pressable
                className="w-2/5 h-10 rounded-[15px] bg-mycolor items-center justify-center"
                onPress={() => router.push("/onboarding/four")}
              >
                <Text className="font-interbold text-md text-white">Next</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </Customview>
    </>
  );
}
