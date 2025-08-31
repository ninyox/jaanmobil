import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import Log from "./log";
const mtnimage = require("@/assets/images/mtn.png");
const gloimage = require("@/assets/images/glo.png");
const mobileimage = require("@/assets/images/ninemobile.png");
const airtelimage = require("@/assets/images/airtel.png");
const walletimage = require("@/assets/images/wallet.jpeg");
export default function Datamodal({ click }) {
  const [load, setLoad] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Log("data");
      setLoad(response);
    } catch (error) {
      console.error(error);
      Toast.show("Unable to get Data Transactions");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScrollView className="data transactions overflow-x-auto w-full h-full py-3 rounded-lg sm:rounded-2xl">
        <View className="label flex p-4 w-full h-auto justify-between">
          <Text className="font-interbold text-slate-700 text-lg dark:text-white">
            {load?.length} Data Transactions
          </Text>
        </View>

        <ScrollView horizontal={true} className="w-full border ">
          <View className="name box top p-4 table-auto min-w-full whitespace-nowrap h-auto">
            <View className="bg-slate-100 rounded-md flex flex-row w-full h-10">
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                Network
              </Text>
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                Size
              </Text>
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                Mobile Number
              </Text>
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                AMOUNT
              </Text>
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                STATUS
              </Text>
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                DATE
              </Text>
            </View>

            <View className="align-middle table-row-group h-auto">
              <ScrollView>
                {load?.map((item, index) => {
                  const statusClass = getStatusClass(
                    item.network.toLowerCase()
                  );
                  const date = new Date(item.date);
                  const formattedDate = date
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");

                  return (
                    <View
                      key={index}
                      onClick={() => click(item)}
                      className="name box top p-4 h-auto align-middle items-center border-b border-slate-300 flex flex-row"
                    >
                      <View className="font-intermedium text-center p-4 text-slate-700 text-sm">
                        <Image
                          source={`${statusClass}`}
                          alt="My Image"
                          className="rounded border-b-0 w-12 h-12"
                        />
                      </View>
                      <Text className="font-intermedium p-4 text-slate-700 dark:text-white text-center text-sm">
                        {item.plan}
                      </Text>
                      <Text className="font-intermedium p-4 text-slate-700 text-center text-sm dark:text-white">
                        {item.recipient}
                      </Text>
                      <Text
                        className={`font-intermedium p-4 text-center text-lg ${
                          item.type === "Debit" ? "text-red-500" : "text-black dark:text-white"
                        } text-sm`}
                      >
                        &#8358; {item.price}
                      </Text>
                      <View
                        className={`p-1 w-auto h-auto rounded-sm flex justify-center items-center border ${
                          item.status === "successful" ||
                          item.status === "Successful"
                            ? "border-green-500 text-green-600"
                            : "border-red-500 text-red-600"
                        }`}
                      >
                        <Text className=" dark:text-white">{item.status}</Text>
                      </View>
                      <Text className="font-light p-4 text-center text-slate-700 text-sm dark:text-white">
                        {formattedDate}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}
function getStatusClass(network) {
  switch (network) {
    case "airtel":
      return airtelimage;
    case "mtn":
      return mtnimage;
    case "glo":
      return gloimage; // I assume you intended 'yellow' here.
    case "9mobile":
      return mobileimage;
    default:
      return walletimage;
  }
}

// // Helper function to get the text color based on the status
// function getStatusColor(status) {
//   switch (status) {
//     case "success":
//       return "green";
//     case "failed":
//       return "red";
//     default:
//       return "black";
//   }
// }
