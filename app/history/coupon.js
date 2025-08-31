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
import Log from "./log";
import Toast from "react-native-toast-message";
import React, { useEffect, useState } from "react";
const mtnimage = require("@/assets/images/mtn.png");
const gloimage = require("@/assets/images/glo.png");
const mobileimage = require("@/assets/images/ninemobile.png");
const airtelimage = require("@/assets/images/airtel.png");
const walletimage = require("@/assets/images/wallet.jpeg");
const couponimage = require("@/assets/images/coupon.png");
export default function Couponmodal({ click }) {
  const [load, setLoad] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Log("coupon");
      setLoad(response);
    } catch (error) {
      Toast.show("Unable to get Cable Transactions");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <View className="air transactions mt-10  border  overflow-x-auto late-400 w-full h-auto sm:h-[500px] overflow-y-auto py-3 px-3 rounded-lg sm:rounded-2xl">
        <View className=" label flex p-4 w-full h-auto justify-between">
          <Text className="font-interbold text-slate-700 text-lg dark:text-white">
            {load?.length} Coupon Transactions
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View className="name box top p-4 table-auto min-w-full whitespace-nowrap h-auto justify-between items-center border-b border-slate-500">
            <View className="bg-slate-100 rounded-md flex flex-row w-full h-10">
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                Couponid
              </Text>
              <Text className="font-interbold uppercase p-3 text-slate-700 text-sm">
                Recipient
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

            <View className="align-middle table-row-group">
              {load.map((item, index) => {
                const statusClass = getStatusClass(item.network.trim());
                const date = new Date(item.date);

                // Format the date to a specific format (e.g., YYYY-MM-DD HH:MM:SS)
                const formattedDate = date
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");

                return (
                  <View
                    key={index}
                    onClick={() => click(item)}
                    className="name box top p-4 h-auto align-middle flex-row justify-between items-center border-b border-slate-300"
                  >
                    <Text className="font-intermedium text-center p-4 text-slate-700 text-sm  dark:text-white">
                      {item.plan}
                    </Text>
                    <Text className="font-intermedium p-4 text-slate-700 text-center text-sm  dark:text-white">
                      {item.recipient}
                    </Text>
                    <Text
                      className={`font-intermedium p-4 text-center text-lg ${
                        item.type === "Debit" ? "text-red-500 " : "text-black dark:text-white"
                      } text-sm `}
                    >
                      &#8358; {item.price}
                    </Text>
                    <Text>
                      <View
                        className={`p-1 w-auto h-auto rounded-sm flex justify-center items-center border px-2 ${
                          item.status === "Successful"
                            ? "border-green-500 text-green-600"
                            : "border-red-500 text-red-600"
                        }`}
                      >
                        <Text className=" dark:text-white">{item.status}</Text>
                      </View>
                    </Text>
                    <Text className="font-light p-4 text-center text-slate-700 text-sm  dark:text-white">
                      {formattedDate}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
function getStatusClass(network) {
  console.log(network);
  switch (network) {
    case "airtel" || "AIRTEL":
      return airtelimage;
    case "MTN" || "MTN":
      return mtnimage;
    case "glo" || "GLO":
      return gloimage; // I assume you intended 'yellow' here.
    case "9mobile" || "9MOBILE":
      return mobileimage;
    case "coupon" || "COUPON":
      return couponimage;
    default:
      return walletimage;
  }
}

// Helper function to get the text color based on the status
function getStatusColor(status) {
  switch (status) {
    case "success":
      return "green";
    case "failed":
      return "red";
    default:
      return "black";
  }
}
