import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/store/toast";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import { ContactComponent } from "@/components/contacts/contact";
import SetNotification from "@/notify";
import Loader from "@/components/loader/loader";
import Pinmodal from "@/components/pinmodal/pin";
import Networkmodal from "./modal";
import { Fetch, Log, Validate } from "./Log";
import Feedmodal from "@/components/feedback/feed";
import { ContactSvg } from "@/assets/svg";
import Confirmmodal from "@/components/confirmModal";
import { Verifyprop } from "../props";

export default function PrepaidProp() {
  const { openToast } = useToast()
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [meter, setMeter] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [isDisabled, setIsDisabled] = useState(true);
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [verifystatus, setStatus] = useState(false);
  const [verifyname, setVerifyName] = useState("");
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [prepaidArray, setPrepaidArray] = useState([]);
  const [image, setImage] = useState({
    name: "Choose Electricity Provider",
    poduct_id: null,
    service_type: null,
  });

  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
    setSelected(image.service_type);
  };
  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const result = await Log({provider:image.name,mobile:String(phone),amount:Number(amount),serviceType:image.service_type ? image.service_type : "",accountnumber:String(meter)});
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true);
        SetNotification(
          `Your ${image.name} of ₦ ${amount} was Successful 🎉🎉`,
          "Electricity Topup Successful",
          null
        );
      } else if (result.success === false) {
        openToast(result.message);
      }
  
    } catch (error: any) {
      openToast(error?.message || "We're currently unable to complete your request, Kindly try again later"
      );
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {

    const isNetwork = image.service_type !== null
    const isMeter = meter ? meter.length > 10 : false
    const isPhone = /^(\+?234|0)[789][01]\d{8}$/.test(phone ? phone : "")
    const amountExist = typeof (amount) === "string" || typeof (amount) === "number" && Number(amount) > 0
    if (!isNetwork) {
      setIsDisabled(true)
    } else if (!isPhone) {
      setIsDisabled(true)
    } else if (!amountExist) {
      setIsDisabled(true)
    }
    else if (!isMeter) {
      setIsDisabled(true)
    }
    else {
      setIsDisabled(false)
    }
  }, [image, meter, phone, amount])

  const Contactinput = async (item: string) => {
    const stringclean = item.replace(/[^0-9]/g, "");
    if (stringclean.length > 10) {
      const modified = "0" + stringclean.slice((-10));
      setPhone(modified);
      setModal(false);
    } else {
      openToast("Selected Contact is invalid");
    }
  };

  const fetchElectric = async () => {
    setIsloading(true);
    try {
      const response = await Fetch();
      if (response.success) {
        const mydata = response.data;
        const newPrepaidArray = mydata.filter((item: any) => item.name.match(/PREPAID/i));
        console.log(newPrepaidArray[0]);
        setPrepaidArray(newPrepaidArray);
    
      }
    } catch (error) {
      openToast(
        "Unable to Validate Meter number!"
      );
    } finally {
      setIsloading(false);
    }
  };

  const verifyElectric = async () => {
    if (!meter) {
      openToast("Kindly Fill up Meter Number");
      return;
    }
    if(!image.service_type){
      openToast("Kindly select one Electricity Provider")
      return;
    }
    setIsloading(true);
    try {
      const response = await Validate({meter, provider: image.service_type});
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
      openToast(
        "Unable to Validate Meter number!"
      );
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    setStatus(false)
  }, [meter])
 
  useEffect(() => {
    fetchElectric()
  }, [])
  return (
    <>

      <View className="flex-1 items-center pb-10 w-full relative">

        <View className="w-full h-auto mb-3">

          <TouchableOpacity
            onPress={() => setNet(true)}
            className="w-full h-14 rounded-md flex flex-row items-center justify-start"
          >
            {/* <Pressable className="w-7 h-7 flex-row items-center">
              <Image className="bg-contain w-7 h-7" source={image.source} />
            </Pressable> */}

            <Text className="font-intermedium mr-3 dark:text-white text-sm">
              {Capitalize(image.name)}
            </Text>

            <MaterialIcons name="keyboard-arrow-down" className="" size={14} />
          </TouchableOpacity>
        </View>
        <View className="w-full h-24">
          <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
            Meter Number
          </Text>

          <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between">
            <TextInput
              value={meter}
              keyboardType="numeric"
              onChangeText={(e) => setMeter(e)}
              placeholder=""
              className="flex-grow dark:text-white h-full text-sm font-intermedium text-black"
            />
            <Verifyprop status={verifystatus} click={verifyElectric} nameprop={verifyname} />
          </TouchableOpacity>
        </View>
        <View className="w-full h-24">
          <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
            Customer Phone Number
          </Text>

          <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between">
            <TextInput
              value={phone}
              keyboardType="numeric"
              onChangeText={(e) => setPhone(e)}
              placeholder=""
              className="flex-grow dark:text-white h-full text-sm font-intermedium text-black"
            />
            <TouchableOpacity className="flex flex-row items-center" onPress={() => setModal(true)} >
              <ContactSvg />
            </TouchableOpacity>

          </TouchableOpacity>
        </View>

        <View className="w-full h-24">
          <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
            Amount
          </Text>

          <TouchableOpacity className="w-full h-14 pl-6 border-b-[0.2px] border-gray-500 rounded-md flex flex-row items-center">
            <Text className="text-lg w-4">₦</Text>
            <TextInput
              className="w-full h-full dark:text-white text-sm flex-row items-center font-intermedium"
              value={amount}
              onChangeText={(e) => setAmount(e)}
              placeholder="0"
              keyboardType="numeric"
            />
          </TouchableOpacity>
        </View>
        <View className="w-full h-8 ">
          <ScrollView className="flex-1" horizontal={true}>
            {
              amountArray.map((item, index) => {
                return (
                  
                    <Text key={index} className=" mx-1 dark:text-white text-ten" onPress={() => setAmount(String
                      (item.value))}>{item.name}</Text>
                  
                )
              })
            }
          </ScrollView>
        </View>

        <View className="absolute bottom-14 w-full flex flex-row items-center justify-center py-2">
          <TouchableOpacity
            disabled={isDisabled}
            className="w-11/12 h-14 bg-mycolor rounded-xl flex flex-row items-center justify-center disabled:bg-[#6b34ff60]"
            onPress={() => setConfirmmodal(true)}
          >
            <Text className="text-md font-interbold text-white">Continue</Text>
          </TouchableOpacity>
        </View>

        <ContactComponent
          Mymodal={mymodal}
          Submit={(e: string) => Contactinput(e)}
          Closemodal={() => setModal(false)}
        />
        <Confirmmodal
          visible={confirmmodal}
          submit={() => {
            setIspin(true)
            setConfirmmodal(false)
          }}
          close={() => setConfirmmodal(false)}
          data={[
            { id: 3, name: "Service Provider", value: String(Capitalize(image.name)) },
            { id: 8, name: "Meter Number", value: String(meter) },
            { id: 1, name: "Amount", value: "₦" + String(amount) },
            { id: 2, name: "Phone Number", value: String(phone) },
            { id: 7, name: "Type", value: "Electricity Prepaid" },
            
          ]}
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
        {/* <Loader isLoading={isLoading} /> */}
        {/* <Pinmodal
          visible={isPin}
          close={() => setIspin(false)}
          submit={() => handleSubmit()}
          name="Electricity"
        />
        */}
        {/* <Networkmodal
          visible={netmodal}
          selected={image.service_type}
          data={prepaidArray}
          submit={(e: any) => handleNetworkClick(e)}
          close={() => setNet(false)}
        />
     
        <Feedmodal
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        /> */}
      </View>

    </>
  );
}

const amountArray = [
  { name: "₦500.00", value: 500 },
  { name: "₦1000.00", value: 1000 },
  { name: "₦2000.00", value: 2000 },
  { name: "₦3000.00", value: 3000 },
  { name: "₦5000.00", value: 5000 },
  { name: "₦10000.00", value: 10000 },
   { name: "₦15000.00", value: 15000 },
    { name: "₦20000.00", value: 20000 },
]

function Capitalize (str:string){
  if(!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1)
}