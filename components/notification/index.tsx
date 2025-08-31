import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  AirtimeSvg,
  BettingSvg,
  ElectricSvg,
  InternetSvg,
  TopupSvg,
  CouponSvg,
} from "@/assets/svg/notifications";
import { useQuery } from "@tanstack/react-query";
import { Log, Update } from "./Log";

interface Props {
  title: string;
  message: string;
  status: string;
  service: string;
  reference: string;
  type: string;
  time: string;
}

export default function NotificationModal({
  visible,
  setUnread,
  close,
}: {
  visible: boolean;
  setUnread: Function;
  close: Function;
}) {
  const click = useRef<any | null>(null);

  const handleClick = (event: any) => {
    if (click.current === event.target) {
      close();
    }
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchnotifications"],
    queryFn: async () => {
      const response = await Log();
      return response;
    },
  });
  if (isLoading) {
    return <></>;
  }
  if (data && typeof data === "object") {
    const isUnreadArray = data.filter((item: any) => item.status === "unread");
    if (isUnreadArray && isUnreadArray.length > 0) {
      setUnread(true);
    } else {
      setUnread(false);
    }
  }

  async function UpdateAll() {
    try {
      const response = await Update();
      if (response) {
        refetch();
      }
    } catch (Error) {
      console.log(Error);
    }
  }
  const groupedNotifications = groupNotificationByDate(data);
  return (
    <>
      <Modal transparent={true} visible={visible}>
        <BlurView intensity={40} style={styles.dealers}>
          <Pressable
            className="w-full h-full flex flex-col items-center pt-16"
            ref={click}
            onPress={handleClick}
          >
            <View className="w-11/12 h-auto bg-white rounded-2xl dark:bg-gray-950 max-h-[70%] pb-5 overflow-scroll">
              <View className="w-full h-14 rounded-3xl flex-row items-center p-2 justify-between">
                <Text className="text-lg font-interbold dark:text-white">
                  Notifications
                </Text>
                <Text
                  className="text-md font-intermedium text-green-500 flex-row items-center"
                  onPress={() => UpdateAll()}
                >
                  <Ionicons name="checkmark-done-outline" size={12} /> Mark all
                  as read
                </Text>
              </View>
              <ScrollView>
              {groupedNotifications
                .reverse()
                .map((item: any, index: number) => (
                  
                    <View key={index} className="w-full h-auto">
                      <View className="w-full border-[0.3px] h-10 border-gray-400 bg-[#e0e0e0] flex flex-row items-center mb4">
                        <Text className="text-[12px] font-intermedium left-3">
                          {item.label}
                        </Text>
                      </View>

                      {item.data
                        .reverse()
                        .map((items: Props, index: number) => (
                          <TouchableOpacity
                            key={index}
                            className={`w-full h-16 flex flex-row items-center px-2 my-2 relative overflow-clip`}
                            onPress={() => whereToGo({type: items.type, reference: items.reference})}
                          >
                            <Pressable className="w-10 h-10 flex-row items-center justify-center bg-yellow rounded-full">
                              {getStatusClass(items.service)}
                            </Pressable>

                            <View
                              id="right column"
                              className="w-8/12 flex-grow h-full ml-2 flex-col items-center justify-around"
                            >
                              <Pressable className="w-full h-1/3 flex-row items-center">
                                {items.status === "unread" && (
                                  <Pressable className="w-2 h-2 bg-green-600 rounded-full mr-2" />
                                )}
                                <Text className="font-intermedium flex-grow text-twelve  dark:text-white">
                                  {items.title.slice(0, 33)}
                                </Text>
                                <Text className="font-intermedium text-[10px] mx-2 dark:text-white">
                                  {TimeAgo(items.time)}
                                </Text>
                              </Pressable>

                              <Pressable className="w-full h-auto">
                                <Text className="font-intermedium text-[11px] text-wra dark:text-white text-[#616161]">
                                  {items.message.slice(0, 100)}
                                </Text>
                              </Pressable>
                            </View>
                          </TouchableOpacity>
                        ))}
                    </View>
                  
                ))}
</ScrollView>
              <Text
                onPress={() => router.push("/notifications")}
                className=" m-3 text-md font-intermedium text-green-500"
              >
                View all Notifications
              </Text>
            </View>
          </Pressable>
        </BlurView>
      </Modal>
    </>
  );
}

function getStatusClass(network: any) {
  switch (network) {
    case "airtime" || "Airtime":
      return <AirtimeSvg width="100%" fill="#6b34ff" />;
    case "internet":
      return <InternetSvg width="100%" />;
    case "funding":
      return <TopupSvg width="100%" />; // I assume you intended 'yellow' here.
    case "betting":
      return <BettingSvg width="100%" />;
    case "voucher" || "Voucher":
      return <CouponSvg width="100%" />;
    case "electricity":
      return <ElectricSvg width="100%" />;
    default:
      return <TopupSvg width="100%" />;
  }
}
export const styles = StyleSheet.create({
  box: {
    backgroundColor: "#ffffff",
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  dealers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#00000090",
  },
});

function TimeAgo(inputdate: string) {
  const date = new Date(inputdate);
  const now:Date = new Date();
  const diffMs = Number(now) - Number(date);
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}hr ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

function groupNotificationByDate(notifications: any) {
  if(!notifications || notifications.length === 0){
    return []
  }
  const grouped:any = {};
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  function isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  for (const notification of notifications) {
    const notifDate = new Date(notification.time);
    let label;
    if (isSameDate(notifDate, today)) {
      label = "Today";
    } else if (isSameDate(notifDate, yesterday)) {
      label = "Yesterday";
    } else {
      label = notifDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(notification);
  }
  return Object.entries(grouped).map(([label, data]) => ({ label, data }));
}

function whereToGo({type,reference}:{type:string,reference:string}){
  if(type === 'notification'){
    return 'notification';
  }
  if(type === 'transaction'){
    router.push(`/transactions?reference=${reference}`);
    return ;
  }
}