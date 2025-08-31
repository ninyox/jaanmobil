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
export default function Typemodal({ visible, submit, close,typearray }) {
  
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {typearray.map((items, index) => (
            <TouchableOpacity key={index} className="w-full h-14 rounded-md border-t-[0.1px] flex flex-row items-center px-2 my-1" onPress={() => submit(items)}>
               <Image source={{uri:items.image || "https://jaan.ng/logo.png"}} className="h-12 w-12 rounded-md bg-cover dark:bg-white"/>
               <Text className="font-intermedium text-lg mx-2 dark:text-white">{items.name}</Text>
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
