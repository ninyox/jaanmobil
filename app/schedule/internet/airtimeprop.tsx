import {
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ContactComponent } from "@/components/contacts/contact";
import Customview from "@/components/customview";
import Feedmodal from "@/components/feedback/feed";
import Loader from "@/components/loader/loader";
import Pinmodal from "@/components/pinmodal/pin";
import SetNotification from "@/notify";
import { Log } from "./Log";
import Networkmodal from "./modal";
import Typemodal from "./type";
import { AirtelSvg, MtnSvg } from "@/assets/svg";

export default function AirtimeProp() {
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [voucherValue, setVoucherValue] = useState("buy");
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [image, setImage] = useState({
    name: "Mtn network",
    source: require("@/assets/images/mtn.png"),
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


  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log(amount, texts);
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Voucher Purchase of ₦ ${amount} was Successful 🎉🎉`,
          result.message,
          null
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        SetNotification(
          `Voucher Purchase of ₦ ${amount} Failed`,
          result.message,
          null
        );
      }
      setModalVisible(true);
    } catch (error: any) {
      const mydata = error.data;
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

  const schedulearray = [
    {
      schedule: "Weekly",
      provider: "airtel",
      amount: 400,
      beneficiary: "09023469927",
      startDate: new Date().toString().slice(4, 21),
      package: "1.5GB (1 day)"
    }
  ]


  return (
    <>
      <View className="items-center min-h-full w-full h-auto flex-grow">


        <View className="w-full h-28 boder-b-[0.2px] mt-2 flex-row justify-end">
          <TouchableOpacity className="w-auto h-10 flex flex-row items-center" onPress={() => router.push("/schedule/airtime")}>
            <Text className="text-2xl font-interbold text-gray-900 mx-1 dark:text-white">
              +
            </Text>
            <Text className="text-sm font-inter text-gray-900 dark:text-white">
              New Schedule
            </Text>
          </TouchableOpacity>


        </View>

        {
          schedulearray.map((item, index) => (
            <TouchableOpacity key={index} className="w-full flex justify-around h-auto px-4">
              <View className="w-full h-10 items-center flex-row mb-4">
                <Pressable className="w-8 h-8 mr-2">
                  {SelectSvg(item.provider)}
                </Pressable>

                <Text className="font-intermedium text-gray-800 dark:text-white text-sixt my-1 mx-2">
                  {item.schedule} Schedule
                </Text>
              </View>
              <Text className="font-intermedium text-gray-600 dark:text-white text-sm my-1">
                Plan: {item.package}
              </Text>
              <Text className="font-intermedium text-gray-600 dark:text-white text-sm my-1">
                Amount: {item.amount}
              </Text>
              <Text className="font-intermedium text-gray-600 dark:text-white text-sm my-1">
                Start date: {item.startDate}
              </Text>
              <Text className="font-intermedium text-gray-600 dark:text-white text-sm my-1">
                Beneficiary: {item.beneficiary}
              </Text>


            </TouchableOpacity>
          ))
        }







        <Loader isLoading={isLoading} />

        <Networkmodal
          visible={netmodal}
          submit={(e: any) => handleNetworkClick(e)}
          close={() => setNet(false)}
        />
        <Typemodal
          visible={typemodal}
          close={() => setTypemodal(false)}
          submit={(e: any) => handleTypeClick(e)}
        />

      </View>

    </>
  );
}

const SelectSvg = (prop: string) => {
  switch (prop) {
    case "mtn":
      return <MtnSvg width="100%" height="100%" />
      break;
    case "airtel":
      return <AirtelSvg width="100%" height="100%" />
    default:
      break;
  }
}

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import Custommodal from "@/components/custommodal/page";


