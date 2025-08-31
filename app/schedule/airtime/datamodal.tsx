import { View, Text, TouchableOpacity } from "react-native";
import Custommodal from "@/components/custommodal/page";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
export default function Datamodal({
  visible,
  submit,
  close,
}: {
  visible: boolean;
  submit: (e:string) => void;
  close: () => void;
}) {
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <Text className="text-lg dark:text-white font-interbold mx-4 mb-4">Payment Method</Text>
        <View className="w-full h-auto">
          <TouchableOpacity
            className="w-full h-20 rounded-md border-t-[0.2px] border-gray-300 flex flex-row items-center px-3 my-1"
            onPress={() => submit("account")}
          >
            <Text className=" dark:text-white text-black" ><MaterialCommunityIcons name="bank-outline" size={18} /></Text>
            <Text className="font-intermedium text-twelve mx-4 dark:text-white">
              Account Balance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full h-20 rounded-md border-t-[0.2px] border-gray-300 flex flex-row items-center px-3 my-1"
            onPress={() => submit("card")}
          >
           <Text className=" dark:text-white text-black" ><Octicons name="credit-card" size={18} /> </Text>
            <Text className="font-intermedium text-twelve mx-4 dark:text-white">Card Payment</Text>
          </TouchableOpacity>
        </View>
      </Custommodal>
    </>
  );
}
