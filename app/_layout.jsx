import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image, Appearance, useColorScheme } from "react-native";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import "../global.css";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SocketProvider } from "../store/socket";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { io } from "socket.io-client";
import SetNotification from "../notify";
import { ToastProvider } from "../store/toast";
import { GlobalToast } from "../components/GlobalToast";
import { SafeAreaProvider } from "react-native-safe-area-context";
const queryClient = new QueryClient();
const socket = io("https://api.jaan.ng");
;
socket.emit("joinchat");

function checkRedirect() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
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
  }, []);
}
export default function Root() {
  checkRedirect();
  const [userd, setUserd] = useState("");
  const getTheme = async () => {
    const checkTheme = await AsyncStorage.getItem("autotheme");
    if (checkTheme) {
      Appearance.setColorScheme(checkTheme);
    }
  };

  const [loaded] = useFonts({
    inter: require("../assets/font/Inter.ttf"),
    "inter-medium": require("../assets/font/Inter-Medium.ttf"),
    "inter-bold": require("../assets/font/Inter-Bold.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      const userid = await AsyncStorage.getItem("userid");
      setUserd(userid);

      try {
        SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log(error);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    getTheme();
    prepare();
  }, []);

  useEffect(() => {
    console.log("freeg");
    socket.on("message", (data) => {
      SetNotification(data?.title, data?.body, null);
    });
    return () => {
      AsyncStorage.removeItem("checkupdate")
    };
  }, [socket]);

  if (!loaded) {
    return <ActivityIndicator size="large" />;
  }
  return (

    <SocketProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                 <Slot />
            </QueryClientProvider>
          </SafeAreaProvider>
          <GlobalToast />
        </ToastProvider>
      </GestureHandlerRootView>
    </SocketProvider>

  );
}
