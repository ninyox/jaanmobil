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
import Custommodal from "@/components/custommodal/page";
export default function Datamodal({ visible, submit, close,data }) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {data?.map((items, index) => (
            <TouchableOpacity key={index} className="w-full h-20 rounded-md border-t-[0.2px] flex flex-row items-center px-2 my-1" onPress={() => submit(items)}>
               
               <Text className="font-intermedium text-lg mx-2">Data {items.plan} ({items.month_validate}) {`->`} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}

/*
  const [inputs, setInputs] = useState(['', '', '', '']);
    const handleKeyPress = (key) => {
        const updatedInput = [...inputs];
        const emptyinputindex = updatedInput.findIndex((digit) => digit === '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = key;
            setInputs(updatedInput)
            if (emptyinputindex === 3) {
                handleSubmit(key)
            }

        }
    }
    const handleDeletePress = () => {
        const updatedInput = [...inputs].reverse();
        const emptyinputindex = updatedInput.findIndex((digit) => digit !== '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = '';
            setInputs(updatedInput.reverse())
        }
        /*
        if(emptyinputindex < 3) {
            inputsRefs[emptyinputindex - 1 ]
        }
        */
