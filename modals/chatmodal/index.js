import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { timeAgo } from "@/components/worker/page.js";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import Log from "./log.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

export default function Chatmodal() {
  const { width, height } = Dimensions.get("window");
  const [chatlist, setChatlist] = useState([]);
  const [userid, setUserd] = useState("");
  const fetchData = async () => {
    const userd = await AsyncStorage.getItem("userid");
    setUserd(userd);
    try {
      const response = await Log();
      console.log("im not here oo");
      if (Array.isArray(response)) {
   
        setChatlist(response.reverse());
      } else {
        console.log("im not here oo");
      }
    } catch (error) {
      // router.back();
    } finally {
      console.log("lop");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const check = (dta) => {
    if (userid === dta) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <View
        style={{ width }}
        className=" borer-2 bordr-red-500 h-auto min-h-max bg-white lol:bg-gray-900 overflow-auto "
      >
        {chatlist.length > 0 ? (
          chatlist.map(
            ({
              chatid,
              senderid,
              status,
              sender,
              product,
              receivername,
              sendername,
              senderimage,
              receiverimage,
              title,
              message,
              imageurl,
              date,
            }) => (
              <TouchableOpacity
                key={date}
                className="w-full h-20 border-[0.2px] border-slate-300 items-center flex py-2 lol:border-gray-500 flex-row "
                onPress={() =>
                  router.push(`/chat?id=${chatid}&advertid=${product}`)
                }
              >
                <View className="h-12 w-12 ml-2">
                  <Image
                    source={{
                      uri: check(senderid)
                        ? receiverimage || "https://korakota.com/emoticon.png"
                        : senderimage || "https://korakota.com/emoticon.png",
                    }}
                    className="w-full h-full rounded-full"
                  />
                </View>

                <View
                  style={{ width: width - 50 }}
                  className="h-full flex-col flex justify-between select-none px-2 flx-grow bg-red500 borer-2 border-yellow-500"
                >
                  <View className="h-2/6 w-full flex justify-between px-2 items-center mb-1 flex-row borde">
                    <Text className="font-interbold text-md whitespace-nowrap">
                      {title}
                    </Text>

                    <Text className="font-intermedium text-[12px]">
                      {timeAgo(date)}
                    </Text>
                  </View>

                  <View className="h-2/6 w-full flex justify-between px-2 items-center flex-row">
                    <Text className="font-intermedium text-sm text-slate-800 lol:text-gray-100 whitespace-nowrap">
                      {check(senderid) ? receivername : sendername}
                    </Text>
                  </View>

                  <View className="h-2/6 w-full flex justify-between px-2 items-center mt-1 flex-row borde">
                    <View className="flex flex-row items-center ">
                      <View
                        className={`${
                          check(sender)
                            ? "bg-slate-800 lol:bg-slate-700"
                            : "hidden"
                        } text-[10px] font-inter mx-1 w-2 h-2 flex items-center rounded-sm text-white`}
                      >
                        <Text>{check(sender) ? "Me: " : null}</Text>
                      </View>
                      <Text
                        className={`${
                          status === "seen" ? "font-inter" : "font-intermedium"
                        } text-sm text-slate-700 lol:text-slate-300`}
                      >
                        {message.length > 19 || imageurl.length > 19
                          ? `${changeIt(message || imageurl).slice(0, 19)}...`
                          : changeIt(message || imageurl)}
                      </Text>
                    </View>

                    <View
                      id="dot"
                      className={`h-3 w-3 rounded-full bg-red-600 flex ${status === "seen" || sender === userid ? " " : "bg-red-600" }`}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          )
        ) : (
          <View className="w-full h-auto flex flex-col items-center justify-center px-3 md:rounded-xl">
            <Image
              source={require("../../assets/images/empty.jpg")}
              className="w-40 h-[200px] mt-20"
            />
            <Text className="text-xl font-intermedium text-slate-600 lol:text-gray-200">
              No Active Messages
            </Text>
            <Text className="text-md font-inter text-slate-600 text-center lol:text-gray-200">
              Simply Click the product you like and Contact the Seller
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const changeIt = (text) => {
  if (text.startsWith("https://pics")) {
    return "🖼️";
  } else {
    return text;
  }
};
