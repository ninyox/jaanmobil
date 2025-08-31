import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feedmodal from "../../components/feedback/feed";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import SetNotification from "../../notify";
import { BuyLog } from "./Log";

import Typemodal from "./type";
import Confirmmodal from "@/components/confirmModal";
import { useToast } from "@/store/toast";
export default function BuyVoucherProp() {
  const { openToast } = useToast();
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [texts, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [image, setImage] = useState({
    name: "Mtn network",
    source: require("../../assets/images/mtn.png"),
    value: "1",
  });
  const [type, setType] = useState({
    name: "VTU",
    value: "vtu",
  });

  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
    setSelected(image.value);
  };

  const handleTypeClick = (image: any) => {
    setTypemodal(false);
    setType(image);
  };

  const alan = () => {
    if (!amount) {
      alert("Enter a valid amount");
      return;
    }
    setConfirmmodal(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await BuyLog({ amount: Number(amount), email: texts });
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true);
        SetNotification(
          `Voucher Purchase of ₦ ${amount} was Successful 🎉🎉`,
          result.message,
          null,
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        openToast(
          `Voucher Purchase of ₦ ${amount} Failed`,
          result.message,
          null,
        );
      }
    } catch (error: any) {
      openToast(
        error.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <View className="items-center min-h-full w-full h-full flex-grw flex-col flex justify-between pb-32">
        <View className="w-full h-auto" >
          <View className="w-full h-24 boder-b-[0.2px] mt-2">
            <Text className="text-xl font-interbold text-gray-900 ml2 mt-2 dark:text-white">
              Purchase Voucher
            </Text>
            <Text className="text-sm font-inter text-gray-900 ml2 mt-2 dark:text-white">
              Unlock exclusive offers with a JAAN Voucher!
            </Text>
            
          </View>

          <View className="w-full flex justify-around h-auto">
            <View className="w-full h-24 ">
              <Text className="font-intermedium text-gray-800 dark:text-white text-sm my-1">
                Enter Amount
              </Text>

              <TouchableOpacity className="w-full h-16 px-2 border-[0.1px] border-gray-500 rounded-lg flex flex-row items-center justify-between">
                <TextInput
                  value={amount}
                  keyboardType="numeric"
                  onChangeText={(e) => setAmount(e)}
                  placeholder="0"
                  className="flex-grow dark:text-white"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-sm my-1">
                Enter recipient email (optional - for gifting)
              </Text>

              <TouchableOpacity className="w-full h-16 px-3 border-[0.1px] border-gray-500 rounded-md flex flex-row items-center">
                <TextInput
                  className="w-full h-full dark:text-white"
                  value={texts}
                  onChangeText={(e) => setText(e)}
                  placeholder=""
                  keyboardType="email-address"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="w-full h-20 flex flex-col items-center justify-center">
          <TouchableOpacity
            className="w-11/12 h-14 bg-mycolor rounded-2xl flex flex-row items-center justify-center"
            onPress={alan}
          >
            <Text className="text-lg text-white font-interbold">Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
        <Confirmmodal
          visible={confirmmodal}
          submit={() => {
            setIspin(true);
            setConfirmmodal(false);
          }}
          close={() => setConfirmmodal(false)}
          data={[
            { id: 1, name: "Amount", value: "₦" + String(amount || "N/A") },
            { id: 2, name: "Email", value: String(texts || "N/A") },
          ]}
        />
        <Loader isLoading={isLoading} />
        <Pinmodal
          visible={isPin}
          close={() => setIspin(false)}
          submit={() => handleSubmit()}
        />

        <Typemodal
          visible={typemodal}
          close={() => setTypemodal(false)}
          submit={(e: any) => handleTypeClick(e)}
        />
        <Feedmodal
          title="Coupon Purchase Successful"
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        />
     
    </>
  );
}
