"use client";
import { Googlelogo, Logo } from "@/components/misc/comps";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/loader";
import Customview from "../../../components/customview";
import { AntDesign, Feather, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
export default function Page() {
  const searchparam = useLocalSearchParams();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast();
  const [error, setError] = useState(false);


  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-mycolor min-h-full justify-between ">
          <View id="empty" className="w-full">

          </View>
          <View className="w-full items-center h-auto">

            <View
              id="logo-container"
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-center"
            >
              <View className="w-40 bg-green-500 rounded-full justify-center items-center h-40 flex flex-row mb-4">
                <Feather name="check" color="white" className="w-ful h-ful bg-cover" size={100} />
              </View>

              <Text className="text-3xl font-interbold text-white mt-2 mb-1">
                You're All Set!
              </Text>
              <Text className="text-sm font-inter text-white">
                Your JAAN account has been created.
              </Text>
              <Text className="text-sm font-inter text-white">
                You're now ready to enjoy seamless digital living
              </Text>
            </View>

          </View>
          <View className="w-full flex items-center pb-6">
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="text-md font-intermedium bg-white w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"

            >
              <Text className="font-interbold text-mycolor text-lg">
                Explore JAAN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Customview>

      {showModal && <Loader isLoading={showModal} />}

    </>
  );
}
