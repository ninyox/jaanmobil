import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "@/store/toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import Loader from "@/components/loader/loader";
import Pinmodal from "@/components/pinmodal/pin";
import Networkmodal from "./modal";
import Paymentmodal from "./paymentmodal";
import Datamodal from "./datamodal";
import { Log, Validate } from "./Log";
import Feedmodal from "@/components/feedback/feed";
import { DstvSvg } from "@/assets/svg";
import { Pressable } from "react-native";
import Confirmmodal from "@/components/confirmModal";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import Customview from "@/components/customview";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Monthmodal from "./monthmodal";
interface SelectedPlanProp {
  name: string;
  code: string;
  price: string;
}
interface selectMonthProp {
  monthsPaidFor: string;
  price: number;
}
export default function AirtimeProp() {
  const { openToast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [cardnumber, setCardNumber] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [isDisabled, setIsDisabled] = useState(true);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [products, setProducts] = useState([]);
  const [thedate, setDate] = useState(new Date());
  const [frequency, setFrequency] = useState<string>("weekly");
  const [datamodal, setDatamodal] = useState(false);
  const [paymentmodal, setPaymentmodal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<string>("account");
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanProp | null>(
    null,
  );
  const [monthsArray, setMonthsArray] = useState([]);
  const [monthModal, setMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<selectMonthProp | null>(
    null,
  );
  const [image, setImage] = useState({
    name: "DSTV",
    source: <DstvSvg width="100%" />,
    value: "dstv",
  });
  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log({
        provider: image.value,
        plan:selectedPlan?.name,
        cardnumber,
        month:selectedMonth?.monthsPaidFor,
        amount:selectedMonth?.price,
        datacode:selectedPlan?.code,
        frequency,
        payment: paymentPlan,
        date: thedate,
      });
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true)
      } else if (result.success === false) {
        openToast(result.message);
      }
    } catch (error: any) {
      openToast(
        error?.message ||
          "We're currently unable to complete your request, Kindly try again later",
        "Schedule Failed",
      );
    } finally {
      setIsloading(false);
    }
  };
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await Validate(image.value);
      if (response.success) {
        const mydata = response.data;
        setProducts(mydata);
        setSelectedPlan(mydata[0]);
        setMonthsArray(mydata[0].availablePricingOptions);
        setSelectedMonth(mydata[0].availablePricingOptions[0]);
      }
    } catch (error: any) {
      openToast(error.message);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [image]);

  useEffect(() => {
    const isImage = image.value;
    const isCard = cardnumber ? cardnumber.length > 9 : false;
    const planExist = selectedPlan ? selectedPlan.code : false;
    const monthExist = selectedMonth ? selectedMonth.monthsPaidFor : false;

    if (!isImage) {
      setIsDisabled(true);
    } else if (!isCard) {
      setIsDisabled(true);
    } else if (!planExist) {
      setIsDisabled(true);
    } else if (!monthExist) {
      setIsDisabled(true);
    }   else {
      setIsDisabled(false);
    }
  }, [image, cardnumber,selectedPlan]);

  return (
    <>
      <Customview>
        <View className="items-center px-4 pb-10 min-h-screen relative w-full h-auto flex-grow flex-1">
          <View className="w-full h-auto">
            <View className="w-full items-center flex-row justify-between mb-3 pb-6 border-gray-300 dark:border-gray-700 mt-2 border-b-[0.2px]">
            <BackButton />
              <Text className="text-xl font-intermedium text-gray-900 dark:text-white">
                Schedule TV
              </Text>
              <Text></Text>
            </View>
          </View>

          <View className="flex-1 items-center pb-10 w-full ">
            <View className="w-full h-auto flex-row ">
              <TouchableOpacity
                onPress={() => setNet(true)}
                className="w-auto h-14 rounded-md flex flex-row items-center justify-start mr-1"
              >
                <Pressable onPress={() => setNet(true)} className={`w-10 h-10 flex-row items-center dark:bg-red-500 ${image.value === "mtn" ? "bg-yellow" : "" } rounded-md mr-1`}>
                  {image.source}
                </Pressable>

                <CaretIcon />
              </TouchableOpacity>
              <TouchableOpacity className="flex-grow h-14 px-2 border-[0.2px] border-gray-400 rounded-lg flex flex-row items-center justify-between">
                <TextInput
                  value={cardnumber}
                  keyboardType="numeric"
                  onChangeText={(e) => setCardNumber(e)}
                  placeholder=""
                  placeholderClassName="dark:text-white"
                  className="flex-grow dark:text-white h-full text-md font-intermedium text-black"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full h-auto my-6">
              <Text className="text-sm font-intermedium">Set Frequency</Text>

              <TouchableOpacity
                className={`w-full h-auto rounded-lg items-center flex-row my-2`}
              >
            
                <Text
                  className={` text-ten font-interbold  ${frequency === "weekly" ? "text-mycolor" : "text-setgray"}`}
                  onPress={() => setFrequency("weekly")}
                >
                  Weekly
                </Text>
                <Text
                  className={`mx-2 text-ten font-interbold ${frequency === "monthly" ? "text-mycolor" : "text-setgray"}`}
                  onPress={() => setFrequency("monthly")}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full h-24 ">
              <Text className="text-twelve font-intermedium mb-2">Select Package</Text>
              <TouchableOpacity
                onPress={() => setDatamodal(true)}
                className="w-full h-14 px-3 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between"
              >
                <TouchableOpacity className="w-auto h-auto flex-col">
                  <Text className="font-intermedium  dark:text-white">
                    {selectedPlan?.name}
                  </Text>
                </TouchableOpacity>

                <CaretIcon />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-sm my-1">
                Amount
              </Text>
  
              <TouchableOpacity
                onPress={() => setMonthModal(true)}
                className="w-full h-14 px-3 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between"
              >
                <Text className="font-intermedium  dark:text-white">
                  {" "}
                  ₦ {selectedMonth?.price}
                </Text>
                <CaretIcon />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24">
              <Text className="font-intermedium text-black dark:text-white text-twelve my-1">
                Start Date
              </Text>

              <TouchableOpacity className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
                <Text className="flex-grow dark:text-white text-twelve text-setgray flex-row items-center font-intermedium">
                  {thedate.toUTCString().slice(0, 22)}
                </Text>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  color="#6b34ff"
                  size={20}
                  onPress={() => setShowDate(true)}
                />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24 mb-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
                Payment Method
              </Text>

              <TouchableOpacity
                onPress={() => setPaymentmodal(true)}
                className="w-full h-14 px-3 border-[0.3px] border-gray-500 rounded-md flex flex-row justify-between items-center"
              >
                <Text className="font-intermedium text-twelve dark:text-white">
                  {paymentPlan === "account"
                    ? "Account Balance"
                    : "Card Payment"}
                </Text>
                <CaretIcon />
              </TouchableOpacity>
            </View>

            <View className="absolute bottom-10 w-full flex flex-row items-center justify-center">
              <TouchableOpacity
                disabled={isDisabled}
                className="w-11/12 h-14 bg-mycolor rounded-xl flex flex-row items-center justify-center disabled:bg-[#6b34ff60]"
                onPress={() => setConfirmmodal(true)}
              >
                <Text className="text-white font-interbold">Continue</Text>
              </TouchableOpacity>
            </View>

     

            <Loader isLoading={isLoading} />
            <Paymentmodal
              visible={paymentmodal}
              close={() => setPaymentmodal(false)}
              submit={(e: string) => {
                setPaymentPlan(e);
                setPaymentmodal(false);
              }}
            />
            <Pinmodal
              visible={isPin}
              close={() => setIspin(false)}
              submit={() => {
                handleSubmit();
                setIspin(false);
              }}
              name="Schedule Airtime"
            />
            <Confirmmodal
              visible={confirmmodal}
              submit={() => {
                setIspin(true);
                setConfirmmodal(false);
              }}
              close={() => setConfirmmodal(false)}
              data={[
                { id: 1, name: "Amount", value: "₦ " + String(selectedMonth?.price) },
                 { id: 7, name: "Plan", value: String(selectedPlan?.name.slice(0,25)) },
                { id: 2, name: "Smart Card", value: String(cardnumber) },
                { id: 3, name: "Provider", value: String(image.name) },
                {
                  id: 4,
                  name: "Start Date",
                  value: thedate.toUTCString().slice(0, 25),
                },
                { id: 5, name: "Frequency", value: String(frequency) },
                {
                  id: 6,
                  name: "Payment Method",
                  value:
                    paymentPlan === "account"
                      ? "Account Balance"
                      : "Card Payment",
                },
              ]}
            />
            <Networkmodal
              visible={netmodal}
              selected={image.value}
              submit={(e: any) => handleNetworkClick(e)}
            />
            <Feedmodal
              modalContent={modalContent}
              modalVisible={modalVisible}
              fact={fact}
              closeModal={() => setModalVisible(false)}
            />
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={thedate}
                mode="date"
                onChange={(e, date) => {
                  const current = new Date().setHours(0, 0, 0, 0);
                  if (date) {
                    if (date.setHours(0, 0, 0, 0) < current) {
                      openToast("You can't select a date before today");
                      setShowDate(false);
                      return;
                    }
                    setDate(date);
                    setShowDate(false);
                  }
                }}
              />
            )}
            <Datamodal
              visible={datamodal}
              close={() => setDatamodal(false)}
              submit={(e: any) => {
                setDatamodal(false);
                setSelectedPlan(e);
                setMonthsArray(e.availablePricingOptions);
                setSelectedMonth(e.availablePricingOptions[0]);
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
          </View>
        </View>
      </Customview>
    </>
  );
}
