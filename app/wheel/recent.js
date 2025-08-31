import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const mtn = require("../../assets/images/mtn.png");
const airtel = require("../../assets/images/airtel.png");
const ninemobile = require("../../assets/images/ninemobile.png");
const glo = require("../../assets/images/glo.png");
const networkarray = [
  {
    name: "Mtn network",
    source: require("../../assets/images/mtn.png"),
    value: "1",
  },
  {
    name: "Glo network",
    source: require("../../assets/images/glo.png"),
    value: "2",
  },
  {
    name: "9mobile network",
    source: require("../../assets/images/ninemobile.png"),
    value: "3",
  },
  {
    name: "Airtel network",
    source: require("../../assets/images/airtel.png"),
    value: "4",
  },
];
export function RecentModal({ close, submit, net }) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const checkRecent = await AsyncStorage.getItem("airtimerecent");
    if (!checkRecent) {
      console.log("doesnt ewxist");
      return;
    }
    const parsedArray = JSON.parse(checkRecent);
    setData(parsedArray);
  };
  const network = (load) => {
    const returnedLoad = networkarray.filter((items) => items.value === load);
    console.log(returnedLoad);
    net(returnedLoad[0])
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (data.length === 0) {
    return;
  }
  return (
    <>
      <View className=" w-full h-auto min-h-28 flex flex-col items-cener justify-center mb-3 ">
        <Text className="font-intermedium text-md">One-Tap Transactions</Text>
        <View className="w-full h-auto bg-white min-h-5 rounded-lg fl">
          <ScrollView className="w-full h-auto" horizontal={true}>
            {data
              .reverse()
              .slice(0, 6)
              .map((item) => {
                return (
                  <>
                    <TouchableOpacity
                      key={item.phonenumber}
                      className="h-auto rounded-lg w-auto max-w-28 flex m-2 items-center p-2 flex-col bg-bluecolortran bg-opacity-"
                      onPress={() => {
                        submit(item);
                        network(item.network);
                      }}
                    >
                      <Image
                        source={returnImage(item.network.toLowerCase())}
                        className="h-8 w-8 rounded-full"
                      />
                      <Text className="text-sm font-intermedium my-1">
                        &#8358;{item.amount}
                      </Text>
                      <Text className="text-sm font-intermedium">
                        {item.phonenumber.slice(0, 13)}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

export const handleRecent = async (network, phonenumber, amount) => {
  try {
    const newData = {
      network,
      amount,
      phonenumber,
    };
    const checkRecent = await AsyncStorage.getItem("airtimerecent");
    if (checkRecent) {
      const parsedRecent = JSON.parse(checkRecent);
      const index = parsedRecent.findIndex(
        (obj) => obj.phonenumber === phonenumber
      );
      if (index !== -1) {
        const [removed] = parsedRecent.splice(index, 1);
        parsedRecent.push(removed);
        return;
      } else {
        parsedRecent.push(newData);
        const stringifiedArray = JSON.stringify(parsedRecent);
        AsyncStorage.setItem("airtimerecent", stringifiedArray);
        return;
      }
    }
    const newArray = [];
    newArray.push(newData);
    const StringifiedArray = JSON.stringify(newArray);
    AsyncStorage.setItem("airtimerecent", StringifiedArray);
    return true;
  } catch (error) {
    console.log(error);
    return;
  }
};

const returnImage = (data) => {
  let image;
  switch (data) {
    case "1":
      image = mtn;
      break;
    case "2":
      image = glo;
      break;
    case "3":
      image = ninemobile;
      break;
    case "4":
      image = airtel;
      break;
    default:
      image = mtn;
  }
  return image;
};
