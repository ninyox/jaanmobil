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

import Custommodal from "../../components/custommodal/page";
export default function Networkmodal({ visible, submit, close}) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const networkarray = [
    {
      name: "Mtn network",
      source: require("../../assets/images/mtn.png"),
      value: "1",
    },
    {
      name: "Glo network",
      source: require("../../assets/images/glo.png"),
      value: "2",
    },
    {
      name: "9mobile network",
      source: require("../../assets/images/ninemobile.png"),
      value: "3",
    },
    {
      name: "Airtel network",
      source: require("../../assets/images/airtel.png"),
      value: "4",
    },
  ];
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {networkarray.map((items, index) => (
            <TouchableOpacity key={index} className={` w-full h-16 rounded-md border-t-[0.2px] flex flex-row items-center px-2 my-1`} onPress={() => submit(items)}>
               <Image source={items.source} className="h-12 w-12 rounded-md"/>
               <Text className="font-intermedium text-lg mx-2 dark:text-white">{items.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
