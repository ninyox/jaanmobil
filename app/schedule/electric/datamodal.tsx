import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Custommodal from "@/components/custommodal/page";
export default function Datamodal({
  visible,
  submit,
  close,

}: {
  visible: boolean;
  submit: (item: any) => void;
  close: () => void;

}) {
  const data = [
    {name:"PrePaid",value:"prepaid"},
    {name:"PostPaid",value:"postpaid"},
  ]
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="mx-4 text-xl font-interbold mb-6">Select Electric Package</Text>
          {data?.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md bordr-t-[0.2px] flex flex-col justify-center px-2 my-1 mx-3 "
              onPress={() => submit(item.value)}
            >
              <Text className="font-intermedium  dark:text-white">
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}

