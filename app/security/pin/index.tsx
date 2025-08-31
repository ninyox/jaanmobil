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
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "../../../components/customview";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "@/components/icons/icons";
export default function Page() {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast();
  const [errmessage, setErrMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [isshowpassword, setisShowPass] = useState(true);
  const [confirmPin, setConfirmPin] = useState("");
  const [isshowpin, setisShowPin] = useState(true);
  const [isShowConfirm, setIsShowConfirm] = useState(true);

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await Log(password, pin, token);
      if (result.success === false) {
        openToast(result.message);
        return;
      }
      openToast(result.message);
      await AsyncStorage.setItem("pin", pin);
    } catch (error: any) {
      console.log(error);
      if (error?.message) {
        openToast(error.message);
        return;
      }
      openToast("Unable to Change Pin!, Try again later");
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const validPassword = password.length > 3;
    if (confirmPin && confirmPin !== pin) {
      setErrMessage("Ensure both PINs are similar");
    } else {
      setErrMessage("");
    }
    setIsDisabled(!(confirmPin && confirmPin === pin && validPassword));
  }, [pin, confirmPin, password]);

  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 min-h-screen justify-between ">
          <View className="w-full items-center h-auto flex-grow">
            <View
              id="back-button"
              className="w-full bg-transparent justify-start flex flex-row items-center py-4"
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
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-start  mt-6"
            >
              <Text className="text-2xl font-interbold dark:text-white text-[#333333] mt-2 mb-1">
                Change Transaction Pin
              </Text>
              <Text className="text-[12px] font-inter text-[#616161]">
                Create a new pin to secure your JAAN account
              </Text>
            </View>

            <View
              id="Pin container"
              className="my-5 w-full bg-transparent justify-start items-start flex flex-col"
            >
              <Text className="text-[#333333] dark:text-white font-intermedium mt-4 text-[14px] mb-1">
                Enter Password*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center mb-3">
                <TextInput
                  value={password}
                  className="flex-grow bg-transparent h-16 px-3 rounded-xl text-md font-intermedium"
                  placeholder=""
                  keyboardType="default"
                  secureTextEntry={isshowpassword}
                  onChangeText={(text) => setPassword(text)}
                />
                {isShowConfirm ? (
                  <Feather
                    name="eye"
                    color="#616161"
                    className="text-gray-600"
                    size={18}
                    onPress={() => setisShowPass(!isshowpassword)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    className="fill-gray-600"
                    size={18}
                    color="#616161"
                    onPress={() => setisShowPass(!isshowpassword)}
                  />
                )}
              </View>
              <Text className="text-[#333333] dark:text-white  font-intermedium text-[14px] mb-1">
                New Transaction PIN
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  className="flex-grow bg-transparent h-16 px-3 rounded-xl text-md font-intermedium"
                  value={String(pin)}
                  placeholder=""
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

              <Text className="text-[#333333] dark:text-white  font-intermedium mt-4 text-[14px] mb-1">
                Confirm PIN*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  value={confirmPin}
                  className="flex-grow bg-transparent h-16 px-3 rounded-xl text-md font-intermedium"
                  placeholder="Re-Enter New Transaction PIN"
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
              <Text className="text-red-600 text-md font-intermedium px-2">
                {errmessage}
              </Text>
            </View>
          </View>
          <View className="w-full flex items-center pb-6 min-h-20 h-auto">
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="text-md font-intermedium bg-mycolor w-11/12 h-14 rounded-2xl flex flex-row items-center justify-center disabled:opacity-30"
              disabled={isDisabled}
            >
              <Text className="font-interbold text-white text-lg">
                Set New PIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Customview>

      {showModal && <Loader isLoading={showModal} />}
    </>
  );
}
