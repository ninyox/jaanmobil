import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Custommodal from "@/components/custommodal/page";
export default function Datamodal({
  visible,
  submit,
  close,
  data,
}: {
  visible: boolean;
  submit: (item: any) => void;
  close: () => void;
  data: any;
}) {
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="mx-4 text-xl font-interbold mb-6">Select Data Plan</Text>
          {data?.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md bordr-t-[0.2px] flex flex-col justify-center px-2 my-1 "
              onPress={() => submit(item)}
            >
              <Text className="font-intermedium  dark:text-white">
                {item?.name}
              </Text>
              <Text className="font-inter  dark:text-gray-400 text-sm mt-1">
                Data Amount: ₦ {item?.price}{" "}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}

