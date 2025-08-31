import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useToast } from "@/store/toast";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feedmodal from "../../components/feedback/feed";
import Loader from "../../components/loader/loader";
import SetNotification from "../../notify";
import { Log } from "./Log";


export default function NinProp() {
  const { openToast } = useToast()
  const [isLoading, setIsloading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [isDisabled, setDisabled] = useState(true);
  const [fact, setFact] = useState(false);
  const [idnumber, setIdnumber] = useState<undefined | string>();

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      if(!idnumber){
        return
      }
      const response = await Log(idnumber, "nin");
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `A payment account has been generated for you 🎉🎉`,
          result.message,
          null
        );
      } else if (result.success === false) {
        setFact(false);
        openToast(result.message);
        SetNotification(
          `Payment account generation failed`,
          result.message,
          null
        );
      }
      setModalVisible(true);
    } catch (error: any) {
      openToast(
        error.message ||
        "We're currently unable to complete your request, Kindly try again later"
      );
      setFact(false);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    if (idnumber && idnumber.length > 10) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [idnumber])
  return (
    <>
      <View className="items-center min-h-full w-full h-auto flex-grow overflow-y-scroll relative">

        <View className="w-full h-auto boder-b-[0.2px] mt-2 mb-6 ">

          <Text className="text-lg font-interbold text-gray-900 ml2 mt-2 dark:text-white">
            Kindly provide your ID
          </Text>
          <Text className="text-sm font-inter text-gray-900 ml2 mt-2 dark:text-white">
            Please enter your own NIN to Generate Bank Account
          </Text>
        </View>

        <View className="w-full flex justify-around h-auto">
          <View className="w-full h-24">
            <Text className="font-interbold text-gray-800 dark:text-white text-md my-1">
              National Identification Number*
            </Text>

            <TouchableOpacity className="w-full h-16 px-2 border-[0.1px] border-gray-500 rounded-lg flex flex-row items-center justify-between">
              <TextInput
                value={idnumber}
                keyboardType="numeric"
                onChangeText={(e) => setIdnumber(e)}
                placeholder=""
                maxLength={11}
                className="flex-grow dark:text-white"
              />
            </TouchableOpacity>
          </View>


        </View>

        <View className="w-full absolute bottom-36 h-auto flex flex-col items-center justify-center">
          <View id="outerbox" className="w-full h-auto">
            <View className="flex-row justify-between px-2 items-center py-2">
              <Pressable id="forgotbox" className="flex-grow h-10 flex-row items-center">
                <TouchableOpacity className="rounded-full w-5 h-5 bg-red-200 flex items-center justify-center">
                  <Text className="text-md text-red-600 font-interbold">!</Text>
                </TouchableOpacity>

                <Text className="font-interbold text-[12px] px-2 dark:text-white">Forgot your NIN?</Text>
              </Pressable>
              <TouchableOpacity className="w-auto  rounded-lg bg-mycolor py-2 px-5">
                <Text className="text-sm font-intermedium text-white" onPress={() => openToast("Dial *364# with the mobile number linked to your NIN to get your NIN details", "Get your NIN via USSD")}>Click Here</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row px-2 py-2 mb-6">
              <MaterialCommunityIcons size={18} color="green" className="mr-2" name="checkbox-marked-circle-outline" />
              <Text className="font-inter text-[12px] dark:text-white">
                In line with the latest regulatory requirement from the CBN, we will obtain your face, name, gender, house address, and birthday of BVN and NIN to verify your account. JAAN will protect your information security
              </Text>
            </View>

          </View>
          <TouchableOpacity
            disabled={isDisabled}
            className={`w-11/12 h-14 ${isDisabled ? "bg-[#6b34ff70]" : "bg-mycolor"} rounded-2xl flex flex-row items-center justify-center`}
            onPress={() => handleSubmit()}
          >
            <Text className="text-lg text-white font-interbold">Generate</Text>
          </TouchableOpacity>
        </View>


     
        <Loader isLoading={isLoading} />
        <Feedmodal
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        />
      </View>

    </>
  );
}
