import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Customview from "../../components/customview";
import { styles } from "./style";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { ContactComponent } from "../../components/contacts/contact";
const deal = require("../../assets/images/care.png");
const nodeal = require("../../assets/images/care.png");
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import Networkmodal from "./modal";
import Typemodal from "./type";
import { Log, Validate } from "./Log";
import Feedmodal from "../../components/feedback/feed";
import { router } from "expo-router";
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
    name: "Bvn",
    value: "bvn",
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

  const alan = () => {
    if (texts === "") {
      alert("Please Enter an identification Number");
      return;
    }
    
    setIspin(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log(type.value, texts);
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
       
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);

      }
      setModalVisible(true);
    } catch (error) {
      const mydata = error.data;
      setModalContent(
        mydata.message ||
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
        <View className="flex-1 items-center px-4 justify-between flex flex-col  min-h-screen">
          <View className="flex flex-col items-center w-full">
            <View className="w-full h-28 boder-b-[0.2px]">
              <TouchableOpacity className="w-auto h-10 flex flex-row items-center ">
                <MaterialIcons
                  name="arrow-back"
                  size={22}
                  className="mr-2 dark:hidden"
                  onPress={() => router.back()}
                />
                <MaterialIcons
                  name="arrow-back"
                  size={22}
                  className="mr-2 hidden dark:flex"
                  color="white"
                  onPress={() => router.back()}
                />
              </TouchableOpacity>
              <Text className="text-2xl font-interbold text-gray-900 ml2 mt-2 dark:text-white">
                Generate Bank Account
              </Text>
            </View>

            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
                Identity Type
              </Text>

              <TouchableOpacity
                onPress={() => setTypemodal(true)}
                className="w-full h-14 px-3 border-[0.5px] border-gray-500 rounded-md flex flex-row justify-between items-center"
              >
                <Text className="font-intermedium  dark:text-white">
                  {type.name}
                </Text>
                <FontAwesome5 name="caret-down" className="" size={14} />
              </TouchableOpacity>
            </View>

            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
                Identification Number
              </Text>

              <TouchableOpacity className="w-full h-14 px-2 border-[0.5px] border-gray-500 rounded-md flex flex-row items-center justify-between">
                <TextInput
                  value={texts}
                  keyboardType="numeric"
                  onChangeText={(e) => setText(e)}
                  placeholder="Enter Identification Number"
                  className="flex-grow dark:text-white"
                />
                <AntDesign
                  name="contacts"
                  size={23}
                  color="#4b0082"
                  onPress={() => contactShower()}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full h-auto justify-center items-center mb-10">
            <TouchableOpacity
              className="w-4/5 h-12 bg-mycolor rounded-xl flex flex-row items-center justify-center"
              onPress={alan}
            >
              <Text style={styles.buttonin}>Generate</Text>
            </TouchableOpacity>
          </View>
          </View>
          <ContactComponent
            Mymodal={mymodal}
            Submit={(e) => Contactinput(e)}
            Closemodal={() => closecontact()}
          />

          <Modal visible={"hredar"} transparent={true} animationType="slide">
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
          </Modal>
          <Loader isLoading={isLoading} />
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
          />
        
          <Typemodal
            visible={typemodal}
            close={() => setTypemodal(false)}
            submit={(e) => handleTypeClick(e)}
          />
          <Feedmodal
            modalContent={modalContent}
            modalVisible={modalVisible}
            fact={fact}
            closeModal={() => setModalVisible(false)}
          />
        
      </Customview>
    </>
  );
}
