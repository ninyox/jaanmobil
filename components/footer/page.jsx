"use client";
import { Entypo, Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text, View } from "react-native";
import { cssInterop } from "nativewind";
import Authmodal from "@/components/authmodal/page";
import Earnmodal from "@/components/earnmodal/page.js";
import useAuth from "@/store/authstore";
import useModal from "@/store/modal";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Jaanlogo from "@/assets/svg/jaanlogo.svg"
import BlueJaan from "@/assets/svg/bluejaan.svg"
import HomeSvg from "@/assets/svg/home.svg"
import ColoredHomeSvg from "@/assets/svg/coloredhome.svg"
import ScheduleSvg from "@/assets/svg/schedule.svg"
import Moresvg from "@/assets/svg/more.svg"
import { ClickedCouponSvg, ColoredScheduleSvg, CouponSvg } from "@/assets/svg"
import { ClickedMoreSvg } from "@/assets/svg";
const InterView = cssInterop(View, {
  className: {
    target: "style",
  },
});

const InterText = cssInterop(Text, {
  className: {
    target: "style",
  },
});
const InterTouchableOpacity = cssInterop(TouchableOpacity, {
  className: {
    target: "style",
  },
});

export default function Footer({ selected }) {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const [earnmodal, setEarnmodal] = useState(false);


  const handleRoute = async (prop) => {
    router.push(prop);
  };
  return (
    <>
      <InterView className="fixed bottom-0 w-full h-16 flex flex-row items-center justify-between px-5  dark:border-gray-900 border-slate-100 py-2 bg-white dark:bg-dark">
        <InterTouchableOpacity
          className="flex flex-col items-center"
          onPress={() => handleRoute("home")}
        >
          {selected === "home" ? (
            <>
              <ColoredHomeSvg width={22} height={22} />
              <InterText
                className={`font-intermedium text-[10px] dark:text-white text-mycolor`}
              >
                Home
              </InterText>
            </>
          ) : (
            <>
            <HomeSvg width={22} height={22} />
              <InterText
                className={`font-intermedium text-[10px] text-slate-900  dark:text-white`}
              >
                Home
              </InterText>
            </>
          )}
        </InterTouchableOpacity>
        <InterTouchableOpacity
          className="flex flex-col items-center"
          onPress={() => handleRoute("schedule")}
        >
          {selected === "schedule" ? (
            <>
             <ColoredScheduleSvg width={22} height={22} />
              <InterText
                className={`font-intermedium text-[10px] text-mycolor`}
              >
                Schedule
              </InterText>
            </>
          ) : (
            <>
              <ScheduleSvg width={22} height={22} />
              <InterText
                className={`font-intermedium text-[10px] text-slate-800 lol:text-gray-100 dark:text-white `}
              >
                Schedule
              </InterText>
            </>
          )}
        </InterTouchableOpacity>
        <InterTouchableOpacity
          className="flex flex-col items-center"
          onPress={() => handleRoute("services")}
        >
          <Jaanlogo />
        </InterTouchableOpacity>

        <InterTouchableOpacity
          className="flex flex-col items-center"
          onPress={() => handleRoute("voucher")}
        >
          {selected === "voucher" ? (
            <>
              <ClickedCouponSvg width={22} height={22} />
              <InterText className="font-intermedium text-ten text-mycolor">
                Voucher
              </InterText>
            </>
          ) : (
            <>
              <CouponSvg fill="blue" width={22} height={22} />
              <InterText className="font-intermedium text-ten text-slate-800 dark:text-white ">
                Voucher
              </InterText>
            </>
          )}
        </InterTouchableOpacity>

        <InterTouchableOpacity
          className="flex flex-col items-center"
          onPress={() => handleRoute("more")}
        >
          {selected === "profile" ? (
            <>
              <ClickedMoreSvg width={22} height={22} />
              <InterText className="font-intermedium text-slate-800 text-[10px] lol:text-gray-100 dark:text-customgray">
                More
              </InterText>
            </>
          ) : (
            <>

              <Moresvg width={22} height={22} />
              <InterText className="font-intermedium text-slate-800 text-[10px] lol:text-gray-100 dark:text-white">
                More
              </InterText>
            </>
          )}
        </InterTouchableOpacity>
      </InterView>
      <Authmodal close={handleCloseModal} visible={showModal} />
      {earnmodal && <Earnmodal close={() => setEarnmodal(false)} />}
    </>
  );
}
