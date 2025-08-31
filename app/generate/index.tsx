import React, { useState } from "react";
import {
  Text,
  View,
} from "react-native";
import Customview from "../../components/customview";
import NinProp from "./nin";
import BvnProp from "./bvn";
import HeaderProp from "./prop";
import { BackButton } from "@/components/icons/icons";
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
                Generate Bank Account
              </Text>
              <Text></Text>
            </View>
            <HeaderProp
              firstname="NIN"
              secondname="BVN"
              value={couponValue}
              useValue={(value: string) => setCouponValue(value)}
            />
          </View>
          {
            couponValue === "nin" ? (
              <NinProp />
            ) : (
              <BvnProp />
            )
          }
        </View>


      </Customview>
    </>
  );
}
