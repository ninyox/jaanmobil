import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { AntDesign, Entypo} from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import support from "@/assets/images/support.png"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WhatsappSvg,GmailSvg,InstagramSvg } from "@/assets/svg/social";
import UserFetcher from "@/utils/userfetcher";

export default function SupportModal() {
  const [text,setText] = useState("")
  const inset = useSafeAreaInsets()
  const [value,setValue] = useState("")
  useEffect(() => {
    (async () => {
      await UserFetcher.fetch();
      console.log("user",UserFetcher.username)
    })
  },[])

  const Faqarray = [
    {
      title: "How do I fund my wallet?",
      status: "close",
      message:"On the App dashboard , tap 'Top Up' and many funding options would be shown to you",
      id: "fund",
    },
    {
      title: "How do I reset my password?",
      message:"On the login screen, tap 'Forgot Password?' and enter your email or phone number. We'll send you instructions to reset your password.",
      id: "reset",
    },
    {
      title: "How to purchase data?",
      message:"On the Dashboard, Click the internet Icon. Select Network, Input the phone number or select from your contact list, select your preferred data plan and purchase..",
      id: "purchasedata",
    },
    {
      title: "Data Plan Comparisons?",
      message:"Jaan Offers the cheapest and most durable data plan you'd ever see. And we take our pride in having a service thats 100% active full time.",
      id: "dataplan",
    },
    {
      title: "What are the acceptable payment Method?",
      message:"You can pay with either bank transfer to your generated bank account or you pay with your credit card using the top up button.",
      id: "paymentmethod",
    },
    {
      title: "Customer service hours",
      message:"JAAN customer service is always active 24/7, Your convenience is our top priority.",
      id: "customerservice",
    },
 
  ];
  return (
    <>
      <View className="flex-1">
      {Platform.OS === "ios" ? (
        <View style={{height:44,backgroundColor:"#6b34ff",backdropFilter:"blur(10px)"}}/>
      ) :(
         <StatusBar backgroundColor="#6b34ff" style="light"  />
      )}
     
        <View className="w-screen h-auto dark:bg-dark " style={{ flex: 1,marginTop: Platform.OS === "ios" ? 0 : inset.top }}>
          <View className="w-full h-auto bg-mycolor px-2 pt-1">
            <View className="w-full h-auto items-center flex-row justify-between mb-3 pr-2 pb-6 ">
              <AntDesign
                name="left"
                size={18}
                color="white"
                onPress={() => router.back()}
              />
              <Text className="text-sixt font-intermedium text-white">
               Support
              </Text>
              <Text></Text>
            </View>
            <View className="w-full h-auto flex-row items-center">
              <Image source={support} />
              <Pressable className=" mx-2">
              <Text className="text-sm font-intermedium text-white">Hello, { UserFetcher.username}</Text>
                <Text className="text-twelve text-white font-inter mt-1">Need help? We're here to assist you.</Text>
              </Pressable>
            </View>
          </View>
          <ScrollView>
            <View className="my-4 mx-3 w- h-14 rounded-2xl flex-row items-center p-2 dark:bg-black fixed">
              <AntDesign
                name="search1"
                size={20}
                color="gray"
                className="mx-2 fill-slate-800 dark:fill-blue-500"
              />
              <TextInput 
              value={text}
              placeholder=""
              onChangeText={(e) => setText(e)}
              className="flex-grow h-full text-black dark:text-white font-intermedium"
              />
            </View>
            <View className="w-full flex-row px-3 items-center justify-between mt-2">
              <Text className="text-md font-intermedium dark:text-white">FAQs</Text>
              <Text className="text-sm font-interbold text-mycolor" onPress={() => value === "all" ? setValue("") : setValue("all")}>see all</Text>
            </View>
            {
              Faqarray.filter((item) => item.message.match(text.toLowerCase())).map((item,index) => (
                <TouchableOpacity key={index} className="w-auto mx-1 flex h-auto flex-row items-start justify-between my-4" onPress={() => value === item.id ? setValue("") : setValue(item.id)}>
                  <Pressable className="mx-4" onPress={() => value === item.id ? setValue("") : setValue(item.id)}>
                    {
                      item.id === value ?
                      <Text className="dark:text-white">
                        <Entypo
                        name="chevron-small-up"
                        size={18}
                        />
                      </Text>
                      
                      :
                      <Text className="dark:text-white">
                        <Entypo
                        name="chevron-small-down" 
                        size={18}
                        />
                      </Text>
                    }
                    
                  </Pressable>
                  <Pressable className="w-10/12 flex-grow">
                    <Text className="text-sm font-intermedium dark:text-white" onPress={() => value === item.id ? setValue("") : setValue(item.id)}>{item.title}</Text>
                    {
                     
                     (item.id === value || value === "all") && (
                        <Text className="text-ten mt-1 text-wrap  dark:text-white">
                          {item.message}
                        </Text>
                      )
                    }
                  </Pressable>
               
                </TouchableOpacity>
              ))
            }
          </ScrollView>
          <View className="w-full h-auto px-4 py-5 dark:bg-black">
            <Text className="text-sm font-intermedium mb-3 dark:text-white">Contact JAAN</Text>
            <View className="w-full flex-row justify-between h-auto flex items-center">
              <TouchableOpacity className="w-4/12 h-auto items-center py-3 justify-center dark:bg-darke flex-row border-[0.2px] border-gray-400 px-1 rounded-lg ">
                <Pressable className="w-7 h-7 mr-1">
                  <WhatsappSvg width="100%" />
                </Pressable>
                
                <Pressable className="">
                  <Text className="text-[10px] dark:text-white font-intermedium">
                    Whatsapp Us
                  </Text>
                  <Text className="text-[6px] mt-[2px] dark:text-white">
                    Chat with us now
                  </Text>
                </Pressable>
              </TouchableOpacity>
            
              <TouchableOpacity className="w-4/12 h-auto items-center py-3 justify-center dark:bg-darke flex-row border-[0.2px] border-gray-400 mx-1 px-1 rounded-lg">
                <Pressable className="w-7 h-7 mr-1">
                  <GmailSvg width="100%" />
                </Pressable>
                
                <Pressable className="">
                  <Text className="text-[12px] dark:text-white font-intermedium">
                    Send a Mail
                  </Text>
                  <Text className="text-[6px] dark:text-white mt-[2px]">
                    We'll get back to you soon
                  </Text>
                </Pressable>
              </TouchableOpacity>
              <TouchableOpacity className="w-4/12 h-auto items-center py-3 justify-center dark:bg-darke flex-row border-[0.2px] border-gray-400 rounded-lg px-1 ">
                <Pressable className="w-7 h-7 mr-1">
                  <InstagramSvg width="100%" />
                </Pressable>
                
                <Pressable className="">
                  <Text className="text-[10px] dark:text-white font-intermedium">
                    Instagram DM
                  </Text>
                  <Text className="text-[6px] dark:text-white mt-[2px]">
                    Chat with us now
                  </Text>
                </Pressable>
              </TouchableOpacity>
            </View>
         
          </View>
        </View>
      
      </View>
    </>
  );
}


