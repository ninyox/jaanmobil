import {
  View,
  Text,
  TouchableOpacity,
  Appearance,
  useColorScheme,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
interface ThemeProp {
close: () => void
}
import Custommodal from "../../components/custommodal/page";
import { SystemThemeSvg } from "@/assets/svg";
export default function Thememodal({close}: ThemeProp) {
  const [mounted, setMounted] = useState(false);
  const [autotheme, setAutotheme] = useState<string | null | undefined>(null);
  const resolvedTheme = useColorScheme();

  const getTheme = async () => {
    const checkTheme = await AsyncStorage.getItem("autotheme");
    if (checkTheme) {
      setAutotheme(checkTheme);
    }
  };
  useEffect(() => {
    setMounted(true);
    getTheme();
  }, []);

useEffect(() => {
async function ThemeCheck() {
  if(mounted){
    const authotheme = await AsyncStorage.getItem("autotheme")
    if(authotheme && typeof(authotheme) === "string"){
      setAutotheme(authotheme)
    }else{
      setAutotheme(resolvedTheme)
    }
  }
}
ThemeCheck()
},[mounted])

  const submit = async(text:string) => {
    await AsyncStorage.setItem("autotheme",text)
    Appearance.setColorScheme(text)
    close()
  }
  return (
    <>
      <Custommodal visible={true} close={close}>
        <View className="w-full h-auto px-3">
        <Text className="font-interbold text-xl  dark:text-white mb-2">Select preferred Theme</Text>
            <TouchableOpacity className={` w-full h-16 rounded-lg ${autotheme === "light" ? "border" : ""} flex flex-row items-center border-mycolor px-2 my-1`} onPress={() => submit("light")}>
              <Feather name="sun" size={21} color="#6b34ff"/>
               <Text className="font-intermedium text-md mx-3 dark:text-white">Light</Text>
            </TouchableOpacity>
            <TouchableOpacity className={` w-full h-16 rounded-lg ${autotheme === "dark" ? "border" : ""} flex flex-row items-center  border-mycolor px-2 my-1`} onPress={() => submit("dark")}>
            <Feather name="moon" size={21} color="#6b34ff"/>
            <Text className="font-intermedium text-md mx-3 dark:text-white">Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity className={` w-full h-16 rounded-md flex flex-row items-center border-mycolor px-2 my-1`} onPress={() => submit("light")}>
            <SystemThemeSvg width={21} />
            <Text className="font-intermedium text-md mx-3 dark:text-white">System Default</Text>
            </TouchableOpacity>
          
        </View>
      </Custommodal>
    </>
  );
}