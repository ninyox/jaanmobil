import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feedmodal from "../../components/feedback/feed";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import SetNotification from "../../notify";
import { Log } from "./Log";
import Schedulemodal from "./modal";
import Custommodal from "../../components/custommodal/page";
import Typemodal from "./type";
import { AirtelSvg, DstvSvg, ElectricSvg, GloSvg, GotvSvg, InternetSvg, MtnSvg, NineMobileSvg, StartimesSvg, TvSvg } from "@/assets/svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl, BaseUrl } from "@/constants";
import { useToast } from "@/store/toast";
import { Feather } from "@expo/vector-icons";
export default function BillsProp() {
  const {openToast} = useToast();
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [scheduleObject, setScheduleObject] = useState<any>(null);
  const [products, setProducts] = useState<any>([]);
  const [schedulemodal, setSchedulemodal] = useState(false);
  const [texts, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [newmodal, setNewmodal] = useState(false);
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
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
    setIspin(true);
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


  const fetchSchedule = async () => {
    const token = await AsyncStorage.getItem('token');
    const postData = JSON.stringify({
      service:"others"
    })
    try {
      const response = await BaseUrl.post(`/api/v1/schedule/fetch`,postData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const data = await response.data;
      setProducts(data.data);
    } catch (error:any) {
      openToast(error.message || "We're currently unable to complete your request, Kindly try again later");
    }
  };
  useEffect(() => {
    fetchSchedule();
  },[])


  return (
    <>
      <View className="items-center min-h-full w-full h-auto flex-grow">


        <View className="w-full h-auto boder-b-[0.2px] mt- mb-6 flex-row justify-end">
          <TouchableOpacity className="w-auto h-10 flex flex-row items-center" onPress={() => setNewmodal(true)}>
            <Text className="text-2xl font-interbold text-gray-900 mx-1 dark:text-white">
              +
            </Text>
            <Text className="text-sm font-inter text-gray-900 dark:text-white">
              New Schedule
            </Text>
          </TouchableOpacity>


        </View>

        {
          products.map((item:any, index:number) => (
            <TouchableOpacity key={index} className="w-full flex justify-around h-auto px-4 my-3" onPress={() => 
              {
                setScheduleObject(item)
                setSchedulemodal(true)
              }
            }>
              <View className="w-full h-10 items-center flex-row mb-4">
                <Pressable className="w-8 h-8 mr-2">
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
              <Text className="font-intermedium dark:text-white text-ten text-graytext my-1">
                Next Date: {convertDate(item.nextDate)}
              </Text>
              <Text className="font-intermedium  dark:text-white  text-ten text-graytext my-1">
                Plan: {item.name}
              </Text>
              <Text className="font-intermedium  dark:text-white  text-ten text-graytext my-1">
                Amount: {item.amount}
              </Text>
              <Text className="font-intermedium  dark:text-white text-ten text-graytext my-1">
                Start date: {convertDate(item.date)}
              </Text>
              <Text className="font-intermedium  dark:text-white  text-ten text-graytext my-1">
                Beneficiary: {item.recipient || item.phone}
              </Text>


            </TouchableOpacity>
          ))
        }

        <Loader isLoading={isLoading} />
        <Pinmodal
          visible={isPin}
          close={() => setIspin(false)}
          submit={() => handleSubmit()}
        />
        <Schedulemodal
          visible={schedulemodal}
          data={scheduleObject}
          close={() => setSchedulemodal(false)}
          refetch={() => fetchSchedule()}
        />
        <Typemodal
          visible={typemodal}
          close={() => setTypemodal(false)}
          submit={(e: any) => handleTypeClick(e)}
        />
        <Feedmodal
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        />
        <Newmodal
          visible={newmodal}
          close={() => setNewmodal(false)}
        />
      </View>
    </>
  );
}

const SelectSvg = (prop: string) => {
  switch (prop) {
    case "dstv":
      return <DstvSvg width="100%" height="100%" />
    case "startimes":
      return <StartimesSvg width="100%" height="100%" />
      case "gotv":
        return <GotvSvg width="100%" height="100%" />
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
function Newmodal({ visible, close }: { visible: boolean, close: () => void }) {

  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="text-xl font-interbold mx-5 mb-5 dark:text-white">Schedule Bill</Text>
          <View className="w-full px-4 pb-4">
            <TouchableOpacity className="w-full h-14 rounded-md] flex flex-row items-center px-2 my-1" onPress={() => router.push("../schedule/electric")}>
              <ElectricSvg />
              <Text className="font-intermedium text-md dark:text-white mx-2">Electricity</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full h-14 rounded-md flex flex-row items-center px-2 my-1" onPress={() => router.push("../schedule/internet")}>
              <InternetSvg />
              <Text className="font-intermedium dark:text-white text-md mx-2">Internet</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full h-14 rounded-md flex flex-row items-center px-2 my-1" onPress={() => router.push("../schedule/cable")}>
              <TvSvg />
              <Text className="font-intermedium dark:text-white text-md mx-2">TV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Custommodal>
    </>
  );
}