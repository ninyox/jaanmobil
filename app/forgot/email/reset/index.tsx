import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { Toast } from "@/components/toast/toast";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "@/components/customview";
import { AntDesign, Feather } from "@expo/vector-icons";
import { BackButton } from "@/components/icons/icons";

export default function Page() {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const result = await Log(email);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      router.push(`/forgot/email/verification?email=${email}`);
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
    if (pattern.test(email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-screen dark:bg-dark">
          <View
            id="back-button"
            className="w-full bg-transparent justify-start flex flex-row items-center py-1"
          >
            <BackButton />
          </View>
          <View
            id="logo-container"
            className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-start mt-4"
          >
            <Text className="text-2xl font-interbold text-[#333333] dark:text-white mt-2 mb-1">
              Reset via Email
            </Text>
            <Text className="text-[10px] font-intermedium text-[#616161]">
              Enter your email address below to receive a password reset link.
            </Text>
           
          </View>

          <View
            id="email container"
            className="my-10 w-[95%] bg-transparent justify-start items-start flex flex-col mb-32"
          >
            <Text className="text-[#333333] font-intermedium text-[13px] dark:text-white mb-1">
              Email*
            </Text>
            <TextInput
              className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl text-sm dark:text-white"
              placeholder="Enter your Email"
              placeholderClassName="dark:text-white"
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />

            <Text className="text-blue-500 font-intermedium text-[11px] my-2">
              Please Enter your registered email address
            </Text>
          </View>

          <View className="w-full flex items-center mt-5 absolute bottom-10">
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="text-md font-intermedium bg-mycolor w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"
              disabled={isDisabled}
            >
              <Text className="font-interbold text-white text-lg">
                Send Verification Code
              </Text>
            </TouchableOpacity>
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
