import React, { useEffect, useState } from "react";
import {
  Text,
  View,
} from "react-native";
import Customview from "../../components/customview";
import HeaderProp from "./prop";
import PrepaidProp from "./prepaid";
import PostpaidProp from "./postpaid";
import { BackButton } from "@/components/icons/icons";
import { useLocalSearchParams } from "expo-router";
export default function Electric() {
  const {id} = useLocalSearchParams()
  const [couponValue, setCouponValue] = useState("prepaid");
  useEffect(() => {
    if (id === "prepaid") {
      setCouponValue("prepaid");
    } else if (id === "postpaid") {
      setCouponValue("postpaid");
    }
  }, [id]);
  return (
    <>
      <Customview >
        <View className="relative items-center px-4 min-h-full w-full h-auto flex-grow">
          <View className="w-full h-28 boder-b-[0.2px]">
            <View className="w-full items-center flex-row justify-between mb-6 mt-2">
              <BackButton />
              <Text className="text-sixt font-intermedium text-gray-900 dark:text-white">
                Electricity
              </Text>
              <Text></Text>
            </View>
            <HeaderProp
              firstname="Prepaid"
              secondname="Postpaid"
              firstvalue="prepaid"
              secondvalue="postpaid"
              value={couponValue}
              useValue={(value: string) => setCouponValue(value)}
            />
          </View>
          {
            couponValue === "prepaid" ? (
              <PrepaidProp />
            ) : (
              <PostpaidProp />
            )
          }
        </View>


      </Customview>

    </>
  );
}
