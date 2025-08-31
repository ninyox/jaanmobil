import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "@/components/customview";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "@/components/icons/icons";
export default function Page() {
  const { email } = useLocalSearchParams();
  const router = useRouter();
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
      return router.push("../signup/email");
    }
    if (code.length !== 6) {
      openToast("Please enter a valid verification code");
      return;
    }

    handleOpenModal();
    try {
      const result = await Log(parseInt(code), token);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      router.push(`../home`);
    } catch (error: any) {
      console.log(error);
      setError(false);
      if (error?.message) {
        openToast(error.message);
        return;
      }
      openToast("Currently Unable to complete code verification!");
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
        <View className="flex flex-col py-6 w-full h-auto items-center px-3 bg-whie min-h-fu flex-1 flex-grow justify-between ">
          <View className="w-full flex items-center h-auto mb-20">
            <View
              id="back-button"
              className="w-full bg-transparent justify-start flex flex-row items-center py-1"
            >
              <Pressable
                className="w-full h-full rounded-full"
                onPress={() => router.back()}
              >
               <BackButton />
              </Pressable>
            </View>
            <View
              id="logo-container"
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-start mt-4"
            >
              <Text className="text-2xl font-interbold text-[#333333] dark:text-white mt-2 mb-1">
                Forgot Your Password ?
              </Text>
              <Text className="text-[10px] font-intermedium text-[#616161]">
                Don’t worry! It happens. Please select your preferred recovery
                method below.
              </Text>
              <Text className="text-[12px] font-interbold text-black">
                {email}
              </Text>
            </View>

            <View
              id="buttons"
              className="my-8 w-full bg-transparent justify-start items-start flex flex-col"
            >
              <View className="w-full flex flex-row justify-center items-center mt-2">
                <TouchableOpacity className="w-11/12 items-center justify-center h-14 rounded-2xl bg-mycolor" onPress={() => router.push("/forgot/email/reset")}>
                  <Text className="text-md font-interbold text-white">
                    Recover Via Email
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="w-full flex flex-row justify-center items-center mt-6">
                <TouchableOpacity className="w-11/12 items-center justify-center h-14 rounded-2xl bg-mycolor" onPress={() => router.push("/forgot/sms/reset")}>
                  <Text className="text-md font-interbold text-white">
                    Recover Via SMS
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Customview>

      {showModal && <Loader isLoading={showModal} />}
    </>
  );
}
