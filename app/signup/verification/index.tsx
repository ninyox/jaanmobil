import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/loader";
import { Log, Resend } from "./log";
import Customview from "../../../components/customview";
import { AntDesign } from "@expo/vector-icons";
import { FireJaanSvg } from "@/assets/svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthState from "@/store/authstate";
export default function Page() {
  const { email } = useLocalSearchParams();

  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast();
  const [isResend, setResend] = useState(false);
  const [error, setError] = useState(false);
  const [resendTime, setResendTime] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const intervalRef = useRef<any | null>(null);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    const token = await AsyncStorage.getItem("temptoken");
    if (!token) {
      return router.push(`/signup/email`);
    }
    if (code.length !== 6) {
      openToast("Please enter a valid verification code");
      return;
    }
    // if (code === "123456") {
    //     openToast("Verification successful");
    //     router.push("/signup/password");
    // }

    handleOpenModal();
    try {
      const result = await Log(parseInt(code), token,String(email));
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      AuthState.setState("password");
      router.push(`/signup/password`);
    } catch (error: any) {
      console.log(error);
      setError(false);
      if (error?.message) {
        openToast(error.message);
        return;
      }
      openToast("Unable to complete Registration!");
    } finally {
      handleCloseModal();
    }
  };

  const handleResend = async () => {
    if (resendTime > 0) {
      return;
    }
    const token = await AsyncStorage.getItem("temptoken");
    if (!token) {
      return router.push(`/signup/email`);
    }
    handleOpenModal();
    try {
      setResendTime(59);
      const result = await Resend(token);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      openToast(result.message);
      setResend(true);
    } catch (error: any) {
      console.log(error);
      setError(false);
      if (error?.message) {
        openToast(error.message);
        return;
      }
      openToast("Unable to complete Registration!");
    } finally {
      handleCloseModal();
    }
  };

  function handleTimeChange() {
    try {
      intervalRef.current = setInterval(() => {
        if (resendTime <= 0) {
          clearInterval(intervalRef.current);
          return;
        }
        setResendTime((prev) => prev - 1);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (verificationCode.every((code) => code !== "")) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [verificationCode]);

  useEffect(() => {
    if (resendTime === 0) {
      setResend(false);
    }
  }, [resendTime]);

  useEffect(() => {
    if (isResend) {
      handleTimeChange();
    }
  }, [isResend]);
  return (
    <>
      <Customview>
        <View className="flex flex-col py-6 w-full h-auto items-center px-3 bg-white min-h-full justify-between ">
          <View className="w-full flex items-center h-auto">
            <View
              id="progressbar"
              className="w-full bg-transparent justify-around flex items-center rounded-full flex-row bg-white py-1"
            >
              <View className="w-[22%] bg-mycolor h-1 rounded-full px-1" />

              <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
            </View>
            <View
              id="back-button"
              className="w-full bg-transparent justify-start flex flex-row items-center py-1"
            >
              <Pressable
                className="w-full h-full rounded-full"
                onPress={() => router.push(`/signup/email`)}
              >
                <AntDesign name="left" size={20} color="black" />
              </Pressable>
            </View>
            <View
              id="logo-container"
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-start "
            >
              <View className="w-full bg-transparent justify-center items-center h-auto flex flex-row mb-4">
                <FireJaanSvg />
              </View>
              <Text className="text-2xl font-interbold text-[#333333] mt-2 mb-1">
                Enter Verification Code
              </Text>
              <Text className="text-[10px] font-inter text-[#616161]">
                Enter the verification code sent to your email address
              </Text>
              <Text className="text-[12px] font-interbold text-black">
                {email}
              </Text>
            </View>

            <View
              id="email container"
              className="my-8 w-full bg-transparent justify-start items-start flex flex-col"
            >
              <View className="w-full flex flex-row justify-between mt-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <TextInput
                    key={index}
                    className="w-[16%] h-16 bg-[#E0E0E0] border border-figmagray rounded-xl text-center text-xl font-interbold"
                    maxLength={1}
                    keyboardType="number-pad"
                    ref={(input) => (inputRefs.current[index] = input)}
                    onChangeText={(text) => {
                      if (text) {
                        setVerificationCode((prev) => {
                          const newCode = [...prev];
                          newCode[index] = text;
                          return newCode;
                        });
                        if (index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      } else {
                        setVerificationCode((prev) => {
                          const newCode = [...prev];
                          newCode[index] = "";
                          return newCode;
                        });
                        if (index > 0) {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }
                    }}
                    value={verificationCode[index]}
                    selectionColor="transparent"
                    cursorColor="transparent"
                  />
                ))}
              </View>
              <View className="w-full flex flex-row justify-between mt-2">
                <Text className="text-[#333333] font-intermedium text-[12px] my-3">
                  Didn't get the code?{" "}
                  <Text
                    className="text-mycolor font-interbold text-[12px]"
                    onPress={() => handleResend()}
                  >
                    Resend it
                  </Text>
                </Text>
                {isResend && (
                  <Text className="text-mycolor font-interbold text-[11px] my-3">
                    {resendTime}s
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View
            id="button-container"
            className="w-full flex items-center pb-10 "
          >
            <Pressable
              onPress={() => handleSubmit()}
              className="text-md font-intermedium bg-mycolor w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"
              disabled={isDisabled}
            >
              <Text className="font-interbold text-white text-lg">Verify</Text>
            </Pressable>
          </View>
        </View>
      </Customview>

      {showModal && <Loader isLoading={showModal} />}

    </>
  );
}
