import {
    View,
    ScrollView,
    useWindowDimensions,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Footer from "@/components/footer/page";
  import Chatmodal from "@/modals/chatmodal/index.js";
  import Loader from "@/components/loader/loader";
  import Forumcomp from "@/components/forum/page.jsx";
  import useModal from "@/store/modal";
  import Log from "./log.js";
  import { useEffect, useRef, useState } from "react";
  import { TabView, SceneMap, TabBar } from "react-native-tab-view";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { StatusBar } from "expo-status-bar";
  export default function Page() {
    const layout = useWindowDimensions();
    const { showModal, handleOpenModal, handleCloseModal } = new useModal();
    const [index, setIndex] = useState(0);
    const [chatlist, setChatlist] = useState([]);
    const [ayinde,setAyinde] = useState([])
    
  
    const [routes] = useState([
      { key: "chats", title: "Chats" },
      { key: "forums", title: "Forums" },
    ]);
  
    const renderScene = SceneMap({
      chats: Chatmodal,
      forums: Forumcomp,
    });
    const fetchData = async () => {
      handleOpenModal();
      try {
        const response = await Log();
  
        if (Array.isArray(response)) {
          setChatlist(response.reverse());
        }
      } catch (error) {
        // router.back();
      } finally {
        handleCloseModal();
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
   
    return (
      <>
        <SafeAreaView />
        <ScrollView className="flex-1 ">
          <View className="w-screen h-screen bg-white lol:bg-gray-900 pb-1">
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: "#E0C123",width:70 }}
                  style={{ backgroundColor: "white",justifyContent:"space-between",display:"flex"}}
                  activeColor="#E0C123"
                  labelStyle={{fontFamily:"inter-medium",fontSize:16}}
                  inactiveColor="gray"
                />
    )}
            />
  
            {showModal && <Loader />}
          </View>
        </ScrollView>
        <StatusBar style="dark" />
        <Footer selected="chats" />
      </>
    );
  }
  
  