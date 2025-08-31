import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useToast } from "@/store/toast";
import { ContactComponent } from "../../components/contacts/contact";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import Networkmodal from "./modal";
import { Log, Validate } from "./Log";
import Datamodal from "./datamodal";
import Feedmodal from "../../components/feedback/feed";
import { ContactSvg, MtnSvg } from "@/assets/svg";
import { ColorScheme } from "@/hooks/useColorScheme";
import { CaretIcon } from "@/components/icons/icons";
import Confirmmodal from "@/components/confirmModal";
import { SmartModal } from "./smartnumber";
interface SelectedPlanProp {
  name: string;
  datacode: string;
  price: string;
}
export default function DataProp() {
  const { openToast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanProp | null>(
    null,
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [image, setImage] = useState({
    name: "Mtn network",
    source: <MtnSvg width="100%" />,
    value: "mtn",
  });

  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
    fetchData(image);
  };

  const fetchData = async (imager = image) => {
    setIsloading(true);
    try {
      const response = await Validate(imager?.value ||image.value);
      if (response.success) {
        const mydata = response.data;
        setProducts(mydata);
        setSelectedPlan(mydata[0]);
      }
    } catch (error: any) {
      openToast("Unable to fetch data plans at the moment.");
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmit = async () => {
    setIsloading(true);
    // await handleRecent(selectedPlan, texts);
    // console.log(" it passed the recent");
    try {
      const response = await Log(
        image.value,
        selectedPlan ? selectedPlan?.datacode : "",
        phone,
        selectedPlan ? selectedPlan?.name : "",
      );
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setModalVisible(true);
        SetNotification(
          `Your Data Purchase of ${selectedPlan ? selectedPlan.name : "undefined"} was Successful 🎉🎉`,
          "Data Purchase Successful",
          null,
        );
      } else if (result.success === false) {
        openToast(result.message);
        SetNotification(
          `Your Data Purchase of ${selectedPlan ? selectedPlan.name : "undefined"} Failed`,
          "Data Purchase Failed",
          null,
        );
      }
    } catch (error: any) {
      console.log(error);
      openToast(
        error.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    const isNetwork = image.value;
    const isPhone = /^(\+?234|0)[789][01]\d{8}$/.test(phone ? phone : "");
    const planExist = selectedPlan ? selectedPlan.datacode : false;
    if (!isNetwork) {
      setIsDisabled(true);
    } else if (!isPhone) {
      setIsDisabled(true);
    } else if (!planExist) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [image, phone, selectedPlan]);

  const Contactinput = async (item: string) => {
    const stringclean = item.replace(/[^0-9]/g, "");
    if (stringclean.length > 10) {
      const modified = stringclean.slice(-10);
      const modString = "0" + modified;
      setText(modString);
      setModal(false);
    } else {
      openToast("Selected Contact is invalid");
    }
  };

  return (
    <>
      <View className=" items-center pb-10 w-full my-5 h-auto flex-1">
        {/* <RecentModal
          submit={(e: any) => {
            setText(e.phonenumber);
            setSelectedPlan(e);
            alan(e);
          }}
          net={(e: any) => setImage(e)}
        /> */}
        <View className="w-full h-auto mb-3">
          <TouchableOpacity
            onPress={() => setNet(true)}
            className="w-full h-14 rounded-md flex flex-row items-center justify-start mb-2"
          >
            <Pressable className="w-10 h-10 flex-row items-center x-1 dark:bg-white rounded-md">
              {image.source}
            </Pressable>

            <Text className="font-intermedium mx-3 dark:text-white text-twelve">
              {image.name}
            </Text>

            <CaretIcon />
          </TouchableOpacity>
        </View>

        <View className="w-full h-24 mb-3">
          <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
            Phone Number
          </Text>

          <TouchableOpacity className="w-full h-[58px] px-2 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between">
            <TextInput
              value={phone}
              keyboardType="numeric"
              onChangeText={(e) => setPhone(e)}
              placeholder="0801 2345 6789"
              placeholderClassName="dark:text-white text-black"
              placeholderTextColor={
                ColorScheme() === "dark" ? "#333333" : "#888888"
              }
              className="flex-grow dark:text-white h-full text-sm font-intermedium text-black"
            />
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => setModal(true)}
            >
              <ContactSvg />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View className="w-full h-24 mb-24">
          <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
            Data Plan
          </Text>

          <TouchableOpacity
            onPress={() => setDatamodal(true)}
            className="w-full h-16 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row justify-between items-center"
          >
            <TouchableOpacity
              onPress={() => setDatamodal(true)}
              className="flex-grow h-full rounded-md flex flex-col justify-center"
            >
              <Text className="font-intermedium text-sm dark:text-white">
                {selectedPlan?.name}
              </Text>
              <Text className="font-inter  dark:text-gray-400 text-ten mt-1">
                Data Amount: ₦ {selectedPlan?.price}{" "}
              </Text>
            </TouchableOpacity>

            <CaretIcon />
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-10 mt-20 w-full flex flex-row items-center justify-center">
          <TouchableOpacity
            className="w-5/6 h-14 bg-mycolor rounded-xl flex flex-row items-center justify-center disabled:bg-[#6b34ff80]"
            disabled={isDisabled}
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
        {isPin && (
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
          />
        )}

        <Confirmmodal
          visible={confirmmodal}
          submit={() => {
            setIspin(true);
            setConfirmmodal(false);
          }}
          close={() => setConfirmmodal(false)}
          data={[
            {
              id: 1,
              name: "Amount",
              value: "₦" + String(selectedPlan?.price || "N/A"),
            },
            { id: 2, name: "Phone Number", value: String(phone) },
            {
              id: 3,
              name: "Data Plan",
              value: String(selectedPlan?.name || "N/A"),
            },
            { id: 4, name: "Mobile Network", value: String(image.name) },
          ]}
        />
        <Networkmodal
          visible={netmodal}
          selected={image.value}
          submit={(e) => handleNetworkClick(e)}
          close={() => setNet(false)}
        />

        <Datamodal
          visible={datamodal}
          close={() => setDatamodal(false)}
          submit={(e: any) => {
            setDatamodal(false);
            setSelectedPlan(e);
          }}
          data={products}
        />
        <Feedmodal
          modalContent={modalContent}
          modalVisible={modalVisible}
          fact={fact}
          closeModal={() => setModalVisible(false)}
        />
        <SmartModal
          net={(e: any) => {
            handleNetworkClick(e);
          
          }}
          submit={(e: string) => setPhone(e)}
          phone={String(phone)}
        />
      </View>
    </>
  );
}
