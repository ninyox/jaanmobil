import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Customview from "../../components/customview";
import { styles } from "./style";
import axios from "axios";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import { Log, Validate } from "./Log";
import Feedmodal from "../../components/feedback/feed";
import { router } from "expo-router";
export default function Redeem({ route }) {
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [fact, setFact] = useState(false);
  const [amount, setAmount] = useState(null);


  const alan = () => {
  
    if (!amount || amount.length < 8) {
      alert("Enter a valid CouponId");
      return;
    }
    setIspin(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log(amount);
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Coupon Redemption was Successful 🎉🎉`,
          result.message,
          null
        );
      }
      else if (!result.success) {
        console.log("its false")
        setFact(false);
        setModalContent(result.message);
        SetNotification(
          `Coupon Redemption Failed`,
          result.message,
          null
        );
      }
      setModalVisible(true);
    } catch (error) {
      const mydata = error;
      setModalContent(
        mydata.message ||
          "We're currently unable to complete your request, Kindly try again later"
      );
      setFact(false);
      setModalVisible(true);
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
              <MaterialIcons
                name="arrow-back"
                size={22}
                className="mr-2 dark:hidden
                "
                onPress={() => router.back()}
              />
               <MaterialIcons
                name="arrow-back"
                size={22}
                className="mr-2 hidden dark:flex"
                color="white"

                onPress={() => router.back()}
              />
            </TouchableOpacity>
            <Text className="text-2xl font-interbold text-gray-900 ml2 mt-2 dark:text-white">
              Redeem Coupon
            </Text>
          </View>

          <View className="w-full flex justify-around h-auto">
            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
                Enter CouponId
              </Text>

              <TouchableOpacity className="w-full h-14 px-2 border-[0.5px] border-gray-500 rounded-md flex flex-row items-center justify-between">
                <TextInput
                  value={amount}
                  onChangeText={(e) => setAmount(e)}
                  placeholder="VTRIQS123"
                  className="flex-grow dark:text-white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full absolute bottom-10 h-20 flex flex-col items-center justify-center">
            <TouchableOpacity
              className="w-4/5 h-12 bg-mycolor rounded-xl flex flex-row items-center justify-center"
              onPress={alan}
            >
              <Text style={styles.buttonin}>Purchase</Text>
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
        </View>
      </Customview>
    </>
  );
}
