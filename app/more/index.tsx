import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  Linking,
} from "react-native";
import { styles } from "./style";
import {
  Entypo,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import Loader from "../../components/loader/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Customview from "../../components/customview";
import Footer from "../../components/footer/page";
import * as Notifications from "expo-notifications";
const deale = require("../../assets/images/emoticon.png");
import { useRouter } from "expo-router";
import {
  LegalSvg,
  StarSvg,
  WhatsappSvg,
  AnalyticsSvg,
  SecuritySvg,
} from "@/assets/svg";
import Thememodal from "./thememodal";
import { Log } from "./log";

interface ResponseProp {
  name: string;
  accountnumber: string;
  credit: number;
}
export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const [response, setResponse] = useState<ResponseProp | null>();
  const [showTheme, setTheme] = useState<boolean>(false);
  const fetchData = async () => {
    setIsloading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.push("../login/login");
      }
      if (token) {
        const result = await Log(token);
        if (result.success === true) {
          setResponse(result.data);
        }
      }
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };
  
  async function checkRedirect() {

     const permission = await Notifications.requestPermissionsAsync({
     ios: {
     allowAlert: true,
     allowBadge: true,
     allowSound: true,
     },
     });
     console.log(permission)
    
      let isMounted = true;
      function redirect(notification) {
        const url = notification.request.content.data?.redirect;
        if (url) {
          router.push(url);
        }
      }
  
      Notifications.getLastNotificationResponseAsync().then((response) => {
        if (!isMounted || !response?.notification) {
          return;
        }
        redirect(response.notification);
      });
  
      const responseSubscription =
        Notifications.addNotificationResponseReceivedListener(
          async (response) => {
            redirect(response.notification);
          }
        );
      return () => {
        isMounted = false;
        responseSubscription.remove();
      };
  
  }
  const signout = async () => {
    await AsyncStorage.removeItem("firstname");
    await AsyncStorage.removeItem("balance");
    await AsyncStorage.removeItem("lastname");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("phonenumber");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("accountname");
    await AsyncStorage.removeItem("bankname");
    await AsyncStorage.removeItem("accountnumber");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("@user");

    router.push("../login/login");
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Customview>
        <View className="px-2 bg-white dark:bg-black py-4 ">
          <View className="w-full flex-col items-center pb-5 ">
            <Text className="text-xl font-intermedium mb-9 dark:text-white">
              More
            </Text>
            <Pressable className="bg-yellow w-auto h-auto rounded-full px-8 py-3">
              <Text className="font-interbold text-white text-xl">
                Spin & Win
              </Text>
            </Pressable>
          </View>

          <View className="w-full h-auto rounded-md dark:bg-dark flex-row justify-between my-4 p-4">
            <View className="h-16 flex flex-row justify-around  items-center ">
              <Image source={deale} className="w-14 h-14 rounded-full" />
            </View>
            <View className=" h-auto flex flex-col justify-around items-start flex-grow px-2">
              <Text className="font-interbold text-sm dark:text-white">
                {response?.name}
              </Text>
              <Text className="text-[12px] font-intermedium dark:text-white">
                Account Number:{response?.accountnumber}{" "}
              </Text>
              <Text className=" font-intermedium text-[12px] dark:text-white">
                Wallet Balance: {response?.credit}
              </Text>
            </View>

            <View className="h-16 flex flex-row justify-around borde-b-[0.2px] items-center">
              <Text
                className="text-mycolor font-interbold"
                onPress={() => router.push("../profile")}
              >
                View Profile
              </Text>
            </View>
          </View>

          <View className="w-full h-auto rounded-md dark:bg-dark my-3">
            <Pressable
              className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
              onPress={() => router.push("../referral")}
            >
              <View style={styles.myidea}>
                <Entypo name="lock" size={20} color="black" />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Referrals
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
            <Pressable
              className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
              onPress={() => router.push("../analytics")}
            >
              <View style={styles.myidea}>
                <AnalyticsSvg />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Analytics
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
            <Pressable
              className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
              onPress={() => router.push("../security")}
            >
              <View style={styles.myidea}>
                <SecuritySvg />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Security
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
          </View>

          <View
            id="theme"
            className="w-full h-auto rounded-md bg-transparent  dark:bg-dark my-3"
          >
            <Pressable
              className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
              onPress={() => setTheme(true)}
            >
              <View className="flex flex-row w-[70%] items-center h-16 ">
                <Feather name="sun" size={20} className="" />
                <Text className="font-intermedium dark:text-white mx-2 text-sm">
                  Theme
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>

            <Pressable className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center" onPress={() => checkRedirect()}>
              <View style={styles.myidea} className="">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="orange"
                />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Notifications
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
            <Pressable
              className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
              onPress={() => router.push("../generate")}
            >
              <View style={styles.myidea}>
                <MaterialCommunityIcons name="bank" size={20} color="green" />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Generate Bank Account
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
          </View>

          <View
            id="support and legal"
            className="w-full h-auto rounded-md bg-transparent dark:bg-dark my-3"
          >
            <Pressable
              className="w-full h-16 flex flex-row justify-around lold-[0.2px] items-center"
              onPress={() => Linking.openURL("mailto:contact@jaan.ng")}
            >
              <View style={styles.myidea}>
                <AntDesign
                  name="customerservice"
                  size={20}
                  className="fill-slate-800 dark:fill-blue-500"
                  color="red"
                />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Support
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
            <Pressable
              className="w-full h-16 flex flex-row justify-around items-center"
              onPress={() => router.push("/legal")}
            >
              <View style={styles.myidea}>
                <LegalSvg />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Legal
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#25292e"
              />
            </Pressable>
          </View>

          <View className="w-full h-auto rounded-md bg-transparent dark:bg-dark mt-3 ">
            <Pressable
              className="w-full h-16 flex flex-row justify-around px-6 items-center"
              onPress={() => Linking.openURL("mailto:contact@jaan.ng")}
            >
              <View className="flex-row items-center justify-start w-full">
                <WhatsappSvg width="20" height="20" />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Join Our Community
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="w-full h-16 flex flex-row justify-around items-center px-6"
              onPress={() => Linking.openURL("https://jaan.ng")}
            >
              <View className="flex-row items-center justify-start w-full">
                <StarSvg />
                <Text className="font-intermedium mx-2 dark:text-white text-sm">
                  Rate App
                </Text>
              </View>
            </Pressable>
          </View>

          <View className="w-full h-auto flex flex-row items-center justify-center py-5">
            <Text
              className="text-red-600 text-xl font-intermedium"
              onPress={() => signout()}
            >
              {" "}
              Log Out{" "}
            </Text>
          </View>
        </View>
      </Customview>
      {showTheme && <Thememodal close={() => setTheme(false)} />}

      <Loader isLoading={isLoading} />

      <Footer selected="profile" />
    </>
  );
}
