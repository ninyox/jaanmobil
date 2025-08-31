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
export default function Datamodal({ visible, submit, close,data }) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {data?.map((items, index) => (
            <TouchableOpacity key={index} className="w-full h-14 rounded-md border-t-[0.2px] flex flex-row items-center px-2 my-1 dark:border-slate-300" onPress={() => submit(items)}>
               
               <Text className="font-intermedium text-lg mx-2  dark:text-white">{items.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
