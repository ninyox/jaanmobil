import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";

import { AirtelSvg, GloSvg, MtnSvg, NineMobileSvg } from "@/assets/svg";
import { BlurView } from "expo-blur";
interface NetworkProps {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  selected: string
}
export default function Networkmodal({ visible, submit, close, selected }: NetworkProps) {
  const click = useRef(null);
  const handleClick = (event: any) => {
      if (click.current === event.target) {
          close()
      }
  }
  const networkarray = [
    {
      name: "MTN",
      source: <MtnSvg width="100%" />,
      value: "mtn",
    },
    {
      name: "GLO",
      source: <GloSvg width="100%" />,
      value: "glo",
    },
    {
      name: "9mobile",
      source: <NineMobileSvg width="100%" />,
      value: "9mobile",
    },
    {
      name: "Airtel",
      source: <AirtelSvg width="100%" />,
      value: "airtel",
    },
  ];
  return (
    <>
      <Modal transparent={true} visible={visible}>
        <BlurView intensity={40} style={styles.dealers}>
          <Pressable
            className="w-full h-full flex flex-col items-center justify-center"
            ref={click}
            onPress={handleClick}
          >
          <View className="w-10/12 h-auto bg-white rounded-2xl dark:bg-gray-950">
            {networkarray.filter((items) => items.value !== selected).map((items, index) => (
              <TouchableOpacity key={index} className={` w-full h-16 rounded-md flex flex-row items-center px-2 my-1`} onPress={() => submit(items)}>
                {/* <Image source={items.source} className="h-12 w-12 rounded-md"/> */}
                <Pressable className="w-12 h-12 flex-row items-center">
                  {items.source}
                </Pressable>


                <Text className="font-intermedium text-lg mx-2 dark:text-white">{items.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
