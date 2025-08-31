import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Footer from "@/components/footer/page";

import { useState, useEffect } from "react";
import useAuth from "@/store/authstore";
import { router } from "expo-router";
import useModal from "@/store/modal";
import { AntDesign } from "@expo/vector-icons";
import Customview from "../../components/customview/index";
import {
  AirtelSvg,
  BetkingSvg,
  DstvSvg,
  GloSvg,
  GotvSvg,
  JambSvg,
  MsportSvg,
  MtnSvg,
  NineMobileSvg,
  StartimesSvg,
} from "@/assets/svg/index";

import { AirtimeSvg, ElectricSvg, EsimSvg } from "@/assets/svg";
import { CouponSvg } from "@/assets/svg/transactions";

export default function Services() {
  const [text, setText] = useState("");

  return (
    <>
      <Customview>
        <View className=" mainbox w-full h-auto min-h-screen flex justify-between bg-white dark:bg-dark ">
          <View className="w-full sm:flex-grow h-auto flex flex-col  items-center px-2">
            <View className="w-full flex flex-row items-center justify-center pb-4 pt-2">
              <Text className=" text-sixt font-intermedium dark:text-white">
                Services
              </Text>
            </View>

            <View className="w-full h-auto sm:h-auto mb-10 rounded-md gap-4 flex-wrap px-2 flex">
              <ScrollView className="w-full">
                <Pressable className="w-full h-12 rounded-3xl border-[0.2px] border-gray-400 px-6 flex-row items-center p-2 fixed mb-4">
                  <Text className="text-slate-700 dark:text-white mx-4">
                    {" "}
                    <AntDesign
                      name="search1"
                      size={20}
                      className="mx-4 fill-slate-800 dark:fill-blue-500"
                    />
                  </Text>
                  <TextInput
                    value={text}
                    placeholder="search"
                    onChangeText={(e) => setText(e)}
                    className="flex-grow h-fulltext-black dark:text-white font-intermedium"
                  />
                </Pressable>
                {servicesarray.filter((match => match.flow.match(text.toLowerCase()))).map((item, index) => (
                  <Pressable className="" key={index}>
                    <Text className="text-sixt font-intermedium dark:text-graytext">
                      {item.name}
                    </Text>
                    <View className="flex-row flex-wrap mt-3 justify-around">
                      {item.array.map((itemo, indexs) => (
                        <TouchableOpacity
                          key={indexs}
                          className={` w-[23%] h-auto py-2 rounded-md flex flex-col items-center my-1 `}
                          onPress={() => router.push(itemo.value || "")}
                        >
                          <Pressable onPress={() => router.push(itemo.value || "")} className={`w-12 h-12 flex-row items-center justify-center ${itemo.source === "" ? "" : "border-[0.3px]"}  border-slate-300 rounded-lg p-1`}>
                            {itemo.source}
                          </Pressable>
                          <Pressable onPress={() => router.push(itemo.value || "")} className="flex-grow h-auto mt-2 flex-row items-center justify-between pr-1">
                            <Text className="font-intermedium text-ten mx-2 dark:text-white">
                              {itemo.name}
                            </Text>
                          </Pressable>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
              
              
            </View>
          </View>
        </View>
      </Customview>

      <Footer selected="services" />
    </>
  );
}

const servicesarray = [
  {
    name: "Airtime & Data",
    flow: "airtime mtn airtel 9mobile etisalat glo mobile ",
    value: "/airanddata?id=airtime",
    array: [
      {
        name: "Airtel",
        source: <AirtelSvg width="100%" />,
         value: "/airanddata?id=airtime",
      },
      {
        name: "9mobile",
        source: <NineMobileSvg width="100%" />,
        value: "/airanddata?id=airtime",
      },
      {
        name: "Mtn",
        source: <MtnSvg width="100%" />,
        value: "/airanddata?id=airtime",
      },
      {
        name: "Glo",
        source: <GloSvg width="100%" />,
        value: "/airanddata?id=airtime",
      },
    ],
  },
  {
    name: "Betting",
    flow: "msport sporty betking betting ",
    value: "/betting",
    array: [
      {
        name: "Msport",
        source: <MsportSvg width="100%" />,
         value: "/betting?id=airtime",
      },
      {
        name: "Merrybet",
        source: <MsportSvg width="100%" />,
         value: "/betting?id=airtime",
      },
      {
        name: "BetKing",
        source: <GloSvg width="100%" />,
         value: "betting/?id=airtime",
      },
      {
        name: "Betway",
        source: <GloSvg width="100%" />,
         value: "/betting?id=airtime",
      },
      {
        name: "NairaBet",
        source: <GloSvg width="100%" />,
         value: "/betting?id=airtime",
      },
      {
        name: "NairaBet",
        source: <GloSvg width="100%" />,
         value: "/betting?id=airtime",
      },
      {
        name: "NairaBet",
        source: <GloSvg width="100%" />,
         value: "/betting?id=airtime",
      },
      {
        name: "",
        source: "",
      },
    ],
  },
  {
    name: "Cable TV",
    flow: "cable dstv gotv startimes ",
    value: "/cable?id=airtime",
    array: [
      {
        name: "Dstv",
        source: <DstvSvg width="100%" />,
         value: "/cable?id=airtime",
      },
      {
        name: "GoTv",
        source: <GotvSvg width="100%" />,
         value: "/cable?id=airtime",
      },
      {
        name: "Startimes",
        source: <StartimesSvg width="100%" />,
         value: "/cable?id=airtime",
      },
      {
        name: "",
        source: "",
      },
    ],
  },
  {
    name: "Electricity",
    flow: "electric prepaid prepaid ",
    value: "/electric?id=airtime",
    array: [
      {
        name: "Prepaid",
        source: <ElectricSvg width="100%" />,
         value: "/electric?id=prepaid",
      },
      {
        name: "PostPaid",
        source: <ElectricSvg width="100%" />,
         value: "/electric?id=postpaid",
      },
      {
        name: "",
        source: "",
         value: "/electric?id=airtime",
      },
      {
        name: "",
        source: "",
      },
    ],
  },
  {
    name: "eSim",
    flow: "esim ",
    value: "/esim?id=airtime",
    array: [
      {
        name: "eSim",
        source: <EsimSvg width="100%" />,
         value: "/esim",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
     
    ],
  },
  {
    name: "Education",
    flow: "jamb",
    value: "/jamb?id=airtime",
    array: [
      {
        name: "Jamb",
        source: <JambSvg width="100%" />,
         value: "/jamb",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
    ],
  },
  {
    name: "International Airtime",
    flow: "int inter international airtime",
    array: [
      {
        name: "Int Airtime",
        source: <AirtimeSvg width="100%" />,
         value: "/international",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
    ],
  },
  {
    name: "Voucher",
    flow: "voucher coupon redeem ",
    value: "/voucher?id=airtime",
    array: [
      {
        name: "Buy Voucher",
        source: <CouponSvg width="100%" />,
         value: "/voucher?id=buy",
      },
      {
        name: "Redeem Voucher",
        source: <CouponSvg width="100%" />,
        value: "/voucher?id=redeem",
      },
      {
        name: "",
        source: "",
      },
      {
        name: "",
        source: "",
      },
    ],
  },

  // {
  //   name: "Education",
  //   source: <EducationSvg width="100%" />,
  //   flow: "jamb education",
  //   value: "../jamb",
  // },
];
