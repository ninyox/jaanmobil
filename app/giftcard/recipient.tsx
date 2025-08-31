import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Custommodal from "../../components/custommodal/page";

const RecipientModal = ({
  visible,
  submit,
  close,
}: {
  visible: boolean;
  submit: Function;
  close: Function;
}) => {
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          {typearray.map((items, index) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md border-t-[0.2px] border-gray-500 flex flex-row items-center px-2 my-1"
              onPress={() => submit(items.value)}
            >
              <Text className="font-intermedium text-twelve mx-2 dark:text-white">
                {items.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
};

const typearray = [
  { name: "Me", value: "me" },
  { name: "Someone else", value: "else" },
];

export default RecipientModal;
