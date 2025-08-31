import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Custommodal from "../../components/custommodal/page";
interface jambProps {
  product_code: string;
  amount: number;
  id: number
}
export default function Datamodal({
  visible,
  submit,
  close,
  data
}: {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  data:jambProps[]
}) {
  const dataArray = [
    { name: "UTME", value: "utme" },
    { name: "UTME MOCK", value: "utme_mock" },
    { name: "DE", value: "de" },
  ];
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {data?.map((items, index) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md border-t-[0.2px] flex flex-row items-center px-2 my-1 border-slate-300"
              onPress={() => submit(items)}
            >
              <Text className="font-intermedium text-lg mx-2  dark:text-white">
                {items.product_code}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
