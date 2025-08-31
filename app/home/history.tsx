import { View, Text, TouchableOpacity,Pressable } from "react-native";
import { router } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
import { AirtimeSvg, BettingSvg, ElectricSvg, InternetSvg, TopupSvg,CouponSvg, EsimSvg } from "@/assets/svg/transactions";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader/loader";

interface itemsProp {
  provider: string;
  date: string;
  service: string;
  name: string;
  amount: string;
  reference: string;
}
export default function History() {
  const { data: tranlist, isLoading, error } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.push("../login/login");
      }
      const response = await BaseUrl.get(
        `/api/v1/user/transactions`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        const data = response.data.data;
        let reversedArray = data.reverse();
        return reversedArray
      }
    },

  })
  if (isLoading) {
    return <Loader isLoading={undefined} />
  }
  if(error){
    return <Text ></Text>
  }
  return (
    <>
      <View className="w-full h-auto flex flex-col items-center px-1 bg-white rounded-md  dark:bg-transparent">
        {tranlist.slice(0, 5).map((items: itemsProp, index: number) => {
          const date = new Date(items.date.trim());
          const formattedDate = date?.toISOString().slice(0, 19).replace('T', ' ');
          return (
            <TouchableOpacity key={index} className="w-full h-12 rounded-md bg-white flex justify-between my-1 items-center flex-row dark:bg-transparent" onPress={() => router.push(`../transactions?reference=${items.reference}`)}>
              <Pressable className="w-8 h-8 flex-row items-center justify-center">
                {getStatusClass(items.service)}
              </Pressable>
              <View className="flex-grow flex flex-row h-full px-2 justify-between py-2">
                <View className="w-f h-auto flex justify-between flex-col">
                  <Text className="font-intermedium text-[10px] text-setgray uppercas  dark:text-white">{Capitalize(items.name)} </Text>
                  <Text className="text-slate-400 font-inter text-[10px]">{formattedDate}</Text>
                </View>
                <View className="h-full flex-col items-center justify-center">
                  <Text className={`text-[10px] font-intermedium ${items.service === "funding" ? "text-green-600" : "text-red-600"}`}>{items.service === "funding" ? "+" : "-"}₦ {items.amount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  )
}

// Helper function to get the CSS class based on the network
function getStatusClass(network:any) {

  switch (network) {
    case "airtime" || "Airtime":
      return <AirtimeSvg width="100%" fill="#6b34ff"/>;
    case "internet":
      return <InternetSvg width="100%"/>;
    case "funding":
      return <TopupSvg width="100%"/>; // I assume you intended 'yellow' here.
    case "betting":
      return <BettingSvg width="100%"/>;;
    case "voucher" || "Voucher":
      return <CouponSvg width="100%"/>;;
      case "electricity":
        return <ElectricSvg width="100%"/>;;
        case "esim":
          return <EsimSvg width="100%"/>;;
    default:
      return <TopupSvg width="100%"/>;;
  }
}
function Capitalize (str:string){
  if(!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1)
}
