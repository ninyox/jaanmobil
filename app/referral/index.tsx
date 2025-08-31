import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Customview from "../../components/customview/index";

import { BackButton } from "@/components/icons/icons";
import { Image } from "react-native";
import { SmartPhoneImage } from "@/assets/images";
import UserFetcher from "@/utils/userfetcher";
import * as Clipboard from "expo-clipboard";
import { useToast } from "@/store/toast";
import { GreenArrow } from "@/assets/svg";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { BaseUrl } from "@/constants";
import Loader from "@/components/loader/loader";
interface itemProp {
  name: string;
  date: string;
}
export default function Referral() {
  const { openToast } = useToast();
  const CopyRef = () => {
    const refcode = UserFetcher.refercode;
    Clipboard.setStringAsync(String(refcode));
    openToast("Copied");
  };

  const {
    data: tranlist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("../login/login");
      }
      const response = await BaseUrl.get(`/api/v1/user/transactions`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.success) {
        const data = response.data.data;
        let reversedArray = data
          .reverse()
          .filter((items: any) => items.service === "funding");
        return reversedArray;
      }
    },
  });
  if (isLoading) {
    return <Loader isLoading={true} />;
  }

  return (
    <>
      <Customview>
        <View className="w-screen flex h-auto min-h-screen lol:bg-gray-900 flex-col items-center bg-[url('/background.png')] bg-cover lol:bg-[url('/darkbg.png')]">
          <View className="w-screen flex flex-col items-center min-h-full h-auto px-1 pb-3 lol:text-gray-100 lol:bg-gray-950">
            <View
              aria-label="profile View"
              className="w-full h-auto py-2 flex justify-between items-center px-2 flex-row"
            >
              <View className="flex items-center flex-row">
                <BackButton />
              </View>
              <Text className="text-sixt font-intermedium dark:text-white">
                Referrals
              </Text>
              <TouchableOpacity className="w-10 h-auto"></TouchableOpacity>
            </View>

            <View className="w-11/12 h-auto rounded-2xl border-t-mycolor border-t-2  dark:bg-black my-6 px-3">
              <View className="w-full h-auto rounded-lg flex-row flex dark:bg-dark my-3 py-2  justify-between items-center">
                <Image source={SmartPhoneImage} className="mr-2 w-2/6" />
                <Pressable className="w-4/6 h-5/6">
                  <Text className="text-sixt dark:text-white font-intermedium">
                    Refer Someone and Earn{" "}
                  </Text>
                  <Text className="text-ten dark:text-white w-">
                    Share your referral code and earn 5 JTokens when someone
                    your refer signs up and funds their JAAN Account
                  </Text>
                </Pressable>
              </View>
              <Pressable className="w-full flex flex-row justify-center items-center h-auto">
                <Text
                  className="text-lg font-interbold  my-3 dark:text-white "
                  onPress={() => CopyRef()}
                >
                  {UserFetcher.refercode || "JAANREF"}
                </Text>
                <AntDesign
                  name="copy1"
                  className="mx-2"
                  color="green"
                  size={20}
                  onPress={() => CopyRef()}
                />
              </Pressable>
            </View>

            <View className="w-full h-auto rounded-lg dark:bg-black my-6 px-3">
              <View className="w-full h-auto rounded-lg flex-row flex mb-2 py-3  justify-between items-center">
                <Text className="dark:text-white text-twelve">JToken</Text>
                <Text className="text-mycolor font-interbold">2</Text>
              </View>

              <View className="w-full h-auto rounded-lg flex-row flex  pb-3  justify-between items-center">
                <Text className="dark:text-white text-twelve">
                  Referrals Made
                </Text>
                <Text className="text-mycolor font-interbold">2</Text>
              </View>
            </View>

            <View className="w-full h-auto rounded-lg dark:bg-black my-6 px-3">
              <View className="w-full h-auto rounded-lg flex-row flex mb-2 py-3  justify-between items-center">
                <Text className="dark:text-white text-twelve">
                  Earning History
                </Text>
                <Text className="dark:text-white text-ten">view all</Text>
              </View>

              <View className="w-full h-auto rounded-lg flex-col flex  pb-3  justify-between items-center">
                {tranlist.map((item: itemProp, index: number) => (
                  <Pressable
                    key={index}
                    className="w-full flex flex-row justify-between items-center my-2"
                  >
                    <Pressable className="flex flex-row items-center">
                      <GreenArrow />
                      <Text className="dark:text-white font-intermedium text-twelve mx-2">
                        {item.name}
                      </Text>
                    </Pressable>
                    <Text className="dark:text-setgray text-ten font-inter">{dateFormat(item.date)}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="w-full absolute bottom-20 flex flex-row items-center justify-center">
              <Pressable className="bg-mycolor h-14 w-5/6 rounded-xl flex flex-row justify-center items-center">
                <Text className="text-white text-sm font-interbold">
                  Share Code
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Customview>
    </>
  );
}

const historyArray = [
  {
    name: "JToken",
    service: "funding",
    plan: "jtoken",
    date: new Date().toISOString(),
  },
  {
    name: "JToken",
    service: "funding",
    plan: "jtoken",
    date: new Date("2025-06-03").toISOString(),
  },
];

const dateFormat = (oldDate:string) => {
  const date = new Date(oldDate);
  
  return date.toLocaleString(undefined,{
    weekday:"long",
    year:"numeric",
    month:"short",
    day:"numeric",
    hour:"numeric",
    minute:"2-digit",
    hour12:true
  })
}