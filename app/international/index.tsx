import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import Customview from "../../components/customview";
import Monthmodal from "./monthmodal";
import SetNotification from "../../notify";
import Loader from "../../components/loader/loader";
import Pinmodal from "../../components/pinmodal/pin";
import {
  Log,
  Verify,
  FetchCountry,
  FetchOperators,
  FetchProducts,
} from "./Log";
import { useToast } from "@/store/toast";
import Feedmodal from "../../components/feedback/feed";
import { Verifyprop } from "./prop";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import Confirmmodal from "@/components/confirmModal";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CountryModal from "./countrymodal";
import Operatormodal from "./operatormodal";
import ProductModal from "./productmodal";
interface selectMonthProp {
  monthsPaidFor: string;
  price: number;
}
interface selectedPlanProp {
  code: string;
  name: string;
  availablePricingOptions: object[];
}
export default function International() {
  const { openToast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const [isPin, setIspin] = useState(false);
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("fhfhfhhjfjfjggsgs");
  const [fact, setFact] = useState(false);
  const [confirmmodal, setConfirmmodal] = useState(false);
  const [productmodal, setProductmodal] = useState(false);
  const [operatormodal, setOperatormodal] = useState(false);
  const [operators, setOperators] = useState([]);
  const [countrymodal, setCountrymodal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<selectedPlanProp | null>(
    null,
  );
  const [verifystatus, setStatus] = useState(false);
  const [monthsArray, setMonthsArray] = useState([]);
  const [monthModal, setMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<selectMonthProp | null>(
    null,
  );
  const [phoneError, setPhoneError] = useState("");
  const [country, setCountry] = useState({
    name: "Select Country",
    code: "",
    emoji: "",
  });
  const [operator, setOperator] = useState({
    name: "Select Operator",
    id: "",
  });
  const [product, setProduct] = useState({
    name: "Select Product",
    amount: 0,
    id: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const {
    data: countries,
    isLoading: loading,
  } = useQuery({
    queryKey: ["intl"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("../login/login");
      }
      const response = await FetchCountry();
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    },
  });
  useEffect(() => {
    const isPhone = /\+[0-9]{9,}/g.test(phone)
    const isCountry = country.code !== "";
    const isProduct = product.id !== "";

    if (isPhone && isCountry && isProduct) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    
    if(phone){
      const isPhone = /\+[0-9]/g.test(phone)
      if(isPhone){
        setPhoneError("")
      }else {
        setPhoneError("Phone Number should be written in international format, e:g +234")
      }
      
      if(phone.length < 9){
        setPhoneError("Invalid Phone Number Length")
      }
    }
    
  }, [phone, country, product]);
  const fetchOperator = async () => {
    if (country.code === "") {
      return;
    }
    try {
      const response = await FetchOperators({ code: country.code });
      const mydata = response.data;
      setOperators(mydata);
    } catch (error) {
      openToast("Unable to Fetch Operators, Please Try Again Later");
    }
  };

  const fetchProducts = async () => {
    if (country.code === "" || !operator.id) {
      return;
    }
    try {
      const response = await FetchProducts({
        code: country.code,
        id: Number(operator.id),
      });
      const mydata = response.data;
      setProducts(mydata.products);
    } catch (error) {
      openToast("Unable to Fetch Products, Please Try Again Later");
    }
  };

  useEffect(() => {
    fetchOperator();
  }, [country]);

  useEffect(() => {
    fetchProducts();
  }, [operator]);

  if (loading) {
    return <Loader isLoading={true} />;
  }

  const VerifyIntl = async () => {
    if (!country.code) {
      openToast("Kindly Select a Country");
      return;
    }
    if (!phone || phone.length < 10) {
      openToast("Invalid Phone Number");
      return;
    }
    setIsloading(true);
    try {
      const response = await Verify(country.code, phone);
      if (response.success) {
        const mydata = response.data;
        console.log(mydata);
        if (mydata.user.info) {
          const fetchedInfo = mydata.user.info;
          const { operatorId, operator: fetchedOperator,country } = fetchedInfo[0];
          setOperator({
            name: String(fetchedOperator),
            id: operatorId,
          });
          setCountry({
            name:country.name,
            code:country.code,
            emoji:""
          })
          setStatus(true);
        } else {
          Toast.show(mydata.error);
        }
      }
    } catch (error) {
      openToast(
        "Unable to verify The meter number currently! Kindly reach out to customer support if issue persists.",
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      if (!selectedPlan) {
        return;
      }
      const { code } = selectedPlan;

      const response = await Log({
        provider: image.value,
        cardnumber: texts,
        code,
        month: selectedMonth ? selectedMonth.monthsPaidFor : "1",
        plan: selectedPlan.name,
      });
      const result = response.data;
      if (result.success === true) {
        setModalContent(result.message);
        setFact(true);
        SetNotification(
          `Your ${image.name} Purchase of ${selectedPlan.name} was Successful 🎉🎉`,
          "Cable Purchase Successful",
          null,
        );
      } else if (result.success === false) {
        setFact(false);
        setModalContent(result.message);
        SetNotification(`${result.message}`, "Cable Purchase Failed", null);
      }
      setModalVisible(true);
    } catch (error: any) {
      openToast(
        error.message ||
          "We're currently unable to complete your request, Kindly try again later",
      );
      setFact(false);
      setModalVisible(true);
    } finally {
      setIsloading(false);
    }
  };



  return (
    <>
      <Customview>
        <View className="flex-1 items-center  relative min-h-screen pb-40 w-full ">
          <View className="w-full items-center flex-row justify-between mb-6 mt-2 border-b-[0.2px] pb-6 border-gray-300 px-4">
            <BackButton />
            <Text className="text-xl mr-6 font-intermedium text-gray-900 dark:text-white">
              International Airtime
            </Text>
            <Text></Text>
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select Country
            </Text>

            <TouchableOpacity
              onPress={() => setCountrymodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium text-twelve dark:text-white">
                {`${country?.name} ${country.emoji}`}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Enter Phone Number
            </Text>

            <TouchableOpacity className="w-full h-14 px-2 border-[0.2px] border-gray-400 rounded-md flex flex-row items-center justify-between">
              <TextInput
                value={phone}
                keyboardType="phone-pad"
                onChangeText={(e) => {
                  setPhone(e)
                  setStatus(false)
                
                }}
                placeholder=" "
                className="flex-grow  dark:text-white"
              />
              <Verifyprop click={() => VerifyIntl()} status={verifystatus} />
            </TouchableOpacity>
            {
              phoneError && (
                <Text className="text-ten font-intermedium text-red-500">{ phoneError}</Text>
              )
            }
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select Operator
            </Text>

            <TouchableOpacity
              onPress={() => setOperatormodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium text-twelve dark:text-white">
                {" "}
                {operator?.name}{" "}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Select Product
            </Text>

            <TouchableOpacity
              onPress={() => setProductmodal(true)}
              className="w-full h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center justify-between"
            >
              <Text className="font-intermedium text-twelve dark:text-white">
                {" "}
                {product.name}{" "}
              </Text>
              <CaretIcon />
            </TouchableOpacity>
          </View>

          <View className="w-full h-24 px-4">
            <Text className="font-intermedium text-gray-800 dark:text-white text-twelve my-1">
              Amount
            </Text>

            <TouchableOpacity className="w-full h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center justify-between">
              <Text className="font-intermedium text-twelve dark:text-white">
                {" "}
                ₦ {product.amount}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full flex-row items-center justify-center absolute bottom-10">
            <TouchableOpacity
              disabled={isDisabled}
              className="w-11/12 h-14 bg-mycolor rounded-2xl flex flex-row items-center disabled:bg-[#6b34ff80] justify-center"
              onPress={() => setConfirmmodal(true)}
            >
              <Text className="text-white font-interbold">Continue</Text>
            </TouchableOpacity>
          </View>

          <Loader isLoading={isLoading} />
          <Pinmodal
            visible={isPin}
            close={() => setIspin(false)}
            submit={() => handleSubmit()}
            name="International Deals"
          />
          {/* <Networkmodal
            visible={netmodal}
            submit={(image: any) => {
              setNet(false);
              setImage(image);
              setSelected(image.value);
            }}
            selected={image.value}
            close={() => setNet(false)}
          /> */}

          <ProductModal
            visible={productmodal}
            close={() => setProductmodal(false)}
            submit={(image: any) => {
              setProductmodal(false);
              setProduct(image);
            }}
            data={products}
          />

          <CountryModal
            visible={countrymodal}
            close={() => setCountrymodal(false)}
            submit={(image: any) => {
              setCountrymodal(false);
              setCountry(image);
              setOperators([]);
              setOperator({
                name: "Select Operator",
                id: "",
              });
            }}
            data={countries}
          />

          <Operatormodal
            visible={operatormodal}
            close={() => setOperatormodal(false)}
            submit={(image: any) => {
              setOperatormodal(false);
              setOperator(image);
            }}
            data={operators}
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
          <Feedmodal
            modalContent={modalContent}
            modalVisible={modalVisible}
            fact={fact}
            closeModal={() => setModalVisible(false)}
            title="Cable TV Purchase Successful"
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
                value: "₦" + String(product.amount || "N/A"),
              },
              { id: 2, name: "Phone Number", value: String(phone) },
              {
                id: 3,
                name: "Plan",
                value: String(product.name || "N/A"),
              },
              { id: 4, name: "Country", value: String(country.name + " " + country.emoji) },
            ]}
          />
        </View>
      </Customview>
    </>
  );
}
