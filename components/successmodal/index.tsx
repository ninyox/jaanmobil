import { View, Text, TouchableOpacity, Modal } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
export default function SuccessModal({
  title,
  message,
  buttontext,
  action,
  visible,
  close,
}: {
  title: string;
  message: string;
  buttontext: string;
  action: string;
  visible: boolean;
  close: () => void;
}) {
  return (
    <>
      <Modal visible={visible} transparent={true} animationType="fade">
        <View className="flex flex-col pb-6 w-full h-auto items-center p-3 bg-mycolor min-h-full justify-between ">
          <View id="empty" className="w-full"></View>
          <View className="w-full items-center h-auto">
            <View
              id="logo-container"
              className="w-full bg-transparent rounded-md h-auto justify-start flex-col items-center"
            >
              <View className="w-40 bg-green-500 rounded-full justify-center items-center h-40 flex flex-row mb-4">
                <Feather
                  name="check"
                  color="white"
                  className="w-ful h-ful bg-cover"
                  size={100}
                />
              </View>

              <Text className="text-3xl font-interbold text-white mt-6 mb-1">
                {title}
              </Text>

              <Text className="text-md font-inter text-center text-white mt-2">{message}</Text>
            </View>
          </View>
          <View className="w-full flex items-center pb-6">
            {action === "close" ? (
              <TouchableOpacity
                onPress={() => close()}
                className="text-md font-intermedium bg-white w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"
              >
                <Text className="font-interbold text-mycolor text-lg">
                  {buttontext}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => router.push(action)}
                className="text-md font-intermedium bg-white w-11/12 h-[56px] rounded-3xl flex flex-row items-center justify-center disabled:opacity-30"
              >
                <Text className="font-interbold text-mycolor text-lg">
                  {buttontext}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
