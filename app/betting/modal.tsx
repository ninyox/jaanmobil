import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";

import { AirtelSvg, BetkingSvg, BetwaySvg, DstvSvg, GloSvg, GotvSvg, MsportSvg, MtnSvg, NineMobileSvg, OnexbetSvg, ShowmaxSvg, StartimesSvg } from "@/assets/svg";
import { BlurView } from "expo-blur";
interface NetworkProps {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  selected: string
}
export default function Networkmodal({ visible, submit, close, selected }: NetworkProps) {
  
  const networkarray = [
    {
      name: "1xbet",
      source: <OnexbetSvg width="100%" />,
      value: "onexbet",
    },
    {
      name: "BETKING",
      source: <BetkingSvg width="100%" />,
      value: "betking",
    },
    {
      name: "BETWAY",
      source: <BetwaySvg width="100%" />,
      value: "betway",
    },
    {
      name: "MSPORT",
      source: <MsportSvg width="100%" />,
      value: "msport",
    },
    {
      name: "BANG BET",
      source: <MsportSvg width="100%" />,
      value: "bangbet",
    },
    {
      name: "MERRY BET",
      source: <MsportSvg width="100%" />,
      value: "merrybet",
    },
    {
      name: "NAIRABET",
      source: <MsportSvg width="100%" />,
      value: "nairabet",
    },
    {
      name: "NAIJABET",
      source: <MsportSvg width="100%" />,
      value: "naijabet",
    },
    {
      name: "SUPABET",
      source: <MsportSvg width="100%" />,
      value: "supabet",
    },
    {
      name: "CLOUDBET",
      source: <MsportSvg width="100%" />,
      value: "cloudbet",
    },
    {
      name: "BET LION",
      source: <MsportSvg width="100%" />,
      value: "betlion",
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
