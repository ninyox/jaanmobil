import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import Customview from "../../components/customview";
import { styles } from "./style";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { ContactComponent } from "../../components/contacts/contact";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import Networkmodal from "./modal";
import Typemodal from "./type";
import { Log, Validate, Verify, Price } from "./Log";
import Datamodal from "./datamodal";
import Feedmodal from "../../components/feedback/feed";
import { Verifyprop } from "./prop";
import { DstvSvg, MtnSvg, OnexbetSvg } from "@/assets/svg";
import { ScrollView } from "react-native";
import { BackButton, CaretIcon } from "@/components/icons/icons";
interface selectedProp {
  name: string;
}
export default function Betting() {
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(true);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState("");
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<selectedProp | null>(null);
  const [verifystatus, setStatus] = useState(false);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const [image, setImage] = useState({
    name: "1xbet",
    source: <OnexbetSvg width="100%" />,
    value: "onexbet",
  });
  const [type, setType] = useState({
    name: "Corporate Gifting",
    value: "CORPORATE GIFTING",
  });

  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
    setSelected(image.value);
  };

  const handleTypeClick = (image: any) => {
    setTypemodal(false);
    setType(image);
  };
  const handlePlanClick = (image: any) => {
    setDatamodal(false);
    setSelectedPlan(image);
  };

  const fetchData = async () => {
    setIsloading(true);
    try {
      if (image.value) {
        const response = await Validate(image.value);
        const result = await Price();
        const mydata = response.data;
        console.log(mydata);
        setProducts(mydata);
        setSelectedPlan(mydata[0]);
      } else {
        console.log("Invalid selection");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const Verifycable = async () => {
    if (!image) {
      Toast.show("Kindly Select a Cable Provider firstly");
      return;
    }
    if (image.value === "showmax") {
      Toast.show(
        "Showmax Provider doesn't need verification, Kindly ensure the Showmax Number Is correct",
      );
      return;
    }
    if (!texts || texts.length < 6) {
      Toast.show("Invalid Decoder Number Id");
      return;
    }

    setIsloading(true);
    try {
      const response = await Verify(image.value, texts);
      if (response.success) {
        const mydata = response.data;
        console.log(mydata);
        if (mydata.Customer_Name) {
          setName(mydata.Customer_Name);
          setStatus(true);
        } else {
          Toast.show(mydata.error);
        }
      }
    } catch (error) {
      Toast.show(
        "Unable to verify The meter number currently! Kindly reach out to customer support if issue persists.",
      );
    } finally {
      setIsloading(false);
    }
  };
  const Fetch = async () => {
    try {
      const result = await Price();
      const mydata = result.data;
      const cableprice = mydata[0].cableprice;
      if (cableprice) {
        setPrice(cableprice);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    Fetch();
    //SetNotification("hello","hello",null)
  }, [image]);

  const alan = () => {
    if (texts === "") {
      alert("IUC Number Box is empty");
      return;
    }
    if (phone === "") {
      alert("IUC Number Box is empty");
      return;
    }
    if (selectedPlan === null) {
      alert("Select a cable plan");
      return;
    }
    if (!verifystatus && image.value !== "showmax") {
      Toast.show("Kindly ensure to verify the IUC number before proceeding");
      return;
    }
    setIspin(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const { variation_code, variation_amount } = selectedPlan;

      const response = await Log(
        texts,
        image.value,
        variation_code,
        variation_amount,
        phone,
      );
      const result = response.data;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Your ${image.name} Purchase of ${selectedPlan.plan} was Successful 🎉🎉`,
          "Cable Purchase Successful",
          null,
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        SetNotification(`${result.message}`, "Cable Purchase Failed", null);
      }
      setModalVisible(true);
    } catch (error) {
      const mydata = error.data;
      setModalContent(
        mydata.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );
      setFact(false);
      setModalVisible(true);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Customview>
        <View className="flex-1 items-center px-4 relative min-h-screen pb-40 w-full ">
          <View className="w-full items-center flex-row justify-between mb-6 mt-2">
            <BackButton />
         
            <Text className="text-sixt mr-6 font-intermedium text-gray-900 dark:text-white">
              Betting
            </Text>
            <Text></Text>
          </View>

          <View className="w-full h-auto mb-3">
            <TouchableOpacity
              onPress={() => setNet(true)}
              className="w-full h-14 rounded-md flex flex-row items-center justify-start"
            >
              <Pressable className="w-8 h-8 flex-row items-center dark:bg-white rounded-full">
                {image.source}
              </Pressable>

              <Text className="font-intermedium mx-1 dark:text-white text-twelve">
                {image.name}
              </Text>

              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Betting ID
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
              <TextInput
                value={texts}
                keyboardType="numeric"
                onChangeText={(e) => setText(e)}
                placeholder=" "
                className="flex-grow text-twelve dark:text-white"
              />
              <Verifyprop click={() => Verifycable()} status={verifystatus} />
            </TouchableOpacity>
          </View>

          {verifystatus && (
            <View className="w-full flex items-center justify-center h-14">
              <View className="w-11/12 h-12 px-2 border-[0.5px] border-green-500 rounded-md flex flex-row items-center justify-between">
                <Text className="flex-grow text-center font-inter dark:text-white">
                  {name}{" "}
                </Text>
              </View>
            </View>
          )}

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select Bet Provider
            </Text>

            <TouchableOpacity
              onPress={() => setDatamodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center"
            >
              <Text className="font-intermedium  dark:text-white">
                {" "}
                {selectedPlan?.name}{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Amount
            </Text>

            <TouchableOpacity className="w-full h-14 pl-6 border-b-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
              <Text className="text-md w-4 dark:text-gray-300">₦</Text>
              <TextInput
                className="w-full h-full dark:text-white text-md flex-row items-center font-intermedium"
                value={amount}
                onChangeText={(e) => setAmount(e)}
                placeholder="0"
                keyboardType="numeric"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full h-8 mb-24 mt-5">
            <ScrollView
              showsHorizontalScrollIndicator={false}
              className="flex-1"
              horizontal={true}
            >
              {amountArray.map((item, index) => {
                return (
                  <>
                    <Text
                      className=" mx-1  text-twelve dark:text-gray-500"
                      onPress={() => setAmount(String(item.value))}
                    >
                      {item.name}
                    </Text>
                  </>
                );
              })}
            </ScrollView>
          </View>

          <View className="w-full flex-row items-center justify-center absolute bottom-10">
            <TouchableOpacity
              className="w-5/6 h-14 bg-mycolor rounded-2xl flex flex-row items-center justify-center"
              onPress={alan}
            >
              <Text className="text-white font-interbold">Continue</Text>
            </TouchableOpacity>
          </View>

          <Loader isLoading={isLoading} />
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
          />
          <Networkmodal
            visible={netmodal}
            submit={(e) => handleNetworkClick(e)}
            selected={image.value}
            close={() => setNet(false)}
          />
          <Typemodal
            visible={typemodal}
            close={() => setTypemodal(false)}
            submit={(e: any) => handleTypeClick(e)}
          />
          <Datamodal
            visible={datamodal}
            close={() => setDatamodal(false)}
            submit={(e: any) => handlePlanClick(e)}
            data={products}
          />
          <Feedmodal
            modalContent={modalContent}
            modalVisible={modalVisible}
            fact={fact}
            closeModal={() => setModalVisible(false)}
          />
        </View>
      </Customview>
    </>
  );
}
const amountArray = [
  { name: "₦500.00", value: 500 },
  { name: "₦1000.00", value: 1000 },
  { name: "₦2000.00", value: 2000 },
  { name: "₦2500.00", value: 2500 },
  { name: "₦3000.00", value: 3000 },
  { name: "₦5000.00", value: 5000 },
  { name: "₦10000.00", value: 10000 },
];
