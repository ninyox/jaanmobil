import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity } from "react-native";
import { Pressable, View } from "react-native";

export default function BankTransferModal() {
  const returnedData = fetchBankStorage()
  return (
    <>
      <View className="w-full h-full py-4 flex-col justify-between">
        <Pressable className="w-full h-auto">
          <Text className="text-center font-inter text-[14px]">Fund your wallet directly from your bank account by doing a bank transfer to the bank account below</Text>
        </Pressable>
        <Pressable className="w-full h-auto flex-col items-center">
          <Text className="font-interbold dark:text-white text-lg">{ returnedData.accountname || 'Abraham Adesanya'}</Text>
          <Text className="font-interbold dark:text-white text-lg my-4">{ returnedData.bankname || 'Abraham Adesanya'}</Text>
          <Text className="font-interbold dark:text-white text-lg">{ returnedData.accountnumber || 'Abraham Adesanya'}</Text>
           <Text className="font-intermedium text-blue-400 text-[10px] mt-6">*Fund your wallet easily at anytime by sending wallet top ups to this account.</Text>
        </Pressable>
        <Pressable className="w-full h-auto flex flex-col items-center">
          <TouchableOpacity className="w-11/12 h-14 bg-mycolor rounded-2xl flex items-center justify-center">
            <Text className="font-interbold text-white text-lg">Done</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    </>
  );
}

async function fetchBankStorage(){
  const accountname = await AsyncStorage.getItem("accountname") || ""
  const accountnumber = await AsyncStorage.getItem("accountnumber") || ""
  const bankname = await AsyncStorage.getItem("bankname") || "";
  if(!accountname || !accountnumber){
    return null
  }
  return {
    accountname:accountname,
    accountnumber,
    bankname
  }
}