import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "@/store/toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ContactComponent } from "@/components/contacts/contact";
import Loader from "@/components/loader/loader";
import Pinmodal from "@/components/pinmodal/pin";
import Networkmodal from "./modal";
import Paymentmodal from "./paymentmodal";
import Datamodal from "./datamodal";
import { Fetch, Log, Validate } from "./Log";
import Feedmodal from "@/components/feedback/feed";
import { Pressable } from "react-native";
import Confirmmodal from "@/components/confirmModal";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import Customview from "@/components/customview";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Verifyprop } from "./props";
interface SelectedPlanProp {
  name: string;
  datacode: string;
  price: string;
}
export default function ElectricProp() {
  const { openToast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [meter, setMeter] = useState<string | undefined>(undefined);
  const [verifystatus, setStatus] = useState(false);
  const [verifyname, setVerifyName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [isDisabled, setIsDisabled] = useState(true);
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [thedate, setDate] = useState(new Date());
  const [frequency, setFrequency] = useState<string>("weekly");
  const [datamodal, setDatamodal] = useState(false);
  const [paymentmodal, setPaymentmodal] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState<string>("account");
  const [prepaidArray, setPrepaidArray] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("prepaid");
  const [image, setImage] = useState({
    name: "Choose Electricity Provider",
    poduct_id: null,
    service_type: null,
  });

  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log({
        provider: image.name,
        serviceType: String(image.service_type),
        mobile:String(phone),
        plan: selectedPlan,
        amount:Number(amount),
        accountnumber:String(meter),
        frequency,
        payment: paymentPlan,
        date: thedate,
      });
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
      } else if (result.success === false) {
        setFact(false);
        openToast(result.message);
      }
    } catch (error: any) {
      openToast(
        error?.message ||
          "We're currently unable to complete your request, Kindly try again later",
        "Purchase Failed",
      );
    } finally {
      setIsloading(false);
    }
  };

  const fetchElectric = async () => {
    setIsloading(true);
    try {
      const response = await Fetch();
      if (response.success) {
        const mydata = response.data;
        const newPrepaidArray = mydata.filter((item: any) =>
          item.name.match(/${selectedPlan}/i),
        );
        console.log(newPrepaidArray[0]);
        setPrepaidArray(newPrepaidArray);
      }
    } catch (error) {
      openToast("Unable to Validate Meter number!");
    } finally {
      setIsloading(false);
    }
  };

  const verifyElectric = async () => {
    if (!meter) {
      openToast("Kindly Fill up Meter Number");
      return;
    }
    if (!image.service_type) {
      openToast("Kindly select one Electricity Provider");
      return;
    }
    setIsloading(true);
    try {
      const response = await Validate({ meter, provider: image.service_type });
      if (response.success) {
        const mydata = response.data;
        console.log(mydata);
        if (mydata.user.customerName) {
          setVerifyName(mydata.user.customerName);
          setStatus(true);
        } else {
          alert(mydata.error);
        }
      }
    } catch (error) {
      openToast("Unable to Validate Meter number!");
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    setStatus(false);
  }, [meter]);

  useEffect(() => {
    fetchElectric();
  }, []);

  useEffect(() => {
    const isNetwork = image.service_type !== null;
    const isMeter = meter ? meter.length > 10 : false;
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
    } else if (!isMeter) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [image, meter, phone, amount]);

  const Contactinput = async (item: string) => {
    const stringclean = item.replace(/[^0-9]/g, "");
    if (stringclean.length > 10) {
      const modified = stringclean.slice(-10);
      const modString = "0" + modified;
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
                Schedule Electricity
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
                <Pressable
                  onPress={() => setNet(true)}
                  className={`w-10 h-10 flex-row items-center  rounded-md mr-1`}
                >
                  {image.name}
                </Pressable>

                <CaretIcon />
              </TouchableOpacity>
              <TouchableOpacity className="flex-grow h-14 px-2 border-[0.1px] border-gray-300 rounded-md flex flex-row items-center justify-between">
                <TextInput
                  value={meter}
                  keyboardType="numeric"
                  onChangeText={(e) => setMeter(e)}
                  placeholder="Meter Number"
                  placeholderClassName="dark:text-white"
                  className="flex-grow dark:text-white h-full text-md font-intermedium text-black"
                />
                <TouchableOpacity
                  className="flex flex-row items-center"
                  onPress={() => setModal(true)}
                >
                  <Verifyprop
                    click={() => verifyElectric()}
                    nameprop={String(verifyname)}
                    status={verifystatus}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <View className="w-full h-auto my-6">
              <Text className="text-md font-intermedium">Set Frequency</Text>

              <TouchableOpacity
                className={`w-full h-auto rounded-lg items-center flex-row my-2`}
              >
           
                <Text
                  className={`mr-2 text-ten font-interbold  ${frequency === "weekly" ? "text-mycolor" : "text-setgray"}`}
                  onPress={() => setFrequency("weekly")}
                >
                  Weekly
                </Text>
                <Text
                  className={` text-ten font-interbold ${frequency === "monthly" ? "text-mycolor" : "text-setgray"}`}
                  onPress={() => setFrequency("monthly")}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full h-auto ">
              <Text className="text-sm font-intermedium">Select Package</Text>
              <TouchableOpacity
                onPress={() => setDatamodal(true)}
                className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between"
              >
                <TouchableOpacity className="w-auto h-auto flex-col">
                  <Text className="font-intermedium  dark:text-white">
                    {selectedPlan === "prepaid" ? "Prepaid" : "Postpaid"}
                  </Text>
                </TouchableOpacity>

                <CaretIcon />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24 mt-3">
              <Text className="font-intermedium text-black dark:text-white text-sm my-1">
                Amount
              </Text>

              <TouchableOpacity className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
                <TextInput
                  value={amount}
                  keyboardType="numeric"
                  onChangeText={(e) => setAmount(e)}
                  placeholder="0"
                  placeholderClassName="dark:text-white"
                  className="flex-grow dark:text-white h-full text-md font-intermedium text-black"
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
                Payment Method
              </Text>

              <TouchableOpacity
                onPress={() => setPaymentmodal(true)}
                className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row justify-between items-center"
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

            <ContactComponent
              Mymodal={mymodal}
              Submit={(e: string) => Contactinput(e)}
              Closemodal={() => setModal(false)}
            />

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
                { id: 1, name: "Amount", value: "₦ " + String(amount) },
                { id: 7, name: "Plan", value: String(selectedPlan) },
                { id: 2, name: "Phone Number", value: String(phone) },
                { id: 3, name: "Mobile Network", value: String(image.name) },
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
              selected={image.service_type}
              submit={(e: any) => handleNetworkClick(e)}
              data={products}
              close={() => setNet(false)}
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
              submit={(e: string) => {
                setDatamodal(false);
                setSelectedPlan(e);
              }}
            />
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
