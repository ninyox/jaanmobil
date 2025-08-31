import { View, Text, Image, Pressable, StatusBar } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { FireJaanSvg, OneBoardSvg } from "../../../assets/svg/index"
import { AntDesign } from "@expo/vector-icons";
import Customview from "../../../components/customview";
const pana = require("../../../assets/images/pana.png");
export default function DisplayOne() {
  const router = useRouter()
  return (
    <>
      <Customview>
        <View className="w-screen h-screen flex flex-col justify-between py-5 items-center bg-red-00">
          <View className="w-11/12 bg-green-00 rounded-md h-1/8 justify-start flex-col items-center">
            <View className="w-full bg-transparent justify-center items-center h-auto bg-red-500 flex flex-row">
              <FireJaanSvg />
            </View>
          </View>

          <View className="w-full justify-between flex flex-col items-center h-2/5">
            <View className="w-full bg-transparent justify-center items-center h-full relative">
              <View
                className="fixed w-full top-[15%] z-[-900] h-ful bg-cover"
              >
                <OneBoardSvg width="100%"  />
              </View>
              <Image
                source={pana}
                className="w-auto h-auto bg-cover absolute top-0"
              />
            </View>
          </View>

          <View className="w-full px-2 bg-blue-00 rounded-md h-2/6 justify-start flex-col items-center flex">
            <View className="w-auto bg-transparent justify-around flex items-center rounded-full flex-row py-1">
              <View className="w-10 bg-mycolor h-2 rounded-full mx-1" />

              <Pressable
                onPress={() => router.push("../onboarding/two")}
                className="w-2 bg-gray-300 h-2 rounded-full mx-1"
              />
      
            </View>
            <View id="welcome Text" className="w-full h-auto my-5 px-3">
              <Text className="text-2xl font-interbold text-black dark:text-white">
                Welcome To JAAN
              </Text>
              <Text className="text-md font-intermedium mt-2 leading-6 text-black dark:text-white">
                JAAN is your all-in-one digital hub for seamless payments and
                connections
              </Text>
            </View>
            <View className="w-full h-auto items-center justify-between flex flex-row px-2">
              <Pressable
                className="w-auto h-11 rounded-[25px] bg-transparent items-center justify-center"
                onPress={() => router.push("../signup/email")}
              >
                <Text className="font-intermedium text-md text-mycolor">
                  skip
                </Text>
              </Pressable>
              <Pressable
                className="w-2/5 h-10 rounded-[15px] bg-mycolor items-center justify-center"
                onPress={() => router.push("../onboarding/two")}
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


