import React, { useEffect, useState } from "react";
import {
  Text,
  View,
} from "react-native";
import Customview from "../../components/customview";
import Footer from "@/components/footer/page";
import VoucherProp from "./prop";
import BuyVoucherProp from "./buy";
import RedeemVoucherProp from "./redeem";
import { useLocalSearchParams } from "expo-router";
export default function Voucher() {
  const {id} = useLocalSearchParams()
  const [voucherValue, setVoucherValue] = useState("buy");
  useEffect(() => {
    if (id === "buy") {
      setVoucherValue("buy");
    } else if (id === "redeem") {
      setVoucherValue("redeem");
    }
  }, [id]);
  return (
    <>
      <Customview>
        <View className="items-center px-4 min-h-full w-full h-auto flex-grow">
          <View className="w-full h-28 boder-b-[0.2px]">
            <Text className="text-lg font-intermedium text-center text-gray-900 mb-6 mt-2 dark:text-white">
              Voucher
            </Text>
            <VoucherProp
              firstname="Buy"
              secondname="Redeem"
              value={voucherValue}
              useValue={(value: string) => setVoucherValue(value)}
            />
          </View>
          {
            voucherValue === "buy" ? (
              <BuyVoucherProp />
            ) : (
              <RedeemVoucherProp />
            )
          }
        </View>
      </Customview>
      <Footer selected="voucher" />
    </>
  );
}
