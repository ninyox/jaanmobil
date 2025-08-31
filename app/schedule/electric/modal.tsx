import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { BlurView } from "expo-blur";
interface dataProps {
  name: string;
  product_id: string;
  service_type: string;
}

export default function Networkmodal({ visible, submit, close,selected,data }: { visible: boolean, submit: Function, close: Function, selected: string | null,data:dataProps[] }) {
  const click = useRef<any | null>(null)
  const handleClick = (event: any) => {
      if (click.current === event.target) {
          close()
      }
  }

  return (
    <>
      <Modal transparent={true} visible={visible}>
        <BlurView intensity={40} style={styles.dealers}>
          <Pressable className="w-screen h-screen flex flex-col items-center justify-center" ref={click} onPress={handleClick}>
            <View className="w-10/12 h-auto bg-white rounded-2xl dark:bg-gray-950">
              {data.filter((items) => items.service_type !== selected).map((items, index) => (
                <TouchableOpacity key={index} className={` w-full h-16 rounded-md flex flex-row items-center px-2 my-1`} onPress={() => submit(items)}>
                  <Text className="font-intermedium text-lg mx-2 dark:text-white">{Capitalize(items.name)}</Text>
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
function Capitalize (str:string){
  if(!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1)
}