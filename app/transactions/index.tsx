import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Customview from "../../components/customview";
import * as Clipboard from "expo-clipboard"
import { AntDesign, EvilIcons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Log } from "./Log";
import Loader from "@/components/loader/loader";
import { useToast } from "@/store/toast";
import {
  AirtimeSvg,
  BettingSvg,
  ElectricSvg,
  InternetSvg,
  TopupSvg,
  CouponSvg,
} from "@/assets/svg/notifications";
import { BackButton } from "@/components/icons/icons";
import { FireJaanSvg } from "@/assets/svg";
import UserFetcher from "@/utils/userfetcher";

export default function Transactions() {
  const {openToast} = useToast()
  const { reference } = useLocalSearchParams();
  if(!reference){
  router.back()
  return
  }
  const { data, isLoading } = useQuery({
    queryKey: ["transactionreference"],
    queryFn: async () => {
      const response = await Log({reference:String(reference)});
      return response.data;
    },
  });
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  
  const CopyRef = (data:string) => {
    Clipboard.setStringAsync(String(data))
    openToast("Copied")
  }
  

  return (
    <>
      <Customview>
        <View className="items-center pb-10 min-h-screen relative w-full h-auto flex-1 px-3 ">
         
            <View id="header" className="w-full items-center px- flex-row justify-between mb-3 pb-6 border-gray-300 dark:border-gray-700 mt-2">
              <BackButton />
              <Text className="text-lg font-intermedium text-gray-900 dark:text-white">
                Transaction Receipt
              </Text>
              <Text></Text>
            </View>
            
            <View className="w-full h-auto flex flex-col items-center dark:bg-lightdark rounded-2xl relative pt-8 pb-6">
              <View className="w-auto px-4 py-2 rounded-full dark:bg-black mb-3 absolute -top-6">
                <Pressable className="w-24 bg-transparent justify-center items-center h-auto mx-2 flex flex-row ">
                  <FireJaanSvg width="110%"/>
                </Pressable>
              </View>
             
              <Pressable className="w-auto bg-transparent justify-center items-center h-auto bg-green-500 flex flex-row mb-2">
                <Text className="uppercase text-[14px] font-intermedium dark:text-white ">{data?.plan || data.name}</Text>
              </Pressable>
              <Pressable className="w-auto bg-transparent justify-center items-center h-auto bg-green-500 flex flex-row">
                <Text className="uppercase text-[22px] font-interbold dark:text-white ">₦ {data.amount}</Text>
              </Pressable>
              <Pressable className="w-auto mt-2 bg-transparent justify-center items-center h-auto bg-green-500 flex flex-row">
                <Text className={`text-[14px] font-intermedium ${getStatusColor(data.status)}`}>{data.status === "success" ? "Successful" : data.status} </Text>
                {
                  data.status === "success"&& (
                     <MaterialIcons name="verified" color="#22c55e" />
                  )
                }
              </Pressable>
            </View>
            
            <View id="transaction details" className="px-3 mt-16 h-auto w-full dark:bg-lightdark p-3 rounded-xl">
              <Text className="text-[16px] font-intermedium dark:text-white ">Transaction Details</Text>
              <View className="mt-5 px-1 w-full">
                <Pressable className="w-full flex flex-row justify-between text-setgray my-2">
                  <Text className="font-inter text-[10px] dark:text-white ">Transaction Type</Text>
                  <Text className="font-inter text-[10px] text-setgray dark:text-white ">
                    {Capitalize(data.service)}
                  </Text>
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between text-setgray my-2">
                  <Text className="font-inter text-[10px] dark:text-white ">Beneficiary</Text>
                  <Text className="font-inter text-[10px] text-setgray dark:text-white ">{ data.recipient}</Text>
                </Pressable>
                
             
                <Pressable className="w-full flex flex-row justify-between text-setgray my-2">
                  <Text className="font-inter text-[10px] dark:text-white ">Amount</Text>
                  <Text className="font-inter text-[10px] text-setgray dark:text-white ">₦ { data.amount}</Text>
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between text-setgray my-2">
                  <Text className="font-inter text-[10px] dark:text-white ">Transaction Status</Text>
                  <Text className="font-inter text-[10px] text-setgray dark:text-white ">{data.status === "success" ? "Succesful" : data.status}</Text>
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between text-setgray my-2">
                  <Text className="font-inter text-[10px] dark:text-white ">Transaction ID</Text>
                <Text className="font-inter text-[10px] text-setgray dark:text-white ">{data.reference}{" "}<AntDesign name="copy1" className="mx-2" color="green" onPress={() => CopyRef(String(data.reference))} /></Text>
                </Pressable>
                <Pressable className="w-full flex flex-row justify-between text-setgray my-2">
                  <Text className="font-inter text-[10px] dark:text-white ">Transaction Date</Text>
                  <Text className="font-inter text-[10px] text-setgray dark:text-white ">{new Date(data.date).toString().slice(0,21)}</Text>
                </Pressable>
                {
                  (data.service === "voucher" || data.service === "electricity") && (
                    <Pressable className="w-full flex flex-row justify-between text-setgray my-2" >
                      <Text className="font-inter text-[10px] dark:text-white ">Generated Pin</Text>
                      <Text className="font-intermedium text-[14px] text-setgray dark:text-white ">{ data.pin} <AntDesign name="copy1" className="mx-2" color="green" onPress={() => CopyRef(String(data.pin))} /></Text>
                    </Pressable>
                  )
                }
              </View>
            </View>
            <View className="w-full h-auto flex items-center justify-center mt-7  dark:bg-lightdark rounded-2xl">
              <Pressable className="w-11/12 h-auto rounded-xl border-gray-400 dark:bg-lightdark dark:border-0 py-1 border flex flex-col items-center">
                <Text className="text-[10px] font-intermedium my-3 dark:text-white ">Share your Referral Code with more friends to earn more Bonus</Text>
                <Pressable className="w-full flex flex-row justify-center items-center">
                   <Text className="text-lg font-interbold my-1 dark:text-white " onPress={() => CopyRef(UserFetcher.refercode  || "JAANREF")}>
                    {UserFetcher.refercode  || "JAANREF"}</Text>
                   <AntDesign name="copy1" className="mx-2" color="green" onPress={() => CopyRef(UserFetcher.refercode  || "JAANREF")} />
                </Pressable>
              </Pressable>
            </View>
            <View className="w-full h-auto flex items-center justify-between flex-row mt-7 mb-40">
              <Pressable className="w-5/12 h-auto rounded-xl border-gray-200 border flex flex-row justify-center items-center py-1">
              <Text className="text-black dark:text-white"> <AntDesign name="download" size={16}/></Text>
                <Text className="text-[12px] font-intermedium text-setgray dark:text-white  m-3">Download</Text>
              </Pressable>
              <Pressable className="w-5/12 h-auto rounded-xl border-gray-200 border flex flex-row justify-center items-center py-1">
                <Text className="text-black dark:text-white"> <EvilIcons name="share-google" size={26}/></Text>
                <Text className="text-[12px] font-intermedium text-setgray dark:text-white  m-3">Share</Text>
              </Pressable>
            </View>
          
     
          
           
          <View className="w-full h-auto flex items-center justify-center mt-1 bottom-20 absolute">
            <TouchableOpacity className="bg-mycolor h-14 w-10/12 rounded-2xl flex items-center justify-center" onPress={() => router.back()}>
              <Text className="text-white font-interbold text-lg">Done</Text>
            </TouchableOpacity>
          </View>
         
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

function Capitalize (str:string){
  if(!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1)
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
function getStatusColor(status:string){
  switch(status){
    case "success":
      return "text-[#22c55e]";
    case "pending":
      return "text-yellow-500";
    case "failed":
      return "text-red-500";
    default:
      return "text-gray-700";
  }
}