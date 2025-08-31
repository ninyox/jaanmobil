"use client";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { Googlelogo, Logo } from "@/components/misc/comps";
import { useState } from "react";
import useModal from "@/store/modal";
import useToast from "@/store/toast";
import { Toast } from "@/components/toast/toast";
import Loader from "@/components/loader/loader";
import Forgotmodal from "@/components/forgotmodal/page.js";
import Test from "./test";
import { Log } from "./log.js";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Customview from "../../components/customview/index.tsx";
export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { showModal, handleOpenModal, handleCloseModal } = new useModal();
  const { openToast, closeToast, toastmessage, showToast } = new useToast();
  const [showForgot, setForgot] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    //  router.push("home");
    // const test = Test(username, password);
    // if (!test) {
    //   return openToast("One or more Required Input is Empty or too short");
    // }
    handleOpenModal();
    try {
      const result = await Log(username, password);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      openToast(result.message);
      await AsyncStorage.setItem("token", result.data);
      router.push("home");
    } catch (error) {
     // console.log(error);
      setError(false);
      openToast(error?.message || "Currently unable to log you in");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      <Customview>
        <View className=" flex flex-col w-full md:rounded-md bg-mycolor h-screen items-center">


          <View className="w-full h-auto rounded-t-2xl py-12 px-2 flex flex-col items-center">
            <View className="flex-grow h-auto my-4 w-full flex flex-col items-center">
              <Image
                source={require("../../assets/images/jaanlogo.png")}
                className="w-ful h-ull bg-conain"
              />
            </View>
            <View className=" flex flex-col my-3">
              <Text className="text-md text-center text-white font-interbold ">
                LOGIN TO YOUR ACCOUNT
              </Text>
            </View>
            <View className="border-[0.3px] w-10/12 h-auto px-2 py-1 my-3 border-yellow bg-slate-100 rounded-lg">
              <Text className="text-sm font-intermedium lol:text-white">
                Username
              </Text>
              <TextInput
                type="username"
                placeholder=""
                className="outline-none text-sm font-inter lol:bg-gray-950 bg-transparent lol:text-white"
                value={username}
                onChangeText={(e) => setusername(e)}
              />
            </View>

            <View className="border-[0.3px] w-10/12 h-auto px-2 py-1 my-3 border-yellow bg-slate-100 rounded-lg">
              <Text className="text-sm font-intermedium lol:text-white">
                Password
              </Text>
              <TextInput
                placeholder="   * * * *"
                keyboardType="visible-password"
                className="outline-none text-sm font-inter w-full lol:bg-gray-950 bg-transparent lol:text-white"
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>

           
            <View className="w-full flex items-center mt-14 px">
              <Pressable
                onPress={() => handleSubmit()}
                className="text-md font-intermedium text-white bg-white w-3/4 h-12 rounded-lg flex flex-row items-center justify-center border border-yellow"
              >
                <Text className="font-interbold text-lg">LOGIN</Text>
              </Pressable>
            </View>
            <View className="flex justify-center w-full h-auto px-3 my-3">
           
              <Text
                onPress={() => setForgot(true)}
                className="text-sm font-intermedium cursor-pointer text-yellow text-center"
              >
                Forgot password?
              </Text>
            </View>
          </View>
        </View>
      </Customview>

      {showModal && <Loader />}
      {showToast && (
        <Toast
          boolean={error}
          text={toastmessage}
          onClose={() => closeToast()}
        />
      )}
      {showForgot && <Forgotmodal close={() => setForgot(false)} />}
      <StatusBar style="dark" />
    </>
  );
}
