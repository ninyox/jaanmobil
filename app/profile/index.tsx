import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Customview from "../../components/customview";

import deale from "@/assets/images/emoticon.png";
import { useRouter } from "expo-router";
import { BackButton } from "@/components/icons/icons";
import { useQuery } from "@tanstack/react-query";
import { Log } from "./log";
import Loader from "@/components/loader/loader";
import Edit from "./edit";
export default function Profile() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("loading ...");
  const [lastname, setLastname] = useState("loading ...");
  const [phonenumber, setPhonenumber] = useState("loading ...");
  const [email, setEmail] = useState("loading ...");
  const [deal, setDeal] = useState(deale);
  const [edit, setEdit] = useState<boolean>(false);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("../login/login");
      }
      const response = await Log(token || "");
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
      // catch((error) => {
      //   if (error && error.message) {
      //     throw new Error(error.message)
      //   }else {
      //     throw new Error("Connection Failure")
      //   }
      // })
    },
  });
  if (isLoading) {
    return <Loader isLoading={undefined} />;
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setDeal(result.assets[0].uri);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };
  const uploadImage = async () => {
    if (deal) {
      const formData = new FormData();
      formData.append("image", {
        uri: deal,
        name: "image.jpg",
        type: "image/jpeg",
      });

      try {
        const response = await fetch("YOUR_UPLOAD_URL", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Handle the response from the server
        const responseData = await response.json();
        console.log("Upload response:", responseData);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  return (
    <>
      <Customview>
        <View className="px-2 bg-white dark:bg-dark pb-10">
          <View className="w-full items-center flex-row justify-between mb-3 pb-6 border-gray-300 dark:border-gray-700 mt-2 border-b-[0.2px]">
            <BackButton />
            <Text className="text-sixt font-intermedium text-gray-900 dark:text-white">
              Profile
            </Text>
            {
              edit ? (
                <Text className="text-mycolor text-sixt font-intermedium" onPress={() => setEdit(prev => !prev)}>
                  Save
                </Text>
              ):(
              <Text className="text-mycolor text-sixt font-intermedium" onPress={() => setEdit(prev => !prev)}>
               Edit
              </Text>
              )
            }
        
          </View>
          {edit ? (
            <Edit close={() => setEdit(false)} data={response} />
          ) : (
            <>
              <View className="w-full flex flex-col items-center my-5">
                <Image source={deal} className="w-32 h-32 rounded-full" />
                <Pressable>
                  <Text
                    className="text-mycolor"
                    onPress={() => pickImageAsync()}
                  ></Text>
                </Pressable>
              </View>

              <View className="w-full h-auto rounded-md px-2 dark:bg-dark">
                <View
                  id="list"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="cellphone-lock"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        User Name
                      </Text>
                      <Text className="font-interbold text-sm mx-2 text-setgray dark:text-white">
                        {response ? response.username : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View
                  id="full name"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="cellphone-lock"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        Full Name
                      </Text>
                      <Text className="font-interbold text-setgray text-sm mx-2 dark:text-white">
                        {response ? response.name : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View
                  id="email"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="email"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        E-mail Address
                      </Text>
                      <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white">
                        {response ? response.email : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View
                  id="phone number"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="cellphone-text"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        Phone Number
                      </Text>
                      <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white">
                        {response ? response.phone : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View
                  id="Date of birth"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="calendar"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        Date Of Birth
                      </Text>
                      <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white">
                        {response ? response.birthdate : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View
                  id="Residential"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="email"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        Residential Address
                      </Text>
                      <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white">
                        {firstname} {lastname}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View
                  id="Gender"
                  className="w-full h-16 flex flex-row justify-start  items-center"
                >
                  <View className="w-full h-auto flex-row flex">
                    <Pressable className="w-10 h-10 flex flex-row items-center justify-center rounded-full">
                      <MaterialCommunityIcons
                        name="email"
                        size={20}
                        color="#5f00ff"
                      />
                    </Pressable>

                    <Pressable className=" flex-grow ml-2">
                      <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                        Gender
                      </Text>
                      <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white">
                        {response ? response.gender : "N/A"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </Customview>
    </>
  );
}
