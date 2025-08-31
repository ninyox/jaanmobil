import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

import Custommodal from "../../components/custommodal/page";
import { AirtelSvg, DstvSvg, GloSvg, GotvSvg, MtnSvg, NineMobileSvg, ShowmaxSvg, StartimesSvg } from "@/assets/svg";
import { BlurView } from "expo-blur";
interface NetworkProps {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  selected: string
}
export default function Networkmodal({ visible, submit, close, selected }: NetworkProps) {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const networkarray = [
    {
      name: "DSTV",
      source: <DstvSvg width="100%" />,
      value: "dstv",
    },
    {
      name: "GOTV",
      source: <GotvSvg width="100%" />,
      value: "gotv",
    },
    {
      name: "STARTIMES",
      source: <StartimesSvg width="100%" />,
      value: "startimes",
    },
    {
      name: "Showmax",
      source: <ShowmaxSvg width="100%" />,
      value: "showmax",
    },
  ];
  return (
    <>
      <Modal transparent={true} visible={visible}>
        <BlurView intensity={40} style={styles.dealers}>
          <View className="w-10/12 h-auto bg-white rounded-2xl dark:bg-gray-950">
            {networkarray.filter((items) => items.value !== selected).map((items, index) => (
              <TouchableOpacity key={index} className={` w-full h-16 rounded-md flex flex-row items-center px-2 my-1`} onPress={() => submit(items)}>
                {/* <Image source={items.source} className="h-12 w-12 rounded-md"/> */}
                <Pressable className="w-12 h-12 flex-row items-center dark:bg-white rounded-md">
                  {items.source}
                </Pressable>


                <Text className="font-intermedium text-lg mx-2 dark:text-white">{items.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
