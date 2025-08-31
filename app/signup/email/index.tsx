"use client";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { Toast } from "@/components/toast/toast";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import axios from "axios";
import CheckBox from "expo-checkbox";
import Customview from "../../../components/customview";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { FireJaanSvg, GoogleSvg, FaceBookSvg, AppleSvg } from "@/assets/svg";
import AuthState from "@/store/authstate";
interface errorProp {
  success: boolean;
  message: string
}
export default function Page() {
  const searchparam = useLocalSearchParams();

  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast();
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const result = await Log(
        email
      );
      if (!result.success) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      AuthState.setState("verification")
      router.push(`../signup/verification?email=${email}`);
    } catch (error: any) {
      console.log(error)
      setError(false);
      if (error && error.message) {
        openToast(error.message);
        return;
      }
      openToast("Unable to start registration, Try again later!");
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email) && isChecked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, isChecked]);
  useEffect(() => {
    AuthState.setState("none")
  },[])
  return (
    <>
      <Customview>

        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-screen pt-3 dark:bg-gray-950">
          <View id="progressbar" className="w-full bg-transparent justify-around flex items-center rounded-full flex-row py-1">
            <View className="w-[22%] bg-mycolor h-1 rounded-full px-1" />

            <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
            <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
            <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
          </View>
          <View id="back-button" className="w-full bg-transparent justify-start items-start h-auto">
            <Pressable className="w-10 h-10 rounded-full my-1" onPress={() => router.back()}>
              <AntDesign name="left" size={20} color="black" />
            </Pressable>
          </View>
          <View id="logo-container" className="w-11/12 bg-transparent rounded-md h-auto justify-start flex-col items-center">
            <View className="w-full bg-transparent justify-center items-center h-auto bg-red-500 flex flex-row py-2">
              <FireJaanSvg />
            </View>
            <Text className="text-xl font-interbold text-[#333333] mt-2 mb-1 dark:text-white">Unlock Seamless Digital Living</Text>
            <Text className="text-[10px] font-inter text-[#616161] dark:text-white">Join JAAN in just a few simple steps</Text>

          </View>

          <View id="email container" className="my-16 w-11/12 bg-transparent justify-start items-start flex flex-col">
            <Text className="text-[#333333] font-intermedium text-[13px] dark:text-white mb-1">
              Email Address*
            </Text>
            <TextInput className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl dark:text-white" placeholder="Enter your Email" onChangeText={(text) => setEmail(text.toLowerCase())} />
            <Text className="text-[#616161] font-intermedium text-[11px] my-2 dark:text-gray-300">
              We’ll send you a code. It helps to keep your account secure
            </Text>
          </View>




          <View className="w-full flex items-center mt-14">
            <View className="w-11/12 bg-transparent justify-start items-start h-auto bg-red-500 flex flex-row my-6">
              <CheckBox value={isChecked} color="#6b34ff" className="w-2 h-2 m-1 " style={{ transform: [{ scale: 0.8 }] }} onValueChange={() => setChecked(!isChecked)} />
              <Text className="text-[#333333] font-intermedium text-[10px] dark:text-white">
                By tapping continue, you agree to our <Text className="text-blue-400 font-intermedium text-[10px]">privacy policy</Text> and <Text className="text-blue-400 font-intermedium text-[10px]">terms and conditions</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="text-md font-intermedium bg-mycolor w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"
              disabled={isDisabled}
            >
              <Text className="font-interbold text-white text-lg">
                Continue
              </Text>
            </TouchableOpacity>
          </View>


          <View className="w-full h-auto flex items-center my-2">
            <Text className="text-sm text-center font-inter text-[#616161] mx-1 dark:text-white">
              Already have an account?  {""}
              <Text
                className="text-mycolor font-interbold px-2 "
                onPress={() => router.push("../login/login")}
              >
                Log in
              </Text>{" "}
            </Text>
          </View>


          <View className="w-full h-auto flex items-center my-2">
            <View className="w-full h-auto flex items-center justify-center">
              <View className="w-full h-auto flex items-center justify-center flex-row">
                <Pressable className="w-[40%] h-[2px] flex items-center justify-center bg-[#E0E0E0] rounded-full" />
                <Text className="text-sm text-center font-inter text-[#616161] mx-2">
                  or
                </Text>
                <Pressable className="w-[40%] h-[2px] flex items-center justify-center bg-[#E0E0E0] rounded-full" />
              </View>

              <View className="w-full h-auto flex items-center justify-center mt-2">
                <Text className="text-sm text-center font-inter text-[#616161] my-2 dark:text-white">
                  Log in with
                </Text>
                <View className="w-full h-auto flex items-center justify-center flex-row pt-2">
                  <Pressable className="w-12 h-12 rounded-full mx-2">
                    <AppleSvg className="w-12 h-12 rounded-full mx-2" />
                  </Pressable>
                  <Pressable className="w-12 h-12 rounded-full mx-2">
                    <GoogleSvg className="w-12 h-12 rounded-full mx-2" />
                  </Pressable>
                  <Pressable className="w-12 h-12 rounded-full mx-2">
                    <FaceBookSvg />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Customview>

      {showModal && <Loader isLoading={showModal} />}
      {/* {showToast && (
        <Toast
          boolean={error}
          text={toastmessage}
          onClose={() => closeToast()}
        />
      )} */}
    </>
  );
}
