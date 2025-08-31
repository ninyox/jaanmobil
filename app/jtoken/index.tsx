import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Customview from "../../components/customview";
import {
  AntDesign,
} from "@expo/vector-icons";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import { Log} from "./Log";
import Feedmodal from "../../components/feedback/feed";
import { router } from "expo-router";
import { useToast } from "@/store/toast";
import Confirmmodal from "@/components/confirmModal";

export default function Redeem() {
  const {openToast} = useToast()
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [fact, setFact] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
    const [confirmmodal, setConfirmmodal] = useState(false);

  const alan = () => {
    if (!amount) {
      openToast("Enter a valid amount");
      return;
    }
    setConfirmmodal(true);
  };

  const handleSubmit = async () => {
    setIspin(false)
    setIsloading(true);
    try {
      if(!amount){
        return
      }
      const response = await Log(amount);
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Points Conversion was Successful 🎉🎉`,
          result.message,
          null
        );
      } else if (!result.success) {
        openToast(result.message)
        SetNotification(`Points Conversion Failed`, result.message, null);
      }
      setModalVisible(true);
    } catch (error:any) {
      openToast(
        error.message ||
          "We're currently unable to complete your request, Kindly try again later"
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Customview>
        <View className="flex-1 items-center px-4 h-screen">
          <View className="w-full h-28 boder-b-[0.2px]">
            <TouchableOpacity className="w-auto h-10 flex flex-row items-center ">
              <AntDesign
                name="left"
                size={22}
                className="mr-2 dark:hidden
                "
                onPress={() => router.back()}
              />
              <AntDesign
                name="left"
                size={22}
                className="mr-2 hidden dark:flex"
                color="white"
                onPress={() => router.back()}
              />
            </TouchableOpacity>
            <Text className="text-2xl font-interbold text-gray-900 ml2 mt-2 dark:text-white">
              Convert JTokens
            </Text>
          </View>

          <View className="w-full flex justify-around h-auto">
            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
                Enter number of JTokens to convert.
              </Text>

              <TouchableOpacity className="w-full h-14 px-2 border-[0.3px] border-gray-400 rounded-md flex flex-row items-center justify-between">
                <TextInput
                  value={amount}
                  onChangeText={(e) => setAmount(e)}
                  keyboardType="numeric"
                  placeholder=""
                  className="flex-grow dark:text-white"
                />
              </TouchableOpacity>
              <Text className="mt-3 font-intermedium">100 points = ₦ 1000 </Text>
            </View>
          </View>

          <View className="w-full absolute bottom-10 h-20 flex flex-col items-center justify-center">
            <TouchableOpacity
              className="w-11/12 h-14 bg-mycolor rounded-2xl flex flex-row items-center justify-center"
              onPress={alan}
            >
              <Text className="text-xl font-interbold text-white">Purchase</Text>
            </TouchableOpacity>
          </View>

          <Loader isLoading={isLoading} />
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
          />

          <Feedmodal
            modalContent={modalContent}
            modalVisible={modalVisible}
            fact={fact}
            closeModal={() => setModalVisible(false)}
          />
          <Confirmmodal
            visible={confirmmodal}
            submit={() => {
              setIspin(true)
              setConfirmmodal(false)
            }}
            close={() => setConfirmmodal(false)}
            data={[
              { id: 1, name: "Amount", value: "₦ " + String(Number(amount) * 10) },
              { id: 2, name: "Jtoken Quantity", value: String(amount) },
       
            ]}
          />
        </View>
      </Customview>
    </>
  );
}
