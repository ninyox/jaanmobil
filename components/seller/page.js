import { MaterialIcons } from "@expo/vector-icons";
import { Image,Text,View } from "react-native";

export default function Seller({ name, url,verified }) {
  return (
    <>
      <View className="px-2 py-2 w-full h-auto flex items-center flex-row">
        <Image
          source={{uri:url || "https://korakota.com/emoticon.png"}}
          className="w-12 h-12 rounded-[300px] mx-2"
        />
        <Text className="text-md font-intermedium">{name}</Text>
        {(verified === "yes" || verified === "admin") && (
        <MaterialIcons
        name="verified"
          size={16} 
          className={`${verified === "admin" ? "fill-red-600" : "fill-blue-600"} mx-1`} 
        />
      )}
        
      </View>
    </>
  );
}
