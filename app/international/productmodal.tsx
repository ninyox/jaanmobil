import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Custommodal from "../../components/custommodal/page";
export default function ProductModal({
  visible,
  submit,
  close,
  data,
}: {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  data: object[];
}) {
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="mx-4 text-xl font-interbold mb-6">
            Service Product
          </Text>
          {data?.map((items: any, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md border-t-[0.2px] flex flex-row items-center px-2 my-1 border-slate-300"
              onPress={() => submit(items)}
            >
              <Text className="font-intermedium text-lg mx-2  dark:text-white">
                {items.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
