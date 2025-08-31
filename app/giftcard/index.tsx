import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import Customview from "../../components/customview";
import { styles } from "./style";
import Toast from "react-native-toast-message";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { ContactComponent } from "../../components/contacts/contact";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import Networkmodal from "./modal";
import Typemodal from "./type.js";
import Itemsmodal from "./items.js";
import { Log, Validate, Getprice, Fetch } from "./Log";
import Datamodal from "./datamodal";
import Feedmodal from "../../components/feedback/feed";
import { Verifyprop } from "./prop";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import RecipientModal from "./recipient";
import Confirmmodal from "@/components/confirmModal";
import { useToast } from "@/store/toast";
interface imageProps {
  name: string;
  denominations: object[];
  productCost: string;
  productId: number;
  brandCode: string;
  targetValue: number;
  originalValue: number;
  originalCurrencyCode: string;
  targetCurrencyCode: string;
}
export default function Giftcard({ route }) {
  const {openToast} = useToast()
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(25);
  const [isLoading, setIsloading] = useState(false);
  const [recipient, setRecipient] = useState<string>("me");
  const [recimodal, setRecimodal] = useState<boolean>(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [netproducts, setNetProducts] = useState([]);
  const [denominationarray, setdenominationArray] = useState<any>([]);
  const [itemsarray, setItemsArray] = useState([]);
  const [texts, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [phone, setPhone] = useState("");
  const [mymodal, setModal] = useState(false);
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [denominationmodal, setdenominationmodal] = useState(false);
  const [itemsmodal, setItemsmodal] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [verifystatus, setStatus] = useState(false);
  const [image, setImage] = useState<imageProps>();
  const [denomination, setdenomination] = useState({
    name: "",
    image: "",
    items: "",
  });
  const [items, setItems] = useState({
    name: "",
    local_Product_Value_Max: "",
    kuda_Identifier: "",
    amount_In_Naira: "",
  });

  const fetch = async () => {
    setIsloading(true);
    try {
      const response = await Fetch();
      if (response.success) {
        const mydata = response.data
        setNetProducts(mydata);
      }
    } catch (error) {
      console.log(error);
      if (error && error.message) {
        alert(error.message);
        return;
      } else {
        alert("Unable to fetch Giftcards");
      }
    } finally {
      setIsloading(false);
    }
  };

  const alan = () => {
    if (!image) {
      openToast("Select a Giftcard Brand");
      return;
    }
    if (texts === "" && recipient !== "me") {
      openToast("Please Enter Email Address");
      return;
    }

    setConfirmmodal(true);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log(
        image.package,
        items.kuda_Identifier,
        items.amount_In_Naira,
        items.local_Product_Value_Max,
        texts,
      );
      const result = response;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Your Purchase of ${image.name} giftcard was Successful 🎉🎉`,
          "Purchase Successful",
          null,
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        SetNotification(
          `Your Purchase of ${image.name} Failed`,
          "Giftcard Purchase Failed",
          null,
        );
      }
      setModalVisible(true);
    } catch (error) {
      setModalContent(
        error?.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );
      setFact(false);
      setModalVisible(true);
    } finally {
      setIsloading(false);
    }
  };

  const Contactinput = async (item) => {
    console.log("i see the data sent", item);
    const stringclean = item.replace(/[^0-9]/g, "");
    if (stringclean.length > 10) {
      const modified = stringclean.slice((0, -10));
      const modString = "0" + modified;
      console.log("this if fully cleaned", modString);
      setPhone(modString);
      setModal(false);
    } else {
      alert("Selected Contact is invalid");
    }
  };

  useEffect(() => {
    const getprice = async () => {
      try {
        const response = await Getprice();
        const mydata = response;
        if (mydata.success) {
          const realdata = mydata.data[0];
          setPrice(realdata.electricprice);
          console.log(realdata.electricprice);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    getprice();
  }, []);

  return (
    <>
      <Customview>
        <View className="flex-1 items-center px-4 relative min-h-screen h-auto">
          <View className="w-full items-center flex-row justify-between mb-6 mt-2">
            <BackButton />

            <Text className="text-sixt mr-6 font-intermedium text-gray-900 dark:text-white">
              Gift Card
            </Text>
            <Text></Text>
          </View>

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800  text-twelve my-1 dark:text-white">
              Select Giftcard
            </Text>

            <TouchableOpacity
              onPress={() => setNet(true)}
              className="w-full h-14 px-2 border-[0.3px] border-gray-400 rounded-md flex flex-row items-center"
            >
              <View className="flex flex-row items-center flex-grow">
               
                <Text className="font-intermedium text-twelve mx-1 dark:text-white">
                  {image?.name}
                </Text>
              </View>
              <FontAwesome5 name="caret-down" className="" size={14} />
            </TouchableOpacity>
          </View>
{/* 
          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select denomination
            </Text>

            <TouchableOpacity
              onPress={() => setdenominationmodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center flex-grow">
                <Image
                  source={{ uri: denomination.image || "https://jaan.ng/logo.png" }}
                  className="h-10 w-10 rounded-full mr-2"
                />
                <Text className="font-intermedium  dark:text-white">
                  {denomination.name}
                </Text>
              </View>
              <CaretIcon />
            </TouchableOpacity>
          </View> */}

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Gift Card Recipient
            </Text>

            <TouchableOpacity
              onPress={() => setRecimodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center flex-grow">
                <Text className="font-intermedium  dark:text-white">
                  {recipient === "me" ? "Me" : "Someone Else"}
                </Text>
              </View>
              <CaretIcon />
            </TouchableOpacity>
          </View>
 
          {
            recipient === "else" && (
              <View className="w-full h-24">
                <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
                  Email Address
                </Text>
    
                <View className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
                  <TextInput
                    value={texts}
                    keyboardType="email-address"
                    onChangeText={(e) => {
                      setText(e);
                      setStatus(false);
                    }}
                    placeholder="Enter recipient's email adress"
                    className="flex-grow  dark:text-white"
                  />
                </View>
              </View>
            )
          }
          
          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
              Amount
            </Text>

            <TouchableOpacity
              onPress={() => setItemsmodal(true)}
              className="w-full h-14 px-3 border-[0.5px] border-gray-500 rounded-md flex flex-row items-center justify-between"
            >
              <View className="flex flex-row items-center flex-grow">
                <Text className="font-intermedium  dark:text-white">
                  ₦{" "}
                  {Math.floor(image ? image?.targetValue : 0)}
                </Text>
              </View>
         
            </TouchableOpacity>
          </View>

        
          {verifystatus && (
            <View className="w-full h-14">
              <View className="w-full h-14 px-2 border-[0.5px] border-gray-500 rounded-md flex flex-row items-center justify-between">
                <Text className="flex-grow  dark:text-white text-center font-inter">
                  {name}{" "}
                </Text>
              </View>
            </View>
          )}


          {/* <View className="w-full h-24 flex justify-end flex-row">
            <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
              + ₦{price} charge
            </Text>
          </View> */}

          <View className="w-full items-center justify-center mt-10 absolute bottom-14">
            <TouchableOpacity
              className="w-11/12 h-14 bg-mycolor rounded-xl flex flex-row items-center justify-center"
              onPress={alan}
            >
              <Text className="text-white text-md font-interbold">Purchase</Text>
            </TouchableOpacity>
          </View>

          <ContactComponent
            Mymodal={mymodal}
            Submit={(e) => Contactinput(e)}
            Closemodal={() => setModal(false)}
          />

          

          <Loader isLoading={isLoading} />
          {modalVisible && (
            <Feedmodal
              modalContent={modalContent}
              fact={fact}
              closeModal={() => setModalVisible(false)}
            />
          )}

          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => {
              handleSubmit();
              setIspin(false);
            }}
          />
          <Networkmodal
            visible={netmodal}
            submit={(e:imageProps) => {
              setNet(false);
              setImage(e);
              setdenominationArray(e.denominations);
              // setdenomination(e.denominations[0]);
              // setItemsArray(e.denominations[0].items);
              // setItems(e.denominations[0].items[0]);
            }}
            netarray={netproducts}
            close={() => setNet(false)}
          />
          <Typemodal
            visible={denominationmodal}
            close={() => setdenominationmodal(false)}
            submit={(e) => {
              setdenominationmodal(false);
              setdenomination(e);
              setItemsArray(e.items);
              setItems(e.items[0]);
            }}
            typearray={denominationarray}
          />
          <Itemsmodal
            visible={itemsmodal}
            close={() => setItemsmodal(false)}
            submit={(e) => {
              setItemsmodal(false);
              setItems(e);
            }}
            typearray={itemsarray}
          />
          <RecipientModal
            visible={recimodal}
            close={() => setRecimodal(false)}
            submit={(e: string) => {
              setRecipient(e);
              setRecimodal(false);
            }}
          />
          <Datamodal
            visible={datamodal}
            close={() => setDatamodal(false)}
            submit={(e:any) => {
              setDatamodal(false);
              setSelectedPlan(e);
            }}
            data={products}
          />
          <Confirmmodal
            visible={confirmmodal}
            submit={() => {
              setIspin(true);
              setConfirmmodal(false);
            }}
            close={() => setConfirmmodal(false)}
            data={[
              {
                id: 3,
                name: "Brand Name",  
                value: String(image?.name || "N/A"),
              },
              {
                id: 1,
                name: "Denomination",
                value: (formatCurrency(image?.originalValue || 0, String(image?.originalCurrencyCode)) || "N/A"),
              },
              {
                id: 7,
                name: "Amount",
                value:  (formatCurrency(image?.targetValue || 0, image?.targetCurrencyCode || "NGN")|| "N/A"),
              },
              { id: 2, name: "Recipient", value: recipient === "me" ? "Me" : String(texts) },
  
            ]}
          />
        </View>
      </Customview>
    </>
  );
}


function formatCurrency(amount:number, currencyCode:string, locale = 'en') {
  
  if(
    !amount || !currencyCode
  ){
    return ""
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0, // remove decimals if not needed
    maximumFractionDigits: 2
  }).format(amount);
}