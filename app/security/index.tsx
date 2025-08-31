import { View, Text, TouchableOpacity, Pressable } from "react-native";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import Customview from "../../components/customview/index";
import { router } from "expo-router";
import { BiometricSvg, PasswordSvg, PinSvg } from "@/assets/svg";
import { BackButton } from "@/components/icons/icons";

export default function Security() {
  return (
    <>
      <Customview>
        <View className="w-screen flex h-auto min-h-screen lol:bg-gray-900 flex-col items-center bg-[url('/background.png')] bg-cover lol:bg-[url('/darkbg.png')]">
          <View className="w-screen flex flex-col items-center min-h-full h-auto px-1 pb-3 lol:text-gray-100 lol:bg-gray-950">
            <View
              aria-label="profile View"
              className="w-full h-auto py-2 flex justify-between items-center px-2 flex-row"
            >
              <View className="flex items-center flex-row">
                <BackButton />
              </View>
              <Text className="text-xl font-intermedium dark:text-white">
                Security
              </Text>
              <TouchableOpacity className="w-10 h-auto"></TouchableOpacity>
            </View>

            <View className="w-full h-auto rounded-md dark:bg-black my-3 pr-3">
              <Pressable
                className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
                onPress={() => router.push("/signup/success")}
              >
                <View className="flex-row w-4/5 items-center">
                  <BiometricSvg />
                  <Text className="font-intermedium mx-3 dark:text-white text-lg">
                    Biometrics
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#25292e"
                />
              </Pressable>
              <Pressable
                className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
                onPress={() => router.push("/security/pin")}
              >
                <View className="flex-row w-4/5 items-center">
                  <PinSvg />
                  <Text className="font-intermedium mx-3 dark:text-white text-lg">
                    Change Pin
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#25292e"
                />
              </Pressable>
              <Pressable
                className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
                onPress={() => router.push("/forgot")}
              >
                <View className="flex-row w-4/5 items-center">
                  <PasswordSvg />
                  <Text className="font-intermedium mx-3 dark:text-white text-lg">
                    Change Password
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={22}
                  color="#25292e"
                />
              </Pressable>
            </View>

            <View className="w-full absolute bottom-20 flex flex-row items-center justify-center">
              <Text className="text-red-600 text-xl font-interbold">
                Delete Account
              </Text>
            </View>
          </View>
        </View>
      </Customview>
    </>
  );
}
