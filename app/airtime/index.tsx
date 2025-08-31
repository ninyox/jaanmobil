import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/store/toast";
import { ContactComponent } from "@/components/contacts/contact";
import SetNotification from "../../notify";
import Loader from "@/components/loader/loader";
import Pinmodal from "@/components/pinmodal/pin";
import Networkmodal from "./modal";
import { Log } from "./Log";
import Feedmodal from "@/components/feedback/feed";
import { ContactSvg, MtnSvg } from "@/assets/svg";
import { Pressable } from "react-native";
import Confirmmodal from "@/components/confirmModal";
import { CaretIcon } from "@/components/icons/icons";
import { SmartModal } from "./smartnumber";
export default function AirtimeProp() {
  const { openToast } = useToast()
  const [isLoading, setIsloading] = useState(false);
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
      const response = await Log(image.value, phone, amount);
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true)
        setFact(true);
        SetNotification(
          `Your Airtime Purchase of ₦ ${amount} was Successful 🎉🎉`,
          "Airtime Purchase Successful",
          null
        );
      } else if (result.success === false) {
        setFact(false);
        openToast(result.message)
        SetNotification(
          `Your Airtime Purchase of ₦ ${amount} Failed`,
          "Airtime Purchase Failed",
          null
        );
      }
    } catch (error: any) {
      openToast(
        error?.message ||
        "We're currently unable to complete your request, Kindly try again later","Purchase Failed"
      );
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const isNetwork = image.value
    const isPhone = /^(\+?234|0)[789][01]\d{8}$/.test(phone ? phone : "")
    const amountExist = typeof (amount) === "string" || typeof (amount) === "number" && Number(amount) > 0

    if (!isNetwork) {
      setIsDisabled(true)
    } else if (!isPhone) {
      setIsDisabled(true)
    } else if (!amountExist) {
      setIsDisabled(true)
    }
    else {
      setIsDisabled(false)
    }
  }, [image, phone, amount])
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
      const modified = stringclean.slice((-10));
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

      <View className="flex-1 items-center pb-10 w-full mt-6">
        {/* <RecentModal
          submit={(e: any) => {
            setText(e.phonenumber);
            setAmount(e.amount)
            alan(e)
          }}
          net={(e: any) => setImage(e)}
        /> */}

        <View className="w-full h-auto mb-3">

          <TouchableOpacity
            onPress={() => setNet(true)}
            className="w-full h-14 rounded-md flex flex-row items-center justify-start"
          >
            <Pressable className="w-9 h-9 flex-row items-center dark:bg-white rounded-md">
              {image.source}
            </Pressable>

            <Text className="font-intermedium mx-3 dark:text-white text-[12px]">
              {image.name}
            </Text>

            <CaretIcon />
          </TouchableOpacity>
        </View>

        <View className="w-full h-24 mb-3">
          <Text className="font-intermedium text-gray-800 dark:text-white text-[12px] my-1">
            Phone Number
          </Text>

          <TouchableOpacity className="w-full h-[58px] px-2 border-[0.2px] border-gray-500 rounded-lg flex flex-row items-center justify-between">
            <TextInput
              value={phone}
              keyboardType="numeric"
              onChangeText={(e) => setPhone(e)}
              placeholder="0801 2345 6789"
              className="flex-grow dark:text-white h-full text-twelve font-intermedium text-black"
            />
            <TouchableOpacity className="flex flex-row items-center" onPress={() => contactShower()} >
              <ContactSvg />
            </TouchableOpacity>

          </TouchableOpacity>
        </View>

        <View className="w-full h-24">
          <Text className="font-intermedium text-gray-800 dark:text-white text-[12px] my-1">
            Amount
          </Text>

          <TouchableOpacity className="w-full h-12 pl-6 border-b-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
            <Text className="text-sm w-4 dark:text-gray-300">₦</Text>
            <TextInput
              className="w-full h-full dark:text-white text-sm flex-row items-center font-intermedium"
              value={amount}
              onChangeText={(e) => setAmount(e)}
              placeholder="0"
              keyboardType="numeric"
            />
          </TouchableOpacity>
        </View>
        <View className="w-full h-8 mb-24">
          <ScrollView showsHorizontalScrollIndicator={false} className="flex-1" horizontal={true} >
            {
              amountArray.map((item, index) => {
                return (
                  
                    <Text key={index} className=" mx-1 dark:text-gray-500 text-[10px]" onPress={() => setAmount(String
                      (item.value))}>{item.name}</Text>
                  
                )
              })
            }
          </ScrollView>
        </View>




        <View className="absolute bottom-14 w-full flex flex-row items-center justify-center">
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

        {/* <Modal transparent={true} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.boxcenter}>
              <ActivityIndicator size={30} color="red" />
              <Text style={styles.pleasewait}> Please Wait...</Text>
            </View>
          </View>
        </Modal> */}
        <Loader isLoading={isLoading} />
        <Pinmodal
          visible={isPin}
          close={() => setIspin(false)}
          submit={() => {
            handleSubmit()
            setIspin(false)
          } }
          name="Airtime & Data"
        />
        <Confirmmodal
          visible={confirmmodal}
          submit={() => {
            setIspin(true)
            setConfirmmodal(false)
          }}
          close={() => setConfirmmodal(false)}
          data={[
            { id: 1, name: "Amount", value: "₦" + String(amount) },
            { id: 2, name: "Phone Number", value: String(phone) },
            { id: 3, name: "Mobile Network", value: String(image.name) },
          ]}
        />
        <Networkmodal
          visible={netmodal}
          selected={image.value}
          submit={(e: any) => handleNetworkClick(e)}
          close={() => setNet(false)}
        />
        {/* <Typemodal
          visible={typemodal}
          close={() => setTypemodal(false)}
          submit={(e) => handleTypeClick(e)}¸
        /> */}
        <Feedmodal
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        />
        <SmartModal net={(e: any) => handleNetworkClick(e)} submit={(e: string) => setPhone(e)} phone={String(phone)} />
      </View>

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
  { name: "₦10000.00", value: 10000 }
]