import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Customview from "../../components/customview";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import { Log, Validate, Verify } from "./Log";
import Datamodal from "./datamodal";
import Feedmodal from "../../components/feedback/feed";
import { Verifyprop } from "./prop";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import Countriesmodal from "./modal";
import { useToast } from "@/store/toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Confirmmodal from "@/components/confirmModal";
import { router } from "expo-router";
interface planProp {
  id: string;
  name: string;
  productCost: number;
  productId: number;
  productCode: string;
  value: number;
  walletId: string;
  providerId: string;
  description: string;
}
export default function eSim() {
  const {openToast} = useToast()
  const [selected, setSelected] = useState("1");
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [fact, setFact] = useState(false);
  const [netmodal, setNet] = useState(false);
  const [datamodal, setDatamodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<null | planProp>(null);
  const [verifystatus, setStatus] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");

  const [image, setImage] = useState({
    name: "",
    emoji:"",
    code: "",
  });

  const handleNetworkClick = (image: any) => {
    setNet(false);
    setImage(image);
    setSelected(image.code);
  };

  const handlePlanClick = (image: any) => {
    setDatamodal(false);
    setSelectedPlan(image);
  };

  const fetchData = async () => {
    setIsloading(true);
    try {
      if (image.code) {
        const response = await Validate(image.code);
        const mydata = response.data;
      
        setProducts(mydata);
        setSelectedPlan(mydata[0]);
        if(mydata.length > 0){
          setProducts(mydata);
          setSelectedPlan(mydata[0]);
        }else{
          openToast("We do not have any products for this country yet")
        }
      } else {
        console.log("Invalid selection");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const Verifycable = async () => {
    if (!image) {
      openToast("Kindly Select a Country");
      return;
    }

    if (!phone || phone.length < 6) {
      openToast("Invalid Decoder Number Id");
      return;
    }

    setIsloading(true);
    try {
      const response = await Verify(image.code, phone);
      if (response.success) {
        const mydata = response.data;
        console.log(mydata);
        if (mydata.Customer_Name) {
          setName(mydata.Customer_Name);
          setStatus(true);
        } else {
          openToast(mydata.error);
        }
      }
    } catch (error) {
      openToast(
        "Unable to verify The phone number currently! Kindly reach out to customer support if issue persists.",
      );
    } finally {
      setIsloading(false);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, [image]);

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      if(!selectedPlan){
        alert("Select a plan");
        return;
      }
      const { productCode,productId,walletId,providerId,value} = selectedPlan;
      const response = await Log({
       name:selectedPlan.name,
       productCode,
       productId,
       walletId:walletId,
       providerId:Number(providerId ),
       value:Number(value),
       country:image.name,
       countryCode:image.code,
       phone
     });
      if (response.success === true) {
        setModalContent(response.message);
        SetNotification(
          `Your eSim Purchase of ${selectedPlan.name} was Successful 🎉🎉`,
          "eSim Purchase Successful",
          null,
        );
         setModalVisible(true);
      } else if (response.success === false) {
        openToast(response.message);
        SetNotification(`${response.message}`, "eSim Purchase Failed", null);
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
    const isNetwork = image.code;
    const isPhone = /^(\+?234|0)[789][01]\d{8}$/.test(phone ? phone : "");
    const planExist = selectedPlan ? selectedPlan.productCode : false;
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

  return (
    <>
      <Customview>
        <View className="items-center px-4 pb-10 min-h-screen relative w-full h-auto flex-grow flex-1">
          <View className="w-full items-center flex-row justify-between mb-6 mt-2">
           <BackButton />
            <Text className="text-xl mr-6 font-intermedium text-gray-900 dark:text-white">
              eSim
            </Text>
            <Text></Text>
          </View>

      
          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
              Select Region
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between" onPress={() => setNet(true)} >
              <Pressable className="flex flex-row items-center"  onPress={() => setNet(true)}>
                <Text className="font-intermedium dark:text-white text-xl">
                  {image.emoji}
                </Text>
                <Text className="font-intermedium mx-3 dark:text-white text-twelve">
                  {image.name}
                </Text>
              </Pressable>
              <CaretIcon/>
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
            <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
              Select Service Package
            </Text>

            <TouchableOpacity
              onPress={() => setDatamodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium  dark:text-white">
                {" "}
                {selectedPlan?.name}{" "}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
              Amount
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
              <Text className="font-intermedium  dark:text-white">
                {" "}
               ₦ {selectedPlan?.productCost}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full h-24">
            <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
              eSim Recipient
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-500 rounded-md flex flex-row items-center justify-between">
              <TextInput
                value={phone}
                keyboardType="phone-pad"
                onChangeText={(e) => setPhone(e)}
                placeholder=" "
                className="flex-grow  dark:text-white"
              />
              <Verifyprop click={() => Verifycable()} status={verifystatus} />
            </TouchableOpacity>
          </View>
          
          {
            (selectedPlan && selectedPlan?.description)&& (
              <View className="w-full h-auto flex flex-row items-center">
                <MaterialCommunityIcons name="information-outline" size={24} color="gray" />
                <Text className="text-gray-800 dark:text-white text-twelve my-1">
                  {selectedPlan?.description}
                </Text>
              </View>
            )
          }
   

          <View className="w-full flex-row items-center justify-center absolute bottom-10">
            <TouchableOpacity
              className="w-11/12 h-14 bg-mycolor rounded-2xl flex flex-row items-center justify-center disabled:opacity-5"
              disabled={isDisabled}
              onPress={() => setConfirmmodal(true)}
            >
              <Text className="text-white font-interbold">Continue</Text>
            </TouchableOpacity>
          </View>

      
          {isLoading && <Loader isLoading={true} />}
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
          />
          <Countriesmodal
            visible={netmodal}
            submit={(e) => handleNetworkClick(e)}
            selected={image.code}
            close={() => setNet(false)}
          />
         {/* <Typemodal
            visible={typemodal}
            close={() => setTypemodal(false)}
            submit={(e:any) => handleTypeClick(e)}
          /> */}
          <Datamodal
            visible={datamodal}
            close={() => setDatamodal(false)}
            submit={(e:any) => handlePlanClick(e)}
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
                id: 1,
                name: "Amount",
                value: "₦" + String(selectedPlan?.productCost || "N/A"),
              },
              { id: 2, name: "Phone Number", value: String(phone) },
              {
                id: 3,
                name: "eSim Plan",
                value: String(selectedPlan?.name || "N/A"),
              },
              { id: 4, name: "Country", value: String(image.name) },
            ]}
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


//  data: [
//   {
//     productId: 5910,
//     productCode: 'RB00005',
//     providerId: 5,
//     name: 'Africa-11 1GB',
//     targetValue: 16830,
//     targetCurrencyId: 160,
//     targetCurrencyCode: 'NGN',
//     originalValue: 10.2,
//     originalCurrencyId: 230,
//     originalCurrencyCode: 'USD',
//     value: 10.2,
//     valueCurrencyId: 230,
//     valueCurrencyCode: 'USD',
//     productCost: 16830,
//     productCostCurrencyCode: 'NGN',
//     productCostCurrencyId: 160,
//     walletId: 'NGN-127',
//     category: 'eSim',
//     categoryCode: 'esim',
//     subCategory: 'Africa',
//     subCategoryCode: 'Africa',
//     serviceCode: '',
//     brandCode: 'roambuddysandbox',
//     providerName: 'roambuddysandbox',
//     description: 'Usable in following (11) contries: Egypt, Kenya, Madagascar, Mauritius, Morocco, Nigeria, South Africa, Tanzania, Tunisia, Uganda, Zambia. \r\n' +
//       'PLEASE NOTE:  Plan is Valid for 7 days after activation.',
//     productMoreInfoUrl: '#',
//     expirationDate: '2026-12-09',
//     fxRate: [Object],
//     denominations: [Array],
//     sysComment: 'Cost converted from USD to NGN'
//   }
// ]