"use client";
import { Googlelogo, Logo } from "@/components/misc/comps";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
const deale = require("../../../assets/images/reallogo.png");

import { router, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import useToast from "@/store/toast";
import { Toast } from "@/components/toast/toast";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import axios from "axios";
import CheckBox from "expo-checkbox";
import Customview from "../../../components/customview";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { FireJaanSvg } from "@/assets/svg";
import AuthState from "@/store/authstate";
export default function Page() {
  const searchparam = useLocalSearchParams();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast, closeToast, toastmessage, showToast } = useToast();
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [iseight, setiseight] = useState(false);
  const [isupper, setisupper] = useState(false);
  const [islower, setislower] = useState(false);
  const [isnumber, setisnumber] = useState(false);
  const [verifypassword, setverifyPassword] = useState(false);
  const [referral, setReferral] = useState("");

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const result = await Log(password);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      AuthState.setState("kyc")
      router.push("/signup/kyc")
    } catch (error: any) {
      setError(false);
      if (error?.message) {
        openToast(JSON.stringify(error.message));
        return;
      }
      openToast("Unable to complete Registration!");
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setiseight(password.length >= 8);
    setisupper(/[A-Z]/.test(password));
    setislower(/[a-z]/.test(password));
    setisnumber(/[0-9]/.test(password));
    setverifyPassword(password === Confirmpassword)


    setIsDisabled(
      !(
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        password === (Confirmpassword)
      ),
    );
  }, [password, Confirmpassword]);


  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-full justify-between ">
          <View className="w-full flex items-center h-auto">
            <View
              id="progressbar"
              className="w-full bg-transparent justify-around flex items-center rounded-full flex-row bg-white py-1"
            >
              <View className="w-[22%] bg-mycolor h-1 rounded-full px-1" />

              <Pressable className="w-[22%] bg-mycolor h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
            </View>
            <View
              id="back-button"
              className="w-full bg-transparent justify-start flex flex-row items-center py-2"
            >
              <Pressable
                className="w-full h-full rounded-full"
                onPress={() => router.back()}
              >
                <AntDesign name="left" size={20} color="black" />
              </Pressable>
            </View>
            <View
              id="logo-container"
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-start "
            >
              <View className="w-full bg-transparent justify-center items-center h-auto flex flex-row mb-2">
                <FireJaanSvg />
              </View>
              <Text className="text-2xl font-interbold text-[#333333] mt-2 mb-1">
                Create Password
              </Text>
              <Text className="text-[12px] font-inter text-[#616161]">
                Create a strong password to secure your account
              </Text>
            </View>

            <View
              id="email container"
              className="my-10 w-full bg-transparent justify-start items-start flex flex-col"
            >
              <Text className="text-[#333333] font-intermedium text-[12px]">
                Password*
              </Text>

              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  className="flex-grow bg-transparent  h-16 px-3 rounded-xl"
                  value={password}
                  placeholder="* * * * *"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={isShowPassword}
                />
                {isShowPassword ? (
                  <Feather
                    name="eye"
                    color="#616161"
                    className="text-gray-600"
                    size={18}
                    onPress={() => setIsShowPassword(!isShowPassword)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    className="fill-gray-600"
                    size={18}
                    color="#616161"
                    onPress={() => setIsShowPassword(!isShowPassword)}
                  />
                )}
              </View>

              <View className="w-full h-auto mt-2">
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${iseight ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px]">
                    at least 8 characters
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${isupper ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px]">
                    at least 1 uppercase
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${islower ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1    `}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px]">
                    at least 1 lowercase
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${isnumber ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px]">
                    at least 1 number
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${verifypassword ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px]">
                    Passwords are the same
                  </Text>
                </Pressable>
              </View>
              <Text className="text-[#333333] font-intermedium text-[12px] mt-4">
                Confirm Password*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  className="flex-grow bg-transparent  h-16 px-3 rounded-xl"
                  value={Confirmpassword}
                  placeholder="* * * * *"
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry={isShowConfirm}
                />
                {isShowPassword ? (
                  <Feather
                    name="eye"
                    color="#616161"
                    className="text-gray-600"
                    size={18}
                    onPress={() => setIsShowConfirm(!isShowConfirm)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    className="fill-gray-600"
                    size={18}
                    color="#616161"
                    onPress={() => setIsShowConfirm(!isShowConfirm)}
                  />
                )}
              </View>
            </View>

          </View>
          <View className="w-full flex items-center pb-6">
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
        </View>
      </Customview>

      {showModal && <Loader isLoading={showModal} />}
      {showToast && (
        <Toast
          boolean={error}
          text={toastmessage}
          onClose={() => closeToast()}
        />
      )}
    </>
  );
}
