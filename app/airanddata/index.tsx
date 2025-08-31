import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Customview from "../../components/customview";
import CouponProp from "./prop";
import AirtimeProp from "../airtime";
import DataProp from "../data";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
export default function AirandData() {
  const { id } = useLocalSearchParams();
  const [couponValue, setCouponValue] = useState("airtime");

  useEffect(() => {
    if (id === "data") {
      setCouponValue("data");
    } else if (id === "airtime") {
      setCouponValue("airtime");
    }
  }, [id]);

  return (
    <>
      <Customview>
        <View className="items-center px-4 pb-10 min-h-screen relative w-full h-auto flex-grow flex-1">
          <View className="w-full h-28 ">
            <View className="w-full items-center flex-row justify-between mb-3 pb-6 border-gray-300 dark:border-gray-700 mt-2 border-b-[0.2px]">
              <AntDesign
                name="left"
                size={18}
                color="white"
                className="hidden dark:flex"
                onPress={() => router.back()}
              />
              <AntDesign
                name="left"
                size={18}
                className="dark:hidden"
                onPress={() => router.back()}
              />
              <Text className="text-sixt font-intermedium text-gray-900 dark:text-white">
                Airtime & Data
              </Text>
              <Text></Text>
            </View>
            <CouponProp
              firstname="Airtime"
              secondname="Data"
              value={couponValue}
              useValue={(value: string) => setCouponValue(value)}
            />
          </View>
          {couponValue === "airtime" ? <AirtimeProp /> : <DataProp />}
        </View>
      </Customview>
    </>
  );
}
