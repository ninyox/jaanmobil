import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Customview from "../../components/customview";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Log } from "./Log";
import Loader from "@/components/loader/loader";
import {
  AirtimeSvg,
  BettingSvg,
  ElectricSvg,
  InternetSvg,
  TopupSvg,
  CouponSvg,
} from "@/assets/svg/notifications";
export default function AirandData() {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchnotifications"],
    queryFn: async () => {
      const response = await Log();
      return response.data;
    },
  });
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  // const servicesarray = [
  //   {
  //     title: "Special Offer!",
  //     message:
  //       "Get 350% bonus on your MTN Airtime today Recharge from  ₦1– ₦99 on JAAN to activate bonus",
  //     status: "unread",
  //     service:"airtime",
  //     reference: "tooreal",
  //     type: "notification",
  //     time: "2hrs ago",
  //   },
  //   {
  //     title: "Electricity Bill Reminder!",
  //     message:
  //       "Electricity bill due soon! Pay by 24/02/2025 to avoid disconnection.",
  //     status: "unread",
  //     service:"airtime",
  //     reference: "tooreal",
  //     type: "notification",
  //     time: "2hrs ago",
  //   },
  // ];

  return (
    <>
      <Customview>
        <View className="items-center pb-10 min-h-screen relative w-full h-auto flex-grow flex-1">
          <View className="w-full h-20 ">
            <View className="w-full items-center px-4 flex-row justify-between mb-3 pb-6 border-gray-300 dark:border-gray-700 mt-2 border-b-[0.2px]">
              <AntDesign
                name="left"
                size={18}
                color="white"
                className="hidden dark:flex"
                onPress={() => router.back()}
              />
              <AntDesign
                name="left"
                size={18}
                className="dark:hidden"
                onPress={() => router.back()}
              />
              <Text className="text-xl font-intermedium text-gray-900 dark:text-white">
                Notifications
              </Text>
              <Text></Text>
            </View>
          </View>
          
            {
              data.reverse().map((item: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  className={`w-full h-auto flex flex-col items-center px-4 mb-5 relative overflow-clip`}
                  onPress={() => router.push(`/transactions?reference=${item.reference}`)}
                >
                  <Pressable className="w-full h-auto flex-row items-center mb-3">
                    <Pressable className="w-6 h-6 p-[6px] flex-row items-center justify-center bg-yellow rounded-full">
                      {getStatusClass(item.service)}
                    </Pressable>
                    {item.status === "unread" && (
                      <Pressable className="w-2 h-2 bg-green-600 rounded-full ml-2" />
                    )}
                    <Text className="font-intermedium flex-grow text-md dark:text-white text-setgray ml-2">
                      {item.title}
                    </Text>
                  </Pressable>

                  <Pressable className="w-full h-auto mt-1">
                    <Text className="font-intermedium text-[10px] text-wra dark:text-white text-[#616161]">
                      {item.message.slice(0, 100)}
                    </Text>
                  </Pressable>

                  <Pressable className="w-full h-auto mt-1 pt-2 flex-row items-center justify-between border-t-[0.2px] border-gray-300" >
                    <Text className="font-intermedium text-[11px] text-[#616161] dark:text-white">
                      {fixTime(item.time)}
                    </Text>
                    <Text className="font-intermedium text-[10px] dark:text-white text-green-500" onPress={() => router.push(`/transactions?reference=${item.reference}`)}>
                      View <AntDesign name="right" size={9}  />
                    </Text>
                  </Pressable>
                </TouchableOpacity>
              ))
            }
           
         
        </View>
      </Customview>
    </>
  );
}

function getStatusClass(network: any) {
  switch (network) {
    case "airtime" || "Airtime":
      return <AirtimeSvg width="100%" fill="#6b34ff" />;
    case "internet":
      return <InternetSvg width="100%" />;
    case "funding":
      return <TopupSvg width="100%" />; // I assume you intended 'yellow' here.
    case "betting":
      return <BettingSvg width="100%" />;
    case "voucher" || "Voucher":
      return <CouponSvg width="100%" />;
    case "electricity":
      return <ElectricSvg width="100%" />;
    default:
      return <TopupSvg width="100%" />;
  }
}


function fixTime(inputdate:string){
  const correctedDate = new Date(inputdate).toLocaleString(undefined,{
    minute:"2-digit",
    hour:"2-digit",
    month:"long",
    year:"numeric",
    dayPeriod:"short",
    day:"numeric"
  })
  return correctedDate
}