import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollViewBase,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { AntDesign} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { AirtimeSvg, BettingSvg, EducationSvg, ElectricSvg, EsimSvg, InternetSvg, TvSvg } from "@/assets/svg/transactions";

export default function Searchmodal({ visible, close }: { visible: boolean,close: Function }) {
  const click = useRef<any | null>(null)
  const [text,setText] = useState("")
  const handleClick = (event: any) => {
      if (click.current === event.target) {
          close()
      }
  }
  const servicesarray = [
    {
      name: "Airtime",
      source: <AirtimeSvg width="100%"/>,
      flow:"airtime mtn airtel 9mobile etisalat glo mobile ",
      value: "/airanddata?id=airtime",
    },
    {
      name: "Internet",
      source: <InternetSvg width="100%"/>,
      flow:"data internet mtn airtel 9mobile etisalat glo mobile ",
      value: "/airanddata?id=data",
    },
    {
      name: "Electricity",
      source: <ElectricSvg width="100%"/>,
      flow:"electric nepa phcn ibedc aedc bedc ",
      value: "/electric",
    },
    {
      name: "Cable",
      source: <TvSvg width="100%"/>,
      flow:"cable tv dstv gotv startimes",
      value: "/cable",
    },
    {
      name: "Betting",
      source: <BettingSvg width="100%"/>,
      flow:"msport sportybet supabet",
      value: "/betting",
    },
    {
      name: "eSim",
      source: <EsimSvg width="100%"/>,
      flow:"esim sim ",
      value: "/esim",
    },
    {
      name: "Education",
      source: <EducationSvg width="100%"/>,
      flow:"jamb education",
      value: "../jamb",
    },

 
    
  ];
  return (
    <>
      <Modal transparent={true} visible={visible} animationType="fade">
        <BlurView intensity={40} style={styles.dealers}>
          <Pressable className="w-full h-full flex flex-col items-center pt-10" ref={click} onPress={handleClick}>
            <KeyboardAvoidingView behavior="padding" className="w-10/12 h-auto bg-white rounded-3xl dark:bg-black pb-10 ">
              <View className="w-full h-14 rounded-3xl flex-row items-center p-2 fixed">
               <Text className="text-black dark:text-white"> <AntDesign
                  name="search1"
                  size={20}
                  className="mx-2 fill-slate-800 dark:fill-blue-500"
                /></Text>
                <TextInput 
                value={text}
                placeholder="search for services"
                placeholderClassName="text-white"
                onChangeText={(e) => setText(e)}
                className="flex-grow h-full px-3 text-black dark:text-white font-intermedium"
                />
              </View>
              <ScrollView>
                {text && servicesarray.filter((items) => items.flow.match(text.toLowerCase())).map((items, index) => (
                  <TouchableOpacity key={index} className={` w-full h-16 rounded-md flex flex-row items-center px-2 my-1`} onPress={() => router.push(items.value)}>
                    <Pressable className="w-12 h-12 flex-row items-center justify-center">
                     {items.source}
                    </Pressable>
                    <Pressable className="flex-grow h-12 flex-row items-center justify-between pr-1">
                      <Text className="font-intermedium text-md mx-2 dark:text-white">{items.name}</Text>
                      <AntDesign
                      size={10}
                      name="right"
                      />
                    </Pressable>
                    
                    
                  </TouchableOpacity>
                ))}
              </ScrollView>
            
            </KeyboardAvoidingView>
          </Pressable>
      
        </BlurView>
      
      </Modal>
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
