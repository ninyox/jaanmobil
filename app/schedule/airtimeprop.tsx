import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Loader from "../../components/loader/loader";
import Schedulemodal from "./modal";
import Typemodal from "./type";
import { AirtelSvg, GloSvg, MtnSvg, NineMobileSvg } from "@/assets/svg";


export default function AirtimeProp() {

  const [scheduleObject, setScheduleObject] = useState<any>(null);
  const [schedulemodal, setSchedulemodal] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  

  
  const [type, setType] = useState({
    name: "VTU",
    value: "vtu",
  });
  




  const handleTypeClick = (image: any) => {
    setTypemodal(false);
    setType(image);
  };

  const { data:products, isLoading, refetch } = useQuery({
    queryKey: ['scheduleairtime'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.push("../login/login");
      }
      const postData = JSON.stringify({
        service: "airtime"
      });
      const {data} = await BaseUrl.post(`/api/v1/schedule/fetch`,postData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      console.log(data)
      if (data.success) {
        return data.data 
      }
    },

  })
  
  if(isLoading){
    return <Loader isLoading={true}/>
  }

  return (
    <>
      <View className="items-center min-h-full w-full h-auto flex-grow">


        <View className="w-full h-auto boder-b-[0.2px] mt-2 mb-4 flex-row justify-end">
          <TouchableOpacity className="w-auto h-10 flex flex-row items-center" onPress={() => router.push("../schedule/airtime")}>
            <Text className="text-2xl font-interbold text-gray-900 mx-1 dark:text-white">
              +
            </Text>
            <Text className="text-sm font-inter text-gray-900 dark:text-white">
              New Schedule
            </Text>
          </TouchableOpacity>


        </View>

        {
          products.length > 0 ?
          products.map((item:any, index:number) => (
            <TouchableOpacity key={index} className="w-full flex justify-around h-auto px-4 my-4" onPress={() => {
              setScheduleObject(item)
              setSchedulemodal(true)
              
            }}>
              <View className="w-full h-10 items-center flex-row mb-2">
                <Pressable className="w-6 h-6 mr-2">
                  {SelectSvg(item.provider)}
                </Pressable>

                <Text className="font-interbold text-gray-800 dark:text-white text-sixt my-1 mx-2">
                  {firstUpper(item.frequency)} Schedule
                </Text>
                  {
                    item?.status !== 'active' && (
                      <Feather name="pause" color="red" />
                    )
                  }
                
              </View>
              <Text className="font-intermedium text-gray-600 dark:text-white text-ten my-1">
                Next Date: {convertDate(item.nextDate)}
              </Text>
              <Text className="font-intermedium text-gray-600 dark:text-white text-ten my-1">
                Amount: ₦ {item.amount}
              </Text>
              <Text className="font-intermedium text-gray-600 dark:text-white text-ten my-1">
                Start date: {convertDate(item.date)}
              </Text>
              <Text className="font-intermedium text-gray-600 dark:text-white text-ten my-1">
                Beneficiary: {item.recipient || item.phone}
              </Text>


            </TouchableOpacity>
          )):
          (
            <View className="w-full flex-grow flex items-center justify-center">
              <Text className="text-black dark:text-graytext">
                No payment is currently scheduled
              </Text>
            </View>
          )
        }

       
        <Schedulemodal
          visible={schedulemodal}
          data={scheduleObject}
          close={() => setSchedulemodal(false)}
          refetch={() => refetch()}
        />
  
      </View>
 <Loader isLoading={isLoading} />
    </>
  );
}

const SelectSvg = (prop: string) => {
  switch (prop) {
    case "mtn":
      return <MtnSvg width="100%" height="100%" />
    case "airtel":
      return <AirtelSvg width="100%" height="100%" />
      case "glo":
        return <GloSvg width="100%" height="100%" />
        case "9mobile":
          return <NineMobileSvg width="100%" height="100%" />
    default:
      break;
  }
}

const convertDate = (date:string) => {
  const newDate = new Date(date)
  return newDate.toString().slice(0,21)
}
const firstUpper = (string:string) => {
 const newString = string.charAt(0).toUpperCase() + string.slice(1)
  return newString
}

import { ApiUrl, BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";


