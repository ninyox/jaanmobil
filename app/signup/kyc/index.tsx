import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import RNPickerSelect from "react-native-picker-select"
import * as expoRouter from "expo-router";
import useModal from "@/store/modal";
import { useToast } from "@/store/toast";

import { useEffect, useState, useRef } from "react";
import Loader from "@/components/loader/loader";
import { Log } from "./log";
import Customview from "../../../components/customview";
import {
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { FireJaanSvg } from "@/assets/svg";
import AuthState from "@/store/authstate";
export default function Page() {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { openToast} = useToast();
  const [showDate, setShowDate] = useState(false);
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorType, setErrorType] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [country, setCountry] = useState("nigeria");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState("");

  const handleSubmit = async () => {
    handleOpenModal();
    try {
      const result = await Log(name, username, phone, country, String(date), gender);
      if (result.success === false) {
        setError(false);
        openToast(result.message);
        return;
      }
      setError(true);
      AuthState.setState("pin")
      // openToast(result.message);
      expoRouter.router.push("/signup/pin")

    } catch (error: any) {
      // console.log(error);
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

    const now = new Date()
    const nameValid = name.length > 4 && name.length < 32
    const usernameValid = username.length > 3
    const phoneValid = phone.length > 9
    const genderValid = gender === "male" || gender === "female".toLowerCase()
    const dateCalc = now.getFullYear() - date.getFullYear();
    const dateValid = dateCalc > 18

    if (nameValid && usernameValid && phoneValid && genderValid && dateValid) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }

    if (!nameValid) {
      setErrorType("name")
      setErrorMessage("Input valid name")
    } else if (!usernameValid) {
      setErrorType("username")
      setErrorMessage("Invalid Username Length")
    }
    else if (!phoneValid) {
      setErrorType("phone")
      setErrorMessage("Enter a Valid Phone Number")
    }
    else if (!dateValid) {
      setErrorType("date")
      setErrorMessage("You have to be at least 18 Years to proceed")
    }
    else if (!genderValid) {
      setErrorType("gender")
      setErrorMessage("Please Choose your Gender")
    }
    else {
      setErrorType("")
      setErrorMessage("")
    }

  }, [name, username, phone, gender, date])



  return (
    <>
      <Customview>
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-white min-h-full justify-between ">
          <View className="w-full flex items-center h-auto flex-grow">
            <View
              id="progressbar"
              className="w-full bg-transparent justify-around flex items-center rounded-full flex-row bg-white py-1"
            >
              <View className="w-[22%] bg-mycolor h-1 rounded-full px-1" />

              <Pressable className="w-[22%] bg-mycolor h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-mycolor h-1 rounded-full px-1" />
              <Pressable className="w-[22%] bg-figmagray h-1 rounded-full px-1" />
            </View>
            <View
              id="back-button"
              className="w-full bg-transparent justify-start flex flex-row items-center py-2"
            >
              <Pressable
                className="w-full h-full rounded-full"
                onPress={() => expoRouter.router.back()}
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
                Tell Us More About You
              </Text>
              <FontAwesome5
                name="info-circle"
                className="fill-mycolor text-mycolor"
                color="#6b34ff"
              />
            </View>
            <View
              id="Info container"
              className="my-10 w-full bg-transparent justify-start items-start flex flex-col px-2"
            >
              <Text className="text-[#333333] font-intermedium text-[12px]">
                Full Name*
              </Text>
              <TextInput
                className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl"
                value={name}
                placeholder="As It Appears On Your ID"
                onChangeText={(text) => setName(text)}
              />
              {errorType == "name" && (
                <Text className="px-2 font-intermedium text-sm py-[3px] text-red-500">
                  {ErrorMessage}
                </Text>
              )}

              <Text className="text-[#333333] font-intermedium text-[12px] mt-4">
                User Name*
              </Text>
              <TextInput
                value={username}
                className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl"
                placeholder="This Can Be A Fun Nickname"
                onChangeText={(text) => setUserName(text)}
              />
              {errorType == "username" && (
                <Text className="px-2 font-intermedium text-sm py-[3px] text-red-500">
                  {ErrorMessage}
                </Text>
              )}
              <Text className="text-[#333333] font-intermedium text-[13px] mt-4">
                Phone Number*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">
                <View className="w-full bg-transparent h-16 px-3 rounded-xl flex flex-row items-center">
                  <View className="w-16 h-full border-r-[0.3px]">
                    <RNPickerSelect

                      onValueChange={(value) => setCountry(value)}
                      value={country}
                      items={[
                        { label: "🇳🇬+234", value: "nigeria" },
                        { label: "🇸🇳 +233", value: "ghana" }
                      ]}

                    />
                  </View>
                  <TextInput
                    className="flex-grow bg-transparent text-md font-intermedium h-full px-3 rounded-xl"
                    keyboardType="number-pad"
                    maxLength={10}
                    placeholder="81 0000 0000"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                  />
                </View>

              </View>
              {errorType == "phone" && (
                <Text className="px-2 font-intermedium text-sm py-[3px] text-red-500">
                  {ErrorMessage}
                </Text>
              )}
              <Text className="text-[#333333] font-intermedium text-[13px] mt-4">
                Date of Birth*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl flex flex-row items-center">

                <TextInput
                  className="flex-grow bg-transparent text-md font-intermedium h-full px-3 rounded-xl"
                  placeholder="Select Date of Birth"
                  aria-disabled={true}
                  // onChangeText={(text) => setPassword(text)}
                  // keyboardType="visible-password"
                  value={date.toString().slice(0, 15)}
                />
                <FontAwesome5 name="calendar" size={22} onPress={() => setShowDate(true)} />
              </View>
              {errorType == "date" && (
                <Text className="px-2 font-intermedium text-sm py-[3px] text-red-500">
                  {ErrorMessage}
                </Text>
              )}
              <Text className="text-[#333333] font-intermedium text-[13px] mt-4">
                Gender*
              </Text>
              <View className="w-full bg-transparent border border-figmagray h-16 px-3 rounded-xl ">


                <RNPickerSelect
                  onValueChange={(value) => setGender(value)}
                  value={gender}
                  // placeholder="Choose Gender"
                  items={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" }
                  ]}
                />

              </View>
              {errorType == "gender" && (
                <Text className="px-2 font-intermedium text-sm py-[3px] text-red-500">
                  {ErrorMessage}
                </Text>
              )}
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

      {
        showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            onChange={(e, date) => {
              if (date)
                setDate(date)
              setShowDate(false)
            }}
          />
        )
      }
    </>
  );
}
