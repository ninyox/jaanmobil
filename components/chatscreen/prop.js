import { Entypo } from "@expo/vector-icons";
import { Text,View,Image } from "react-native";
export const MsgDisplay = ({ item, click }) => {
  if (item.type === "message") {
    return (
      <Text className="text-white font-intermedium  text-sm dark:text-gray-200 whitespace-pre-wrap">
        {item.message}
      </Text>
    );
  } else if (item.type === "image") {
    return (
      <Image
        source={{uri:item.imageurl || "https://korakota.com/logo.png"}}
        className="rounded-md my-2"
        onPress={() => click(item.imageurl)}
      />
    );
  }
};

export const Warning = () => (
  <View className="flex w-auto h-auto border bg-yellow-100 items-center rounded-lg py-1 flex-row">
    <Entypo name="warning" size={25} color="#E0C123" className="fill-yellow-600 mx-2" />
    <Text className="text-[13px] font-inter text-yellow-700 text-center">
      Never send money to anyone before meeting
    </Text>
  </View>
);
