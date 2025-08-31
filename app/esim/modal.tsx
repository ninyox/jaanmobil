import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import countries from "world-countries"
import Custommodal from "../../components/custommodal/page";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface NetworkProps {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  selected: string
}
export default function Countriesmodal({ visible, submit, close, selected }: NetworkProps) {
  const [searchtext,setSearchText] = useState<string | undefined>("")
  const countryList = countries.map((country) => ({
    name: country.name.common,
    code: country.cca3,
    callingCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
    emoji: getFlagEmoji(country.cca2),
  }));
  
  function getFlagEmoji(countryCode: string) {
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );
  }
  
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="mx-4 text-lg font-interbold mb-6 dark:text-white">Select Region</Text>
          <Pressable className="h-12 mx-2 px-3 border-[0.2px] border-setgray rounded-lg flex flex-row items-center">
            <Text className="dark:text-white">
              <MaterialCommunityIcons name="magnify" size={28} />
            </Text>
            <TextInput className="flex-grow h-full dark:text-white text-black" value={searchtext} placeholder="search country" onChangeText={(e) => setSearchText(e)} />
          </Pressable>
          {countryList.filter(items => items.name.match(searchtext || "")).map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md bordr-t-[0.2px] flex flex-row items-center pl-6 my-2 "
              onPress={() => submit(item)}
            >
              <Text className="font-intermedium text-[14px] text-setgray  dark:text-white">
                {item.emoji}
              </Text>
              <Text className="font-inter  dark:text-gray-400 text-setgray text-twelve mt-1 mx-2">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}

export const styles = StyleSheet.create({
  box: {
    backgroundColor: "#ffffff",
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  dealers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000090",
  },
});
