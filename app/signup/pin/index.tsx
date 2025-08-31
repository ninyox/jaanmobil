import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import useModal from "@/store/modal";
import useToast from "@/store/toast";
import { Toast } from "@/components/toast/toast";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "../../../components/customview";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FireJaanSvg } from "@/assets/svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthState from "@/store/authstate";
export default function Page() {
  const searchparam = useLocalSearchParams();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast, closeToast, toastmessage, showToast } = useToast();
  const [errmessage, setErrMessage] = useState("");
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isshowpin, setisShowPin] = useState(true);
  const [isShowConfirm, setIsShowConfirm] = useState(true);


  const handleSubmit = async () => {
    router.push("/signup/kyc")
    handleOpenModal();
    try {
      const token = await AsyncStorage.getItem("temptoken")
      const result = await Log(pin, token);
      // console.log(result, "oga oo");
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      await AsyncStorage.setItem("token", result.data)
      AuthState.setState("none")
      router.push("/signup/success")
    } catch (error: any) {
      // console.log(error);
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

  useEffect(() => {
    // AuthState.setState("password")
    if (confirmPin && confirmPin !== pin) {
      setErrMessage("Ensure both PINs are similar")
    } else {
      setErrMessage("")
    }
    setIsDisabled(!(confirmPin && confirmPin === pin));
  }, [pin, confirmPin]);

  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-screen justify-between ">
          <View className="w-full items-center h-auto flex-grow">
            <View
              id="progressbar"
              className="w-full bg-transparent justify-around flex items-center rounded-full flex-row bg-white py-1"
            >
              <View className="w-[22%] bg-mycolor h-1 rounded-full px-1" />

              <Pressable className="w-[22%] bg-mycolor h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-mycolor h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-mycolor h-1 rounded-full px-1" />
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
              <View className="w-full bg-transparent justify-center items-center h-auto flex flex-row mb-4">
                <FireJaanSvg />
              </View>
              <Text className="text-xl font-interbold text-[#333333] mt-2 mb-1">
                Create Transaction PIN
              </Text>
              <Text className="text-[12px] font-inter text-[#616161]">
                Use this PIN to authorize transactions on JAAN
              </Text>
            </View>

            <View
              id="Pin container"
              className="my-10 w-full bg-transparent justify-start items-start flex flex-col"
            >
              <Text className="text-[#333333] font-intermedium text-[12px]">
                Transaction PIN
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  className="flex-grow bg-transparent h-16 px-3 rounded-xl text-md font-interbold"
                  value={String(pin)}
                  placeholder="Create Transaction PIN"
                  keyboardType="number-pad"
                  onChangeText={(text) => setPin(text)}
                  maxLength={4}
                  secureTextEntry={isshowpin}
                />
                {isshowpin ? (
                  <Feather
                    name="eye"
                    color="#616161"
                    className="text-gray-600"
                    size={18}
                    onPress={() => setisShowPin(!isshowpin)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    className="fill-gray-600"
                    size={18}
                    color="#616161"
                    onPress={() => setisShowPin(!isshowpin)}
                  />
                )}
              </View>

              <Text className="text-[#333333] font-intermedium text-[12px] mt-4">
                Confirm PIN*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  value={confirmPin}
                  className="flex-grow bg-transparent h-16 px-3 rounded-xl text-md font-interbold"
                  placeholder="Re-Enter PIN"
                  keyboardType="number-pad"
                  secureTextEntry={isShowConfirm}
                  onChangeText={(text) => setConfirmPin(text)}
                  maxLength={4}

                />
                {isShowConfirm ? (
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
              <Text className="text-red-600 text-md font-intermedium px-2">{errmessage}</Text>
            </View>

          </View>
          <View className="w-full flex items-center pb-6 min-h-20 h-auto">
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
