import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { styles } from "./style";
import Custommodal from "../../components/custommodal/page";
interface planProp {
  id: string;
  name: string;
  productCost: number;
  productID: number;
  productCode: string;
  value: number;
  walletID: string;
  providerID: string;
}
interface NetworkProps {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  data: planProp[]
}
export default function Datamodal({ visible, submit, close,data }: NetworkProps) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className=" text-sixt font-interbold mb-8 mx-4 dark:text-white">
            Select Service Package
          </Text>
          {data?.map((items, index) => (
            <TouchableOpacity key={index} className="w-full h-14 rounded-md border--[0.2px] flex flex-col item-center px-5 my-1 dark:border-slate-300" onPress={() => submit(items)}>
               
               <Text className="font-intermedium text-sixt mx-2  dark:text-white">{items?.name}</Text>
               <Text className="font-intermedium text-[14px] mx-2 mt-1  text-graytext">₦ {items.productCost}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
