import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "@/components/footer/page";
import Chatmodal from "@/modals/chatmodal/index.js";
import Loader from "@/components/loader/loader";
import Forumcomp from "@/components/forum/page.jsx";
import useModal from "@/store/modal";
import Log from "./log.js";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../../components/skeleton/general.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
const userid = AsyncStorage.getItem("userid");

export default function Page() {
  const { showModal, handleOpenModal, handleCloseModal } = new useModal();
  const [tabindex, setTabindex] = useState(0);
  const [chatlist, setChatlist] = useState([]);
  const []

  const fetchData = async () => {
    
    handleOpenModal("e");
    try {
      const response = await Log();

      if (Array.isArray(response)) {
        setChatlist(response.reverse());
      }
    } catch (error) {
      // router.back();
    } finally {
      handleCloseModal();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const ChangeTab = (tab) => {
    setTabindex(tab);
  };
  const check = (dta) => {
    if (userid === dta) {
      return true;
    } else {
      return false;
    }
  };

  if (showModal) {
    return <Skeleton />;
  }

  return (
    <>
      <SafeAreaView />
      <ScrollView className="flex-1 ">
        <View className="w-screen h-screen bg-white lol:bg-gray-900 pb-1">
          <View className="w-full h-auto px-2 flex flex-row items-center justify-between border-b bg-white lol:bg-gray-950 ">
            <TouchableOpacity
              onPress={() => ChangeTab(0)}
              className={`w-3/6 h-auto py-2 ${
                tabindex === 0 ? "border-b-2  border-mycolor" : "border-none"
              } flex justify-center mx-4`}
            >
              <Text
                className={`${
                  tabindex === 0
                    ? "text-mycolor font-intermedium"
                    : "text-black lol:text-gray-200"
                }`}
              >
                Chats
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => ChangeTab(1)}
              className={`w-3/6 h-auto py-2 ${
                tabindex === 1 ? "border-b-2 border-mycolor" : "border-none"
              } flex justify-center mx-4`}
            >
              <Text
                className={`${
                  tabindex === 1
                    ? "text-mycolor font-intermedium"
                    : "text-black lol:text-gray-200"
                }`}
              >
                Forums
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full min-h-max h-auto ">
            {tabindex === 0 ? (
              <View className="w-full h-auto flex justify-start">
                <Chatmodal />
              </View>
            ) : (
              <View className="w-full h-auto flex justify-end">
                <Forumcomp />
              </View>
            )}
          </View>

          {showModal}
        </View>
      </ScrollView>
      <StatusBar style="dark" />
      <Footer selected="chats" />
    </>
  );
}

const changeIt = (text) => {
  if (text.startsWith("https://pics")) {
    return "Image🖼️";
  } else {
    return text;
  }
};
