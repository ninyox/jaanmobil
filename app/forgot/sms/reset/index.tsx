import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
interface ErrorInt {
  message: string;
  success: boolean
}
import { router, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { Toast } from "@/components/toast/toast";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "@/components/customview";
import { FireJaanSvg, GoogleSvg, FaceBookSvg, AppleSvg } from "@/assets/svg";
import {
  Feather,
} from "@expo/vector-icons";
import { isAxiosError } from "axios";
export default function Page() {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast()
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setisShowPassword] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const result = await Log(email, password);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      router.push(`../login/verification?email=${email}`);
    } catch (error: any) {
      setError(false);
      if (error && error?.message) {
        openToast(error?.message);
        return;
      }
      openToast("Currently Unable to Login, Please Try again later!");
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email) && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-screen pt-10 dark:bg-dark">
          <View
            id="logo-container"
            className="w-11/12 bg-transparent rounded-md h-auto justify-start flex-col items-center"
          >
            <View className="w-full bg-transparent justify-center items-center h-auto bg-red-500 flex flex-row my-5">
              <FireJaanSvg />
            </View>
            <Text className="text-xl font-interbold text-[#333333] mt-2 mb-1 dark:text-white">
              Welcome Back!
            </Text>
            <Text className="text-[10px] font-inter text-[#616161] dark:text-white">
              Login to access your JAAN account
            </Text>
          </View>

          <View
            id="email container"
            className="my-10 w-[95%] bg-transparent justify-start items-start flex flex-col"
          >
            <Text className="text-[#333333] font-intermedium text-[13px] dark:text-white mb-1">
              Email Address*
            </Text>
            <TextInput
              className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl text-sm dark:text-white"
              placeholder="Enter your Email"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Text className="text-[#333333] font-intermedium text-[13px] mt-4 dark:text-white mb-1">
              Password*
            </Text>
            <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
              <TextInput
                className="flex-grow bg-transparent text-sm  h-full px- rounded-xl dark:text-white"
                placeholder="Enter Password"
                onChangeText={(text) => setPassword(text)}
                // keyboardType="visible-password"
                secureTextEntry={isShowPassword}
                value={password}
              />
              {isShowPassword ? (
                <Feather
                  name="eye"
                  color="#616161"
                  className="text-gray-600"
                  size={20}
                  onPress={() => setisShowPassword(!isShowPassword)}
                />
              ) : (
                <Feather
                  name="eye-off"
                  className="fill-gray-600"
                  size={20}
                  color="#616161"
                  onPress={() => setisShowPassword(!isShowPassword)}
                />
              )}
            </View>

            <Text className="text-red-500 font-intermedium text-[11px] my-2">
              Forgot password?
            </Text>
          </View>

          <View className="w-full flex items-center mt-5">
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="text-md font-intermedium bg-mycolor w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"
              disabled={isDisabled}
            >
              <Text className="font-interbold text-white text-lg">Log in</Text>
            </TouchableOpacity>
          </View>



          <View className="w-full h-auto flex items-center my-8">
            <View className="w-full h-auto flex items-center justify-center">
              <View className="w-full h-auto flex items-center justify-center flex-row">
                <Pressable className="w-[40%] h-[2px] flex items-center justify-center bg-[#E0E0E0] rounded-full" />
                <Text className="text-sm text-center font-inter text-[#616161] mx-2">
                  or
                </Text>
                <Pressable className="w-[40%] h-[2px] flex items-center justify-center bg-[#E0E0E0] rounded-full" />
              </View>

              <View className="w-full h-auto flex items-center justify-center mt-4">
                <Text className="text-sm text-center font-inter text-[#616161] my-2 dark:text-white">
                  Sign in with
                </Text>
                <View className="w-full h-auto flex items-center justify-center flex-row">
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
          <View className="w-full h-auto flex items-center my-2">
            <Text className="text-sm text-center font-inter text-[#616161] mx-1 dark:text-white">
              Don't have an account? {""}
              <Text
                className="text-mycolor font-interbold px-2"
                onPress={() => router.push("../signup/email")}
              >
                Sign up for free
              </Text>{" "}
            </Text>
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
