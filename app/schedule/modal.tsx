import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { BaseUrl } from "@/constants";
import Custommodal from "../../components/custommodal/page";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "@/store/toast";

export default function Schedulemodal({
  visible,
  close,
  data,
  refetch
}: {
  visible: boolean;
  close: () => void;
  data: any;
  refetch: () => void;
}) {
  const { openToast } = useToast();
  function deleteAlert (id:string) {
    Alert.alert("Are you sure to delete this schedule?","It can't be undone but you can always make a new one",[
      {
        text:"Cancel",
        onPress:()=>{}
      },
      {
        text:"Delete",
        onPress: async () => await editSchedule(id,"delete")
      }
      ]
    )
  }

  const editSchedule = async (id:string,action:string) => {
   
    const token = await AsyncStorage.getItem('token');
    const postData = JSON.stringify({
      scheduleid:id,
      action
    })
    try {
      const response = await BaseUrl.post(`/api/v1/schedule/edit`,postData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      await response.data;
      refetch()
      close()
    } catch (error:any) {
      openToast(error.message || "We're currently unable to complete your request, Kindly try again later");
    }
  };
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto px-3">
        <View className="w-full h-auto flex-row items-center justify-between mb-5">
          <Text className="text-lg font-interbold dark:text-white">{firstUpper(data?.frequency) || "null"} Schedule</Text>
          <MaterialCommunityIcons
            className=""
            color="red"
            size={22}
            name="delete-outline"
            onPress={() => deleteAlert(data?.id)}
          />
        </View>
        
        <View className="w-full h-auto">
          <Text className="font-intermedium text-[12px] mx-2 my-4 dark:text-white">
            Service Provider: {firstUpper(data?.provider)}
          </Text>
          {data?.name && <Text className="font-intermedium text-[12px] mx-2 my-4 dark:text-white">
            Service Plan: {data?.name}
          </Text>}
          <Text className="font-intermedium text-[12px] mx-2 my-4 dark:text-white">
            Amount: {data?.amount}
          </Text>
          <Text className="font-intermedium text-[12px] mx-2 my-4 dark:text-white">
            Start Date: {convertDate(data?.date)}
          </Text>
          <Text className="font-intermedium text-[12px] mx-2 my-4 dark:text-white">
            Next Date: {convertDate(data?.nextDate)}
          </Text>
          
          <Text className="font-intermedium text-[12px] mx-2 my-4 dark:text-white">
            Beneficiary: {data?.recipient || data?.phone}
          </Text>
          
        </View>
        <View className="mt-8 w-full flex-row items-center justify-center">
          <TouchableOpacity className="bg-mycolor w-11/12 h-14 mt-2 flex-row items-center justify-center rounded-xl" onPress={() => editSchedule(data?.id,data?.status === "active" ? "pause" : "resume")}>
            <Text className="font-interbold text-sm mx-2 text-white">
              {data?.status === "active" ? "Pause Schedule" : "Resume Schedule"}
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </Custommodal>
    </>
  );
}

const convertDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toString().slice(0, 21);
};
const firstUpper = (string: string) => {
  if(!string) return "";
  const newString = string.charAt(0).toUpperCase() + string.slice(1);
  return newString;
};
