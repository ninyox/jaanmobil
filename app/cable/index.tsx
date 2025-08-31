import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import Customview from "../../components/customview";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Monthmodal from "./monthmodal";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import Networkmodal from "./modal";
import Typemodal from "./type";
import { Log, Validate, Verify, Price } from "./Log";
import { useToast } from "@/store/toast";
import Datamodal from "./datamodal";
import Feedmodal from "../../components/feedback/feed";
import { Verifyprop } from "./prop";
import { DstvSvg } from "@/assets/svg";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import Confirmmodal from "@/components/confirmModal";
interface selectMonthProp {
  monthsPaidFor: string;
  price: number;
}
interface selectedPlanProp {
  code: string;
  name: string;
  availablePricingOptions: object[];
}
export default function Cable() {
  const { openToast } = useToast();
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(true);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<selectedPlanProp | null>(
    null,
  );
  const [verifystatus, setStatus] = useState(false);
  const [price, setPrice] = useState("");
  const [monthsArray, setMonthsArray] = useState([]);
  const [monthModal, setMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<selectMonthProp | null>(
    null,
  );
  const [name, setName] = useState("");
  const [image, setImage] = useState({
    name: "DSTV",
    source: <DstvSvg />,
    value: "dstv",
  });

  const [isDisabled, setIsDisabled] = useState(true);


  const fetchData = async () => {
    setIsloading(true);
    try {
      if (image.value) {
        const response = await Validate({ provider: image.value });
        const mydata = response.data;
        setProducts(mydata);
        setSelectedPlan(mydata[0]);
        setMonthsArray(mydata[0].availablePricingOptions);
        setSelectedMonth(mydata[0].availablePricingOptions[0]);
      } else {
        console.log("Invalid selection");
      }
    } catch (error) {
      openToast("Unable to Fetch Plans");
    } finally {
      setIsloading(false);
    }
  };

  const Verifycable = async () => {
    if (!image) {
      openToast("Kindly Select a Cable Provider firstly");
      return;
    }
    if (image.value === "showmax") {
      openToast(
        "Showmax Provider doesn't need verification, Kindly ensure the Showmax Number Is correct",
      );
      return;
    }
    if (!texts || texts.length < 6) {
      openToast("Invalid Decoder Number Id");
      return;
    }

    setIsloading(true);
    try {
      const response = await Verify(image.value, Number(texts));
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
      openToast(
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
    // if (texts === "") {
    //   alert("IUC Number Box is empty");
    //   return;
    // }
    // if (phone === "") {
    //   alert("IUC Number Box is empty");
    //   return;
    // }
    // if (selectedPlan === null) {
    //   alert("Select a cable plan");
    //   return;
    // }
    // if (!verifystatus && image.value !== "showmax") {
    //   openToast("Kindly ensure to verify the IUC number before proceeding");
    //   return;
    // }
    setConfirmmodal(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      if (!selectedPlan) {
        return;
      }
      const { code } = selectedPlan;

      const response = await Log({
        provider:image.value,
        cardnumber:texts,
        code,
        month:selectedMonth ? selectedMonth.monthsPaidFor : "1",
        plan:selectedPlan.name
      });
      const result = response.data;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Your ${image.name} Purchase of ${selectedPlan.name} was Successful 🎉🎉`,
          "Cable Purchase Successful",
          null,
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        SetNotification(`${result.message}`, "Cable Purchase Failed", null);
      }
      setModalVisible(true);
    } catch (error:any) {
      openToast(
        error.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );
      setFact(false);
      setModalVisible(true);
    } finally {
      setIsloading(false);
    }
  };
  
  useEffect(()=>{
    const isText = texts.length > 8;
    const isSelected = selectedPlan !== null;
    const isAmountValid = selectedMonth !== null;
    
    if(isText && isSelected && isAmountValid){
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
    }
  },[texts, selectedPlan, selectedMonth])

  return (
    <>
      <Customview>
        <View className="flex-1 items-center  relative min-h-screen pb-40 w-full ">
          <View className="w-full items-center flex-row justify-between mb-6 mt-2 border-b-[0.2px] pb-6 border-gray-300 px-4">
          <BackButton />
            <Text className="text-xl mr-6 font-intermedium text-gray-900 dark:text-white">
              TV
            </Text>
            <Text></Text>
          </View>

          <View className="w-full h-auto mb-3 px-4">
            <TouchableOpacity
              onPress={() => setNet(true)}
              className="w-full h-14 rounded-md flex flex-row items-center justify-start"
            >
              <Pressable className="w-10 h-10 flex-row items-center dark:bg-white rounded-md">
                {image.source}
              </Pressable>

              <Text className="font-intermedium mx-3 dark:text-white text-sm">
                {image.name}
              </Text>

              <MaterialIcons
                name="keyboard-arrow-down"
                className="hidden dark:flex"
                color="white"
                size={14}
              />
              <MaterialIcons
                name="keyboard-arrow-down"
                className="dark:hidden"
                size={14}
              />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Smart Card Number
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between">
              <TextInput
                value={texts}
                keyboardType="numeric"
                onChangeText={(e) => setText(e)}
                placeholder=" "
                className="flex-grow  dark:text-white"
              />
              <Verifyprop click={() => Verifycable()} status={verifystatus} />
            </TouchableOpacity>
          </View>

          {verifystatus && (
            <View className="w-full flex items-center justify-center h-14 px-4">
              <View className="w-11/12 h-12 px-2 border-[0.5px] border-green-500 rounded-md flex flex-row items-center justify-between">
                <Text className="flex-grow text-center font-inter dark:text-white">
                  {name}{" "}
                </Text>
              </View>
            </View>
          )}

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select Service Package
            </Text>

            <TouchableOpacity
              onPress={() => setDatamodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium text-twelve dark:text-white">
                {" "}
                {selectedPlan?.name}{" "}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Amount
            </Text>

            <TouchableOpacity
              onPress={() => setMonthModal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium text-twelve dark:text-white">
                {" "}
                ₦ {selectedMonth?.price}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full flex-row items-center justify-center absolute bottom-10">
            <TouchableOpacity
              disabled={isDisabled}
              className="w-11/12 h-14 bg-mycolor rounded-2xl flex flex-row items-center disabled:bg-[#6b34ff80] justify-center"
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
            name="Cable Tv"
          />
          <Networkmodal
            visible={netmodal}
            submit={(image:any) => {
              setNet(false);
              setImage(image);
              setSelected(image.value);
            }}
            selected={image.value}
            close={() => setNet(false)}
          />

          <Datamodal
            visible={datamodal}
            close={() => setDatamodal(false)}
            submit={(image: any) => {
              setDatamodal(false);
              setSelectedPlan(image);
              setMonthsArray(image.availablePricingOptions);
              setSelectedMonth(image.availablePricingOptions[0]);
            }}
            data={products}
          />
          <Monthmodal
            visible={monthModal}
            close={() => setMonthModal(false)}
            submit={(e: any) => {
              setSelectedMonth(e);
              setMonthModal(false);
            }}
            data={monthsArray}
          />
          <Feedmodal
            modalContent={modalContent}
            modalVisible={modalVisible}
            fact={fact}
            closeModal={() => setModalVisible(false)}
            title="Cable TV Purchase Successful"
          />
          <Confirmmodal
            visible={confirmmodal}
            submit={() => {
              setIspin(true);
              setConfirmmodal(false);
            }}
            close={() => setConfirmmodal(false)}
            data={[
              { id: 1, name: "Amount", value: "₦" + String(selectedMonth?.price || "N/A") },
              { id: 2, name: "Smart Card", value: String(texts) },
              {
                id: 3,
                name: "Cable Plan",
                value: String(selectedPlan?.name || "N/A"),
              },
              { id: 4, name: "Cable Provider", value: String(image.name) },
            ]}
          />
        </View>
      </Customview>
    </>
  );
}
