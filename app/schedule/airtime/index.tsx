import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "@/store/toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ContactComponent } from "@/components/contacts/contact";
import Loader from "@/components/loader/loader";
import Pinmodal from "@/components/pinmodal/pin";
import Networkmodal from "./modal";
import Datamodal from "./datamodal";
import { Log } from "./Log";
import Feedmodal from "@/components/feedback/feed";
import { ContactSvg, MtnSvg } from "@/assets/svg";
import { Pressable } from "react-native";
import Confirmmodal from "@/components/confirmModal";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import Customview from "@/components/customview";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SmartModal } from "./smartnumber";


export default function AirtimeProp() {
  const { openToast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [isDisabled, setIsDisabled] = useState(true);
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [thedate, setDate] = useState(new Date());
  const [frequency, setFrequency] = useState<string>("daily");
  const [datamodal, setDatamodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("account");
  const [image, setImage] = useState({
    name: "Mtn network",
    source: <MtnSvg width="100%" />,
    value: "mtn",
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
        phone,
        amount,
        frequency,
        payment:selectedPlan,
        date: thedate,
      });
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true)
      } else if (result.success === false) {
        setFact(false);
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

  useEffect(() => {
    const isNetwork = image.value;
    const isPhone = /^(\+?234|0)[789][01]\d{8}$/.test(phone ? phone : "");
    const amountExist =
      typeof amount === "string" ||
      (typeof amount === "number" && Number(amount) > 0);

    if (!isNetwork) {
      setIsDisabled(true);
    } else if (!isPhone) {
      setIsDisabled(true);
    } else if (!amountExist) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [image, phone, amount]);

  const closecontact = () => {
    setModal(false);
  };
  const contactShower = async () => {
    setModal(true);
    console.log("deployed");
  };

  const Contactinput = async (item: string) => {
    console.log("i see the data sent", item);
    const stringclean = item.replace(/[^0-9]/g, "");
    if (stringclean.length > 10) {
      const modified = stringclean.slice(-10);
      const modString = "0" + modified;
      console.log("this if fully cleaned", modString);
      setPhone(modString);
      setModal(false);
    } else {
      openToast("Selected Contact is invalid");
    }
  };

  return (
    <>
      <Customview>
        <View className="items-center px-4 pb-10 min-h-screen relative w-full h-auto flex-grow flex-1">
          <View className="w-full h-auto">
            <View className="w-full items-center flex-row justify-between mb-3 pb-6 border-gray-300 dark:border-gray-700 mt-2 border-b-[0.2px]">
              <BackButton />
              <Text className="text-sixt font-intermedium text-gray-900 dark:text-white">
                Schedule Airtime
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
                <Pressable className="w-10 h-10 flex-row items-center dark:bg-whie rounded-md mr-1" onPress={() => setNet(true)}>
                  {image.source}
                </Pressable>

                <CaretIcon />
              </TouchableOpacity>
              <TouchableOpacity className="flex-grow h-14 px-2 border-[0.1px] border-gray-300 rounded-md flex flex-row items-center justify-between">
                <TextInput
                  value={phone}
                  keyboardType="numeric"
                  onChangeText={(e) => setPhone(e)}
                  placeholder="0801 2345 6789"
                  placeholderClassName="dark:text-white"
                  className="flex-grow dark:text-white h-full text-md font-intermedium text-black"
                />
                <TouchableOpacity
                  className="flex flex-row items-center"
                  onPress={() => contactShower()}
                >
                  <ContactSvg />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <View className="w-full h-auto my-6">
              <Text className="text-sm font-intermedium dark:text-white mb-1">Set Frequency</Text>

              <TouchableOpacity
                className={`w-full h-auto rounded-lg items-center flex-row my-2`}
              >
                <Text
                  className={`text-ten font-interbold ${frequency === "daily" ? "text-mycolor" : "text-setgray dark:text-white"}`}
                  onPress={() => setFrequency("daily")}
                >
                  Daily
                </Text>
                <Text
                  className={`mx-2 text-ten font-interbold  ${frequency === "weekly" ? "text-mycolor" : "text-setgray dark:text-white"}`}
                  onPress={() => setFrequency("weekly")}
                >
                  Weekly
                </Text>
                <Text
                  className={` text-ten font-interbold ${frequency === "monthly" ? "text-mycolor" : "text-setgray dark:text-white"}`}
                  onPress={() => setFrequency("monthly")}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full h-auto ">
              <Text className="text-sm font-intermedium dark:text-white">Select Amount</Text>
              <View className="flex-row w-full h-auto items-center justify-between flex-wrap">
                {amountArray.map((item, index) => {
                  return (
                   
                      <TouchableOpacity
                        key={index}
                        className={`w-[21%] ${item.value === amount ? "border border-mycolor" : ""} h-10 rounded-lg items-center justify-center my-2`}
                      >
                        <Text
                          key={index}
                          className={`mx-1 text-ten font-intermedium  ${item.value === amount ? "text-mycolor" : "text-setgray dark:text-gray-200"}`}
                          onPress={() => setAmount(String(item.value))}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                 
                  );
                })}
                
              </View>
            </View>

            <View className="w-full h-24 mt-3">
              <Text className="font-intermedium text-black dark:text-white text-sm my-1">
                Custom Amount
              </Text>

              <TouchableOpacity className="w-full h-14 pl-6 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
                <Text className="dark:text-white mx-1">₦</Text>
                <TextInput
                  className="w-full h-auto dark:text-white text-sm flex-row items-center font-intermedium"
                  value={amount}
                  onChangeText={(e) => setAmount(e)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24 mt-3">
              <Text className="font-intermedium text-black dark:text-white text-sm my-1">
                Start Date
              </Text>

              <TouchableOpacity className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
                <Text className="flex-grow dark:text-white text-twelve text-setgray flex-row items-center font-intermedium">
                  {thedate.toUTCString().slice(0, 25)}
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
              <Text className="font-intermedium text-gray-800 dark:text-white text-sm my-1">
                Payment Plan
              </Text>

              <TouchableOpacity
                onPress={() => setDatamodal(true)}
                className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-col justify-center"
              >
                <Text className="font-intermedium text-twelve dark:text-white">
                  {selectedPlan === "account"
                    ? "Account Balance"
                    : "Card Payment"}
                </Text>
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

            <ContactComponent
              Mymodal={mymodal}
              Submit={(e: string) => Contactinput(e)}
              Closemodal={() => closecontact()}
            />

            <Loader isLoading={isLoading} />
            <Datamodal
              visible={datamodal}
              close={() => setDatamodal(false)}
              submit={(e: string) => {
                setSelectedPlan(e);
                setDatamodal(false);
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
                { id: 1, name: "Amount", value: "₦ " + String(amount) },
                { id: 2, name: "Phone Number", value: String(phone) },
                { id: 3, name: "Mobile Network", value: String(image.name) },
                { id: 4, name: "Start Date", value: thedate.toUTCString().slice(0,25) },
                { id: 5, name: "Frequency", value: String(frequency) },
                 { id: 6, name: "Payment Plan", value: selectedPlan === "account"? "Account Balance" : "Card Payment" },
              ]}
            />
            <Networkmodal
              visible={netmodal}
              selected={image.value}
              submit={(e: any) => handleNetworkClick(e)}
              close={() => setNet(false)}
            />
            <Feedmodal
              title="Airtime Schedule Successful"
              modalContent={modalContent}
              modalVisible={modalVisible}
              fact={fact}
              closeModal={() => setModalVisible(false)}
            />
            <SmartModal net={(e: any) => handleNetworkClick(e)} submit={(e: string) => setPhone(e)} phone={String(phone)} />
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={thedate}
                mode="date"
                onChange={(e, date) => {
                  const current = new Date().setHours(0,0,0,0);
                  if (date) {
                    if (date.setHours(0,0,0,0) < current) {
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
          </View>
        </View>
      </Customview>
    </>
  );
}

const amountArray = [
  { name: "₦ 50", value: "50" },
  { name: "₦ 100", value: "100" },
  { name: "₦ 200", value: "200" },
  { name: "₦300", value: "300" },
  { name: "₦500", value: "500" },
  { name: "₦1000", value: "1000" },
  { name: "₦1500", value: "1500" },
  { name: "₦2000", value: "2000" },
];
