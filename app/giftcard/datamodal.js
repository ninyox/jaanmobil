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
               
               <Text className="font-intermedium text-lg mx-2  dark:text-white">Data {items.plan} ({items.month_validate}) -{`>`} ₦ {items.amount}</Text>
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
        // {
        //    productId: 9454,
        //    productCode: 'RW000038',
        //    providerId: 29,
        //    name: 'UK_Trial_Test (URL)',
        //    targetValue: 2333100,
        //    targetCurrencyId: 160,
        //    targetCurrencyCode: 'NGN',
        //    originalValue: 1010,
        //    originalCurrencyId: 229,
        //    originalCurrencyCode: 'GBP',
        //    value: 1010,
        //    valueCurrencyId: 229,
        //    valueCurrencyCode: 'GBP',
        //    productCost: 2305102.8,
        //    productCostCurrencyCode: 'NGN',
        //    productCostCurrencyId: 160,
        //    walletId: 'NGN-127',
        //    category: 'Gift Card',
        //    categoryCode: 'giftcard',
        //    subCategory: 'E-Commerce & Online Shopping',
        //    subCategoryCode: 'E-Commerce-Online-Shopping',
        //    serviceCode: '',
        //    brandCode: 'UK_Trial_Test',
        //    providerName: 'UK_Trial_Test',
        //    description: '<p>Sample Response for this Product will contain only</p><ul><li>URL</li></ul>',
        //    productMoreInfoUrl: '#',
        //    expirationDate: '2026-12-09',
        //    fxRate: [Object],
        //    denominations: [Array],
        //    sysComment: 'Cost converted from GBP to NGN'
        //  }