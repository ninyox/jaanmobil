import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router} from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";
import { useEffect, useState} from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "../../../components/customview";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FireJaanSvg } from "@/assets/svg";
import SuccessModal from "@/components/successmodal";
import useSuccess from "@/store/success";
import { BackButton } from "@/components/icons/icons";
export default function Page() {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast } = useToast();
  const { showSuccess, OpenSuccess, CloseSuccess } = useSuccess();
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [iseight, setiseight] = useState(false);
  const [isupper, setisupper] = useState(false);
  const [islower, setislower] = useState(false);
  const [isnumber, setisnumber] = useState(false);
  const [verifypassword, setverifyPassword] = useState(false);

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const result = await Log(password);
      if (result.success === false) {
        openToast(result.message);
        return;
      }
      OpenSuccess()
    } catch (error: any) {
      if (error?.message) {
        openToast(JSON.stringify(error.message));
        return;
      }
      openToast("Unable to Reset Password!");
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setiseight(password.length >= 8);
    setisupper(/[A-Z]/.test(password));
    setislower(/[a-z]/.test(password));
    setisnumber(/[0-9]/.test(password));
    setverifyPassword(password === Confirmpassword);

    setIsDisabled(
      !(
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        password === Confirmpassword
      ),
    );
  }, [password, Confirmpassword]);

  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-full dark:bg-dark justify-between ">
          <View className="w-full flex items-center h-auto pb-20">
            <View
              id="back-button"
              className="w-full bg-transparent justify-start flex flex-row items-center py-2"
            >
              <BackButton/>
            </View>
            <View
              id="logo-container"
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-start "
            >
              <View className="w-full bg-transparent justify-center items-center h-auto flex flex-row mb-2">
                <FireJaanSvg />
              </View>
              <Text className="text-2xl font-interbold text-[#333333] dark:text-white mt-2 mb-1">
                Create Password
              </Text>
              <Text className="text-[12px] font-inter text-[#616161]">
                Create a new password to secure your account
              </Text>
            </View>

            <View
              id="email container"
              className="my-10 w-full bg-transparent justify-start items-start flex flex-col"
            >
              <Text className="text-[#333333] font-intermedium text-[12px] dark:text-white ">
                Password*
              </Text>

              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  className="flex-grow bg-transparent  h-16 px-3 rounded-xl dark:text-white "
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
                  <Text className="text-[#333333] font-intermedium text-[12px] dark:text-white ">
                    at least 8 characters
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${isupper ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px] dark:text-white ">
                    at least 1 uppercase
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${islower ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1    `}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px] dark:text-white ">
                    at least 1 lowercase
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${isnumber ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px] dark:text-white ">
                    at least 1 number
                  </Text>
                </Pressable>
                <Pressable className="w-full h-auto bg-transparent rounded-xl flex flex-row items-center justify-start my-1">
                  <TouchableOpacity
                    className={`w-3 h-3 ${verifypassword ? "bg-green-500" : "bg-figmagray"} rounded-full mr-1`}
                  />
                  <Text className="text-[#333333] font-intermedium text-[12px] dark:text-white ">
                    Passwords are the same
                  </Text>
                </Pressable>
              </View>
              <Text className="text-[#333333] font-intermedium text-[12px] mt-4 dark:text-white ">
                Confirm Password*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <TextInput
                  className="flex-grow bg-transparent  h-16 px-3 rounded-xl  dark:text-white "
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
          <View className="w-full flex items-center pb-6 absolute bottom-10">
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="text-md font-intermedium bg-mycolor w-11/12 h-14 rounded-2xl flex flex-row items-center justify-center disabled:opacity-30"
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
      <SuccessModal
        visible={showSuccess}
        title="Password Reset Successful"
        message="You can now log in with your new password to access your JAAN account."
        buttontext="Go to Login"
        action="/login/login"
        close={() => CloseSuccess()}
      />
    </>
  );
}
