import { Octicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
export const Verifyprop = ({ status, click, nameprop }:{status:boolean,click:Function, nameprop:string}) => {
  if (!status) {
    return (
      <>
        <Octicons name="unverified" onPress={() => click()} color="red" size={20} className="anim" />
      </>
    );
  } else {
    return (
      <>
        <View className="w-auto flex-row items-center">
        <Text className="text-sm uppercase dark:text-white mx-2">{nameprop.slice(0,14)}</Text>
        <Octicons name="verified" onPress={() => alert("Meter Number is verified, If name is incorrect then edit the number")} color="green" size={20} />
        </View>
      </>
    );
  }
};
