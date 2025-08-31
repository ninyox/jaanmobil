import { View, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "@/components/footer/page";
import Loader from "@/components/loader/loader";
import Log from "./log.js";
import { useEffect, useRef, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Airtimemodal from "./airtime.js";
import Datamodal from "./data.js";
import Fundingmodal from "./funding.js";
import CableModal from "./cable.js";
import Couponmodal from "./coupon.js";
export default function Page() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [chatlist, setChatlist] = useState([]);
  const [tranlist, setTranlist] = useState([]);
  const [datalist, setDataList] = useState([]);
  const [airlist, setAirlist] = useState([]);
  const [cablelist, setCablelist] = useState([]);
  const [electriclist, setElectriclist] = useState([]);
  const [couponlist, setCouponlist] = useState([]);
  const [fundinglist, setFundinglist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thedata, setthedata] = useState({});
  const [isLoad, setisLoad] = useState(false);


  const [routes] = useState([
    { key: "airtime", title: "Airtime" },
    { key: "data", title: "Data" },
    { key: "funding", title: "Funding" },
    { key: "cable", title: "Cable" },
    { key: "coupon", title: "Coupon" },
  ]);

  const renderScene = SceneMap({
    airtime: Airtimemodal,
    data: Datamodal,
    funding: Fundingmodal,
    cable: CableModal,
    coupon:Couponmodal
  });

  return (
    <>
      <SafeAreaView />
      <ScrollView className="flex-1 bg-white dark:bg-gray-950">
        <View className="w-screen h-screen bg-white dark:bg-gray-950 pb-1">
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: "#E0C123", width: 70 }}
                style={{
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                  display: "flex",
                }}
                activeColor="#E0C123"
                labelStyle={{ fontFamily: "inter-medium", fontSize: 16 }}
                inactiveColor="gray"
              />
            )}
          />

          {/* {showModal && <Loader />} */}
        </View>
      </ScrollView>
      <StatusBar style="dark" />
      <Footer selected="history" />
    </>
  );
}
