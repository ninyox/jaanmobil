import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Customview from "../../components/customview";
import NinProp from "./nin";
import BvnProp from "./bvn";
import HeaderProp from "./prop";
import { BackButton, FrontButton } from "@/components/icons/icons";
// import { TermsSvg } from "@/assets/svg/legal";
import { EsimSvg } from "@/assets/svg/notifications";
export default function Coupon() {
  const [couponValue, setCouponValue] = useState("nin");

  return (
    <>
      <Customview>
        <View className="items-center px-4 min-h-full w-full h-auto flex-grow">
          <View className="w-full h-28 boder-b-[0.2px]">
            <View className="w-full items-center flex-row justify-between mb-6 mt-2">
              <BackButton />
              <Text className="text-sixt font-intermedium text-gray-900 dark:text-white">
                Legal
              </Text>
              <Text></Text>
            </View>
          </View>
          <View className="w-full h-auto flex flex-col ">
            <Pressable className="w-full flex flex-row items-center">
              <Pressable className="flex flex-row">
                <EsimSvg />
                <Text className="text-sm">Terms and Conditions</Text>
              </Pressable>
              <FrontButton />
            </Pressable>
          </View>
        </View>
      </Customview>
    </>
  );
}
