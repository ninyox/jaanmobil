import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import Custommodal from "@/components/custommodal/page";
import BankTransferModal from "./bank";
import CouponModal from "./coupon";
import CardPaymentModal from "./card";

export default function TopupModal({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}) {
  const {height} = Dimensions.get("window")
  const [state, setState] = useState("coupon");
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto px-4">
          <Text className=" text-xl font-interbold mb-8 dark:text-white">
            Top Up Options
          </Text>
          <View className="w-full flex flex-row justify-between px-1 mb-4 items-center">
            <Text
              onPress={() => setState("bank")}
              className={`mx-4 text-[12px] font-intermedium text-center ${state === "bank" ? "text-mycolor" : "text-black dark:text-white"} `}
            >
              Bank Transfer
            </Text>
            <Text
              onPress={() => setState("card")}
              className={`mx-4 text-[12px] font-intermedium text-start ${state === "card" ? "text-mycolor" : "text-black dark:text-white"} `}
            >
              Card Payment
            </Text>
            <Text
              onPress={() => setState("coupon")}
              className={`mx-4 text-[12px] font-intermedium text-center ${state === "coupon" ? "text-mycolor" : "text-black dark:text-white"} `}
            >
              Coupon
            </Text>
          </View>
          <View className={`w-full `} style={{height:height * 0.5}}>
            {
              getState(state)
            }
          </View>
        </View>
      </Custommodal>
    </>
  );
}

const getState = (state:string) => {
  let value = <BankTransferModal />;
  switch(state){
    case "bank":
      value = <BankTransferModal />
      break;
    case "card":
      value = <CardPaymentModal />
      break;
      case "coupon":
      value = <CouponModal />
  }
  return value
}