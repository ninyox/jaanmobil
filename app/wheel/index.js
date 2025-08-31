import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Customview from "../../components/customview";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import coinPng from "../../assets/images/coin.png"
const deal = require("../../assets/images/care.png");
const nodeal = require("../../assets/images/care.png");
import SetNotification from "../../notify";
import { Log, Validate } from "./Log";
import { router } from "expo-router";
import WheelOfFortuneSimplified from "../../components/wheel";
export default function Airtime({ route }) {
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [pics, setPics] = useState(deal);
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [amount, setAmount] = useState(null);
  const [image, setImage] = useState({
    name: "Mtn network",
    source: require("../../assets/images/mtn.png"),
    value: "1",
  });
  const [type, setType] = useState({
    name: "VTU",
    value: "vtu",
  });

  const handleNetworkClick = (image) => {
    setNet(false);
    setImage(image);
    setSelected(image.value);
  };

  const handleTypeClick = (image) => {
    setTypemodal(false);
    setType(image);
  };

  const alan = (load) => {
    if (texts === "" && !load) {
      alert("Phone Number Box is empty");
      return;
    }
    if (!amount && !load) {
      alert("Enter a valid amount");
      return;
    }
    setIspin(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    await handleRecent(image.value, texts, amount);
    try {
      const response = await Log(image.value, texts, amount);
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Your Airtime Purchase of ₦ ${amount} was Successful 🎉🎉`,
          "Airtime Purchase Successful",
          null
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        SetNotification(
          `Your Airtime Purchase of ₦ ${amount} Failed`,
          "Airtime Purchase Failed",
          null
        );
      }
      setModalVisible(true);
    } catch (error) {
      const mydata = error.data;
      setModalContent(
        mydata?.message ||
        "We're currently unable to complete your request, Kindly try again later"
      );
      setFact(false);
      setModalVisible(true);
    } finally {
      setIsloading(false);
    }
  };

  const closecontact = () => {
    setModal(false);
  };
  const contactShower = async () => {
    setModal(true);
    console.log("deployed");
  };

  const Contactinput = async (item) => {
    console.log("i see the data sent", item);
    const stringclean = item.replace(/[^0-9]/g, "");
    if (stringclean.length > 10) {
      const modified = stringclean.slice((0, -10));
      const modString = "0" + modified;
      console.log("this if fully cleaned", modString);
      setText(modString);
      setModal(false);
    } else {
      alert("Selected Contact is invalid");
    }
  };

  return (
    <>
      <Customview>
        <ImageBackground
        source={require('../../assets/images/wheelbg.png')} className="flex-1 items-center px-4 pb-10 bg-[url('../../assets/images/wheelbg.png')]  h-screen">
          <View className="w-full h-28 boder-b-[0.2px]">
            <TouchableOpacity className="w-auto h-10 flex flex-row items-center ">

              <MaterialIcons
                name="arrow-back-ios"
                size={22}
                className="mr-2 "
                color="white"
                onPress={() => router.back()}
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex w-full items-center justify-center flex-row h-auto" >
              <Image source={coinPng} className="w-8 h-8" />
              <Text className="text-3xl font-lexendbold ml2 mt-2 text-indigo-700 mx-3">
                Spin and Win
              </Text>
              <Image source={coinPng} className="w-8 h-8" />
            </TouchableOpacity>

          </View>
          <WheelOfFortuneSimplified />
        </ImageBackground>
      </Customview>
    </>
  );
}
