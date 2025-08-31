import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Custommodal from "../../components/custommodal/page";
export default function Datamodal({
  visible,
  submit,
  close,
  data,
}: {
  visible: boolean;
  submit: (item: any) => void;
  close: () => void;
  data: any;
}) {
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
          <Text className="mx-4 text-lg font-interbold mb-6">Select Data Plan</Text>
          {data?.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md bordr-t-[0.2px] flex flex-col justify-center pl-6 my-2 "
              onPress={() => submit(item)}
            >
              <Text className="font-intermedium text-[14px] text-setgray  dark:text-white">
                {item?.name}
              </Text>
              <Text className="font-inter  dark:text-gray-400 text-[#757575] text-[12px] mt-1">
               ₦ {item?.price}{" "}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}

/*
  const [inputs, setInputs] = useState(['', '', '', '']);
    const handleKeyPress = (key) => {
        const updatedInput = [...inputs];
        const emptyinputindex = updatedInput.findIndex((digit) => digit === '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = key;
            setInputs(updatedInput)
            if (emptyinputindex === 3) {
                handleSubmit(key)
            }

        }
    }
    const handleDeletePress = () => {
        const updatedInput = [...inputs].reverse();
        const emptyinputindex = updatedInput.findIndex((digit) => digit !== '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = '';
            setInputs(updatedInput.reverse())
        }
        /*
        if(emptyinputindex < 3) {
            inputsRefs[emptyinputindex - 1 ]
        }
        */
