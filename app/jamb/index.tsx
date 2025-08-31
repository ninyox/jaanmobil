import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import Customview from "../../components/customview";
import Confirmmodal from "@/components/confirmModal";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import { Log, Verify, Fetch } from "./Log";
import Datamodal from "./datamodal";
import Feedmodal from "../../components/feedback/feed";
import { Verifyprop } from "./prop";
import { JambSvg } from "@/assets/svg";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import { useToast } from "@/store/toast";
export default function Jamb() {
  const { openToast } = useToast();
  const [isLoading, setIsloading] = useState(true);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [regnumber, setRegNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [typemodal, setTypemodal] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [verifystatus, setStatus] = useState<boolean>(false);
  const [price, setPrice] = useState("");
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [image, setImage] = useState({
    product_code: "",
    amount: 0,
  });

  const VerifyJamb = async () => {
    if (!image.product_code) {
      openToast("Kindly Select a Jamb Provider");
      return;
    }
    if (!regnumber || regnumber.length < 6) {
      openToast("Invalid Jamb registration Number");
      return;
    }

    setIsloading(true);
    try {
      const response = await Verify({
        productcode: image.product_code,
        account: regnumber,
      });
      if (response.success) {
        const mydata = response.data;
        console.log(mydata);
        if (mydata.customerName) {
          setName(mydata.customerName);
          setStatus(true);
        } else {
          Toast.show(mydata.error);
        }
      }
    } catch (error: any) {
      openToast(
        error?.message ||
          "Unable to verify The profile code currently! Kindly reach out to customer support if issue persists.",
      );
    } finally {
      setIsloading(false);
    }
  };
  const fetch = async () => {
    try {
      const result = await Fetch();
      if (result.success) {
        setProducts(result.data);
      } else {
        openToast(
          "We're unable to display Jamb Products at the time, Please Try again later",
        );
      }
    } catch (error) {
      openToast(
        "We're unable to display Jamb Products at the time, Please Try again later",
      );
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const formatPhone = (text: string) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, "");

    // Format with spaces (e.g. 0801 234 5678)
    const match = cleaned.match(/^(\d{0,3})(\d{0,4})(\d{0,4})$/);

    if (!match) return cleaned;

    const [, p1, p2, p3] = match;
    let formatted = p1;
    if (p2) formatted += " " + p2;
    if (p3) formatted += " " + p3;

    return formatted;1258
    
  };
  const handleChange = (text: string) => {
    const formatted = formatPhone(text);
    setPhone(formatted);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log({
        productCode: image.product_code,
        account: regnumber,
        phone,
      });
      const result = response.data;
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true);
        SetNotification(
          `Your ${image.product_code} Purchase of ${image.amount} was Successful 🎉🎉`,
          "Cable Purchase Successful",
          null,
        );
      } else if (result.success === false) {
        setFact(false);
        openToast(result.message);
        SetNotification(`${result.message}`, "Jamb Transaction Failed", null);
      }
    } catch (error: any) {
      openToast(
        error.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );

    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const isType = image.product_code;
    // const isPhone = /^(\+?234|0)[789][01]\d{8}$/.test(phone ? phone : "");
     const isPhone = phone.length > 10 && phone.startsWith("0") 
    const isRegNumber = regnumber.length > 8;
    const amountExist =
      typeof amount === "string" ||
      (typeof amount === "number" && Number(amount) > 0);

    if (!isType) {
      setIsDisabled(true);
    } else if (!isPhone) {
      setIsDisabled(true);
    } else if (!amountExist) {
      setIsDisabled(true);
    } else if (!isRegNumber) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [image, phone, amount, regnumber]);

  return (
    <>
      <Customview>
        <View className="flex-1 items-center px-4 relative min-h-screen pb-40 w-full ">
          <View className="w-full items-center flex-row justify-between mb-6 mt-2">
            <BackButton />
            <Text className="text-sixt mr-6 font-intermedium text-gray-900 dark:text-white">
              JAMB
            </Text>
            <Text></Text>
          </View>
          <View className="w-full h-auto mb-3 flex-row items-center justify-center flex">
            <TouchableOpacity
              onPress={() => setNet(true)}
              className="w-20 h-20 rounded-md flex flex-row items-center justify-center mt-3"
            >
              <JambSvg width="100%" height="100%" />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select Exam Type
            </Text>

            <TouchableOpacity
              onPress={() => setDatamodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium text-twelve dark:text-white">
                {" "}
                {image?.product_code}{" "}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>
          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Exam Registration Number
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
              <TextInput
                value={regnumber}
                keyboardType="default"
                onChangeText={(e) => setRegNumber(e)}
                placeholder=" "
                className="flex-grow  dark:text-white"
              />
              <Verifyprop
                nameprop={name}
                click={() => VerifyJamb()}
                status={verifystatus}
              />
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
              Enter Phone Number
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
              <TextInput
                value={phone}
                keyboardType="numeric"
                onChangeText={handleChange}
                placeholder="0801 234 5678 "
                className="flex-grow  dark:text-white"
              />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Amount
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
              <Text className="flex-grow  dark:text-white">
                ₦ {image.amount}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full flex-row items-center justify-center absolute bottom-10">
            <TouchableOpacity
              className="w-11/12 h-14 bg-mycolor disabled:bg-[#6b34ff60] rounded-2xl flex flex-row items-center justify-center"
              onPress={() => setConfirmmodal(true)}
              disabled={isDisabled}
            >
              <Text className="text-white font-interbold">Continue</Text>
            </TouchableOpacity>
          </View>

          <Loader isLoading={isLoading} />
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
            name="Jamb"
          />
          <Confirmmodal
            visible={confirmmodal}
            submit={() => {
              setIspin(true);
              setConfirmmodal(false);
            }}
            close={() => setConfirmmodal(false)}
            data={[
              { id: 1, name: "Amount", value: "₦ " + String(image.amount) },
              { id: 2, name: "Registration Number", value: String(regnumber) },
              { id: 3, name: "Phone Number", value: String(phone) },
              { id: 4, name: "Exam Type", value: String(image.product_code) },
            ]}
          />

          <Datamodal
            visible={datamodal}
            close={() => setDatamodal(false)}
            data={products}
            submit={(e: any) => {
              setImage(e);
              setDatamodal(false);
            }}
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
