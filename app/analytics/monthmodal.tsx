import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Custommodal from "../../components/custommodal/page";
export default function Monthmodal({
  visible,
  submit,
  close,
}: {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
}) {
  const data = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="mx-4 text-sixt font-interbold mb-6">
            Choose Month
          </Text>
          {data?.map((items: any, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md border-t-[0.2px] flex flex-col justify-center px-2 my-1 border-slate-300"
              onPress={() => submit(items)}
            >
              <Text className="font-intermedium text-md mx-2  dark:text-white">
                {items.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
