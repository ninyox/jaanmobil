import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feedmodal from "../../components/feedback/feed";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import SetNotification from "../../notify";
import { RedeemLog } from "./Log";
import Typemodal from "./type";
import { useToast } from "@/store/toast";
import Confirmmodal from "@/components/confirmModal";

export default function RedeemVoucherProp() {
  const {openToast} = useToast()
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
    const [confirmmodal, setConfirmmodal] = useState(false);
  const [voucherid, setvoucherid] = useState<string | undefined>("");


  const alan = () => {
    if (!voucherid) {
      alert("Enter a valid voucherid");
      return;
    }
    setConfirmmodal(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const result = await RedeemLog({voucherid:voucherid || ""});
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Voucher redeeming of ₦ ${voucherid} was Successful 🎉🎉`,
          result.message,
          null
        );
         setModalVisible(true);
      } else if (result.success === false) {
        openToast(result.message);
        SetNotification(
          `Voucher Redeeming of ₦ ${voucherid} Failed`,
          result.message,
          null
        );
      }
     
    } catch (error: any) {
   
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
      <View className="items-center min-h-full w-full h-auto flex-grow">


        <View className="w-full h-24 boder-b-[0.2px] mt-2">

          <Text className="text-xl font-interbold text-gray-900 ml2 mt-2 dark:text-white">
            Redeem Voucher
          </Text>
          <Text className="text-sm font-inter text-gray-900 ml2 mt-2 dark:text-white">
            Have a voucher code? Enter it below to apply your discount
          </Text>
        </View>

        <View className="w-full flex justify-around h-auto">
          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-sm my-1">
              Enter Code
            </Text>

            <TouchableOpacity className="w-full h-16 px-2 border-[0.1px] border-gray-500 rounded-lg flex flex-row items-center justify-between">
              <TextInput
                value={voucherid}
                onChangeText={(e) => setvoucherid(e)}
                placeholder="0"
                className="flex-grow dark:text-white"
              />
            </TouchableOpacity>
          </View>

        </View>

        <View className="w-full absolute bottom-32 h-20 flex flex-col items-center justify-center">
          <TouchableOpacity
            className="w-11/12 h-14 bg-mycolor rounded-2xl flex flex-row items-center justify-center"
            onPress={alan}
          >
            <Text className="text-lg text-white font-interbold">Redeem</Text>
          </TouchableOpacity>
        </View>
        <Confirmmodal
          visible={confirmmodal}
          submit={() => {
            setIspin(true);
            setConfirmmodal(false);
          }}
          close={() => setConfirmmodal(false)}
          data={[
            { id: 1, name: "Voucher ID", value: String(voucherid || "N/A") },
          ]}
        />
        <Loader isLoading={isLoading} />
        <Pinmodal
          visible={isPin}
          close={() => setIspin(false)}
          submit={() => handleSubmit()}
        />
  
        <Feedmodal
        title="Coupon Applied"
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        />
      </View>
    </>
  );
}
