import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import deal from "@/assets/images/ca.png";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import History from "./history";
import {
  AirtimeSvg,
  BettingSvg,
  EducationSvg,
  ElectricSvg,
  EsimSvg,
  FlightSvg,
  GiftcardSvg,
  InternetSvg,
  TicketSvg,
  TvSvg,
} from "@/assets/svg";
import React, { useEffect, useState } from "react";
import TopupModal from "@/components/topupmodal";
interface Props {
  bal: number;
  points: number;
  accountname: string;
  accountnumber: string;
  bankname: string;
}

export const Balance = ({
  bal,
  points,
  accountname,
  accountnumber,
  bankname,
}: Props) => {
  const [eye, setEye] = useState(false);
  const [showTopup, setShowTopup] = useState(false);
  const [realbal, setReal] = useState<string | undefined>(String(bal));
  useEffect(() => {
    if (eye) {
      setReal("****");
    } else {
      setReal(String(bal));
    }
  }, [eye, bal]);
  return (
    <>
      <View className="h-auto w-[95%] rounded-xl mb-3 bg-transparent show-sm mt-5">
        <View
          id="balance"
          className="h-auto w-full rounded-t-2xl bg-mycolor px-5 py-2 flex flex-row"
        >
          <View
            id="secondmasterbox"
            className="flex-grow flex justify-between flex-col"
          >
            <View className="items-cente">
              <View id="span1" className="flex-row items-center py-">
                <Text className="text-[12px] font-intermedium mr-2 text-[#cac4db]">
                  Balance
                </Text>
                {eye ? (
                  <FontAwesome5
                    name="eye"
                    size={13}
                    color="white"
                    className=""
                    onPress={() => setEye(false)}
                  />
                ) : (
                  <FontAwesome5
                    name="eye-slash"
                    size={13}
                    className=""
                    color="white"
                    onPress={() => setEye(true)}
                  />
                )}
              </View>
              <Text className="text-xl font-interbold text-white mt-1">
                ₦ {realbal !== "****" ? (realbal ? realbal + ".00" : "0.00") : "****"}
              </Text>
            </View>
            {/* {accountname && ( */}
            <>
              <View className="flex flex-row mt-1 items-center">
                <Text className="text-[12px] font-intermedium text-[#cac4db]">
                  Account Details:
                </Text>
                <Text className="text-[12px] font-intermedium text-[#cac4db]">
                  {bankname?.toUpperCase().slice(0, 15) || "PAYSTACK- TITAN"}
                </Text>
              </View>
              <View className="flex flex-row items-center mt-1">
                <Text className="text-md font-interbold text-white pr-1">
                  {accountnumber || "99662802191"}
                </Text>
                <Text className="text-[10px] font-interbold text-white">
                  ({accountname || "JAAN / GLORIOUS"})
                </Text>
              </View>
            </>
            {/* )} */}
          </View>

          <View className="w-auto flex justify-center items-center flex-row mt-4">
            <TouchableOpacity className="bg-white rounded-xl w-auto px-3 h-10 flex flex-row items-center justify-center" onPress={() => setShowTopup(true)}>
              <FontAwesome5
                name="plus"
                color="#6b34ff"
                className="text-mycolor fill-mycolor text-sm"
                size={10}
              />
              <Text className="font-intermedium text-mycolor px-1 text-[10px]">
                Top Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          id="jtoken"
          className="h-auto w-full rounded-b-3xl px-5 py-2 bg-[#ffb609]"
        >
          <View
            id="secondmasterbox"
            className="w-full flex justify-between flex-row items-center"
          >
            <View id="span1" className="flex-col flex items-start flex-grow">
              <Text className="text-[12px] font-intermedium mr-2 text-white">
                JTokens
              </Text>
              <Text className="text-md font-interbold mr-2 text-white">
                {points}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-mycolor rounded-lg w-20 h-8 flex items-center justify-center"
              onPress={() => router.push("../jtoken")}
            >
              <Text className="font-intermedium text-white text-sm">
                Convert
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TopupModal visible={showTopup} close={() => setShowTopup(false)} />
    </>
  );
};

export const Bills = ({}) => {
  return (
    <>
      <View className=" w-full rounded-md p-3 mb-1">
        <Text className="text-sm font-intermedium dark:text-white">
          Quick Access
        </Text>
        <View className=" w-full rounded-md mb-6 bg-transparent items-center flex-row flex-wrap justify-between">
          <TouchableOpacity
            className="flex flex-col items-center w-[18%] my-4"
            onPress={() => router.push("../airanddata?id=airtime")}
          >
            <AirtimeSvg />

            <Text className="text-eight dark:text-white font-intermedium mt-2">
              Airtime
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] my-4"
            onPress={() => router.push("../electric")}
          >
            <ElectricSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Electricity
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] my-4"
            onPress={() => router.push("../jamb")}
          >
            <EducationSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Education
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] my-4"
            onPress={() => router.push("../esim")}
          >
            <EsimSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              e-Sim
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] my-4"
            onPress={() => router.push("../giftcard")}
          >
            <GiftcardSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Gift card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] py-3"
            onPress={() => router.push("../airanddata?id=data")}
          >
            <InternetSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Internet
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] py-3"
            onPress={() => router.push("../betting")}
          >
            <BettingSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Betting
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] py-3"
            onPress={() => router.push("../airtime")}
          >
            <TicketSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Tickets
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] py-3"
            onPress={() => router.push("../international")}
          >
            <FlightSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              Intl
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-col items-center w-[18%] py-3"
            onPress={() => router.push("../cable")}
          >
            <TvSvg />

            <Text className="text-[8px] dark:text-white font-intermedium mt-2">
              TV
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const Advert = ({ product }: { product: object[] }) => {
  return (
    <>
      <View className="rounded-md w-11/12 items-center bg-red-600 px-0 h-28">
        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          className=""
          showPagination
        >
          {product.length > 1 ? (
            product.map((items: any, index: number) => (
              <Image
                key={index}
                style={{ width: "100%", aspectRatio: 16 / 9 }}
                resizeMode="contain"
                source={{ uri: items.imageurl }}
                className="h-24 w-full  overflow-auto rounded-lg"
                alt="ads Banner"
              />
            ))
          ) : (
            <Image
              style={{ width: "100%", aspectRatio: 16 / 9 }}
              resizeMode="contain"
              source={deal}
              className="h-24 overflow-auto rounded-lg bg-red-500"
              alt="ads Banner"
            />
          )}
        </SwiperFlatList>
      </View>
    </>
  );
};

export const Historye = ({}) => {
  return (
    <>
      <View className="flexybox w-full sm:w-full rounded-xl mt-2 h-auto p-3 flex flex-wrap justify-around dark:bg-bla">
        <View className="w-full h-auto py-3 rounded-2xl px-3 mb-4 flex flex-col dark:bg-black items-center justify-around">
          <View className="w-full h-auto my-2">
            <TouchableOpacity className="flex justify-between w-full h-auto flex-row">
              <Text className="text-sm font-intermedium text-graytext dark:text-gray-300">
                Recent Transactions
              </Text>
              <Text className="text-sm font-intermedium text-mycolor">
                see all
              </Text>
            </TouchableOpacity>
          </View>
          <History />
        </View>
      </View>
    </>
  );
};
