import { View, Text, TouchableOpacity,Pressable } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
import { AirtimeSvg, BettingSvg, ElectricSvg, InternetSvg, TopupSvg,CouponSvg } from "@/assets/svg/transactions";
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
export default function History({data}:{data:itemsProp[]}) {
  const [value,setValue] = useState("all")
  const fundingArray = data.filter((item: any) => item.service === "funding") || [];
  const expenseArray = data.filter((item: any) => item.service !== "funding") || [];
  let tranlist: itemsProp[] = [];
  switch(value){
    case "funding":
    tranlist = fundingArray;
      break;
    case "expenses":
      tranlist = expenseArray;
      break;
      default:
      tranlist = data
  }
  return (
    <>
      <View className="w-full flex flex-row items-center">
        <Pressable className="w-full flex flex-row items-center justify-between my-6 px-10 h-auto">
          <Text className={`text-md dark:text-white  underline-offset-2 font-intermedium ${value === "all" && "text-mycolor dark:text-mycolor underline"} `} onPress={() => 
            setValue("all")}>All</Text>
          <Text className={`text-md dark:text-white underline-offset-2 font-intermedium ${value === "expenses" && "text-mycolor dark:text-mycolor underline"} `} onPress={() =>  setValue("expenses")}>Expenses</Text>
          <Text className={`text-md dark:text-white underline-offset-2 font-intermedium ${value === "funding" && "text-mycolor dark:text-mycolor underline"} `} onPress={() => setValue("funding")}>Funding</Text>
        </Pressable>
      </View>
      <View className="w-full h-auto flex flex-col items-center px-3 bg-white rounded-md  dark:bg-transparent">
        {tranlist.map((items: itemsProp, index: number) => {
          const date = new Date(items.date.trim());
          const formattedDate = date?.toISOString().slice(0, 19).replace('T', ' ');
          return (
            <TouchableOpacity key={index} className="w-full h-14 rounded-md bg-white flex justify-between my-2 items-center flex-row dark:bg-transparent" onPress={() => router.push(`../transactions?reference=${items.reference}`)}>
              <Pressable className="w-8 h-8 flex-row items-center justify-center">
                {getStatusClass(items.service)}
              </Pressable>
              <View className="flex-grow flex flex-row h-full px-2 justify-between py-2">
                <View className="w-f h-auto flex justify-between flex-col">
                  <Text className="font-intermedium text-[10px] text-setgray uppercas  dark:text-white">{Capitalize(items.name)} </Text>
                  <Text className="text-slate-400 font-inter text-[10px]">{formattedDate}</Text>
                </View>
                <View className="h-full flex-col items-center justify-center">
                  <Text className={`text-ten font-intermedium ${items.service === "funding" ? "text-green-600" : "text-red-600"}`}>{items.service === "funding" ? "+" : "-"}₦ {items.amount}</Text>
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
    default:
      return <TopupSvg width="100%"/>;;
  }
}
function Capitalize (str:string){
  if(!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1)
}
