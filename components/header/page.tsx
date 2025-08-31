import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Searchmodal from "../search";
import deal from "@/assets/images/emoticon.png"
import NotificationModal from "../notification";


export default function Header({ name }:{name:string}) {
  const [searchmodal, setSearchmodal] = useState(false);
  const [notifmodal, setNotifmodal] = useState(false);
  const [isUnread,setUnread] = useState(false)

  return (
    <>
      <View className="w-screen h-auto flex flex-col px-4 bordr-b border-slate-300 bg-transparent dark:bg-dark">
        <View className="logotop w-full h-auto flex justify-between items-center my-3">
          <View className="w-full flex h-10 justify-between flex-row">
            <TouchableOpacity className="w-auto h-auto flex items-center flex-row" onPress={() => router.push("../more")}>
              <Image
                source={deal}
                className="w-10 h-10 rounded-full border"
              />
              <Text className="text-sm font-interbold mx-2 text-black dark:text-white">
                Hi, {name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="w-auto px- h-auto rounded-[30px] bg-s flex flex-row items-center justify-between py-1">
              <AntDesign
                name="search1"
                size={19}
                onPress={() => setSearchmodal(true)}
                color="white"
                className="mx-2 fill-slate-800 dark:fill-blue-500 hidden dark:flex"
              />
              <AntDesign
                name="search1"
                size={20}
                onPress={() => setSearchmodal(true)}
                className="mx-2 fill-slate-800 dark:fill-blue-500 dark:hidden"
              />
              <AntDesign
                name="customerservice"
                size={19}
                color="white"
                onPress={() => router.push("/support")}
                className="mx-2 fill-slate-800 dark:fill-blue-500 hidden dark:flex"
              />
              <AntDesign
                name="customerservice"
                size={19}
                onPress={() => router.push("/support")}
                className="mx-2 fill-slate-800 dark:hidden"
              />
    
             <View className="relative w-auto h-auto ml-1">
               <Text className="dark:text-white text-black">
                 <MaterialIcons
                   name="notifications-none"
                   size={22}
                   onPress={() => setNotifmodal(true)}
                 />
               </Text>
                {isUnread && <Pressable className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />}
             </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Searchmodal visible={searchmodal} close={() => setSearchmodal(false)} />
      <NotificationModal visible={notifmodal} close={() => setNotifmodal(false)} setUnread={(e:boolean) => setUnread(e)}/>

    </>
  );
}
