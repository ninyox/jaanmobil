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
interface imageProps {
  name: string;
  value: number;
  valueCurrencyCode: string;
  originalValue: number;
  originalCurrencyCode:string
}
export default function Networkmodal({ visible, submit, close,netarray }:{visible:boolean,submit:Function,close:Function,netarray:imageProps[]}) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {netarray.map((items:imageProps, index:number) => (
            <TouchableOpacity key={index} className="w-full h-14 rounded-md border-t-[0.1px] flex flex-col  px-2 my-1 dark:border-slate-300" onPress={() => submit(items)}>
               <Text className="font-intermedium text-md mx-2 dark:text-white">{items.name}</Text>
                <Text className="font-intermedium text-ten mt-1 mx-2 dark:text-white">{formatCurrency(items.originalValue, items.originalCurrencyCode)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}


function formatCurrency(amount, currencyCode, locale = 'en') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0, // remove decimals if not needed
    maximumFractionDigits: 2
  }).format(amount);
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
